"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import * as THREE from "three";
import { GALLERY_PROJECTS, GalleryProject, AnnotationBox } from "../data/galleryData";
import { soundFx } from "../utils/soundEffects";

type StudioMode = "3d-spatial" | "curtain-split" | "inspector" | "challenge";

export default function InteractiveVisionStudio() {
  const [activeCategory, setActiveCategory] = useState<"all" | "lidar" | "segmentation">("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string>(GALLERY_PROJECTS[0].id);
  const [activeMode, setActiveMode] = useState<StudioMode>("3d-spatial");
  
  // Layer toggles
  const [showBoxes, setShowBoxes] = useState(true);
  const [showMask, setShowMask] = useState(true);
  const [showPointCloud, setShowPointCloud] = useState(true);
  const [showScanline, setShowScanline] = useState(true);
  const [isolatedClass, setIsolatedClass] = useState<string | null>(null);

  // Split curtain state
  const [sliderPosition, setSliderPosition] = useState<number>(52);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const curtainContainerRef = useRef<HTMLDivElement>(null);

  // Inspector state
  const [selectedBox, setSelectedBox] = useState<AnnotationBox | null>(null);
  const [hoveredBox, setHoveredBox] = useState<AnnotationBox | null>(null);

  // User Challenge (Draw Bounding Box) state
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null);
  const [currentDraw, setCurrentDraw] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [challengeResult, setChallengeResult] = useState<{ score: number; message: string } | null>(null);

  // Three.js 3D Spatial canvas refs
  const threeMountRef = useRef<HTMLDivElement>(null);
  const threeSceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    mesh: THREE.Mesh;
    wireframeBoxes: THREE.Group;
    pointCloud: THREE.Points;
    laserPlane: THREE.Mesh;
    cleanup: () => void;
  } | null>(null);

  const activeProject: GalleryProject =
    GALLERY_PROJECTS.find((p) => p.id === selectedProjectId) || GALLERY_PROJECTS[0];

  const filteredProjects = GALLERY_PROJECTS.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  // Handle Project Change
  const handleSelectProject = (projId: string) => {
    setSelectedProjectId(projId);
    setSelectedBox(null);
    setChallengeResult(null);
    setCurrentDraw(null);
    soundFx.playClick();
  };

  // -------------------------------------------------------------
  // THREE.JS 3D SPATIAL CANVAS INITIALIZATION & UPDATE
  // -------------------------------------------------------------
  useEffect(() => {
    if (activeMode !== "3d-spatial") return;
    const container = threeMountRef.current;
    if (!container) return;

    let animId: number;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0f11, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d4ff, 3, 10);
    pointLight.position.set(0, 1.5, 3.5);
    scene.add(pointLight);

    // 3D Texture plane of the active project
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(activeProject.image);
    texture.generateMipmaps = true;

    const aspect = activeProject.width / activeProject.height;
    const planeW = 3.6;
    const planeH = planeW / aspect;

    const planeGeom = new THREE.PlaneGeometry(planeW, planeH, 32, 32);
    const planeMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.35,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });
    const mainMesh = new THREE.Mesh(planeGeom, planeMat);
    scene.add(mainMesh);

    // Subtle edge wireframe
    const edges = new THREE.EdgesGeometry(planeGeom);
    const lineMat = new THREE.LineBasicMaterial({
      color: activeProject.category === "lidar" ? 0x00d4ff : 0x22c55e,
      transparent: true,
      opacity: 0.65,
    });
    const border = new THREE.LineSegments(edges, lineMat);
    mainMesh.add(border);

    // Floating 3D Bounding Wireframe Boxes
    const wireframeGroup = new THREE.Group();
    activeProject.boxes.forEach((box) => {
      // Map normalized 0-100% to 3D plane coordinates
      const bx = (box.x / 100 - 0.5) * planeW;
      const by = -(box.y / 100 - 0.5) * planeH;
      const bw = (box.w / 100) * planeW;
      const bh = (box.h / 100) * planeH;
      const bz = 0.35; // depth offset toward viewer

      const bGeom = new THREE.BoxGeometry(bw, bh, bz);
      const bEdges = new THREE.EdgesGeometry(bGeom);
      const bMat = new THREE.LineBasicMaterial({
        color: box.label.includes("Vehicle") || box.label.includes("Truck") ? 0x00d4ff : 0xffb400,
        transparent: true,
        opacity: 0.95,
      });
      const bLine = new THREE.LineSegments(bEdges, bMat);
      bLine.position.set(bx + bw / 2, by - bh / 2, bz / 2);
      if (box.orientationDeg) {
        bLine.rotation.y = (box.orientationDeg * Math.PI) / 180;
      }
      wireframeGroup.add(bLine);
    });
    mainMesh.add(wireframeGroup);

    // 3D LiDAR point cloud layer
    const ptsCount = 2000;
    const ptsPositions = new Float32Array(ptsCount * 3);
    const ptsColors = new Float32Array(ptsCount * 3);
    const colorCyan = new THREE.Color(0x00d4ff);
    const colorAmber = new THREE.Color(0xf59e0b);

    for (let i = 0; i < ptsCount; i++) {
      const idx = i * 3;
      const px = (Math.random() - 0.5) * (planeW * 1.05);
      const py = (Math.random() - 0.5) * (planeH * 1.05);
      const pz = 0.05 + Math.random() * 0.45; // pop out

      ptsPositions[idx] = px;
      ptsPositions[idx + 1] = py;
      ptsPositions[idx + 2] = pz;

      const c = Math.random() < 0.25 ? colorAmber : colorCyan;
      ptsColors[idx] = c.r;
      ptsColors[idx + 1] = c.g;
      ptsColors[idx + 2] = c.b;
    }

    const ptsGeom = new THREE.BufferGeometry();
    ptsGeom.setAttribute("position", new THREE.BufferAttribute(ptsPositions, 3));
    ptsGeom.setAttribute("color", new THREE.BufferAttribute(ptsColors, 3));
    const ptsMat = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const pointCloud = new THREE.Points(ptsGeom, ptsMat);
    mainMesh.add(pointCloud);

    // Horizontal Laser Scanline Plane
    const laserGeom = new THREE.PlaneGeometry(planeW * 1.2, 0.04);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const laserPlane = new THREE.Mesh(laserGeom, laserMat);
    laserPlane.position.z = 0.12;
    mainMesh.add(laserPlane);

    // Mouse tilt interaction
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      targetRotY = x * 0.35;
      targetRotX = -y * 0.25;
    };

    container.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Render loop
    let laserDir = 1;
    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      // Smooth camera / mesh tilt
      mainMesh.rotation.y += (targetRotY - mainMesh.rotation.y) * 0.08;
      mainMesh.rotation.x += (targetRotX - mainMesh.rotation.x) * 0.08;

      // Move laser scanner
      laserPlane.position.y += 0.015 * laserDir;
      if (laserPlane.position.y > planeH / 2) laserDir = -1;
      if (laserPlane.position.y < -planeH / 2) laserDir = 1;

      // Animate points
      pointCloud.position.z = Math.sin(time * 0.003) * 0.03;

      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    threeSceneRef.current = {
      scene,
      camera,
      renderer,
      mesh: mainMesh,
      wireframeBoxes: wireframeGroup,
      pointCloud,
      laserPlane,
      cleanup: () => {
        cancelAnimationFrame(animId);
        container.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        planeGeom.dispose();
        planeMat.dispose();
        edges.dispose();
        lineMat.dispose();
        ptsGeom.dispose();
        ptsMat.dispose();
        laserGeom.dispose();
        laserMat.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      },
    };

    return () => {
      if (threeSceneRef.current) {
        threeSceneRef.current.cleanup();
      }
    };
  }, [activeMode, activeProject]);

  // Update Three.js layer visibility when state changes
  useEffect(() => {
    if (threeSceneRef.current) {
      threeSceneRef.current.wireframeBoxes.visible = showBoxes;
      threeSceneRef.current.pointCloud.visible = showPointCloud;
      threeSceneRef.current.laserPlane.visible = showScanline;
    }
  }, [showBoxes, showPointCloud, showScanline]);

  // -------------------------------------------------------------
  // SPLIT CURTAIN SLIDER LOGIC
  // -------------------------------------------------------------
  const handleCurtainMove = useCallback(
    (clientX: number) => {
      if (!curtainContainerRef.current) return;
      const rect = curtainContainerRef.current.getBoundingClientRect();
      const pos = ((clientX - rect.left) / rect.width) * 100;
      const clamped = Math.max(5, Math.min(95, pos));
      setSliderPosition(clamped);
    },
    []
  );

  const handlePointerDownCurtain = (e: React.PointerEvent) => {
    setIsDraggingSlider(true);
    handleCurtainMove(e.clientX);
    soundFx.playScan();
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (isDraggingSlider) {
        handleCurtainMove(e.clientX);
      }
    };
    const onUp = () => setIsDraggingSlider(false);

    if (isDraggingSlider) {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    }
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [isDraggingSlider, handleCurtainMove]);

  // -------------------------------------------------------------
  // USER DRAWING CHALLENGE (IoU Test)
  // -------------------------------------------------------------
  const handleChallengeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeMode !== "challenge") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setIsDrawing(true);
    setDrawStart({ x, y });
    setCurrentDraw({ x, y, w: 0, h: 0 });
    setChallengeResult(null);
    soundFx.playClick();
  };

  const handleChallengeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !drawStart) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = ((e.clientX - rect.left) / rect.width) * 100;
    const currentY = ((e.clientY - rect.top) / rect.height) * 100;

    const x = Math.min(drawStart.x, currentX);
    const y = Math.min(drawStart.y, currentY);
    const w = Math.abs(currentX - drawStart.x);
    const h = Math.abs(currentY - drawStart.y);

    setCurrentDraw({ x, y, w, h });
  };

  const handleChallengeMouseUp = () => {
    if (!isDrawing || !currentDraw) return;
    setIsDrawing(false);

    // Calculate IoU with closest ground-truth box
    if (activeProject.boxes.length === 0 || currentDraw.w < 2 || currentDraw.h < 2) {
      return;
    }

    let bestIoU = 0;
    activeProject.boxes.forEach((gt) => {
      const xA = Math.max(currentDraw.x, gt.x);
      const yA = Math.max(currentDraw.y, gt.y);
      const xB = Math.min(currentDraw.x + currentDraw.w, gt.x + gt.w);
      const yB = Math.min(currentDraw.y + currentDraw.h, gt.y + gt.h);

      const interW = Math.max(0, xB - xA);
      const interH = Math.max(0, yB - yA);
      const interArea = interW * interH;

      const userArea = currentDraw.w * currentDraw.h;
      const gtArea = gt.w * gt.h;
      const unionArea = userArea + gtArea - interArea;

      if (unionArea > 0) {
        const iou = (interArea / unionArea) * 100;
        if (iou > bestIoU) bestIoU = iou;
      }
    });

    const roundedIoU = Math.round(bestIoU * 10) / 10;
    soundFx.playLock();

    if (roundedIoU >= 80) {
      setChallengeResult({
        score: roundedIoU,
        message: `Outstanding! IoU: ${roundedIoU}% — Exceptional spatial accuracy. Everlyn maintains 99.4%+ consistent accuracy on 500+ frames daily.`,
      });
    } else if (roundedIoU >= 50) {
      setChallengeResult({
        score: roundedIoU,
        message: `Good attempt! IoU: ${roundedIoU}% — Precision labeling requires sub-pixel boundary tuning. Everlyn achieves 99.8% precision with verified QA.`,
      });
    } else {
      setChallengeResult({
        score: roundedIoU,
        message: `IoU: ${roundedIoU}% — Computer vision models degrade rapidly with misaligned boundaries. Hire Everlyn to guarantee pristine, model-ready annotations!`,
      });
    }
  };

  return (
    <section id="interactive-studio" className="w-full py-20 md:py-32 relative bg-surface-container-lowest overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-secondary/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-label-mono text-[11px] tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            ACTIONS SPEAK LOUDER THAN WORDS // INTERACTIVE WORKBENCH
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Don&apos;t Take My Word For It.{" "}
            <span className="text-gradient-primary block sm:inline">Inspect The Precision Yourself.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/70 font-light leading-relaxed">
            Test the caliber of data annotation that powers autonomous driving and computer vision pipelines.
            Interact with authentic 3D LiDAR point clouds, drag the semantic segmentation curtain, and verify sub-pixel edge boundaries.
          </p>
        </div>

        {/* Dataset Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: "all", label: "All Datasets (9)", icon: "grid_view" },
            { id: "lidar", label: "3D LiDAR Point Clouds (4)", icon: "radar" },
            { id: "segmentation", label: "Semantic Segmentation (5)", icon: "layers" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as "all" | "lidar" | "segmentation");
                soundFx.playClick();
              }}
              className={`px-4 py-2 rounded-full font-label-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-primary text-on-primary font-bold shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                  : "glass-pill text-white/70 hover:text-white hover:border-white/20"
              }`}
            >
              <span className="material-symbols-outlined text-sm">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Horizontal Project Carousel / Thumbnails */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-none snap-x">
          {filteredProjects.map((proj) => {
            const isSelected = proj.id === activeProject.id;
            return (
              <button
                key={proj.id}
                onClick={() => handleSelectProject(proj.id)}
                className={`snap-start shrink-0 text-left w-64 md:w-72 p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "glass-panel border-primary bg-primary/10 shadow-[0_0_25px_rgba(0,212,255,0.2)]"
                    : "glass-card border-white/10 hover:border-white/25 hover:bg-white/5 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="relative w-full h-24 rounded-lg overflow-hidden mb-2.5 bg-black/40">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                  <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[9px] font-label-mono text-primary border border-primary/20">
                    IoU: {proj.iouScore}
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-tertiary/20 backdrop-blur-md text-[9px] font-label-mono text-tertiary border border-tertiary/30">
                    QA PASS
                  </div>
                </div>
                <h4 className="font-display text-xs font-semibold text-white line-clamp-1">
                  {proj.title}
                </h4>
                <p className="font-label-mono text-[10px] text-white/50 mt-1 line-clamp-1">
                  {proj.sensorType}
                </p>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Viewport (Col 8) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Viewport Action Mode Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl glass-panel border border-white/10">
              <div className="flex items-center gap-1.5 sm:gap-2">
                {[
                  { id: "3d-spatial", label: "3D Spatial Tilt", icon: "view_in_ar" },
                  { id: "curtain-split", label: "Curtain Split", icon: "compare" },
                  { id: "inspector", label: "Precision Inspector", icon: "center_focus_strong" },
                  { id: "challenge", label: "Label It Yourself", icon: "draw" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setActiveMode(mode.id as StudioMode);
                      soundFx.playSwitch();
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-label-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeMode === mode.id
                        ? "bg-white/15 text-white border border-white/30 font-semibold"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">{mode.icon}</span>
                    <span className="hidden sm:inline">{mode.label}</span>
                  </button>
                ))}
              </div>

              {/* Layer Toggles */}
              <div className="flex items-center gap-2 text-xs font-label-mono">
                <button
                  onClick={() => {
                    setShowBoxes(!showBoxes);
                    soundFx.playClick();
                  }}
                  className={`px-2.5 py-1 rounded border text-[10px] cursor-pointer transition-colors ${
                    showBoxes
                      ? "border-primary text-primary bg-primary/10"
                      : "border-white/15 text-white/40 hover:text-white"
                  }`}
                  title="Toggle 3D Bounding Boxes"
                >
                  3D Boxes
                </button>
                <button
                  onClick={() => {
                    setShowPointCloud(!showPointCloud);
                    soundFx.playClick();
                  }}
                  className={`px-2.5 py-1 rounded border text-[10px] cursor-pointer transition-colors ${
                    showPointCloud
                      ? "border-secondary text-secondary-fixed-dim bg-secondary/15"
                      : "border-white/15 text-white/40 hover:text-white"
                  }`}
                  title="Toggle LiDAR Point Cloud"
                >
                  Point Cloud
                </button>
                <button
                  onClick={() => {
                    setShowScanline(!showScanline);
                    soundFx.playClick();
                  }}
                  className={`px-2.5 py-1 rounded border text-[10px] cursor-pointer transition-colors ${
                    showScanline
                      ? "border-tertiary text-tertiary bg-tertiary/10"
                      : "border-white/15 text-white/40 hover:text-white"
                  }`}
                  title="Toggle Radar Scan Beam"
                >
                  Laser Beam
                </button>
              </div>
            </div>

            {/* Viewport Canvas Container */}
            <div className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden glass-panel border border-white/15 shadow-2xl bg-black">
              {/* MODE 1: 3D SPATIAL TILT (Three.js WebGL) */}
              {activeMode === "3d-spatial" && (
                <div className="relative w-full h-full">
                  <div ref={threeMountRef} className="w-full h-full cursor-move" />
                  <div className="absolute bottom-4 left-4 pointer-events-none px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 font-label-mono text-[10px] text-white/70">
                    <span className="text-primary font-bold">MOVE CURSOR</span> TO TILT 3D PERSPECTIVE // DEPTH SHADER ON
                  </div>
                </div>
              )}

              {/* MODE 2: CURTAIN SPLIT (Raw vs Ground Truth) */}
              {activeMode === "curtain-split" && (
                <div
                  ref={curtainContainerRef}
                  onPointerDown={handlePointerDownCurtain}
                  className="relative w-full h-full cursor-ew-resize select-none overflow-hidden"
                >
                  {/* Base Layer: Ground Truth (Full Color Annotated) */}
                  <div className="absolute inset-0">
                    <Image
                      src={activeProject.image}
                      alt="Ground Truth Annotated"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 800px"
                    />
                    <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-primary/40 font-label-mono text-[10px] text-primary">
                      EVERLYN&apos;S LABELED TRUTH // {activeProject.iouScore} IoU
                    </div>
                  </div>

                  {/* Overlaid Layer: Raw Unannotated (Clipped by slider) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                  >
                    <Image
                      src={activeProject.image}
                      alt="Raw Sensor Stream"
                      fill
                      className="object-cover grayscale contrast-125 brightness-75"
                      sizes="(max-width: 1024px) 100vw, 800px"
                    />
                    <div className="absolute inset-0 bg-blue-950/20 mix-blend-color" />
                    <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/20 font-label-mono text-[10px] text-white/70">
                      RAW UNLABELED SENSOR FEED
                    </div>
                  </div>

                  {/* Divider Line & Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-[2px] bg-primary shadow-[0_0_15px_rgba(0,212,255,0.8)] z-20 pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,1)]">
                      <span className="material-symbols-outlined text-base">code</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white/80 font-label-mono text-[10px]">
                    DRAG CURTAIN TO AUDIT SUB-PIXEL EDGE ALIGNMENT
                  </div>
                </div>
              )}

              {/* MODE 3: PRECISION INSPECTOR */}
              {activeMode === "inspector" && (
                <div className="relative w-full h-full select-none">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />

                  {/* Interactive clickable bounding boxes */}
                  {showBoxes &&
                    activeProject.boxes.map((box) => {
                      const isSelected = selectedBox?.id === box.id;
                      const isHovered = hoveredBox?.id === box.id;
                      return (
                        <div
                          key={box.id}
                          onClick={() => {
                            setSelectedBox(box);
                            soundFx.playLock();
                          }}
                          onMouseEnter={() => {
                            setHoveredBox(box);
                            soundFx.playBeep();
                          }}
                          onMouseLeave={() => setHoveredBox(null)}
                          className={`absolute border-2 transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "border-primary bg-primary/25 shadow-[0_0_20px_rgba(0,212,255,0.5)] z-20"
                              : isHovered
                              ? "border-tertiary bg-tertiary/20 z-15"
                              : "border-primary/80 bg-primary/10 z-10"
                          }`}
                          style={{
                            left: `${box.x}%`,
                            top: `${box.y}%`,
                            width: `${box.w}%`,
                            height: `${box.h}%`,
                          }}
                        >
                          <div className="absolute -top-6 left-0 bg-black/80 border border-primary/50 text-primary px-1.5 py-0.5 rounded text-[9px] font-label-mono whitespace-nowrap">
                            {box.label} [{box.confidence}%]
                          </div>
                          {box.depthMeters && (
                            <div className="absolute -bottom-5 right-0 bg-black/80 text-white/70 px-1 rounded text-[8px] font-label-mono">
                              d: {box.depthMeters}m
                            </div>
                          )}
                        </div>
                      );
                    })}

                  {/* Corner Inspection Floating Card */}
                  {selectedBox && (
                    <div className="absolute top-4 left-4 z-30 max-w-xs p-4 rounded-xl glass-panel border border-primary shadow-2xl animate-fade-in-up">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-label-mono text-[10px] uppercase tracking-wider text-primary font-bold">
                          OBJECT TELEMETRY
                        </span>
                        <button
                          onClick={() => setSelectedBox(null)}
                          className="text-white/60 hover:text-white text-xs font-bold cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                      <h5 className="text-white font-display text-sm font-semibold">{selectedBox.label}</h5>
                      <div className="mt-2 space-y-1 font-label-mono text-[10px] text-white/70">
                        <div className="flex justify-between">
                          <span>Normalized Coord:</span>
                          <strong className="text-white">X:{selectedBox.x}%, Y:{selectedBox.y}%</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Dimensions:</span>
                          <strong className="text-white">W:{selectedBox.w}%, H:{selectedBox.h}%</strong>
                        </div>
                        {selectedBox.depthMeters && (
                          <div className="flex justify-between">
                            <span>Calculated Depth:</span>
                            <strong className="text-primary">{selectedBox.depthMeters}m</strong>
                          </div>
                        )}
                        {selectedBox.orientationDeg !== undefined && (
                          <div className="flex justify-between">
                            <span>Yaw Orientation:</span>
                            <strong className="text-tertiary">{selectedBox.orientationDeg}°</strong>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Verified Confidence:</span>
                          <strong className="text-tertiary">{selectedBox.confidence}%</strong>
                        </div>
                        <div className="mt-2 pt-2 border-t border-white/10 text-tertiary flex items-center gap-1 text-[9px]">
                          <span className="material-symbols-outlined text-xs">verified</span>
                          <span>QA PASSED — VERIFIED BY EVERLYN LINDA</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 pointer-events-none px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 font-label-mono text-[10px] text-white/70">
                    CLICK ANY BOUNDING BOX TO AUDIT ITS 3D SPATIAL PARAMETERS
                  </div>
                </div>
              )}

              {/* MODE 4: LABEL IT YOURSELF CHALLENGE */}
              {activeMode === "challenge" && (
                <div
                  onMouseDown={handleChallengeMouseDown}
                  onMouseMove={handleChallengeMouseMove}
                  onMouseUp={handleChallengeMouseUp}
                  className="relative w-full h-full cursor-crosshair select-none"
                >
                  <Image
                    src={activeProject.image}
                    alt="Draw challenge"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />

                  {/* Draw Preview Box */}
                  {currentDraw && (
                    <div
                      className="absolute border-2 border-dashed border-amber-400 bg-amber-400/20 pointer-events-none"
                      style={{
                        left: `${currentDraw.x}%`,
                        top: `${currentDraw.y}%`,
                        width: `${currentDraw.w}%`,
                        height: `${currentDraw.h}%`,
                      }}
                    >
                      <div className="absolute -top-5 left-0 bg-black/80 text-amber-300 text-[9px] px-1 font-label-mono">
                        Drawing Test BBox...
                      </div>
                    </div>
                  )}

                  {/* Challenge Result Popup */}
                  {challengeResult && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-30">
                      <div className="max-w-md w-full p-6 rounded-2xl glass-panel border border-primary text-center shadow-2xl animate-fade-in-up">
                        <div className="w-12 h-12 rounded-full bg-primary/20 text-primary border border-primary/40 mx-auto flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-2xl">speed</span>
                        </div>
                        <h4 className="font-display text-lg font-bold text-white mb-2">
                          Precision Verification Result
                        </h4>
                        <div className="text-3xl font-display font-black text-gradient-primary my-3">
                          {challengeResult.score}% IoU Match
                        </div>
                        <p className="font-body-md text-xs sm:text-sm text-white/80 mb-6 leading-relaxed">
                          {challengeResult.message}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <button
                            onClick={() => {
                              setChallengeResult(null);
                              setCurrentDraw(null);
                              soundFx.playClick();
                            }}
                            className="px-4 py-2 rounded-full border border-white/20 text-white font-label-mono text-xs uppercase tracking-wider hover:bg-white/10 cursor-pointer"
                          >
                            Try Another Object
                          </button>
                          <Link
                            href="/contact"
                            className="px-6 py-2 rounded-full bg-primary text-on-primary font-label-mono text-xs uppercase tracking-wider font-bold hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] cursor-pointer"
                          >
                            Hire Everlyn For Your Team
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {!currentDraw && !challengeResult && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-amber-400/40 text-amber-300 font-label-mono text-xs text-center">
                      CLICK & DRAG TO DRAW A BOUNDING BOX ON ANY CAR OR OBSTACLE
                    </div>
                  )}
                </div>
              )}

              {/* Corner HUD Styling */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary pointer-events-none" />
            </div>

            {/* Class Taxonomy Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="font-label-mono text-[11px] text-white/50 uppercase tracking-wider mr-1">
                Detected Ontology:
              </span>
              {activeProject.classes.map((cls) => {
                const isIsolated = isolatedClass === cls.name;
                return (
                  <button
                    key={cls.name}
                    onClick={() => {
                      setIsolatedClass(isIsolated ? null : cls.name);
                      soundFx.playClick();
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label-mono transition-all cursor-pointer ${
                      isIsolated
                        ? "bg-white/20 border border-white text-white font-bold"
                        : "glass-pill text-white/70 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: cls.color }}
                    />
                    <span>{cls.name}</span>
                    <span className="text-[10px] text-white/40">({cls.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right QA Telemetry & Conversion Card (Col 4) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {/* QA Audit Spec Card */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div>
                  <span className="font-label-mono text-[10px] uppercase tracking-widest text-primary block">
                    QUALITY ASSURANCE DOSSIER
                  </span>
                  <h3 className="font-display text-lg font-bold text-white mt-0.5">
                    {activeProject.title}
                  </h3>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-display text-2xl font-bold text-gradient-primary">
                    {activeProject.iouScore}
                  </span>
                  <span className="font-label-mono text-[9px] text-tertiary">IoU ACCURACY</span>
                </div>
              </div>

              <p className="font-body-md text-xs text-white/75 leading-relaxed mb-5">
                {activeProject.description}
              </p>

              {/* Technical Spec List */}
              <div className="space-y-2.5 font-label-mono text-xs border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Sensor Rig:</span>
                  <span className="text-white text-right text-[11px] max-w-[200px] truncate">
                    {activeProject.sensorType}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Annotation Tools:</span>
                  <span className="text-primary text-[11px]">
                    {activeProject.tools.join(" • ")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Point / Mask Density:</span>
                  <span className="text-white text-[11px]">
                    {activeProject.pointCount || activeProject.polygonCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Edge Boundary Tolerance:</span>
                  <span className="text-tertiary text-[11px]">&lt; 1.2px (Sub-pixel)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Model Compatibility:</span>
                  <span className="text-white text-[11px]">Cityscapes / KITTI / nuScenes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Lead Annotator:</span>
                  <span className="text-white font-semibold text-[11px]">Everlyn Linda (QA Pass)</span>
                </div>
              </div>
            </div>

            {/* Direct Conversion Card */}
            <div className="glass-panel rounded-2xl p-6 border border-primary/30 relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent shadow-[0_0_30px_rgba(0,212,255,0.1)]">
              <div className="flex items-center gap-2 text-tertiary font-label-mono text-xs mb-2">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                AVAILABLE FOR HIRE // REMOTE WORLDWIDE
              </div>
              <h4 className="font-display text-base sm:text-lg font-bold text-white mb-2">
                Need This Level of Accuracy For Your AI Dataset?
              </h4>
              <p className="font-body-md text-xs text-white/70 mb-5 leading-relaxed">
                Everlyn labels 200+ complex frames or 450+ polygons per day with strict adherence to your custom guidelines and ontology schemas.
              </p>

              <div className="flex flex-col gap-2.5">
                <Link
                  href="/contact"
                  className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-label-mono text-xs uppercase tracking-widest font-bold text-center flex items-center justify-center gap-2 hover:shadow-[0_8px_30px_rgba(0,212,255,0.4)] hover:-translate-y-0.5 transition-all"
                >
                  <span>Hire Everlyn For Data Annotation</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <Link
                  href="/portfolio"
                  className="w-full py-3 px-4 rounded-xl border border-white/15 text-white font-label-mono text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 hover:border-white/30 hover:bg-white/5 transition-all"
                >
                  <span>Explore Full 9-Project Dossier</span>
                  <span className="material-symbols-outlined text-sm">visibility</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
