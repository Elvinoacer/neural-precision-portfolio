export type CoreDiscipline =
  | "3D LiDAR"
  | "2D Segmentation"
  | "Semantic Segmentation"
  | "Instance Segmentation"
  | "Bounding box"
  | "Polygon"
  | "Data Entry"
  | "Virtual Assistant Services";

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
  disciplines: CoreDiscipline[];
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

export interface DisciplineInfo {
  id: string;
  name: CoreDiscipline;
  icon: string;
  badge: string;
  tagline: string;
  description: string;
  keyMetrics: { label: string; value: string }[];
  deliverables: string[];
  tools: string[];
  sampleProjectIds: string[];
  accent: "primary" | "secondary" | "tertiary";
}

export const CORE_DISCIPLINES: DisciplineInfo[] = [
  {
    id: "3d-lidar",
    name: "3D LiDAR",
    icon: "radar",
    badge: "128-Beam Point Clouds",
    tagline: "Sub-centimeter 9-DOF cuboids, intensity reflectance & spatial clustering",
    description:
      "Precision 3D bounding cuboid fitting with verified roll, pitch, and yaw world orientations. Dense point cloud semantic segmentation for autonomous vehicles, robotics, and smart infrastructure pipelines.",
    keyMetrics: [
      { label: "IoU Accuracy", value: "99.4%" },
      { label: "Sensor Rigs", value: "Velodyne / Hesai / Ouster" },
      { label: "Daily Throughput", value: "350+ frames" },
      { label: "QA Tolerance", value: "<1cm spatial error" },
    ],
    deliverables: [
      "9-DOF oriented 3D bounding boxes (x, y, z, l, w, h, roll, pitch, yaw)",
      "Intensity reflectance threshold mapping & ground drivable plane extraction",
      "Point cloud classification across vehicles, pedestrians, cyclists & barriers",
      "Camera-to-LiDAR multi-sensor fusion projection & calibration verification",
    ],
    tools: ["CVAT 3D", "Labelbox Point Cloud", "ROS RViz", "Scale AI 3D", "CloudCompare"],
    sampleProjectIds: ["lidar-multi-object", "lidar-vehicle-detection", "lidar-point-cloud-vis", "lidar-object-detection"],
    accent: "primary",
  },
  {
    id: "2d-segmentation",
    name: "2D Segmentation",
    icon: "layers",
    badge: "Pixel-Level Masks",
    tagline: "Ultra-sharp boundary delineation across challenging visual domains",
    description:
      "Sub-pixel pixel-level masks separating drivable roadways, tunnel hazards, curbs, overhead signage, and dynamic traffic with zero mask bleeding and Cityscapes-grade quality.",
    keyMetrics: [
      { label: "Edge Precision", value: "Sub-pixel" },
      { label: "Mask Resolution", value: "4K / 8MP HDR" },
      { label: "QA Pass Rate", value: "99.8%" },
      { label: "Standard", value: "Cityscapes / COCO" },
    ],
    deliverables: [
      "High-contrast roadway and infrastructure boundary isolation",
      "Low-light tunnel corridor and road hazard segmentation",
      "Overhead gantry and regulatory signage mask extractions",
      "PNG alpha masks, JSON polygon manifests, and RLE encoded datasets",
    ],
    tools: ["Labelbox", "CVAT", "V7 Darwin", "Photoshop QA Masking", "Supervisely"],
    sampleProjectIds: ["seg-overhead-sign", "seg-tunnel-road", "seg-residential-road", "portfolio-p1"],
    accent: "secondary",
  },
  {
    id: "semantic-segmentation",
    name: "Semantic Segmentation",
    icon: "brush",
    badge: "Class-Level Dense Masks",
    tagline: "Comprehensive full-scene pixel classification without unassigned gaps",
    description:
      "Exhaustive scene segmentation where every single pixel is classified into ontological categories: asphalt roadway, sidewalk, vehicle, vegetation canopy, building facade, and open sky.",
    keyMetrics: [
      { label: "Mean IoU", value: "99.3%" },
      { label: "Coverage", value: "100% full frame" },
      { label: "Classes", value: "Up to 32 classes" },
      { label: "Edge Bleed", value: "0.0% verified" },
    ],
    deliverables: [
      "Dense semantic class masks according to client-defined label ontologies",
      "Foliage, vegetation, and organic horizon line boundary separation",
      "Urban intersection multi-agent road surface and walkway demarcation",
      "Multi-spectral forward-facing camera dataset annotation",
    ],
    tools: ["CVAT Polygon", "Segments.ai Superpixels", "Labelbox", "Dataloop"],
    sampleProjectIds: ["seg-intersection", "seg-greenery-road", "seg-road-scene", "seg-road-landscape"],
    accent: "primary",
  },
  {
    id: "instance-segmentation",
    name: "Instance Segmentation",
    icon: "polyline",
    badge: "Discrete Object ID Masks",
    tagline: "Unique identity separation for overlapping objects and dense clusters",
    description:
      "Assigns distinct instance IDs and pixel-perfect masks to every individual object in the frame, resolving complex vehicle overlaps, crosswalk pedestrian clusters, and parking stall occlusions.",
    keyMetrics: [
      { label: "Occlusion Handling", value: "Up to 90% overlap" },
      { label: "Instance Precision", value: "99.7%" },
      { label: "ID Consistency", value: "100% tracked" },
      { label: "Format", value: "COCO / Pascal VOC" },
    ],
    deliverables: [
      "Individual vehicle instance masks in tight parking bays and traffic queues",
      "Crowd and cross-traffic pedestrian instance separation with limb contouring",
      "Occlusion percentage classification and instance visibility flags",
      "Unique tracking IDs across multi-camera temporal video sequences",
    ],
    tools: ["CVAT Instance Tool", "Labelbox Polygons", "V7 Darwin", "Scale AI"],
    sampleProjectIds: ["seg-parking-lot", "seg-parking-area", "seg-street-vehicle", "seg-residential-street"],
    accent: "tertiary",
  },
  {
    id: "bounding-box",
    name: "Bounding box",
    icon: "crop_free",
    badge: "2D & 3D Tight Bounds",
    tagline: "Tight rectangular and spatial cuboids with occlusion & truncation tags",
    description:
      "Razor-tight bounding boxes fitting vehicles, road users, signs, and traffic hazards without excess boundary margins. Configured with strict occlusion flags and orientation headers.",
    keyMetrics: [
      { label: "Tightness Index", value: ">99.6%" },
      { label: "Throughput", value: "1,200+ boxes/day" },
      { label: "Metadata", value: "Occlusion & Truncation" },
      { label: "Format", value: "YOLO, Pascal VOC, JSON" },
    ],
    deliverables: [
      "Multi-class 2D bounding boxes for vehicle and pedestrian detection",
      "3D oriented bounding boxes projected from LiDAR to optical planes",
      "Attribute tagging: heading angle, brake light state, door open/closed",
      "Strict QA verification preventing synthetic clipped boundaries",
    ],
    tools: ["CVAT", "LabelImg", "Labelbox", "Roboflow", "Darknet YOLO Toolchain"],
    sampleProjectIds: ["lidar-multi-object", "lidar-vehicle-detection", "seg-parking-area", "seg-street-vehicle"],
    accent: "secondary",
  },
  {
    id: "polygon",
    name: "Polygon",
    icon: "draw",
    badge: "Multi-Vertex Vectors",
    tagline: "Fine-grain polygon contours capturing complex curved & organic silhouettes",
    description:
      "Multi-vertex vector annotation engineered for irregular geometries: road barriers, overhead highway signs, tree branches, uneven pavement edges, and damaged vehicle contours.",
    keyMetrics: [
      { label: "Vertex Density", value: "Up to 250 pts/object" },
      { label: "Sub-pixel Fit", value: "±0.5 px tolerance" },
      { label: "Curvature Match", value: "99.8%" },
      { label: "Speed", value: "High-efficiency vector tracing" },
    ],
    deliverables: [
      "Curved highway ramp and lane divider polygon contours",
      "Overhead electronic gantry and signpost structural tracing",
      "Spline and bezier-refined polygon masks for organic vegetation",
      "Exportable in GeoJSON, COCO JSON, SVG, and binary mask layers",
    ],
    tools: ["CVAT Polygon", "Labelbox Vector Engine", "Dataloop", "Supervisely"],
    sampleProjectIds: ["seg-overhead-sign", "seg-greenery-road", "anim-image1", "seg-urban-traffic"],
    accent: "primary",
  },
  {
    id: "data-entry",
    name: "Data Entry",
    icon: "table_chart",
    badge: "99.9% Verified Accuracy",
    tagline: "Structured spreadsheet management, database cleaning & e-commerce catalogs",
    description:
      "Meticulous, zero-error spreadsheet entry, database record population, AI model evaluation audit trails, and multi-platform inventory cataloging. Rigorous deduplication and formatting standards.",
    keyMetrics: [
      { label: "Error Rate", value: "<0.1% verified" },
      { label: "Daily Records", value: "500–1,000+ rows" },
      { label: "Data Quality", value: "Full deduplication" },
      { label: "Turnaround", value: "Same-day / 24-hr" },
    ],
    deliverables: [
      "AI model evaluation dataset standardisation, cleaning & ISO formatting",
      "E-commerce cataloging (SKUs, titles, attributes, pricing & descriptions)",
      "CRM contact hygiene & lead verification (HubSpot, Airtable, Salesforce)",
      "Financial receipt, invoice, and bill digitization with discrepancy logs",
    ],
    tools: ["Google Sheets", "Microsoft Excel", "Airtable", "Notion", "HubSpot CRM"],
    sampleProjectIds: ["de-ai-cleaning", "de-ecommerce-catalog", "de-crm-hygiene"],
    accent: "secondary",
  },
  {
    id: "virtual-assistant",
    name: "Virtual Assistant Services",
    icon: "person_check",
    badge: "Executive Remote Operations",
    tagline: "Confidential executive administration, calendar, inbox zero & support desk",
    description:
      "Dependable remote operational execution for founders, fast-scaling startups, and AI teams. Streamlines executive calendars, handles priority customer ticketing, and maintains project boards.",
    keyMetrics: [
      { label: "SLA Response", value: "<30 minutes" },
      { label: "Customer CSAT", value: "98.5% positive" },
      { label: "Hours Logged", value: "5,000+ remote hours" },
      { label: "Confidentiality", value: "Strict NDA compliance" },
    ],
    deliverables: [
      "Executive inbox zero triage, filter rules, and professional draft replies",
      "Calendar scheduling, timezone coordination, and meeting preparation briefs",
      "Tier 1/2 customer support ticketing (Zendesk, Freshdesk, Intercom, Email)",
      "Project workflow coordination, task assignment, and milestone follow-ups",
    ],
    tools: ["Google Workspace", "Slack", "Asana", "Trello", "ClickUp", "Zoom", "Zendesk"],
    sampleProjectIds: ["va-inbox-zero", "va-workflow-setup", "va-customer-support"],
    accent: "tertiary",
  },
];

