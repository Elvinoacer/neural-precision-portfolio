"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as THREE from "three";
import { GALLERY_PROJECTS, GalleryProject } from "../data/galleryData";
import { soundFx } from "../utils/soundEffects";

interface Hero3DStudioProps {
  onSelectProject?: (projectId: string) => void;
}

export default function Hero3DStudio({ onSelectProject }: Hero3DStudioProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // Active slide index (0 to 8)
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isAutoOrbit, setIsAutoOrbit] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(60);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Motion values for silky smooth text parallax depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const textParallaxX = useSpring(useTransform(mouseX, [-1, 1], [-24, 24]), {
    stiffness: 70,
    damping: 24,
  });
  const textParallaxY = useSpring(useTransform(mouseY, [-1, 1], [-14, 14]), {
    stiffness: 70,
    damping: 24,
  });

  // Refs for 60fps render loop
  const animFrameRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const prevPointerPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pointerVelocityRef = useRef<number>(0);
  const cylinderGroupRef = useRef<THREE.Group | null>(null);
  const panelsRef = useRef<THREE.Mesh[]>([]);
  const edgeLinesRef = useRef<THREE.LineSegments[]>([]);
  const targetRotationYRef = useRef<number>(0);
  const currentRotationYRef = useRef<number>(0);

  const activeSlideIndexRef = useRef<number>(activeSlideIndex);
  activeSlideIndexRef.current = activeSlideIndex;

  const isAutoOrbitRef = useRef<boolean>(isAutoOrbit);
  isAutoOrbitRef.current = isAutoOrbit;

  const isHoveredRef = useRef<boolean>(isHovered);
  isHoveredRef.current = isHovered;

  const panelCount = GALLERY_PROJECTS.length;
  const angleStep = (Math.PI * 2) / panelCount;

  // Function to smoothly navigate to a specific slide index
  const goToSlide = useCallback(
    (index: number) => {
      const nextIdx = (index + panelCount) % panelCount;
      setActiveSlideIndex(nextIdx);
      targetRotationYRef.current = -nextIdx * angleStep;
      soundFx.playSwitch();
    },
    [panelCount, angleStep]
  );

  const handleNext = useCallback(() => {
    goToSlide(activeSlideIndexRef.current + 1);
  }, [goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide(activeSlideIndexRef.current - 1);
  }, [goToSlide]);

  // Toggle audio
  const toggleAudio = useCallback(() => {
    soundFx.isMuted = !soundFx.isMuted;
    setIsAudioMuted(soundFx.isMuted);
    if (!soundFx.isMuted) {
      soundFx.playBeep();
    }
  }, []);

  // -----------------------------------------------------------------
  // THREE.JS INITIALIZATION (Mounts ONCE on client mount)
  // -----------------------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene setup (Transparent background so distant title shows through)
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0f11, 0.025);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 9.4);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0); // 100% transparent clear buffer
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.7);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00d4ff, 4, 30);
    cyanLight.position.set(0, 3, 7);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x7c3aed, 3, 25);
    purpleLight.position.set(0, -4, 4);
    scene.add(purpleLight);

    // 5. 3D LiDAR Point Cloud Particle Field
    const pointCount = 4800;
    const pointPositions = new Float32Array(pointCount * 3);
    const pointColors = new Float32Array(pointCount * 3);

    const cCyan = new THREE.Color(0x00d4ff);
    const cAmber = new THREE.Color(0xf59e0b);
    const cGreen = new THREE.Color(0x22c55e);
    const cPurple = new THREE.Color(0xa855f7);

    for (let i = 0; i < pointCount; i++) {
      const idx = i * 3;
      const radius = 3.0 + Math.random() * 8.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 5.2;

      pointPositions[idx] = Math.cos(angle) * radius;
      pointPositions[idx + 1] = y;
      pointPositions[idx + 2] = Math.sin(angle) * radius;

      let chosenColor = cCyan;
      if (y < -1.4) chosenColor = cPurple;
      else if (Math.random() < 0.18) chosenColor = cAmber;
      else if (Math.random() < 0.22) chosenColor = cGreen;

      pointColors[idx] = chosenColor.r;
      pointColors[idx + 1] = chosenColor.g;
      pointColors[idx + 2] = chosenColor.b;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(pointColors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      blending: THREE.AdditiveBlending,
    });

    const pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointCloud);

    // 6. Ground Radar Grid
    const gridHelper = new THREE.GridHelper(26, 36, 0x00d4ff, 0x1f2937);
    gridHelper.position.y = -2.6;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.38;
    scene.add(gridHelper);

    // 7. Rotating LiDAR Radar Sweep Ring
    const scanRingGeom = new THREE.RingGeometry(0.8, 8.2, 64);
    const scanRingMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const scanRing = new THREE.Mesh(scanRingGeom, scanRingMat);
    scanRing.rotation.x = Math.PI / 2;
    scanRing.position.y = -2.58;
    scene.add(scanRing);

    // 8. 3D Cylinder Carousel of Gallery Panels
    const cylinderGroup = new THREE.Group();
    cylinderGroupRef.current = cylinderGroup;
    scene.add(cylinderGroup);

    const textureLoader = new THREE.TextureLoader();
    const cylinderRadius = 5.2;
    const panels: THREE.Mesh[] = [];
    const edgeLines: THREE.LineSegments[] = [];

    const panelGeom = new THREE.PlaneGeometry(2.5, 1.48);

    GALLERY_PROJECTS.forEach((proj, i) => {
      const angle = i * angleStep;
      const x = Math.sin(angle) * cylinderRadius;
      const z = Math.cos(angle) * cylinderRadius;
      const y = Math.sin(i * 0.95) * 0.32;

      const texture = textureLoader.load(proj.image);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      const mat = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        roughness: 0.22,
        metalness: 0.1,
        transparent: true,
        opacity: 0.92,
      });

      const mesh = new THREE.Mesh(panelGeom, mat);
      mesh.position.set(x, y, z);
      mesh.rotation.y = angle;

      mesh.userData = {
        index: i,
        project: proj,
        baseAngle: angle,
      };

      // Glowing Wireframe Edge
      const edgeGeom = new THREE.EdgesGeometry(panelGeom);
      const edgeMat = new THREE.LineBasicMaterial({
        color: proj.category === "lidar" ? 0x00d4ff : 0x22c55e,
        transparent: true,
        opacity: 0.65,
      });
      const edgeLine = new THREE.LineSegments(edgeGeom, edgeMat);
      mesh.add(edgeLine);
      edgeLines.push(edgeLine);

      cylinderGroup.add(mesh);
      panels.push(mesh);
    });

    panelsRef.current = panels;
    edgeLinesRef.current = edgeLines;

    // 9. Floating 3D Wireframe Bounding Cuboids
    const cuboidGroup = new THREE.Group();
    scene.add(cuboidGroup);

    const cuboidDefs = [
      { pos: [2.4, -0.5, 3.2], size: [1.0, 0.7, 1.5], color: 0x00d4ff, yaw: 0.25 },
      { pos: [-2.6, 0.5, 3.4], size: [1.2, 0.8, 1.7], color: 0xf59e0b, yaw: -0.35 },
      { pos: [1.1, 1.2, 2.4], size: [0.5, 1.0, 0.5], color: 0x22c55e, yaw: 0.1 },
      { pos: [-1.4, -1.3, 2.0], size: [0.9, 0.6, 1.3], color: 0x00d4ff, yaw: 0.65 },
    ];

    cuboidDefs.forEach((def) => {
      const boxGeom = new THREE.BoxGeometry(def.size[0], def.size[1], def.size[2]);
      const edges = new THREE.EdgesGeometry(boxGeom);
      const lineMat = new THREE.LineBasicMaterial({
        color: def.color,
        transparent: true,
        opacity: 0.85,
      });
      const boxLine = new THREE.LineSegments(edges, lineMat);
      boxLine.position.set(def.pos[0], def.pos[1], def.pos[2]);
      boxLine.rotation.y = def.yaw;

      const centerDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 8),
        new THREE.MeshBasicMaterial({ color: def.color })
      );
      boxLine.add(centerDot);

      cuboidGroup.add(boxLine);
    });

    // 10. Pointer Drag & Parallax Controls
    const mouse = new THREE.Vector2(0, 0);
    const targetCameraPos = new THREE.Vector3(0, 0.15, 9.4);

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -((clientY - rect.top) / rect.height) * 2 + 1;

      mouse.x = normX;
      mouse.y = normY;

      // Update motion values for distant text parallax
      mouseX.set(normX);
      mouseY.set(normY);

      // Camera parallax
      targetCameraPos.x = normX * 0.45;
      targetCameraPos.y = 0.15 + normY * 0.3;

      // Drag to spin cylinder
      if (isDraggingRef.current) {
        const deltaX = clientX - prevPointerPosRef.current.x;
        pointerVelocityRef.current = deltaX * 0.0055;
        targetRotationYRef.current += pointerVelocityRef.current;
        prevPointerPosRef.current = { x: clientX, y: clientY };
      }
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevPointerPosRef.current = { x: clientX, y: clientY };
      soundFx.playClick();
    };

    const onPointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        const currentRot = targetRotationYRef.current;
        const rawIndex = -currentRot / angleStep;
        const closestIndex = ((Math.round(rawIndex) % panelCount) + panelCount) % panelCount;
        setActiveSlideIndex(closestIndex);
        targetRotationYRef.current = -Math.round(rawIndex) * angleStep;
      }
    };

    const raycaster = new THREE.Raycaster();
    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(panelsRef.current);
      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const hitIndex = hitMesh.userData.index;
        goToSlide(hitIndex);
        soundFx.playLock();
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("click", onClick);

    // 11. Responsive resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      if (w < 768) {
        camera.position.z = 12.0;
        targetCameraPos.z = 12.0;
      } else {
        camera.position.z = 9.4;
        targetCameraPos.z = 9.4;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // 12. Silky Smooth 60FPS Render Loop
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = 0;
    let autoSlideTimer = 0;

    const animate = (time: number) => {
      animFrameRef.current = requestAnimationFrame(animate);

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // FPS Tracking
      frameCount++;
      fpsTimer += delta;
      if (fpsTimer >= 1.0) {
        setFps(Math.round(frameCount / fpsTimer));
        frameCount = 0;
        fpsTimer = 0;
      }

      // Auto-slide transition timer (4.8s per slide)
      if (isAutoOrbitRef.current && !isDraggingRef.current && !isHoveredRef.current) {
        autoSlideTimer += delta;
        if (autoSlideTimer >= 4.8) {
          autoSlideTimer = 0;
          const nextIdx = (activeSlideIndexRef.current + 1) % panelCount;
          setActiveSlideIndex(nextIdx);
          targetRotationYRef.current = -nextIdx * angleStep;
        }
      } else {
        autoSlideTimer = 0;
      }

      // Camera parallax interpolation
      camera.position.x += (targetCameraPos.x - camera.position.x) * 0.05;
      camera.position.y += (targetCameraPos.y - camera.position.y) * 0.05;
      camera.lookAt(0, 0.05, 0);

      // Rotate background particle field and laser radar ring
      pointCloud.rotation.y += 0.0007;
      scanRing.rotation.z += 0.02;

      // Smooth continuous exponential interpolation of cylinder rotation
      if (cylinderGroupRef.current) {
        currentRotationYRef.current = THREE.MathUtils.lerp(
          currentRotationYRef.current,
          targetRotationYRef.current,
          0.052
        );
        cylinderGroupRef.current.rotation.y = currentRotationYRef.current;

        // Smooth panel scaling & depth fading based on orientation
        const currentRot = currentRotationYRef.current;
        panelsRef.current.forEach((panel, i) => {
          const panelBaseAngle = panel.userData.baseAngle;
          let relativeAngle = (panelBaseAngle + currentRot) % (Math.PI * 2);
          if (relativeAngle < -Math.PI) relativeAngle += Math.PI * 2;
          if (relativeAngle > Math.PI) relativeAngle -= Math.PI * 2;

          const facingFactor = (Math.cos(relativeAngle) + 1) / 2; // 0 to 1
          const isFrontSlide = Math.abs(relativeAngle) < angleStep * 0.55;

          const targetScale = isFrontSlide ? 1.24 : 0.92 + facingFactor * 0.12;
          panel.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

          const targetOpacity = isFrontSlide ? 1.0 : 0.42 + facingFactor * 0.45;
          const mat = panel.material as THREE.MeshStandardMaterial;
          mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.08);

          const edge = edgeLinesRef.current[i];
          if (edge) {
            const edgeMat = edge.material as THREE.LineBasicMaterial;
            const targetEdgeOpacity = isFrontSlide ? 0.95 : 0.25;
            edgeMat.opacity = THREE.MathUtils.lerp(edgeMat.opacity, targetEdgeOpacity, 0.08);
          }
        });
      }

      // Float wireframe cuboids
      cuboidGroup.children.forEach((child, i) => {
        child.position.y += Math.sin(time * 0.002 + i) * 0.0012;
        child.rotation.y += 0.0025;
      });

      renderer.render(scene, camera);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("click", onClick);

      pointsGeometry.dispose();
      pointsMaterial.dispose();
      panelGeom.dispose();
      scanRingGeom.dispose();
      scanRingMat.dispose();

      panels.forEach((p) => {
        if (p.material instanceof THREE.Material) p.material.dispose();
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [panelCount, angleStep, goToSlide, mouseX, mouseY]);

  const currentProject: GalleryProject = GALLERY_PROJECTS[activeSlideIndex] || GALLERY_PROJECTS[0];

  return (
    <div
      className="relative w-full min-h-[100svh] overflow-hidden bg-black select-none flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ========================================================================= */}
      {/* LAYER 1: MONUMENTAL STATIC TITLE IN THE VERY DISTANT BACKGROUND          */}
      {/* (Renders BEHIND the animated 3D images with authentic spatial parallax)   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-[1] pointer-events-none flex flex-col items-center justify-center text-center px-4 overflow-hidden select-none">
        {/* Distant Radial Cyber Glow */}
        <div className="absolute w-[900px] h-[550px] bg-primary/15 rounded-full blur-[170px] pointer-events-none -translate-y-4" />
        <div className="absolute w-[600px] h-[400px] bg-secondary/15 rounded-full blur-[150px] pointer-events-none translate-y-20" />

        {/* Parallax Ethereal Title */}
        <motion.div
          style={{ x: textParallaxX, y: textParallaxY }}
          className="flex flex-col items-center max-w-7xl w-full -translate-y-4 sm:-translate-y-6"
        >
          {/* Cyber Identity Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-label-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-4 shadow-[0_0_20px_rgba(0,212,255,0.2)]"
          >
            <span className="relative w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(34,197,94,0.9)]">
              <span className="absolute inset-0 rounded-full bg-tertiary animate-ping opacity-75" />
            </span>
            EVERLYN LINDA • 3D COMPUTER VISION & SENSOR ANNOTATION
          </motion.div>

          {/* Distant Monumental Statement (Clearly Visible In The Deep Background) */}
          <h1 className="font-display font-black text-[8.5vw] sm:text-[8vw] lg:text-[7.2vw] tracking-tighter uppercase leading-[0.88] text-white/40 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            ACTIONS SPEAK LOUDER
          </h1>
          <h2 className="font-display font-black text-[7.2vw] sm:text-[6.8vw] lg:text-[6vw] tracking-tight uppercase leading-[0.92] text-transparent bg-clip-text bg-gradient-to-r from-primary/75 via-white/70 to-primary/75 drop-shadow-[0_0_50px_rgba(0,212,255,0.35)] mt-1">
            PRECISION IN MOTION
          </h2>

          {/* Distant Ontological Spec Ticker */}
          <p className="mt-4 font-label-mono text-[10px] sm:text-xs text-white/45 tracking-[0.28em] uppercase max-w-3xl">
            3D LiDAR Point Clouds • 9-DOF Cuboids • Sub-Pixel Semantic Masks • 99.8% Ground Truth
          </p>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* LAYER 2: 3D THREE.JS WEBGL VIEWPORT (Renders IN FRONT of distant title)   */}
      {/* ========================================================================= */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-[2] cursor-grab active:cursor-grabbing"
      />

      {/* ──── Subtle Atmospheric Depth Vignette ──── */}
      <div className="absolute inset-0 pointer-events-none bg-radial-[ellipse_at_center,_transparent_40%,_rgba(10,15,17,0.7)_100%] z-[3]" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/85 z-[3]" />

      {/* ──── Cyber Scanline ──── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-[3]">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-[sh-scanDown_5s_linear_infinite]" />
      </div>

      {/* ========================================================================= */}
      {/* LAYER 3: FOREGROUND AUGMENTED OPTICS HUD (Frames the active 3D card)      */}
      {/* ========================================================================= */}
      <div className="relative z-[10] w-full max-w-4xl mx-auto px-4 pointer-events-none flex flex-col items-center mt-auto mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            {/* Optics Reticle Label */}
            <div className="flex items-center gap-2.5 font-label-mono text-[10px] sm:text-xs text-primary tracking-widest uppercase mb-1 drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
              <span className="text-white/50">DATASET 0{activeSlideIndex + 1} / 0{panelCount}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded border border-primary/40 bg-black/60 backdrop-blur-md">
                {currentProject.categoryLabel}
              </span>
              <span>•</span>
              <span className="text-tertiary">QA VERIFIED (99.8%)</span>
            </div>

            {/* Active Project Title */}
            <h3 className="font-display text-lg sm:text-2xl font-bold text-white tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.95)]">
              {currentProject.title}
            </h3>

            {/* Floating Class Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
              {currentProject.classes.map((cls) => (
                <span
                  key={cls.name}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/70 border border-white/20 text-[10px] font-label-mono text-white backdrop-blur-md"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: cls.color }}
                  />
                  <span>{cls.name}</span>
                  <span className="text-white/40">({cls.count})</span>
                </span>
              ))}
            </div>

            {/* Telemetry Ticker */}
            <div className="flex items-center gap-3 sm:gap-6 mt-2.5 font-label-mono text-[10px] sm:text-xs text-white/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              <span>IoU ACCURACY: <strong className="text-primary font-bold">{currentProject.iouScore}</strong></span>
              <span>•</span>
              <span>CONFIDENCE: <strong className="text-tertiary font-bold">{currentProject.confidence}</strong></span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">POINTS: <strong className="text-white">{currentProject.pointCount || currentProject.polygonCount}</strong></span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* SIDE CHEVRONS: SMOOTH GLIDE NAVIGATION                                    */}
      {/* ========================================================================= */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-[20] w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-black/85 border border-white/20 hover:border-primary/60 text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-2xl cursor-pointer"
        aria-label="Previous Dataset"
      >
        <span className="material-symbols-outlined text-2xl">chevron_left</span>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-[20] w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-black/85 border border-white/20 hover:border-primary/60 text-white/80 hover:text-white flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-2xl cursor-pointer"
        aria-label="Next Dataset"
      >
        <span className="material-symbols-outlined text-2xl">chevron_right</span>
      </button>

      {/* ========================================================================= */}
      {/* LAYER 4: STREAMLINED BOTTOM ACTION & PROGRESS DOCK                         */}
      {/* ========================================================================= */}
      <footer className="relative z-[20] w-full pb-8 sm:pb-10 px-4 flex flex-col items-center gap-3">
        {/* 9 Slide Progress Pagination Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl">
          {GALLERY_PROJECTS.map((proj, i) => {
            const isActive = i === activeSlideIndex;
            return (
              <button
                key={proj.id}
                onClick={() => goToSlide(i)}
                className={`relative h-2 rounded-full transition-all duration-500 cursor-pointer overflow-hidden ${
                  isActive
                    ? "w-8 bg-primary/30 border border-primary shadow-[0_0_12px_rgba(0,212,255,0.7)]"
                    : "w-2 bg-white/20 hover:bg-white/40 border border-transparent"
                }`}
                title={proj.title}
                aria-label={`Go to ${proj.title}`}
              >
                {isActive && isAutoOrbit && !isHovered && (
                  <span className="absolute inset-0 bg-primary animate-[barSlide_4.8s_linear_infinite]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Minimalist Action Dock */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 rounded-full bg-black/65 border border-white/15 backdrop-blur-2xl shadow-2xl">
          {/* Direct Anchor to Interactive Studio */}
          <a
            href="#interactive-studio"
            className="group px-5 py-2 rounded-full bg-primary text-on-primary font-label-mono text-xs uppercase tracking-wider font-bold flex items-center gap-2 hover:shadow-[0_0_25px_rgba(0,212,255,0.5)] transition-all cursor-pointer"
          >
            <span>Test 3D Workbench</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-y-0.5 transition-transform">
              arrow_downward
            </span>
          </a>

          <Link
            href="/contact"
            className="px-5 py-2 rounded-full border border-white/20 text-white font-label-mono text-xs uppercase tracking-wider hover:bg-white/10 hover:border-white/40 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Book Consultation</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>

          <span className="w-[1px] h-4 bg-white/20 hidden sm:block" />

          {/* Auto Glide Toggle */}
          <button
            onClick={() => {
              setIsAutoOrbit((prev) => !prev);
              soundFx.playClick();
            }}
            className="px-3 py-1.5 rounded-full text-[11px] font-label-mono uppercase tracking-wider text-white/75 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Toggle Auto Orbit"
          >
            <span className="material-symbols-outlined text-sm">
              {isAutoOrbit ? "pause" : "play_arrow"}
            </span>
            <span className="hidden sm:inline">{isAutoOrbit ? "Auto Orbit" : "Paused"}</span>
          </button>

          {/* SFX Toggle */}
          <button
            onClick={toggleAudio}
            className="px-3 py-1.5 rounded-full text-[11px] font-label-mono uppercase tracking-wider text-white/75 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            title={isAudioMuted ? "Unmute Sound FX" : "Mute Sound FX"}
          >
            <span className="material-symbols-outlined text-sm">
              {isAudioMuted ? "volume_off" : "volume_up"}
            </span>
            <span className="hidden sm:inline">{isAudioMuted ? "Muted" : "SFX On"}</span>
          </button>
        </div>

        {/* Drag Hint */}
        <div className="flex items-center gap-2 text-[10px] font-label-mono text-white/40 uppercase tracking-widest mt-1">
          <span className="material-symbols-outlined text-xs">touch_app</span>
          <span>DRAG TO ROTATE 3D SPHERE // {fps} FPS</span>
        </div>
      </footer>

      {/* ──── Corner Optics Brackets ──── */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-primary/40 pointer-events-none z-[10]" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-primary/40 pointer-events-none z-[10]" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-primary/40 pointer-events-none z-[10]" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-primary/40 pointer-events-none z-[10]" />
    </div>
  );
}
