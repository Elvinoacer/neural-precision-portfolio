export interface GalleryClass {
  name: string;
  color: string;
  count: number;
}

export interface AnnotationBox {
  id: string;
  label: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  w: number; // percentage 0-100
  h: number; // percentage 0-100
  confidence: number;
  depthMeters?: number;
  orientationDeg?: number;
}

export interface GalleryProject {
  id: string;
  title: string;
  subtitle: string;
  category: "lidar" | "segmentation";
  categoryLabel: string;
  image: string;
  width: number;
  height: number;
  confidence: string;
  iouScore: string;
  pointCount?: string;
  polygonCount?: string;
  sensorType: string;
  tools: string[];
  classes: GalleryClass[];
  description: string;
  qaPassed: boolean;
  boxes: AnnotationBox[];
}

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: "lidar-multi-object",
    title: "3D LiDAR Multi-Object Detection",
    subtitle: "Complex multi-class spatial 3D bounding box cuboids with orientation vectors",
    category: "lidar",
    categoryLabel: "3D LiDAR Point Cloud",
    image: "/gallery/3D LiDAR Multi-Object Detection Visualization.png",
    width: 1600,
    height: 536,
    confidence: "99.8%",
    iouScore: "98.9%",
    pointCount: "142,500 pts",
    sensorType: "Velodyne Alpha Prime 128-Beam LiDAR + 8MP Wide-Angle Cam",
    tools: ["CVAT 3D", "Labelbox Point Cloud", "ROS RViz"],
    classes: [
      { name: "Vehicle Cuboid", color: "#00d4ff", count: 24 },
      { name: "Pedestrian", color: "#ffb400", count: 9 },
      { name: "Cyclist / Two-Wheeler", color: "#22c55e", count: 4 },
      { name: "Street Barrier / Cone", color: "#f43f5e", count: 16 },
    ],
    description: "Dense point cloud labeling with 9-DOF oriented 3D bounding boxes. Captures precise center (x, y, z), dimensions (l, w, h), and yaw rotation angles in world coordinates for autonomous driving perception pipelines.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Vehicle (Sedan)", x: 28, y: 46, w: 12, h: 22, confidence: 99.8, depthMeters: 14.2, orientationDeg: -12 },
      { id: "b2", label: "Vehicle (SUV)", x: 44, y: 44, w: 14, h: 26, confidence: 99.4, depthMeters: 18.6, orientationDeg: 4 },
      { id: "b3", label: "Pedestrian", x: 62, y: 52, w: 5, h: 18, confidence: 98.9, depthMeters: 9.8, orientationDeg: 85 },
      { id: "b4", label: "Traffic Barrier", x: 74, y: 58, w: 8, h: 14, confidence: 99.7, depthMeters: 7.1, orientationDeg: 0 },
    ],
  },
  {
    id: "lidar-vehicle-detection",
    title: "3D LiDAR Vehicle Detection",
    subtitle: "Long-range highway vehicle orientation & speed vector clustering",
    category: "lidar",
    categoryLabel: "3D LiDAR Point Cloud",
    image: "/gallery/3D LiDAR Vehicle Detection Visualization.png",
    width: 1600,
    height: 548,
    confidence: "99.9%",
    iouScore: "99.4%",
    pointCount: "118,200 pts",
    sensorType: "HESAI Pandar 64-Channel + Multi-Cam Rig",
    tools: ["SUTD 3D Annotator", "Scale AI 3D", "CVAT"],
    classes: [
      { name: "Passenger Car", color: "#00d4ff", count: 18 },
      { name: "Commercial Truck", color: "#a855f7", count: 6 },
      { name: "Bus / Van", color: "#eab308", count: 3 },
      { name: "Guardrail Boundary", color: "#64748b", count: 12 },
    ],
    description: "High-speed highway vehicle point cloud segmentation and 3D wireframe fitting. Sub-centimeter edge alignment ensuring neural perception models correctly infer occlusion state and velocity headings.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Commercial Truck", x: 34, y: 38, w: 16, h: 32, confidence: 99.7, depthMeters: 26.4, orientationDeg: 2 },
      { id: "b2", label: "Passenger Car", x: 55, y: 48, w: 11, h: 20, confidence: 99.9, depthMeters: 16.3, orientationDeg: -5 },
      { id: "b3", label: "Passenger Car", x: 71, y: 51, w: 10, h: 19, confidence: 99.6, depthMeters: 12.1, orientationDeg: -4 },
    ],
  },
  {
    id: "lidar-point-cloud-vis",
    title: "LiDAR Point Cloud Spatial Detection",
    subtitle: "High-density intensity reflectance mapping & ground plane segmentation",
    category: "lidar",
    categoryLabel: "3D LiDAR Point Cloud",
    image: "/gallery/LiDAR Point Cloud Detection Visualization.png",
    width: 1600,
    height: 559,
    confidence: "99.6%",
    iouScore: "98.7%",
    pointCount: "210,000 pts",
    sensorType: "Ouster OS2 128-Beam Solid State LiDAR",
    tools: ["CloudCompare", "Supervisely Point Cloud", "Labelbox"],
    classes: [
      { name: "Reflective Intensity Return", color: "#38bdf8", count: 31 },
      { name: "Ground Drivable Surface", color: "#22c55e", count: 1 },
      { name: "Static Infrastructure", color: "#f59e0b", count: 14 },
    ],
    description: "Intensity-based point cloud classification separating asphalt road grade from curb edges, overhead signage, and dynamic obstacles under challenging optical conditions.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Reflective Target", x: 42, y: 44, w: 13, h: 22, confidence: 99.8, depthMeters: 19.5, orientationDeg: 0 },
      { id: "b2", label: "Urban Infrastructure", x: 65, y: 39, w: 12, h: 30, confidence: 99.4, depthMeters: 22.8, orientationDeg: 15 },
    ],
  },
  {
    id: "lidar-object-detection",
    title: "3D LiDAR Spatial Object Detection",
    subtitle: "Urban intersection multi-target tracking & bounding volumes",
    category: "lidar",
    categoryLabel: "3D LiDAR Point Cloud",
    image: "/gallery/3D LiDAR Object Detection Visualization.png",
    width: 1600,
    height: 529,
    confidence: "99.7%",
    iouScore: "99.1%",
    pointCount: "165,400 pts",
    sensorType: "RoboSense Ruby 128-Beam LiDAR",
    tools: ["CVAT 3D", "Kitti Benchmark Toolchain", "Scale AI"],
    classes: [
      { name: "Vehicle Hull", color: "#00d4ff", count: 21 },
      { name: "Vulnerable Road User", color: "#ec4899", count: 8 },
      { name: "Urban Architecture", color: "#8b5cf6", count: 15 },
    ],
    description: "Precision spatial labeling of urban intersection traffic. Tracks tight vehicle clustering with verified pitch and roll calibrations to avoid synthetic ground-plane clipping.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Vehicle Hull", x: 26, y: 45, w: 13, h: 24, confidence: 99.8, depthMeters: 15.0, orientationDeg: -8 },
      { id: "b2", label: "Crosswalk Pedestrian", x: 48, y: 50, w: 6, h: 18, confidence: 99.5, depthMeters: 11.4, orientationDeg: 90 },
      { id: "b3", label: "Approaching Bus", x: 68, y: 41, w: 18, h: 28, confidence: 99.7, depthMeters: 24.1, orientationDeg: 3 },
    ],
  },
  {
    id: "seg-intersection",
    title: "Semantic Segmentation: Urban Intersection",
    subtitle: "Dense multi-class pixel classification for autonomous vehicle perception",
    category: "segmentation",
    categoryLabel: "Dense Semantic Segmentation",
    image: "/gallery/Semantic Segmentation of Urban Intersection Scene.png",
    width: 1255,
    height: 735,
    confidence: "99.8%",
    iouScore: "99.3%",
    polygonCount: "48,200 px mask",
    sensorType: "Automotive Grade 8MP HDR Stereo Vision Camera",
    tools: ["Labelbox Segmentation", "CVAT Polygon Tool", "Photoshop QA Masking"],
    classes: [
      { name: "Drivable Road Surface", color: "#c084fc", count: 1 },
      { name: "Dynamic Vehicles", color: "#00d4ff", count: 14 },
      { name: "Vegetation Canopy", color: "#22c55e", count: 8 },
      { name: "Sidewalk / Walkway", color: "#f472b6", count: 4 },
      { name: "Open Sky", color: "#38bdf8", count: 1 },
      { name: "Traffic Signals & Poles", color: "#eab308", count: 9 },
    ],
    description: "Pixel-perfect segmentation mask isolating every single roadway element. Zero bleed across high-contrast curbs, vehicles, and sidewalk boundaries. Validated against Cityscapes annotation guidelines.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Intersecting Sedan", x: 38, y: 55, w: 20, h: 26, confidence: 99.9 },
      { id: "b2", label: "Crosswalk Area", x: 18, y: 68, w: 45, h: 28, confidence: 99.6 },
      { id: "b3", label: "Traffic Signal Cluster", x: 68, y: 22, w: 12, h: 32, confidence: 99.8 },
    ],
  },
  {
    id: "seg-greenery-road",
    title: "Semantic Segmentation: Greenery & Road Scene",
    subtitle: "Sub-pixel foliage edge delineation & boundary isolation",
    category: "segmentation",
    categoryLabel: "Dense Semantic Segmentation",
    image: "/gallery/Semantic Segmentation of Urban Greenery and Road Scene.png",
    width: 1184,
    height: 713,
    confidence: "99.7%",
    iouScore: "99.1%",
    polygonCount: "52,400 px mask",
    sensorType: "4K Forward-Facing Automotive Vision System",
    tools: ["CVAT Polygon", "Segments.ai Superpixels", "Labelbox"],
    classes: [
      { name: "Dense Foliage / Greenery", color: "#22c55e", count: 12 },
      { name: "Asphalt Highway", color: "#a855f7", count: 1 },
      { name: "Shoulder / Terrain", color: "#fb923c", count: 4 },
      { name: "Guardrails & Barriers", color: "#cbd5e1", count: 6 },
    ],
    description: "Complex organic boundary segmentation separating windblown greenery from highway shoulders and guardrails. Requires intense patience and micro-polygon precision to prevent model overfitting.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Tree Canopy & Foliage", x: 12, y: 15, w: 42, h: 48, confidence: 99.8 },
      { id: "b2", label: "Highway Drivable Lane", x: 35, y: 52, w: 38, h: 42, confidence: 99.9 },
      { id: "b3", label: "Roadside Guardrail", x: 72, y: 62, w: 22, h: 22, confidence: 99.4 },
    ],
  },
  {
    id: "seg-parking-lot",
    title: "Semantic Segmentation: Urban Parking Lot",
    subtitle: "Dense vehicle occlusion sorting and marked stall boundary labeling",
    category: "segmentation",
    categoryLabel: "Dense Semantic Segmentation",
    image: "/gallery/Semantic Segmentation of Urban Parking Lot Scene.png",
    width: 1199,
    height: 712,
    confidence: "99.8%",
    iouScore: "99.4%",
    polygonCount: "64,100 px mask",
    sensorType: "Surround-View 360 Camera Array (1080p)",
    tools: ["Labelbox Polygons", "V7 Darwin", "CVAT"],
    classes: [
      { name: "Parked Vehicles", color: "#00d4ff", count: 32 },
      { name: "Paved Parking Surface", color: "#c084fc", count: 1 },
      { name: "Stall Markings & Lines", color: "#facc15", count: 45 },
      { name: "Curbs & Medians", color: "#4ade80", count: 11 },
    ],
    description: "Extreme occlusion handling across tightly packed parking bays. Each individual vehicle is segmented with razor-sharp shadow separation and zero bleed into adjacent parking spaces.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Compact Vehicle Cluster", x: 22, y: 44, w: 28, h: 28, confidence: 99.8 },
      { id: "b2", label: "Commercial Van", x: 54, y: 42, w: 18, h: 25, confidence: 99.7 },
      { id: "b3", label: "Marked Parking Bay Lines", x: 30, y: 68, w: 40, h: 24, confidence: 99.9 },
    ],
  },
  {
    id: "seg-road-scene",
    title: "Semantic Segmentation: Urban Road Scene",
    subtitle: "Dynamic traffic flow segmentation with multi-agent tracking",
    category: "segmentation",
    categoryLabel: "Dense Semantic Segmentation",
    image: "/gallery/Semantic Segmentation of Urban Road Scene.png",
    width: 1253,
    height: 739,
    confidence: "99.9%",
    iouScore: "99.5%",
    polygonCount: "58,900 px mask",
    sensorType: "Multi-Spectral Forward Camera Sensor",
    tools: ["CVAT", "Labelbox", "Dataloop"],
    classes: [
      { name: "Main Drivable Roadway", color: "#a855f7", count: 1 },
      { name: "Leading Vehicles", color: "#00d4ff", count: 9 },
      { name: "Buildings & Facades", color: "#64748b", count: 7 },
      { name: "Overhead Signs & Gantries", color: "#f59e0b", count: 5 },
    ],
    description: "High-density street scene with active dynamic traffic, overhead gantry signage, lane dividers, and multi-story commercial buildings labeled under strict ontology rules.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Lead Vehicle (SUV)", x: 44, y: 52, w: 14, h: 22, confidence: 99.9 },
      { id: "b2", label: "Overhead Highway Sign", x: 38, y: 18, w: 26, h: 20, confidence: 99.8 },
      { id: "b3", label: "Pedestrian Sidewalk Zone", x: 8, y: 64, w: 26, h: 30, confidence: 99.5 },
    ],
  },
  {
    id: "seg-road-landscape",
    title: "Semantic Segmentation: Road & Landscape",
    subtitle: "Horizon line separation, sky gradient masking, and terrain classification",
    category: "segmentation",
    categoryLabel: "Dense Semantic Segmentation",
    image: "/gallery/Semantic Segmentation of Urban Road and Landscape Scene.png",
    width: 1255,
    height: 711,
    confidence: "99.7%",
    iouScore: "99.2%",
    polygonCount: "45,800 px mask",
    sensorType: "Ultra-Wide Panoramic Dashcam System",
    tools: ["CVAT", "Labelbox", "Supervisely"],
    classes: [
      { name: "Highway Pavement", color: "#c084fc", count: 1 },
      { name: "Open Atmospheric Sky", color: "#38bdf8", count: 1 },
      { name: "Rolling Hills / Terrain", color: "#fb7185", count: 5 },
      { name: "Roadside Infrastructure", color: "#eab308", count: 14 },
    ],
    description: "Distant horizon and atmospheric sky boundary separation with micro-precision terrain contouring. Ensures CV models don't misclassify distant hills or cloud reflections as drivable obstacles.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Atmospheric Horizon Boundary", x: 20, y: 22, w: 60, h: 24, confidence: 99.7 },
      { id: "b2", label: "Dual Highway Lanes", x: 28, y: 56, w: 44, h: 38, confidence: 99.9 },
    ],
  },
];