export interface NonVisionDeliverable {
  id: string;
  discipline: "Data Entry" | "Virtual Assistant Services";
  title: string;
  subtitle: string;
  categoryLabel: string;
  badge: string;
  metrics: { label: string; value: string }[];
  deliverables: string[];
  tools: string[];
  description: string;
  qaVerification: string;
  icon: string;
}

export const NON_VISION_DELIVERABLES: NonVisionDeliverable[] = [
  {
    id: "de-ai-cleaning",
    discipline: "Data Entry",
    title: "AI Model Evaluation Dataset Cleaning & Schema Normalization",
    subtitle: "Eliminated prompt drift, label ambiguity, and malformed coordinates across 10,000+ benchmark samples",
    categoryLabel: "Data Cleaning & Normalization",
    badge: "99.8% Ground Truth",
    metrics: [
      { label: "Accuracy", value: "99.8% Ground Truth" },
      { label: "Error Classes", value: "7 Types Eliminated" },
      { label: "Volume", value: "10,000+ Records" },
      { label: "Format", value: "ISO 8601 & JSONL" },
    ],
    deliverables: [
      "Resolved capitalization inconsistency, coordinate truncation, and leading whitespace errors",
      "Standardized multi-ontology prompt categories into canonical lowercase schema",
      "Deduplicated identical prompt-response pairs to prevent neural model overfitting",
      "Produced comprehensive error distribution audit matrix with before/after delta logs",
    ],
    tools: ["Google Sheets", "Python OpenRefine", "Airtable", "Excel PowerQuery"],
    description:
      "Full dataset audit and cleaning for high-stakes AI evaluation pipelines. Raw data was contaminated with punctuation discrepancies, null values, and coordinate offsets. Cleaned to zero remaining discrepancies with 100% QA signoff.",
    qaVerification: "Audited & Verified 100% Zero Remaining Drift",
    icon: "fact_check",
  },
  {
    id: "de-ecommerce-catalog",
    discipline: "Data Entry",
    title: "Multi-Platform E-Commerce Product Listing & SKU Cataloging",
    subtitle: "High-volume multi-variant product onboarding, inventory taxonomy & SEO optimization",
    categoryLabel: "E-Commerce Catalog Operations",
    badge: "99.9% Data Precision",
    metrics: [
      { label: "Daily Output", value: "650+ SKUs/Day" },
      { label: "Accuracy", value: "99.9% Verified" },
      { label: "Attributes", value: "18 Fields / Item" },
      { label: "Sync", value: "Multi-Channel" },
    ],
    deliverables: [
      "Structured product title formatting following strict search algorithm naming conventions",
      "Variant matrix management (size, color, weight, barcode, parent/child relationships)",
      "High-resolution image URL verification and alt text asset cataloging",
      "Pricing tier normalization across Shopify, Amazon Seller Central, and WooCommerce",
    ],
    tools: ["Shopify Admin", "Microsoft Excel", "Google Sheets", "Airtable", "Asana"],
    description:
      "End-to-end e-commerce product data entry for fast-growing retail and DTC brands. Built scalable catalog architecture ensuring zero inventory sync errors across multi-channel storefronts.",
    qaVerification: "Zero Variant Mismatch Guarantee",
    icon: "inventory_2",
  },
  {
    id: "de-crm-hygiene",
    discipline: "Data Entry",
    title: "B2B CRM Pipeline Hygiene, Deduplication & Lead Enrichment",
    subtitle: "High-integrity contact verification and sales funnel structuring across enterprise platforms",
    categoryLabel: "CRM Data Operations",
    badge: "<0.1% Bounce Rate",
    metrics: [
      { label: "Audited Leads", value: "4,500+ Contacts" },
      { label: "Bounce Rate", value: "<0.1% Bounce" },
      { label: "Deduplication", value: "100% Resolved" },
      { label: "Compliance", value: "GDPR Compliant" },
    ],
    deliverables: [
      "Verified corporate email domains, direct dial numbers, and executive LinkedIn URLs",
      "Custom deduplication rules merging duplicate company accounts without losing activity logs",
      "Standardized industry, headcount, revenue bracket, and geographic territory tags",
      "Automated lead routing stage assignments for sales development representatives",
    ],
    tools: ["HubSpot CRM", "Salesforce", "Apollo.io", "LinkedIn Sales Navigator", "Google Sheets"],
    description:
      "Restructured contaminated sales pipelines into pristine, actionable databases. Verified every contact record against live domain MX records and corporate registries to maximize outreach deliverability.",
    qaVerification: "Full MX Record & Domain Verification",
    icon: "database",
  },
  {
    id: "va-inbox-zero",
    discipline: "Virtual Assistant Services",
    title: "Executive Email Management & Inbox Zero Architecture",
    subtitle: "Confidential triage, priority escalation filters, and rapid draft communications",
    categoryLabel: "Executive Administration",
    badge: "<30 Min Response SLA",
    metrics: [
      { label: "Response SLA", value: "<30 Min Turnaround" },
      { label: "Daily Rate", value: "100% Inbox Zero" },
      { label: "Filter Rules", value: "15 Custom Rules" },
      { label: "Confidentiality", value: "Strict NDA Bound" },
    ],
    deliverables: [
      "Multi-inbox triage separating urgent founder requests, client approvals, and vendor queries",
      "Context-aware draft responses ready for executive one-click review and dispatch",
      "Automated calendar invitation processing with automatic conflict detection",
      "Daily executive summary briefs highlighting priority action items and upcoming milestones",
    ],
    tools: ["Google Workspace", "Superhuman", "Microsoft 365", "Slack", "Notion"],
    description:
      "High-touch administrative support for founders and technology leaders. Reclaims 15+ hours weekly by maintaining a pristine inbox, handling routine inquiries, and ensuring critical opportunities are never missed.",
    qaVerification: "Zero Dropped Priority Communications",
    icon: "mail",
  },
  {
    id: "va-workflow-setup",
    discipline: "Virtual Assistant Services",
    title: "Agile Project Workflow & Cross-Functional Task Board Setup",
    subtitle: "Milestone orchestration, Kanban backlog grooming, and team deliverables alignment",
    categoryLabel: "Operations & Project Coordination",
    badge: "100% Milestone Adherence",
    metrics: [
      { label: "Milestone Track", value: "100% On-Time" },
      { label: "Active Boards", value: "8 Workflows" },
      { label: "Task Velocity", value: "+40% Team Output" },
      { label: "Sprint Briefs", value: "Weekly Standups" },
    ],
    deliverables: [
      "Configured Asana, Trello, and ClickUp boards with custom stages, tags, and automation rules",
      "Transcribed executive meeting recordings into actionable user stories and task cards",
      "Monitored team blockers and followed up with assignees ahead of deadline thresholds",
      "Generated weekly progress dashboards for stakeholders and investors",
    ],
    tools: ["Asana", "Trello", "ClickUp", "Notion", "Slack", "Zoom", "Loom"],
    description:
      "Transforms unstructured project discussions into synchronized agile workflows. Maintains board clarity, eliminates status ambiguity, and ensures cross-functional deliverables ship on schedule.",
    qaVerification: "Weekly Sprint Audits & Blocker Logs",
    icon: "view_kanban",
  },
  {
    id: "va-customer-support",
    discipline: "Virtual Assistant Services",
    title: "Multi-Tier Customer Support Desk & Zendesk SLA Management",
    subtitle: "Empathetic, multi-channel customer ticket resolution, live chat & escalation routing",
    categoryLabel: "Customer Experience & Support Desk",
    badge: "98.5% CSAT Rating",
    metrics: [
      { label: "CSAT Score", value: "98.5% Positive" },
      { label: "First Response", value: "<15 Minutes" },
      { label: "SLA Adherence", value: "99.2% on Time" },
      { label: "Tickets Handled", value: "2,500+ Solved" },
    ],
    deliverables: [
      "First-contact resolution for technical onboarding, account issues, and billing queries",
      "Comprehensive help center macro templates maintaining brand voice consistency",
      "Structured bug escalation logs with reproduction steps for engineering teams",
      "Proactive follow-up cadence ensuring complete customer satisfaction",
    ],
    tools: ["Zendesk", "Freshdesk", "Intercom", "Help Scout", "Gmail", "Stripe Dashboard"],
    description:
      "White-glove customer support delivery representing AI and SaaS brands with empathy, clarity, and rapid response times. Maintains stellar CSAT ratings while reducing ticket turnaround friction.",
    qaVerification: "Audited Quality Score 99.4%",
    icon: "support_agent",
  },
];

