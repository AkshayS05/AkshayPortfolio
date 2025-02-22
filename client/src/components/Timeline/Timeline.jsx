import { useRef, useState, useEffect } from "react";
import "./timeline.css";

const experiences = [
  {
    company: "TEJ Electric Ltd.",
    logo: "/public/TejElectric.png",
    startDate: "April 2019",
    endDate: "Dec 2020",
    title: "FrontEnd Developer",
    imageOffset: { x: 0, y: -75 }, // default: 75px above the dot
  },
  {
    company: "Events365Canada",
    logo: "/public/Events-365-Rentals.png",
    startDate: "Jan 2021",
    endDate: "Dec 2021",
    title: "Web Developer",
    imageOffset: { x: 20, y: -80 }, // tweak as needed
  },
  {
    company: "Coding Ninjas",
    logo: "/public/CodingNinjas.png",
    startDate: "Jan 2022",
    endDate: "Present",
    title: "Java Teaching Assistant",
  },
  {
    company: "Ecomtent",
    logo: "/public/Ecomtent.png",
    startDate: "May 2023",
    endDate: "Present",
    title: "Full Stack Developer",
    imageOffset: { x: -15, y: -70 },
  },
  {
    company: "Emkao Foods",
    logo: "/public/EmkaoFoods.png",
    startDate: "May 2023",
    endDate: "Present",
    title: "Full Stack Developer",
    imageOffset: { x: -15, y: -70 },
  },
  {
    company: "FedEx",
    logo: "/public/FedEx.png",
    startDate: "May 2023",
    endDate: "Present",
    title: "Customer Rep Station",
    imageOffset: { x: -15, y: -70 },
  },
];

function Timeline() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const pathRef = useRef(null);
  const [positions, setPositions] = useState([]);

  // Listen for window resize.
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute dot positions along the snake path.
  useEffect(() => {
    if (pathRef.current && experiences.length > 1) {
      const totalLength = pathRef.current.getTotalLength();
      const newPositions = experiences.map((_, i) => {
        const distance = (totalLength / (experiences.length - 1)) * i;
        const point = pathRef.current.getPointAtLength(distance);
        // Dot: exactly on the path.
        return { x: point.x, y: point.y };
      });
      setPositions(newPositions);
    }
  }, [isSmallScreen]);

  // Choose path and viewBox based on screen size.
  const pathD = isSmallScreen
    ? "M 200,50 C 50,200 350,400 200,550 C 50,700 350,900 200,1050"
    : "M 50,200 C 200,50 400,350 550,200 C 700,50 900,350 1050,200";
  // Adjust viewBox to add margin at edges so first and last markers aren’t cut.
  const viewBox = isSmallScreen ? "0 -50 400 1200" : "-50 0 1200 400";

  return (
    <section className="snake-section">
      <h2 className="snake-title">My Journey</h2>
      <svg
        className="snake-svg"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#ccc" />
          </linearGradient>
          <filter id="textGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          ref={pathRef}
          className="snake-path"
          d={pathD}
          stroke="url(#pathGradient)"
        />
        {positions.map((pos, i) => (
          <g key={i}>
            {/* Dot exactly on the snake path */}
            <circle className="experience-dot" cx={pos.x} cy={pos.y} r="5" />
            {/* For vertical layout, offset details 80px to the right;
                for large screens, details remain centered */}
            <g
              className="experience-details"
              transform={isSmallScreen ? `translate(80, 0)` : `translate(0, 0)`}
            >
              <image
                href={experiences[i].logo}
                width="50"
                height="50"
                className="floating-logo"
                x={pos.x}
                y={pos.y}
              />
              <text
                x={pos.x}
                y={pos.y - 85}
                className="timeline-text company"
                textAnchor="middle"
              >
                {experiences[i].company}
              </text>
              <text
                x={pos.x}
                y={pos.y - 65}
                className="timeline-text dates"
                textAnchor="middle"
              >
                {experiences[i].startDate} - {experiences[i].endDate}
              </text>
              <text
                x={pos.x}
                y={pos.y - 45}
                className="timeline-text title"
                textAnchor="middle"
              >
                {experiences[i].title}
              </text>
            </g>
          </g>
        ))}
      </svg>
    </section>
  );
}

export default Timeline;
