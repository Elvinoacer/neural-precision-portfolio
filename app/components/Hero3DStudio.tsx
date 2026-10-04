"use client";

import React, { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { soundFx } from "../utils/soundEffects";

export interface Hero3DStudioProps {
  onSelectProject?: (projectId: string) => void;
}

interface FlagshipMode {
  id: string;
  name: string;
  shortLabel: string;
  mobileLabel: string;
  projectId: string;
  image: string;
  aspectRatio: number;
  tagline: string;
  sensor: string;
  iouScore: string;
  confidence: string;
  accentColor: string;
  threeColor: number;
  badge: string;
  classes: { name: string; color: string }[];
}

const FLAGSHIP_MODES: FlagshipMode[] = [
  {
    id: "3d-lidar",
    name: "3D LiDAR Point Cloud",
    shortLabel: "3D LiDAR",
    mobileLabel: "3D LiDAR",
    projectId: "lidar-multi-object",
    image: "/gallery/3d-lidar/multi-object-detection.png",
    aspectRatio: 2.99,
    tagline: "128-Beam spatial point cloud segmentation with 9-DOF cuboid fitting",
    sensor: "Velodyne Alpha Prime 128-Beam LiDAR",
    iouScore: "99.2%",
    confidence: "99.8%",
    accentColor: "#00d4ff",
    threeColor: 0x00d4ff,
    badge: "128-BEAM SENSOR",
    classes: [
      { name: "Vehicle 3D", color: "#00d4ff" },
      { name: "Pedestrian", color: "#ffb400" },
      { name: "Barrier", color: "#f43f5e" },
    ],
  },
  {
    id: "semantic",
    name: "Dense Semantic Segmentation",
    shortLabel: "Semantic Mask",
    mobileLabel: "Semantic",
    projectId: "seg-intersection",
    image: "/gallery/2d-segmentation/urban-intersection.png",
    aspectRatio: 1.71,
    tagline: "Sub-pixel polygon contours and 100% full-frame pixel ontology classification",
    sensor: "Stereo 8MP HDR Vision Sensor",
    iouScore: "99.5%",
    confidence: "99.9%",
    accentColor: "#10b981",
    threeColor: 0x10b981,
    badge: "SUB-PIXEL PRECISION",
    classes: [
      { name: "Roadway", color: "#10b981" },
      { name: "Sidewalk", color: "#38bdf8" },
      { name: "Dynamic Vehicle", color: "#f59e0b" },
    ],
  },
  {
    id: "cuboids",
    name: "9-DOF Oriented Cuboids",
    shortLabel: "9-DOF Cuboids",
    mobileLabel: "9-DOF",
    projectId: "lidar-vehicle-detection",
    image: "/gallery/3d-lidar/vehicle-detection.png",
    aspectRatio: 2.92,
    tagline: "Highway obstacle yaw vectors, distance tracking & velocity bounding",
    sensor: "HESAI Pandar 64-Channel + Multi-Cam",
    iouScore: "99.4%",
    confidence: "99.9%",
    accentColor: "#a855f7",
    threeColor: 0xa855f7,
    badge: "9-DOF GROUND TRUTH",
    classes: [
      { name: "Truck / Heavy", color: "#a855f7" },
      { name: "Passenger Car", color: "#00d4ff" },
      { name: "Guardrail", color: "#64748b" },
    ],
  },
];

const emptySubscribe = () => () => {};

function getWebGLSnapshot(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

function getWebGLServerSnapshot(): boolean {
  return true;
}

type CameraViewMode = "orbit" | "bev" | "front";

export default function Hero3DStudio({ onSelectProject }: Hero3DStudioProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const isWebGLSupported = useSyncExternalStore(emptySubscribe, getWebGLSnapshot, getWebGLServerSnapshot);
  const [rendererFailed, setRendererFailed] = useState<boolean>(false);
  const webGlSupported = isWebGLSupported && !rendererFailed;

  const [activeModeIndex, setActiveModeIndex] = useState<number>(0);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [cameraView, setCameraView] = useState<CameraViewMode>("orbit");

  const activeFlagship = FLAGSHIP_MODES[activeModeIndex];

  // Three.js mutable state refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const planeMeshRef = useRef<THREE.Mesh | null>(null);
  const scanlineMeshRef = useRef<THREE.Mesh | null>(null);
  const cuboidGroupRef = useRef<THREE.Group | null>(null);
  const secondaryCuboidRef = useRef<THREE.Group | null>(null);
  const boxLineRef = useRef<THREE.LineSegments | null>(null);
  const boxVisualGroupRef = useRef<THREE.Group | null>(null);
  const headingArrowRef = useRef<THREE.ArrowHelper | null>(null);
  const laserSweepGroupRef = useRef<THREE.Group | null>(null);
  const sweepFanMeshRef = useRef<THREE.Mesh | null>(null);
  const sweepLineRef = useRef<THREE.Line | null>(null);
  const emitterMeshRef = useRef<THREE.Mesh | null>(null);
  const turretHeadRef = useRef<THREE.Mesh | null>(null);
  const pointsMeshRef = useRef<THREE.Points | null>(null);
  const texturesRef = useRef<Record<string, THREE.Texture>>({});

  // Dynamic aspect ratio scaling refs
  const initialModeAspect = FLAGSHIP_MODES[0].aspectRatio;
  const initialPlaneScaleY = (3.5 / initialModeAspect) / 1.98;
  const initialBoxScaleY = ((3.5 / initialModeAspect) + 0.22) / 2.05;
  const targetPlaneScaleYRef = useRef<number>(initialPlaneScaleY);
  const currentPlaneScaleYRef = useRef<number>(initialPlaneScaleY);
  const targetBoxScaleYRef = useRef<number>(initialBoxScaleY);
  const currentBoxScaleYRef = useRef<number>(initialBoxScaleY);

  // Interaction & rotation tracking (pure refs, initialized to 0)
  const targetRotYRef = useRef<number>(0);
  const targetRotXRef = useRef<number>(0.05);
  const currentRotYRef = useRef<number>(0);
  const currentRotXRef = useRef<number>(0.05);
  const targetCamPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.45, 7.4));
  const mouseParallaxRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const pointerStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastActiveTimeRef = useRef<number>(0);

  // Switch flagship mode
  const handleSelectMode = useCallback(
    (index: number) => {
      setActiveModeIndex(index);
      const targetMode = FLAGSHIP_MODES[index];

      // Update aspect ratio targets for smooth visual morphing
      targetPlaneScaleYRef.current = (3.5 / targetMode.aspectRatio) / 1.98;
      targetBoxScaleYRef.current = ((3.5 / targetMode.aspectRatio) + 0.22) / 2.05;

      // Update Three.js materials
      if (planeMeshRef.current && texturesRef.current[targetMode.id]) {
        const mat = planeMeshRef.current.material as THREE.MeshBasicMaterial;
        mat.map = texturesRef.current[targetMode.id];
        mat.needsUpdate = true;
      }

      if (boxLineRef.current) {
        (boxLineRef.current.material as THREE.LineBasicMaterial).color.setHex(targetMode.threeColor);
      }

      if (headingArrowRef.current) {
        headingArrowRef.current.setColor(targetMode.threeColor);
      }

      if (sweepFanMeshRef.current) {
        (sweepFanMeshRef.current.material as THREE.MeshBasicMaterial).color.setHex(targetMode.threeColor);
      }

      if (sweepLineRef.current) {
        (sweepLineRef.current.material as THREE.LineBasicMaterial).color.setHex(targetMode.threeColor);
      }

      if (emitterMeshRef.current) {
        (emitterMeshRef.current.material as THREE.MeshBasicMaterial).color.setHex(targetMode.threeColor);
      }

      // Show/hide secondary obstacle cuboid in 9-DOF mode
      if (secondaryCuboidRef.current) {
        secondaryCuboidRef.current.visible = targetMode.id === "cuboids";
      }

      soundFx.playSwitch();

      if (onSelectProject) {
        onSelectProject(targetMode.projectId);
      }
    },
    [onSelectProject]
  );

  // Switch Camera Viewpoint
  const handleSetCameraView = (view: CameraViewMode) => {
    setCameraView(view);
    soundFx.playClick();

    if (view === "orbit") {
      targetCamPosRef.current.set(0, 0.45, 7.4);
      targetRotXRef.current = 0.05;
    } else if (view === "bev") {
      targetCamPosRef.current.set(0, 6.8, 2.2);
      targetRotXRef.current = 1.15;
    } else if (view === "front") {
      targetCamPosRef.current.set(0, -0.2, 5.2);
      targetRotXRef.current = -0.05;
    }
  };

  // Toggle audio
  const toggleAudio = () => {
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);
    soundFx.isMuted = nextMuted;
    if (!nextMuted) {
      soundFx.playClick();
    }
  };

  // Launch Workbench downstream handler
  const handleLaunchWorkbench = () => {
    soundFx.playClick();
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("launch-workbench", {
          detail: { projectId: activeFlagship.projectId },
        })
      );
    }
    if (onSelectProject) {
      onSelectProject(activeFlagship.projectId);
    }
  };

  // Handle pointer parallax over hero
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      mouseParallaxRef.current = { x: x * 2, y: y * 2 };
    }
  };

  // Setup Three.js scene with bulletproof fallback
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    lastActiveTimeRef.current = performance.now();

    if (!isWebGLSupported) {
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    const originalConsoleError = console.error;
    try {
      console.error = (...args: unknown[]) => {
        const msg = String(args[0] || "");
        if (msg.includes("THREE.WebGLRenderer") || msg.includes("WebGL context")) {
          return;
        }
        originalConsoleError(...args);
      };

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
    } catch {
      renderer = null;
    } finally {
      console.error = originalConsoleError;
    }

    if (!renderer) {
      queueMicrotask(() => {
        setRendererFailed(true);
      });
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.45, 7.4);
    cameraRef.current = camera;

    // 2. Configure Renderer
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const cyanDir = new THREE.DirectionalLight(0x00d4ff, 1.4);
    cyanDir.position.set(5, 7, 6);
    scene.add(cyanDir);

    const violetDir = new THREE.DirectionalLight(0x7c3aed, 1.1);
    violetDir.position.set(-6, -3, -5);
    scene.add(violetDir);

    const centerGlow = new THREE.PointLight(0x00d4ff, 1.6, 14);
    centerGlow.position.set(0, 1.2, 2.5);
    scene.add(centerGlow);

    // 4. Root Rotatable Group
    const rootGroup = new THREE.Group();
    rootGroupRef.current = rootGroup;
    scene.add(rootGroup);

    // 5. Polar Ground Radar & Concentric Distance Rings
    const grid = new THREE.GridHelper(14, 22, 0x00d4ff, 0x1e293b);
    grid.position.y = -1.6;
    if (grid.material instanceof THREE.Material) {
      grid.material.transparent = true;
      grid.material.opacity = 0.22;
    }
    rootGroup.add(grid);

    const ringsGroup = new THREE.Group();
    ringsGroup.position.y = -1.59;
    const ringConfigs = [
      { r: 2.2, color: 0x00d4ff, opacity: 0.45 },
      { r: 4.2, color: 0x10b981, opacity: 0.35 },
      { r: 6.2, color: 0xa855f7, opacity: 0.3 },
    ];
    ringConfigs.forEach(({ r, color, opacity }) => {
      const ringGeom = new THREE.RingGeometry(r - 0.02, r + 0.02, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringsGroup.add(ringMesh);
    });
    rootGroup.add(ringsGroup);

    const initialMode = FLAGSHIP_MODES[0];

    // 6. Dynamic Rotating 360° LiDAR Laser Sweep
    const laserSweepGroup = new THREE.Group();
    laserSweepGroup.position.y = -1.58;
    laserSweepGroupRef.current = laserSweepGroup;

    const sweepFanGeom = new THREE.RingGeometry(0.3, 6.2, 32, 1, 0, Math.PI / 3);
    const sweepFanMat = new THREE.MeshBasicMaterial({
      color: initialMode.threeColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const sweepFanMesh = new THREE.Mesh(sweepFanGeom, sweepFanMat);
    sweepFanMesh.rotation.x = Math.PI / 2;
    sweepFanMeshRef.current = sweepFanMesh;
    laserSweepGroup.add(sweepFanMesh);

    const sweepLineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(Math.cos(Math.PI / 3) * 6.2, 0, Math.sin(Math.PI / 3) * 6.2),
    ]);
    const sweepLineMat = new THREE.LineBasicMaterial({
      color: initialMode.threeColor,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const sweepLine = new THREE.Line(sweepLineGeom, sweepLineMat);
    sweepLineRef.current = sweepLine;
    laserSweepGroup.add(sweepLine);
    rootGroup.add(laserSweepGroup);

    // 7. Sensor Turret in Center
    const turretGroup = new THREE.Group();
    turretGroup.position.set(0, -1.6, 0);

    const baseGeom = new THREE.CylinderGeometry(0.32, 0.42, 0.24, 24);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.25,
    });
    const turretBase = new THREE.Mesh(baseGeom, baseMat);
    turretBase.position.y = 0.12;
    turretGroup.add(turretBase);

    const headGeom = new THREE.CylinderGeometry(0.28, 0.28, 0.36, 24);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.2,
    });
    const turretHead = new THREE.Mesh(headGeom, headMat);
    turretHead.position.y = 0.42;
    turretHeadRef.current = turretHead;
    turretGroup.add(turretHead);

    const emitterGeom = new THREE.CylinderGeometry(0.285, 0.285, 0.08, 24);
    const emitterMat = new THREE.MeshBasicMaterial({
      color: initialMode.threeColor,
      transparent: true,
      opacity: 0.9,
    });
    const emitterMesh = new THREE.Mesh(emitterGeom, emitterMat);
    emitterMesh.position.y = 0.42;
    emitterMeshRef.current = emitterMesh;
    turretGroup.add(emitterMesh);

    rootGroup.add(turretGroup);

    // 8. Volumetric LiDAR Point Cloud (realistic autonomous vehicle scan patterns)
    const particleCount = 2800;
    const ptPositions = new Float32Array(particleCount * 3);
    const ptColors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x00d4ff);
    const colorEmerald = new THREE.Color(0x10b981);
    const colorPurple = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const angle = (i / particleCount) * Math.PI * 32 + (Math.random() - 0.5) * 0.15;
      const ringTier = i % 14;
      const dist = 1.0 + ringTier * 0.38 + (Math.random() - 0.5) * 0.2;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;
      const y = -1.56 + (ringTier > 8 ? (Math.random() - 0.5) * 0.4 : (Math.random() - 0.5) * 0.1);

      ptPositions[idx] = x;
      ptPositions[idx + 1] = y;
      ptPositions[idx + 2] = z;

      let c = colorCyan;
      if (dist > 4.2) {
        c = colorPurple;
      } else if (dist > 2.4) {
        c = colorEmerald;
      }

      ptColors[idx] = c.r;
      ptColors[idx + 1] = c.g;
      ptColors[idx + 2] = c.b;
    }

    const ptGeometry = new THREE.BufferGeometry();
    ptGeometry.setAttribute("position", new THREE.BufferAttribute(ptPositions, 3));
    ptGeometry.setAttribute("color", new THREE.BufferAttribute(ptColors, 3));

    const ptMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const pointsMesh = new THREE.Points(ptGeometry, ptMaterial);
    pointsMeshRef.current = pointsMesh;
    rootGroup.add(pointsMesh);

    // 9. Primary 3D Oriented Bounding Cuboid (9-DOF Box)
    const cuboidGroup = new THREE.Group();
    cuboidGroup.position.set(0, 0.32, 0);
    cuboidGroupRef.current = cuboidGroup;

    const boxVisualGroup = new THREE.Group();
    boxVisualGroupRef.current = boxVisualGroup;

    const boxGeom = new THREE.BoxGeometry(3.6, 2.05, 1.25);
    const boxEdges = new THREE.EdgesGeometry(boxGeom);
    const boxMat = new THREE.LineBasicMaterial({
      color: initialMode.threeColor,
      transparent: true,
      opacity: 0.88,
      linewidth: 2,
    });
    const boxLine = new THREE.LineSegments(boxEdges, boxMat);
    boxLineRef.current = boxLine;
    boxVisualGroup.add(boxLine);

    // Heading arrow on top
    const arrowDir = new THREE.Vector3(0, 0, -1);
    const arrowOrigin = new THREE.Vector3(0, 1.05 * currentBoxScaleYRef.current, 0);
    const headingArrow = new THREE.ArrowHelper(arrowDir, arrowOrigin, 0.75, initialMode.threeColor, 0.22, 0.12);
    headingArrowRef.current = headingArrow;
    cuboidGroup.add(headingArrow);

    // Corner crosshair brackets helper
    const bracketGeom = new THREE.BufferGeometry();
    const bracketMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
    });
    const bLines: THREE.Vector3[] = [];
    const hs = { x: 1.8, y: 1.025, z: 0.625 };
    const bLen = 0.2;
    [-1, 1].forEach((sx) => {
      [-1, 1].forEach((sy) => {
        [-1, 1].forEach((sz) => {
          const corner = new THREE.Vector3(sx * hs.x, sy * hs.y, sz * hs.z);
          bLines.push(corner, corner.clone().add(new THREE.Vector3(-sx * bLen, 0, 0)));
          bLines.push(corner, corner.clone().add(new THREE.Vector3(0, -sy * bLen, 0)));
          bLines.push(corner, corner.clone().add(new THREE.Vector3(0, 0, -sz * bLen)));
        });
      });
    });
    bracketGeom.setFromPoints(bLines);
    const bracketsMesh = new THREE.LineSegments(bracketGeom, bracketMat);
    boxVisualGroup.add(bracketsMesh);

    boxVisualGroup.scale.set(1, currentBoxScaleYRef.current, 1);
    cuboidGroup.add(boxVisualGroup);

    // Secondary Obstacle Cuboid (Visible in 9-DOF Mode)
    const secondaryCuboid = new THREE.Group();
    secondaryCuboid.position.set(2.8, -0.6, -1.8);
    secondaryCuboid.rotation.y = -0.35;
    const secBoxGeom = new THREE.BoxGeometry(1.6, 1.2, 1.0);
    const secBoxEdges = new THREE.EdgesGeometry(secBoxGeom);
    const secBoxMat = new THREE.LineBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.65,
    });
    const secLine = new THREE.LineSegments(secBoxEdges, secBoxMat);
    secondaryCuboid.add(secLine);
    secondaryCuboid.visible = false;
    secondaryCuboidRef.current = secondaryCuboid;
    rootGroup.add(secondaryCuboid);

    // 10. Featured Hologram Projection Plane & 3D Structure
    const textureLoader = new THREE.TextureLoader();
    const loadedTextures: Record<string, THREE.Texture> = {};

    FLAGSHIP_MODES.forEach((m) => {
      const tex = textureLoader.load(m.image, () => {
        if (planeMeshRef.current) {
          const mat = planeMeshRef.current.material as THREE.MeshBasicMaterial;
          mat.needsUpdate = true;
        }
      });
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      loadedTextures[m.id] = tex;
    });
    texturesRef.current = loadedTextures;

    // 3D Vehicle Wireframe Skeleton inside Cuboid
    const vehicleGroup = new THREE.Group();
    const chassisGeom = new THREE.BoxGeometry(2.5, 0.58, 1.15);
    const chassisEdges = new THREE.EdgesGeometry(chassisGeom);
    const vehicleMat = new THREE.LineBasicMaterial({
      color: initialMode.threeColor,
      transparent: true,
      opacity: 0.5,
    });
    const chassisLine = new THREE.LineSegments(chassisEdges, vehicleMat);
    chassisLine.position.y = -0.3;
    vehicleGroup.add(chassisLine);

    const cabinGeom = new THREE.BoxGeometry(1.5, 0.48, 1.05);
    const cabinEdges = new THREE.EdgesGeometry(cabinGeom);
    const cabinLine = new THREE.LineSegments(cabinEdges, vehicleMat);
    cabinLine.position.set(-0.15, 0.22, 0);
    vehicleGroup.add(cabinLine);

    const wheelGeom = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 12);
    const wheelEdges = new THREE.EdgesGeometry(wheelGeom);
    [
      [-0.75, -0.5, 0.56],
      [0.75, -0.5, 0.56],
      [-0.75, -0.5, -0.56],
      [0.75, -0.5, -0.56],
    ].forEach(([wx, wy, wz]) => {
      const wheelLine = new THREE.LineSegments(wheelEdges, vehicleMat);
      wheelLine.position.set(wx, wy, wz);
      wheelLine.rotation.x = Math.PI / 2;
      vehicleGroup.add(wheelLine);
    });
    cuboidGroup.add(vehicleGroup);

    const planeGeom = new THREE.PlaneGeometry(3.5, 1.98);
    const planeMat = new THREE.MeshBasicMaterial({
      map: loadedTextures[initialMode.id],
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
    });
    const hologramPlane = new THREE.Mesh(planeGeom, planeMat);
    hologramPlane.position.set(0, 0, 0.05);
    hologramPlane.scale.set(1, currentPlaneScaleYRef.current, 1);
    planeMeshRef.current = hologramPlane;
    cuboidGroup.add(hologramPlane);

    // Animated vertical scanline on the hologram plane
    const scanlineGeom = new THREE.PlaneGeometry(3.5, 0.035);
    const scanlineMat = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const scanlineMesh = new THREE.Mesh(scanlineGeom, scanlineMat);
    scanlineMesh.position.set(0, 0, 0.03);
    scanlineMeshRef.current = scanlineMesh;
    hologramPlane.add(scanlineMesh);

    rootGroup.add(cuboidGroup);

    // 11. Animation Loop
    let animId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      const delta = Math.min((time - lastTime) * 0.001, 0.1);
      lastTime = time;

      // Smooth camera position transition
      if (cameraRef.current) {
        cameraRef.current.position.lerp(targetCamPosRef.current, delta * 3.5);
      }

      // Rotate LiDAR laser sweep fan & turret head
      if (laserSweepGroupRef.current) {
        laserSweepGroupRef.current.rotation.y -= 1.8 * delta;
      }
      if (turretHeadRef.current) {
        turretHeadRef.current.rotation.y -= 1.8 * delta;
      }

      // Vertical scanline pulse on the hologram
      if (scanlineMeshRef.current) {
        scanlineMeshRef.current.position.y = Math.sin(time * 0.0025) * 0.92;
      }

      // Smoothly morph box & plane aspect ratio to match selected mode
      currentPlaneScaleYRef.current += (targetPlaneScaleYRef.current - currentPlaneScaleYRef.current) * 0.15;
      currentBoxScaleYRef.current += (targetBoxScaleYRef.current - currentBoxScaleYRef.current) * 0.15;

      if (planeMeshRef.current) {
        planeMeshRef.current.scale.set(1, currentPlaneScaleYRef.current, 1);
      }
      if (boxVisualGroupRef.current) {
        boxVisualGroupRef.current.scale.set(1, currentBoxScaleYRef.current, 1);
      }
      if (headingArrowRef.current) {
        headingArrowRef.current.position.y = 1.05 * currentBoxScaleYRef.current;
      }

      // Gentle floating bob
      if (cuboidGroupRef.current) {
        cuboidGroupRef.current.position.y = 0.32 + Math.sin(time * 0.0016) * 0.05;
      }

      // Orbit control & auto-rotation
      if (isDraggingRef.current) {
        currentRotYRef.current += (targetRotYRef.current - currentRotYRef.current) * 0.2;
        currentRotXRef.current += (targetRotXRef.current - currentRotXRef.current) * 0.2;
      } else {
        const timeSinceActive = performance.now() - lastActiveTimeRef.current;
        if (timeSinceActive > 1200) {
          targetRotYRef.current += 0.25 * delta;
          currentRotYRef.current += 0.25 * delta;
          currentRotXRef.current += (0.05 - currentRotXRef.current) * 0.05;
        }
      }

      // Cursor Parallax tilt
      const px = mouseParallaxRef.current.x * 0.18;
      const py = -mouseParallaxRef.current.y * 0.12;

      rootGroup.rotation.y = currentRotYRef.current + px;
      rootGroup.rotation.x = THREE.MathUtils.clamp(currentRotXRef.current + py, -0.4, 0.4);

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // 12. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (nw === 0 || nh === 0) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    window.addEventListener("resize", handleResize);

    // 13. Pointer Drag Listeners (Non-blocking on mobile vertical scrolls)
    let pointerDownCoord = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownCoord = { x: e.clientX, y: e.clientY };
      pointerStartPosRef.current = { x: e.clientX, y: e.clientY };

      // Mouse drag activates immediately, touch verifies horizontal drag
      if (e.pointerType === "mouse") {
        isDraggingRef.current = true;
        setIsDragging(true);
        setHasInteracted(true);
        lastActiveTimeRef.current = performance.now();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" && !isDraggingRef.current) {
        const dx = Math.abs(e.clientX - pointerDownCoord.x);
        const dy = Math.abs(e.clientY - pointerDownCoord.y);
        // Only lock into 3D orbit if horizontal drag is dominant
        if (dx > 12 && dx > dy * 1.5) {
          isDraggingRef.current = true;
          setIsDragging(true);
          setHasInteracted(true);
        }
      }

      if (!isDraggingRef.current) return;
      lastActiveTimeRef.current = performance.now();
      const dx = e.clientX - pointerStartPosRef.current.x;
      const dy = e.clientY - pointerStartPosRef.current.y;
      pointerStartPosRef.current = { x: e.clientX, y: e.clientY };

      targetRotYRef.current += dx * 0.0075;
      targetRotXRef.current += dy * 0.0075;
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      lastActiveTimeRef.current = performance.now();
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // 14. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      domEl.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      grid.geometry.dispose();
      ringsGroup.children.forEach((c) => {
        if (c instanceof THREE.Mesh) {
          c.geometry.dispose();
          if (c.material instanceof THREE.Material) c.material.dispose();
        }
      });
      sweepFanGeom.dispose();
      sweepFanMat.dispose();
      sweepLineGeom.dispose();
      sweepLineMat.dispose();
      baseGeom.dispose();
      baseMat.dispose();
      headGeom.dispose();
      headMat.dispose();
      emitterGeom.dispose();
      emitterMat.dispose();
      ptGeometry.dispose();
      ptMaterial.dispose();
      boxGeom.dispose();
      boxEdges.dispose();
      boxMat.dispose();
      secBoxGeom.dispose();
      secBoxEdges.dispose();
      secBoxMat.dispose();
      bracketGeom.dispose();
      bracketMat.dispose();
      chassisGeom.dispose();
      chassisEdges.dispose();
      cabinGeom.dispose();
      cabinEdges.dispose();
      wheelGeom.dispose();
      wheelEdges.dispose();
      vehicleMat.dispose();
      planeGeom.dispose();
      planeMat.dispose();
      scanlineGeom.dispose();
      scanlineMat.dispose();

      Object.values(loadedTextures).forEach((t) => t.dispose());

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isWebGLSupported]);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100svh] bg-[#070b0e] overflow-hidden flex flex-col justify-center pt-20 pb-12 sm:pt-28 sm:pb-16 lg:py-0 select-none"
    >
      {/* Subtle Atmospheric Lighting Background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/90 via-transparent to-[#070b0e] z-[1]" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[170px] pointer-events-none z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none z-[1]" />
      <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none z-[1]" />

      {/* Main Hero Container */}
      <div className="relative z-[10] w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[calc(100svh-5rem)]">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: CRISP, HIGH-CONTRAST TYPOGRAPHY & CONVERSION CTAs           */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left z-[15] max-w-full"
        >
          {/* Identity & Status Badge - Fully responsive, wraps cleanly */}
          <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary font-label-mono text-[11px] sm:text-xs uppercase tracking-wider mb-5 shadow-[0_0_20px_rgba(0,212,255,0.2)] max-w-full">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
            </span>
            <span className="text-white font-medium shrink-0">EVERLYN LINDA</span>
            <span className="text-white/40 hidden xs:inline">•</span>
            <span className="text-primary font-bold truncate">3D LiDAR & AI ANNOTATION SPECIALIST</span>
          </div>

          {/* Main Headline - High Contrast, Bold, Authoritative */}
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] tracking-tight text-white leading-[1.08] uppercase mb-5 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
            Precision 3D LiDAR <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#60e0ff] to-tertiary">
              & Vision AI Annotation
            </span>
          </h1>

          {/* Subheadline - Crystal Clear Legibility */}
          <p className="font-body-lg text-sm sm:text-base md:text-lg text-slate-200/90 max-w-2xl leading-relaxed mb-7">
            Engineering mission-critical ground truth for autonomous driving, robotics, and spatial AI.
            Specializing in 9-DOF oriented point cloud cuboids, sub-pixel semantic segmentation, and high-integrity dataset operations.
          </p>

          {/* Key Metric Badges - High contrast, non-clipping mobile grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-xl mb-7">
            <div className="p-2.5 sm:p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <div className="text-primary font-display font-bold text-lg sm:text-2xl tracking-tight">
                99.8%
              </div>
              <div className="text-white/80 font-label-mono text-[9px] sm:text-xs uppercase tracking-wider mt-0.5 truncate">
                QA Ground Truth
              </div>
            </div>

            <div className="p-2.5 sm:p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <div className="text-tertiary font-display font-bold text-lg sm:text-2xl tracking-tight">
                9-DOF
              </div>
              <div className="text-white/80 font-label-mono text-[9px] sm:text-xs uppercase tracking-wider mt-0.5 truncate">
                Oriented Cuboids
              </div>
            </div>

            <div className="p-2.5 sm:p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <div className="text-[#c4b5fd] font-display font-bold text-lg sm:text-2xl tracking-tight">
                50,000+
              </div>
              <div className="text-white/80 font-label-mono text-[9px] sm:text-xs uppercase tracking-wider mt-0.5 truncate">
                Annotations
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 w-full">
            <a
              href="#interactive-studio"
              onClick={handleLaunchWorkbench}
              className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-primary hover:bg-[#38dfff] text-black font-label-mono text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-[0_0_25px_rgba(0,212,255,0.45)] hover:shadow-[0_0_35px_rgba(0,212,255,0.7)] transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Explore 3D Studio</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>

            <a
              href="#disciplines"
              onClick={() => soundFx.playClick()}
              className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-label-mono text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 text-secondary shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>8 Disciplines</span>
            </a>

            <Link
              href="/contact"
              onClick={() => soundFx.playClick()}
              className="px-4 sm:px-5 py-3 sm:py-3.5 rounded-full border border-primary/40 hover:border-primary text-primary hover:text-white hover:bg-primary/15 font-label-mono text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-all"
            >
              <span>Hire Specialist</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: FOCUSED 3D HOLOGRAPHIC SPATIAL SHOWCASE                     */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 lg:col-span-6 xl:col-span-5 flex flex-col items-center z-[15] max-w-full"
        >
          {/* Futuristic Stage Card */}
          <div className="w-full relative glass-card rounded-3xl p-3 sm:p-4 border border-white/10 bg-black/60 shadow-[0_10px_50px_rgba(0,0,0,0.8)] flex flex-col gap-3">
            
            {/* Top Minimalist Tab Bar */}
            <div className="flex items-center justify-between gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
              <div className="grid grid-cols-3 gap-1 sm:gap-1.5 w-full">
                {FLAGSHIP_MODES.map((mode, idx) => {
                  const isSelected = idx === activeModeIndex;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => handleSelectMode(idx)}
                      className={`py-1.5 px-1 sm:px-2.5 rounded-xl font-label-mono text-[9px] sm:text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 min-w-0 ${
                        isSelected
                          ? "bg-primary text-black font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)]"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: isSelected ? "#000" : mode.accentColor }}
                      />
                      <span className="hidden sm:inline truncate">{mode.shortLabel}</span>
                      <span className="sm:hidden truncate">{mode.mobileLabel}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sound Toggle */}
              <button
                onClick={toggleAudio}
                className="p-1.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                title={isAudioMuted ? "Enable Sound FX" : "Mute Sound FX"}
                aria-label="Toggle Sound Effects"
              >
                {isAudioMuted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l4-4m0 0l-4-4m4 4H13" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
            </div>

            {/* 3D Three.js Viewport (with touch-action: pan-y to prevent mobile scroll trap) */}
            <div
              className="relative w-full h-[340px] sm:h-[400px] rounded-2xl overflow-hidden bg-black/80 border border-white/10"
              style={{ touchAction: "pan-y" }}
            >
              {/* Three.js canvas mount */}
              <div
                ref={mountRef}
                className={`w-full h-full cursor-grab ${isDragging ? "cursor-grabbing" : ""}`}
              />

              {/* Graceful Fallback Holographic Radar (Rendered if WebGL context creation fails) */}
              {!webGlSupported && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#091017] to-[#04070a]">
                  <div className="relative w-56 h-56 rounded-full border border-primary/40 flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.15)]">
                    {/* Concentric distance rings */}
                    <div className="absolute inset-4 rounded-full border border-primary/25" />
                    <div className="absolute inset-12 rounded-full border border-primary/20" />
                    <div className="absolute inset-20 rounded-full border border-primary/15" />
                    {/* Rotating radar beam */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 to-transparent animate-spin origin-center" />
                    {/* Bounding box wireframe */}
                    <div className="relative z-10 w-28 h-18 border-2 border-primary/80 bg-primary/10 rounded flex flex-col items-center justify-center">
                      <span className="text-white font-label-mono text-[9px] tracking-wider uppercase font-bold">
                        9-DOF CUBOID
                      </span>
                      <span className="text-primary text-[8px] font-label-mono">
                        YAW: +14.2°
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 font-label-mono text-[10px] text-primary/80 uppercase tracking-widest text-center">
                    Holographic LiDAR Radar Active
                  </div>
                </div>
              )}

              {/* Corner Optics Reticle Brackets */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-primary/50 pointer-events-none z-10" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-primary/50 pointer-events-none z-10" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-primary/50 pointer-events-none z-10" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-primary/50 pointer-events-none z-10" />

              {/* Top Sensor Telemetry Pill */}
              <div className="absolute top-3 left-10 right-10 flex items-center justify-between pointer-events-none z-10 font-label-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-primary drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                <span className="px-2 py-0.5 rounded bg-black/70 border border-primary/30 backdrop-blur-md">
                  {activeFlagship.badge}
                </span>
                <span className="text-white/70">
                  IoU: <strong className="text-white">{activeFlagship.iouScore}</strong>
                </span>
              </div>

              {/* Camera Angle Switcher Micro-HUD */}
              <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 bg-black/70 border border-white/10 p-0.5 rounded-lg backdrop-blur-md">
                {(["orbit", "bev", "front"] as CameraViewMode[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => handleSetCameraView(v)}
                    className={`px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-label-mono uppercase tracking-wider transition-colors cursor-pointer ${
                      cameraView === v
                        ? "bg-primary text-black font-bold"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {v === "orbit" ? "3D" : v === "bev" ? "BEV" : "POV"}
                  </button>
                ))}
              </div>

              {/* Interaction Hint (fades out after first drag) */}
              <AnimatePresence>
                {!hasInteracted && webGlSupported && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute inset-x-0 bottom-12 flex justify-center pointer-events-none z-10"
                  >
                    <div className="px-3 py-1 rounded-full bg-black/80 border border-primary/40 text-primary font-label-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md animate-pulse">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>Drag to Orbit 3D</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Minimal Dataset Readout */}
            <div className="px-2 py-1 flex items-center justify-between font-label-mono text-[10px] sm:text-xs text-white/80">
              <div className="truncate max-w-[70%] flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: activeFlagship.accentColor }}
                />
                <span className="text-white font-medium truncate">{activeFlagship.name}</span>
              </div>

              <div className="flex items-center gap-1.5 text-primary text-[10px] uppercase tracking-wider shrink-0">
                <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Ground Truth QA</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 w-full flex justify-center pb-2 pointer-events-none">
        <a
          href="#interactive-studio"
          className="pointer-events-auto text-white/40 hover:text-primary transition-colors flex flex-col items-center gap-1 text-[10px] font-label-mono uppercase tracking-widest cursor-pointer"
        >
          <span>Scroll to Full 3D Workbench</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
