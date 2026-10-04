export default function TrustMarquee() {
  const items = [
    "3D LiDAR Point Clouds",
    "2D Image Segmentation",
    "Semantic Segmentation",
    "Instance Segmentation",
    "Bounding Box (2D & 3D Cuboids)",
    "Polygon Vector Contours",
    "Data Entry & Cleansing",
    "Virtual Assistant Services",
    "9-DOF Heading Orientations",
    "Sub-Pixel Edge Precision",
    "CVAT & Labelbox Toolchains",
    "99.8% Ground Truth QA",
  ];

  // Duplicate the list for seamless looping
  const doubled = [...items, ...items];

  return (
    <div className="w-full py-5 md:py-6 bg-surface-container-low/50 border-y border-white/[0.04] overflow-hidden relative">
      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-surface-container-lowest to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-surface-container-lowest to-transparent z-10 pointer-events-none"></div>

      <div className="flex animate-marquee w-max">
        {doubled.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="flex items-center gap-3 px-6 md:px-8 shrink-0"
          >
            <span className="w-1 h-1 rounded-full bg-primary/50"></span>
            <span className="font-label-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted whitespace-nowrap">
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
