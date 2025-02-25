import { useRef, useState, useEffect } from "react";
import "./timeline.css";

const experiences = [
  {
    company: "TEJ Electric Ltd.",
    logo: "TejElectric.png",
    startDate: "April 2019",
    endDate: "July 2020",
    title: "FrontEnd Developer",
    imageOffset: { x: -40, y: -75 },
  },
  {
    company: "Events365Canada",
    logo: "Events-365-Rentals.png",
    startDate: "July 2020",
    endDate: "Mar 2021",
    title: "Web Developer",
    imageOffset: { x: -20, y: -80 },
  },
  {
    company: "Coding Ninjas",
    logo: "CodingNinjas.png",
    startDate: "Mar 2021",
    endDate: "Dec 2021",
    title: "Java Teaching Assistant",
    imageOffset: { x: -20, y: -80 },
  },
  {
    company: "Ecomtent",
    logo: "Ecomtent.png",
    startDate: "Jan 2023",
    endDate: "Feb 2024",
    title: "Full Stack Developer",
    imageOffset: { x: -15, y: -70 },
  },
  {
    company: "Emkao Foods",
    logo: "EmkaoFoods.png",
    startDate: "Feb 2024",
    endDate: "Present",
    title: "Full Stack Developer",
    imageOffset: { x: -15, y: -70 },
  },
  {
    company: "FedEx",
    logo: "FedEx.png",
    startDate: "Sept 2024",
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
        return { x: point.x, y: point.y };
      });
      setPositions(newPositions);
    }
  }, [isSmallScreen]);

  // Choose path and viewBox based on screen size.
  const pathD = isSmallScreen
    ? "M 200,50 C 50,200 350,400 200,550 C 50,700 350,900 200,1050"
    : "M 50,200 C 200,50 400,350 550,200 C 700,50 900,350 1050,200";
  const viewBox = isSmallScreen ? "-15 -50 400 1200" : "-50 0 1200 400";

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
        {positions.map((pos, i) => {
          // For larger screens, use your existing centered layout.
          if (!isSmallScreen) {
            const isOdd = i % 2 === 0;
            const imageOffsetX = experiences[i].imageOffset
              ? experiences[i].imageOffset.x
              : 0;
            const imageY = isOdd ? pos.y - 70 : pos.y + 60;
            return (
              <g key={i}>
                <circle
                  className="experience-dot"
                  cx={pos.x}
                  cy={pos.y}
                  r="5"
                />
                <g className="experience-details" transform="translate(0,0)">
                  {isOdd ? (
                    <>
                      <image
                        href={experiences[i].logo}
                        width="50"
                        height="50"
                        className="floating-logo"
                        x={pos.x + imageOffsetX}
                        y={imageY}
                      />
                      <text
                        x={pos.x}
                        y={pos.y + 40}
                        className="timeline-text company"
                        textAnchor="middle"
                      >
                        {experiences[i].company}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 60}
                        className="timeline-text dates"
                        textAnchor="middle"
                      >
                        {experiences[i].startDate} - {experiences[i].endDate}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 80}
                        className="timeline-text title"
                        textAnchor="middle"
                      >
                        {experiences[i].title}
                      </text>
                    </>
                  ) : (
                    <>
                      <text
                        x={pos.x}
                        y={pos.y - 70}
                        className="timeline-text company"
                        textAnchor="middle"
                      >
                        {experiences[i].company}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y - 50}
                        className="timeline-text dates"
                        textAnchor="middle"
                      >
                        {experiences[i].startDate} - {experiences[i].endDate}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y - 30}
                        className="timeline-text title"
                        textAnchor="middle"
                      >
                        {experiences[i].title}
                      </text>
                      <image
                        href={experiences[i].logo}
                        width="50"
                        height="50"
                        className="floating-logo"
                        x={pos.x + imageOffsetX}
                        y={imageY}
                      />
                    </>
                  )}
                </g>
              </g>
            );
          }

          // For small screens, use an alternating horizontal layout:
          // Odd items: image on left, text on right.
          // Even items: text on left, image on right.
          const isOdd = i % 2 === 0;
          // Define a horizontal margin for small screens.
          const margin = 60; // Adjust this value as needed.
          // Calculate positions:
          let imageX, textX;
          // Center vertical positions for image and text.
          const imageY = pos.y - 25; // assuming image height 50px
          const textY1 = pos.y - 10;
          const textY2 = pos.y + 10;
          const textY3 = pos.y + 30;
          if (isOdd) {
            // Odd: image to left, text to right.
            imageX = pos.x - margin - 50; // image width = 50
            textX = pos.x + margin;
          } else {
            // Even: text to left, image to right.
            imageX = pos.x + margin;
            textX = pos.x - margin - 50;
          }
          return (
            <g key={i}>
              <circle className="experience-dot" cx={pos.x} cy={pos.y} r="5" />
              <g className="experience-details">
                {isOdd ? (
                  <>
                    <image
                      href={experiences[i].logo}
                      width="50"
                      height="50"
                      className="floating-logo"
                      x={imageX}
                      y={imageY}
                    />
                    <text
                      x={textX}
                      y={textY1}
                      className="timeline-text company"
                      textAnchor="start"
                    >
                      {experiences[i].company}
                    </text>
                    <text
                      x={textX}
                      y={textY2}
                      className="timeline-text dates"
                      textAnchor="start"
                    >
                      {experiences[i].startDate} - {experiences[i].endDate}
                    </text>
                    <text
                      x={textX}
                      y={textY3}
                      className="timeline-text title"
                      textAnchor="start"
                    >
                      {experiences[i].title}
                    </text>
                  </>
                ) : (
                  <>
                    <text
                      x={textX}
                      y={textY1}
                      className="timeline-text company"
                      textAnchor="end"
                    >
                      {experiences[i].company}
                    </text>
                    <text
                      x={textX}
                      y={textY2}
                      className="timeline-text dates"
                      textAnchor="end"
                    >
                      {experiences[i].startDate} - {experiences[i].endDate}
                    </text>
                    <text
                      x={textX}
                      y={textY3}
                      className="timeline-text title"
                      textAnchor="end"
                    >
                      {experiences[i].title}
                    </text>
                    <image
                      href={experiences[i].logo}
                      width="50"
                      height="50"
                      className="floating-logo"
                      x={imageX}
                      y={imageY}
                    />
                  </>
                )}
              </g>
            </g>
          );
        })}
      </svg>
    </section>
  );
}

export default Timeline;