export const GALLERY_PROJECTS: GalleryProject[] = [
  // 1. 3D LiDAR: Multi-Object Detection
  {
    id: "lidar-multi-object",
    title: "3D LiDAR Multi-Object Detection",
    subtitle: "Complex multi-class spatial 3D bounding box cuboids with orientation vectors",
    category: "lidar",
    categoryLabel: "3D LiDAR Point Cloud",
    disciplines: ["3D LiDAR", "Bounding box"],
    image: "/gallery/3d-lidar/multi-object-detection.png",
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
    description:
      "Dense point cloud labeling with 9-DOF oriented 3D bounding boxes. Captures precise center (x, y, z), dimensions (l, w, h), and yaw rotation angles in world coordinates for autonomous driving perception pipelines.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Vehicle (Sedan)", x: 28, y: 46, w: 12, h: 22, confidence: 99.8, depthMeters: 14.2, orientationDeg: -12 },
      { id: "b2", label: "Vehicle (SUV)", x: 44, y: 44, w: 14, h: 26, confidence: 99.4, depthMeters: 18.6, orientationDeg: 4 },
      { id: "b3", label: "Pedestrian", x: 62, y: 52, w: 5, h: 18, confidence: 98.9, depthMeters: 9.8, orientationDeg: 85 },
      { id: "b4", label: "Traffic Barrier", x: 74, y: 58, w: 8, h: 14, confidence: 99.7, depthMeters: 7.1, orientationDeg: 0 },
    ],
  },

  // 2. 3D LiDAR: Vehicle Detection
  {
    id: "lidar-vehicle-detection",
    title: "3D LiDAR Vehicle Detection",
    subtitle: "Long-range highway vehicle orientation & speed vector clustering",
    category: "lidar",
    categoryLabel: "3D LiDAR Point Cloud",
    disciplines: ["3D LiDAR", "Bounding box"],
    image: "/gallery/3d-lidar/vehicle-detection.png",
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
    description:
      "High-speed highway vehicle point cloud segmentation and 3D wireframe fitting. Sub-centimeter edge alignment ensuring neural perception models correctly infer occlusion state and velocity headings.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Commercial Truck", x: 34, y: 38, w: 16, h: 32, confidence: 99.7, depthMeters: 26.4, orientationDeg: 2 },
      { id: "b2", label: "Passenger Car", x: 55, y: 48, w: 11, h: 20, confidence: 99.9, depthMeters: 16.3, orientationDeg: -5 },
      { id: "b3", label: "Passenger Car", x: 71, y: 51, w: 10, h: 19, confidence: 99.6, depthMeters: 12.1, orientationDeg: -4 },
    ],
  },

  // 3. 3D LiDAR: Point Cloud Spatial Detection
  {
    id: "lidar-point-cloud-vis",
    title: "LiDAR Point Cloud Spatial Detection",
    subtitle: "High-density intensity reflectance mapping & ground plane segmentation",
    category: "lidar",
    categoryLabel: "3D LiDAR Point Cloud",
    disciplines: ["3D LiDAR", "Semantic Segmentation"],
    image: "/gallery/3d-lidar/point-cloud-detection.png",
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
    description:
      "Intensity-based point cloud classification separating asphalt road grade from curb edges, overhead signage, and dynamic obstacles under challenging optical conditions.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Reflective Target", x: 42, y: 44, w: 13, h: 22, confidence: 99.8, depthMeters: 19.5, orientationDeg: 0 },
      { id: "b2", label: "Urban Infrastructure", x: 65, y: 39, w: 12, h: 30, confidence: 99.4, depthMeters: 22.8, orientationDeg: 15 },
    ],
  },

  // 4. 3D LiDAR: Object Detection
  {
    id: "lidar-object-detection",
    title: "3D LiDAR Spatial Object Detection",
    subtitle: "Urban intersection multi-target tracking & bounding volumes",
    category: "lidar",
    categoryLabel: "3D LiDAR Point Cloud",
    disciplines: ["3D LiDAR", "Bounding box"],
    image: "/gallery/3d-lidar/object-detection.png",
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
    description:
      "Precision spatial labeling of urban intersection traffic. Tracks tight vehicle clustering with verified pitch and roll calibrations to avoid synthetic ground-plane clipping.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Vehicle Hull", x: 26, y: 45, w: 13, h: 24, confidence: 99.8, depthMeters: 15.0, orientationDeg: -8 },
      { id: "b2", label: "Crosswalk Pedestrian", x: 48, y: 50, w: 6, h: 18, confidence: 99.5, depthMeters: 11.4, orientationDeg: 90 },
      { id: "b3", label: "Approaching Bus", x: 68, y: 41, w: 18, h: 28, confidence: 99.7, depthMeters: 24.1, orientationDeg: 3 },
    ],
  },

  // 5. Semantic Segmentation: Urban Intersection
  {
    id: "seg-intersection",
    title: "Semantic Segmentation: Urban Intersection",
    subtitle: "Dense multi-class pixel classification for autonomous vehicle perception",
    category: "segmentation",
    categoryLabel: "Dense Semantic Segmentation",
    disciplines: ["Semantic Segmentation", "2D Segmentation", "Polygon"],
    image: "/gallery/2d-segmentation/urban-intersection.png",
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
    description:
      "Pixel-perfect segmentation mask isolating every single roadway element. Zero bleed across high-contrast curbs, vehicles, and sidewalk boundaries. Validated against Cityscapes annotation guidelines.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Intersecting Sedan", x: 38, y: 55, w: 20, h: 26, confidence: 99.9 },
      { id: "b2", label: "Crosswalk Area", x: 18, y: 68, w: 45, h: 28, confidence: 99.6 },
      { id: "b3", label: "Traffic Signal Cluster", x: 68, y: 22, w: 12, h: 32, confidence: 99.8 },
    ],
  },

  // 6. Semantic Segmentation: Greenery & Road Scene
  {
    id: "seg-greenery-road",
    title: "Semantic Segmentation: Greenery & Road Scene",
    subtitle: "Sub-pixel foliage edge delineation & boundary isolation",
    category: "segmentation",
    categoryLabel: "Dense Semantic Segmentation",
    disciplines: ["Semantic Segmentation", "Polygon"],
    image: "/gallery/2d-segmentation/greenery-road.png",
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
    description:
      "Complex organic boundary segmentation separating windblown greenery from highway shoulders and guardrails. Requires intense patience and micro-polygon precision to prevent model overfitting.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Tree Canopy & Foliage", x: 12, y: 15, w: 42, h: 48, confidence: 99.8 },
      { id: "b2", label: "Highway Drivable Lane", x: 35, y: 52, w: 38, h: 42, confidence: 99.9 },
      { id: "b3", label: "Roadside Guardrail", x: 72, y: 62, w: 22, h: 22, confidence: 99.4 },
    ],
  },

  // 7. Semantic Segmentation: Urban Parking Lot
  {
    id: "seg-parking-lot",
    title: "Semantic Segmentation: Urban Parking Lot",
    subtitle: "Dense vehicle occlusion sorting and marked stall boundary labeling",
    category: "segmentation",
    categoryLabel: "Dense Semantic Segmentation",
    disciplines: ["Instance Segmentation", "Semantic Segmentation"],
    image: "/gallery/2d-segmentation/parking-lot.png",
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
    description:
      "Extreme occlusion handling across tightly packed parking bays. Each individual vehicle is segmented with razor-sharp shadow separation and zero bleed into adjacent parking spaces.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Compact Vehicle Cluster", x: 22, y: 44, w: 28, h: 28, confidence: 99.8 },
      { id: "b2", label: "Commercial Van", x: 54, y: 42, w: 18, h: 25, confidence: 99.7 },
      { id: "b3", label: "Marked Parking Bay Lines", x: 30, y: 68, w: 40, h: 24, confidence: 99.9 },
    ],
  },

  // 8. Semantic Segmentation: Urban Road Scene
  {
    id: "seg-road-scene",
    title: "Semantic Segmentation: Urban Road Scene",
    subtitle: "Dynamic traffic flow segmentation with multi-agent tracking",
    category: "segmentation",
    categoryLabel: "Dense Semantic Segmentation",
    disciplines: ["Semantic Segmentation", "2D Segmentation"],
    image: "/gallery/2d-segmentation/urban-road.png",
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
    description:
      "High-density street scene with active dynamic traffic, overhead gantry signage, lane dividers, and multi-story commercial buildings labeled under strict ontology rules.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Lead Vehicle (SUV)", x: 44, y: 52, w: 14, h: 22, confidence: 99.9 },
      { id: "b2", label: "Overhead Highway Sign", x: 38, y: 18, w: 26, h: 20, confidence: 99.8 },
      { id: "b3", label: "Pedestrian Sidewalk Zone", x: 8, y: 64, w: 26, h: 30, confidence: 99.5 },
    ],
  },

  // 9. Semantic Segmentation: Road & Landscape
  {
    id: "seg-road-landscape",
    title: "Semantic Segmentation: Road & Landscape",
    subtitle: "Horizon line separation, sky gradient masking, and terrain classification",
    category: "segmentation",
    categoryLabel: "Dense Semantic Segmentation",
    disciplines: ["Semantic Segmentation", "Polygon"],
    image: "/gallery/2d-segmentation/road-landscape.png",
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
    description:
      "Distant horizon and atmospheric sky boundary separation with micro-precision terrain contouring. Ensures CV models don't misclassify distant hills or cloud reflections as drivable obstacles.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Atmospheric Horizon Boundary", x: 20, y: 22, w: 60, h: 24, confidence: 99.7 },
      { id: "b2", label: "Dual Highway Lanes", x: 28, y: 56, w: 44, h: 38, confidence: 99.9 },
    ],
  },

  // 10. Overhead Sign Segmentation
  {
    id: "seg-overhead-sign",
    title: "2D Segmentation & Polygon: Overhead Highway Signage",
    subtitle: "Sub-pixel polygon tracing of retroreflective road signs, gantries, and clearances",
    category: "segmentation",
    categoryLabel: "2D Segmentation & Polygon",
    disciplines: ["2D Segmentation", "Polygon"],
    image: "/gallery/2d-segmentation/overhead-sign-segmentation.jpeg",
    width: 1155,
    height: 655,
    confidence: "99.8%",
    iouScore: "99.4%",
    polygonCount: "38,400 px mask",
    sensorType: "Forward-Facing Automotive HDR Monocular Camera",
    tools: ["CVAT Polygon", "Labelbox Vector Engine", "Photoshop QA"],
    classes: [
      { name: "Overhead Direction Sign", color: "#22c55e", count: 3 },
      { name: "Gantry Truss Structure", color: "#94a3b8", count: 4 },
      { name: "Drivable Highway Lanes", color: "#c084fc", count: 1 },
      { name: "Vehicles in Motion", color: "#00d4ff", count: 8 },
    ],
    description:
      "High-precision polygon masks isolating green highway directional signage, support posts, and clearance markers from overcast sky backgrounds without edge aliasing.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Direction Sign Gantry", x: 30, y: 14, w: 40, h: 26, confidence: 99.8 },
      { id: "b2", label: "Approaching Vehicle", x: 48, y: 56, w: 12, h: 20, confidence: 99.7 },
      { id: "b3", label: "Asphalt Lane Delineation", x: 24, y: 64, w: 52, h: 30, confidence: 99.9 },
    ],
  },

  // 11. Parking Area Segmentation
  {
    id: "seg-parking-area",
    title: "Instance Segmentation & Bounding Box: Commercial Parking Bay",
    subtitle: "Individual vehicle instance masks, stall bounding boxes, and lane markers",
    category: "segmentation",
    categoryLabel: "Instance Segmentation & BBox",
    disciplines: ["Instance Segmentation", "Bounding box"],
    image: "/gallery/2d-segmentation/parking-area-segmentation.jpeg",
    width: 1054,
    height: 689,
    confidence: "99.7%",
    iouScore: "99.2%",
    polygonCount: "42,600 px mask",
    sensorType: "Surround Parking Assist High-Resolution Camera",
    tools: ["CVAT", "V7 Darwin", "Scale AI"],
    classes: [
      { name: "Individual Parked Car", color: "#00d4ff", count: 19 },
      { name: "Reserved Bay Marking", color: "#facc15", count: 24 },
      { name: "Pedestrian Pathway", color: "#f472b6", count: 3 },
      { name: "Concrete Perimeter Curb", color: "#4ade80", count: 8 },
    ],
    description:
      "Instance-level masks separating adjoining cars in commercial parking lots. Tight bounding boxes combined with sub-pixel polygon masks provide dual annotation formats.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Parked Vehicle #14", x: 18, y: 48, w: 15, h: 24, confidence: 99.7 },
      { id: "b2", label: "Parked Vehicle #15", x: 36, y: 46, w: 14, h: 22, confidence: 99.8 },
      { id: "b3", label: "Stall Geometry Grid", x: 22, y: 66, w: 48, h: 28, confidence: 99.6 },
    ],
  },

  // 12. Residential Road Segmentation
  {
    id: "seg-residential-road",
    title: "Semantic Segmentation: Suburban Residential Roadway",
    subtitle: "Drivable asphalt, residential driveways, sidewalks, and curb lines",
    category: "segmentation",
    categoryLabel: "Dense Semantic Segmentation",
    disciplines: ["Semantic Segmentation", "2D Segmentation"],
    image: "/gallery/2d-segmentation/residential-road-segmentation.jpeg",
    width: 1253,
    height: 737,
    confidence: "99.6%",
    iouScore: "99.0%",
    polygonCount: "51,300 px mask",
    sensorType: "Forward-Facing HD Vision Camera",
    tools: ["CVAT", "Labelbox", "Segments.ai"],
    classes: [
      { name: "Suburban Road Surface", color: "#c084fc", count: 1 },
      { name: "Sidewalk & Curb", color: "#f472b6", count: 6 },
      { name: "Residential Lawns / Grass", color: "#22c55e", count: 10 },
      { name: "Single Family Driveway", color: "#fb923c", count: 4 },
    ],
    description:
      "Suburban residential classification separating drivable asphalt from curb transitions, personal driveways, mailboxes, and pedestrian sidewalks with zero boundary blur.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Suburban Roadway", x: 25, y: 58, w: 48, h: 36, confidence: 99.8 },
      { id: "b2", label: "Curb & Grass Boundary", x: 68, y: 52, w: 24, h: 28, confidence: 99.5 },
      { id: "b3", label: "Residential Driveway", x: 10, y: 54, w: 18, h: 22, confidence: 99.6 },
    ],
  },

  // 13. Residential Street Segmentation
  {
    id: "seg-residential-street",
    title: "Multi-Class Instance Segmentation: Residential Street",
    subtitle: "Parked vehicles, sidewalk ramp geometry, and tree foliage transitions",
    category: "segmentation",
    categoryLabel: "Multi-Class Instance & Polygon",
    disciplines: ["Instance Segmentation", "2D Segmentation", "Polygon"],
    image: "/gallery/2d-segmentation/residential-street-segmentation.jpeg",
    width: 1257,
    height: 714,
    confidence: "99.8%",
    iouScore: "99.3%",
    polygonCount: "49,700 px mask",
    sensorType: "Dual Stereo Automotive Camera Rig",
    tools: ["CVAT Polygon", "Labelbox", "Dataloop"],
    classes: [
      { name: "Parked Street Vehicle", color: "#00d4ff", count: 12 },
      { name: "Paved Street", color: "#c084fc", count: 1 },
      { name: "Suburban Trees", color: "#22c55e", count: 8 },
      { name: "Sidewalk Walkway", color: "#f472b6", count: 2 },
    ],
    description:
      "Dense instance labeling along tree-lined residential streets. Captures complex shadow transitions under tree canopies while keeping vehicle boundaries crisp and distinct.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Parked Car #03", x: 22, y: 46, w: 14, h: 24, confidence: 99.7 },
      { id: "b2", label: "Parked Car #04", x: 42, y: 44, w: 12, h: 20, confidence: 99.8 },
      { id: "b3", label: "Tree Canopy Shadow Area", x: 12, y: 18, w: 38, h: 36, confidence: 99.5 },
    ],
  },

  // 14. Street Vehicle Segmentation
  {
    id: "seg-street-vehicle",
    title: "Instance Segmentation & BBox: Dense Urban Vehicle Clustering",
    subtitle: "Tight bounding boxes & pixel-accurate polygon silhouettes for overlapping sedans & SUVs",
    category: "segmentation",
    categoryLabel: "Instance Segmentation & BBox",
    disciplines: ["Instance Segmentation", "Bounding box"],
    image: "/gallery/2d-segmentation/street-vehicle-segmentation.jpeg",
    width: 1044,
    height: 676,
    confidence: "99.9%",
    iouScore: "99.5%",
    polygonCount: "37,900 px mask",
    sensorType: "Full HD 1080p Front Vehicle Perception Camera",
    tools: ["CVAT", "Scale AI", "Labelbox"],
    classes: [
      { name: "Dynamic Vehicle Instance", color: "#00d4ff", count: 16 },
      { name: "Leading Brake Lights", color: "#ef4444", count: 14 },
      { name: "Road Markings", color: "#facc15", count: 8 },
    ],
    description:
      "Extreme occlusion instance segmentation in stop-and-go city traffic. Separates bumper-to-bumper vehicles with individual mask IDs and millimeter-tight bounding boxes.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Lead Vehicle (Sedan)", x: 38, y: 48, w: 24, h: 32, confidence: 99.9 },
      { id: "b2", label: "Adjacent Vehicle (SUV)", x: 66, y: 46, w: 20, h: 28, confidence: 99.8 },
      { id: "b3", label: "Traffic Lane Divider", x: 32, y: 72, w: 34, h: 20, confidence: 99.9 },
    ],
  },

  // 15. Tunnel Road Segmentation
  {
    id: "seg-tunnel-road",
    title: "Road Hazard & Low-Light 2D Segmentation: Subterranean Tunnel",
    subtitle: "Challenging lighting, concrete tunnel walls, lane reflectors & road debris hazards",
    category: "segmentation",
    categoryLabel: "Road Hazard & 2D Segmentation",
    disciplines: ["2D Segmentation", "Bounding box", "Polygon"],
    image: "/gallery/2d-segmentation/tunnel-road-segmentation.jpeg",
    width: 1049,
    height: 592,
    confidence: "99.7%",
    iouScore: "99.1%",
    polygonCount: "41,200 px mask",
    sensorType: "Ultra Low-Light HDR Automotive Sensor",
    tools: ["CVAT Polygon", "Labelbox", "Photoshop Gamma Tuning"],
    classes: [
      { name: "Tunnel Drivable Lane", color: "#c084fc", count: 1 },
      { name: "Concrete Tunnel Arch", color: "#64748b", count: 2 },
      { name: "Overhead Lighting Strip", color: "#fbbf24", count: 18 },
      { name: "Hazard Reflector / Marker", color: "#f43f5e", count: 12 },
    ],
    description:
      "Perception dataset annotation in subterranean low-light tunnels with extreme artificial glare. Delineates curved concrete arches, roadway reflectors, and unexpected debris hazards.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Tunnel Drivable Core", x: 26, y: 52, w: 46, h: 38, confidence: 99.8 },
      { id: "b2", label: "Curved Tunnel Wall Arc", x: 8, y: 22, w: 24, h: 56, confidence: 99.6 },
      { id: "b3", label: "Overhead Light Bank", x: 34, y: 12, w: 32, h: 18, confidence: 99.7 },
    ],
  },

  // 16. Urban Roadway Segmentation
  {
    id: "seg-urban-roadway",
    title: "Semantic & Instance Segmentation: Multi-Lane Urban Arterial",
    subtitle: "Lane markings, road directional arrows, traffic lights, and multi-vehicle tracking",
    category: "segmentation",
    categoryLabel: "Semantic & Instance Segmentation",
    disciplines: ["Semantic Segmentation", "Instance Segmentation", "Polygon"],
    image: "/gallery/2d-segmentation/urban-roadway-segmentation.jpeg",
    width: 1250,
    height: 735,
    confidence: "99.8%",
    iouScore: "99.4%",
    polygonCount: "53,800 px mask",
    sensorType: "4K Multi-Sensor Autonomous Driving Vision Rig",
    tools: ["CVAT", "Labelbox", "Dataloop"],
    classes: [
      { name: "Multi-Lane Roadway", color: "#c084fc", count: 1 },
      { name: "Directional Turn Arrows", color: "#facc15", count: 6 },
      { name: "Commercial & Private Cars", color: "#00d4ff", count: 15 },
      { name: "Pedestrian Crosswalk Bars", color: "#ffffff", count: 12 },
    ],
    description:
      "Complex multi-lane boulevard annotation featuring directional road arrows, pedestrian crosswalk zebra bars, traffic signal masts, and high-density moving vehicles.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Leading SUV", x: 42, y: 48, w: 16, h: 24, confidence: 99.9 },
      { id: "b2", label: "Directional Road Arrow", x: 34, y: 68, w: 14, h: 18, confidence: 99.8 },
      { id: "b3", label: "Crosswalk Zebra Markings", x: 18, y: 74, w: 64, h: 20, confidence: 99.7 },
    ],
  },

  // 17. Urban Traffic Segmentation
  {
    id: "seg-urban-traffic",
    title: "Bounding Box & Polygon: High-Density Urban Traffic Flow",
    subtitle: "Dense multi-target bounding boxes with occlusion flags, crosswalks & traffic states",
    category: "segmentation",
    categoryLabel: "Bounding Box & Polygon",
    disciplines: ["Bounding box", "Polygon", "2D Segmentation"],
    image: "/gallery/2d-segmentation/urban-traffic-segmentation.jpeg",
    width: 1156,
    height: 657,
    confidence: "99.9%",
    iouScore: "99.5%",
    polygonCount: "44,100 px mask",
    sensorType: "High Dynamic Range Urban Autonomous Driving Camera",
    tools: ["CVAT", "Labelbox", "V7 Darwin"],
    classes: [
      { name: "Vehicles with Occlusion Flags", color: "#00d4ff", count: 22 },
      { name: "Pedestrians & Cyclists", color: "#f59e0b", count: 7 },
      { name: "Traffic Light States (Red/Green)", color: "#ef4444", count: 4 },
      { name: "Drivable Surface", color: "#c084fc", count: 1 },
    ],
    description:
      "Dual-format benchmark: tight multi-target bounding boxes combined with sub-pixel polygon masks for vehicle tracking across busy metropolitan intersections.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Lead Vehicle (Sedan)", x: 36, y: 52, w: 18, h: 26, confidence: 99.9 },
      { id: "b2", label: "Heavy Truck / Delivery", x: 58, y: 44, w: 22, h: 34, confidence: 99.8 },
      { id: "b3", label: "Crosswalk Pedestrian", x: 14, y: 62, w: 6, h: 18, confidence: 99.6 },
    ],
  },

  // 18. Portfolio Sample P1: High-Density Traffic
  {
    id: "portfolio-p1",
    title: "High-Density Arterial Traffic Segmentation Benchmark",
    subtitle: "Verified against Cityscapes automotive perception standards",
    category: "segmentation",
    categoryLabel: "2D Semantic & Instance",
    disciplines: ["2D Segmentation", "Semantic Segmentation", "Instance Segmentation"],
    image: "/images/portfolios/p1.png",
    width: 1156,
    height: 657,
    confidence: "99.8%",
    iouScore: "99.4%",
    polygonCount: "47,500 px mask",
    sensorType: "8MP Stereo Vision Automotive Rig",
    tools: ["Labelbox", "CVAT", "Brush & Polygon tools"],
    classes: [
      { name: "Drivable Road Surface", color: "#c084fc", count: 1 },
      { name: "Traffic Flow Instances", color: "#00d4ff", count: 18 },
      { name: "Overhead Signs & Gantries", color: "#f59e0b", count: 5 },
      { name: "Sidewalk & Pedestrians", color: "#22c55e", count: 6 },
    ],
    description:
      "Arterial highway multi-class semantic segmentation deliverable. Features rigorous boundary separation between high-speed dynamic vehicles, lane dividers, and overhead gantry guidance signs.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Dynamic Vehicle Cluster", x: 34, y: 50, w: 20, h: 26, confidence: 99.9 },
      { id: "b2", label: "Highway Signboard", x: 40, y: 16, w: 24, h: 22, confidence: 99.8 },
      { id: "b3", label: "Express Lane Divider", x: 26, y: 65, w: 48, h: 25, confidence: 99.7 },
    ],
  },

  // 19. Portfolio Sample P2: Commercial Parking
  {
    id: "portfolio-p2",
    title: "Commercial Fleet & Bay Parking Allocation Analysis",
    subtitle: "Multi-sensor spatial alignment and stall geometry verification",
    category: "segmentation",
    categoryLabel: "Instance Segmentation & BBox",
    disciplines: ["Instance Segmentation", "Bounding box"],
    image: "/images/portfolios/p2.png",
    width: 1054,
    height: 689,
    confidence: "99.7%",
    iouScore: "99.3%",
    polygonCount: "39,800 px mask",
    sensorType: "Surround-View 360 Camera Array",
    tools: ["CVAT", "Labelbox", "V7 Darwin"],
    classes: [
      { name: "Fleet Vehicle Instances", color: "#00d4ff", count: 17 },
      { name: "Assigned Parking Bays", color: "#facc15", count: 20 },
      { name: "Access Lane", color: "#c084fc", count: 1 },
    ],
    description:
      "Fleet yard vehicle inventory and bay occupancy dataset. Combines pixel-level polygon masks for vehicle chassis with oriented rectangular bounding boxes for automated valet parking (AVP).",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Fleet Sedan #09", x: 20, y: 46, w: 16, h: 25, confidence: 99.8 },
      { id: "b2", label: "Fleet Van #02", x: 42, y: 44, w: 15, h: 24, confidence: 99.7 },
      { id: "b3", label: "Parking Bay Delineation", x: 25, y: 68, w: 42, h: 24, confidence: 99.9 },
    ],
  },

  // 20. Landing Animation 1: Complex Polygon Tracing
  {
    id: "anim-image1",
    title: "Complex Polygon Annotation & Urban Obstacle Tracing",
    subtitle: "Fine-grain polygon vertex editing for complex curved objects and occluded vehicles",
    category: "segmentation",
    categoryLabel: "Polygon & 2D Segmentation",
    disciplines: ["Polygon", "2D Segmentation"],
    image: "/images/landingpage_smooth_animations/image1.png",
    width: 1005,
    height: 656,
    confidence: "99.8%",
    iouScore: "99.2%",
    polygonCount: "36,200 px mask",
    sensorType: "Automotive Grade Forward Camera",
    tools: ["CVAT Polygon", "Labelbox", "Photoshop"],
    classes: [
      { name: "Curved Curbs & Barriers", color: "#cbd5e1", count: 8 },
      { name: "Occluded Sedans", color: "#00d4ff", count: 11 },
      { name: "Roadway Asphalt", color: "#c084fc", count: 1 },
      { name: "Street Hardware & Signs", color: "#f59e0b", count: 6 },
    ],
    description:
      "Fine-grain polygon vector tracing across complex urban roadway curves. Employs multi-vertex contour alignment along curbs, barrier fencing, and occluded vehicular frames.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Curved Concrete Barrier", x: 18, y: 55, w: 32, h: 30, confidence: 99.8 },
      { id: "b2", label: "Traffic Vehicle", x: 46, y: 48, w: 18, h: 24, confidence: 99.7 },
      { id: "b3", label: "Roadway Divider Line", x: 30, y: 70, w: 40, h: 20, confidence: 99.9 },
    ],
  },

  // 21. Landing Animation 2: Road Geometry & Curvature
  {
    id: "anim-image2",
    title: "Sub-Pixel Road Geometry & Curvature Delineation",
    subtitle: "Double solid lines, dashed passing lanes, and asphalt edge transitions",
    category: "segmentation",
    categoryLabel: "2D & Semantic Segmentation",
    disciplines: ["2D Segmentation", "Semantic Segmentation", "Polygon"],
    image: "/images/landingpage_smooth_animations/image2.png",
    width: 1001,
    height: 643,
    confidence: "99.9%",
    iouScore: "99.5%",
    polygonCount: "43,100 px mask",
    sensorType: "4K Ultra-HD Forward Vision Rig",
    tools: ["CVAT", "Labelbox Vector Engine"],
    classes: [
      { name: "Double Solid Yellow Lines", color: "#facc15", count: 4 },
      { name: "Dashed Lane Dividers", color: "#ffffff", count: 8 },
      { name: "Road Shoulder Terrain", color: "#fb923c", count: 2 },
      { name: "Drivable Lane Core", color: "#a855f7", count: 1 },
    ],
    description:
      "Sub-pixel delineation of roadway curvature, passing lane dashes, and double solid dividers critical for autonomous lane-centering and trajectory planning algorithms.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Road Centerline Marking", x: 44, y: 56, w: 12, h: 38, confidence: 99.9 },
      { id: "b2", label: "Roadway Shoulder Border", x: 15, y: 62, w: 22, h: 28, confidence: 99.8 },
    ],
  },

  // 22. Landing Animation 3: Dynamic Cross-Traffic
  {
    id: "anim-image3",
    title: "Dynamic Cross-Traffic & Pedestrian Spatial Segmentation",
    subtitle: "Vulnerable Road User (VRU) tracking & pedestrian crosswalk polygon isolation",
    category: "segmentation",
    categoryLabel: "Instance Segmentation & BBox",
    disciplines: ["Instance Segmentation", "Bounding box", "2D Segmentation"],
    image: "/images/landingpage_smooth_animations/image3.png",
    width: 1152,
    height: 658,
    confidence: "99.7%",
    iouScore: "99.2%",
    polygonCount: "46,800 px mask",
    sensorType: "High Dynamic Range Stereoscopic Camera",
    tools: ["CVAT", "Labelbox", "Segments.ai"],
    classes: [
      { name: "Vulnerable Road User (Pedestrian)", color: "#ec4899", count: 9 },
      { name: "Cross-Traffic Vehicles", color: "#00d4ff", count: 14 },
      { name: "Pedestrian Crosswalk", color: "#ffffff", count: 6 },
      { name: "Traffic Signals", color: "#eab308", count: 5 },
    ],
    description:
      "Vulnerable Road User (VRU) identification across bustling urban crosswalks. Precision polygon masks preserve distinct pedestrian limb postures and stroller/cart attachments.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Crossing Pedestrian", x: 26, y: 50, w: 7, h: 20, confidence: 99.8 },
      { id: "b2", label: "Approaching SUV", x: 52, y: 46, w: 18, h: 28, confidence: 99.7 },
      { id: "b3", label: "Crosswalk Pavement Marker", x: 18, y: 68, w: 56, h: 26, confidence: 99.9 },
    ],
  },

  // 23. Direct Sample I1: Overhead Gantry Infrastructure
  {
    id: "images-i1",
    title: "Highway Infrastructure Guidance & Overhead Signage Polygon Masking",
    subtitle: "Annotated high-mount highway guidance structures and variable message displays",
    category: "segmentation",
    categoryLabel: "Polygon & 2D Segmentation",
    disciplines: ["Polygon", "2D Segmentation"],
    image: "/images/i1.jpeg",
    width: 1155,
    height: 655,
    confidence: "99.8%",
    iouScore: "99.4%",
    polygonCount: "38,400 px mask",
    sensorType: "Automotive Monocular 8MP Vision Camera",
    tools: ["CVAT Polygon", "Labelbox", "Photoshop"],
    classes: [
      { name: "High-Mount Direction Sign", color: "#22c55e", count: 3 },
      { name: "Steel Gantry Truss", color: "#94a3b8", count: 4 },
      { name: "Drivable Highway Lane", color: "#c084fc", count: 1 },
      { name: "Expressway Traffic", color: "#00d4ff", count: 7 },
    ],
    description:
      "Pixel-level polygon masking of overhead variable message displays (VMS) and interstate exit guidance signs. Tested and approved for automated highway navigation systems.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Direction Sign Gantry", x: 30, y: 14, w: 40, h: 26, confidence: 99.8 },
      { id: "b2", label: "Highway Vehicle", x: 48, y: 56, w: 12, h: 20, confidence: 99.7 },
    ],
  },

  // 24. Direct Sample I2: Low-Light Road Hazard
  {
    id: "images-i2",
    title: "Low-Light Subterranean Roadway Hazard & Reflector Classification",
    subtitle: "Edge-case perception dataset for subterranean autonomous transit",
    category: "segmentation",
    categoryLabel: "2D Segmentation & Road Hazard",
    disciplines: ["2D Segmentation", "Bounding box"],
    image: "/images/i2.jpeg",
    width: 1049,
    height: 592,
    confidence: "99.7%",
    iouScore: "99.1%",
    polygonCount: "41,200 px mask",
    sensorType: "Low-Light HDR Automotive Camera",
    tools: ["CVAT", "Labelbox", "Photoshop"],
    classes: [
      { name: "Tunnel Drivable Core", color: "#c084fc", count: 1 },
      { name: "Wall Hazards & Reflectors", color: "#f43f5e", count: 12 },
      { name: "Overhead Lighting Bank", color: "#fbbf24", count: 16 },
    ],
    description:
      "Challenging subterranean tunnel scene requiring precision road hazard labeling under low-light high-contrast conditions. Provides ground-truth training data for optical edge cases.",
    qaPassed: true,
    boxes: [
      { id: "b1", label: "Tunnel Drivable Lane", x: 26, y: 52, w: 46, h: 38, confidence: 99.8 },
      { id: "b2", label: "Reflective Hazard Marker", x: 12, y: 64, w: 8, h: 14, confidence: 99.7 },
    ],
  },
];
