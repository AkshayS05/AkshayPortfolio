import { useEffect, useRef, useState } from "react";
import "./portfolio.css";
import { motion, useInView, useScroll, useTransform } from "motion/react";

const items = [
  {
    id: 1,
    img: "/p1.jpg",
    title: "Full Stack Blog Application",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    link: "/",
  },
  {
    id: 2,
    img: "/p2.jpg",
    title: "School Management System",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    link: "/",
  },
  {
    id: 3,
    img: "/p3.jpg",
    title: "Real-time Chat Application",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    link: "/",
  },
  {
    id: 4,
    img: "/p4.jpg",
    title: "Social Media Project",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    link: "/",
  },
  {
    id: 5,
    img: "/p5.jpg",
    title: "Animated Portfolio Website",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    link: "/",
  },
];

const imgVariants = {
  initial: { x: -500, y: 500, opacity: 0 },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const textVariants = {
  initial: { x: 500, y: 500, opacity: 0 },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut", staggerChildren: 0.05 },
  },
};

const ListItem = ({ item }) => {
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <div className="pItem" ref={ref}>
      <motion.div
        variants={imgVariants}
        animate={isInView ? "animate" : "initial"}
        className="pImg"
      >
        <img src={item.img} alt={item.title} />
      </motion.div>
      <motion.div
        variants={textVariants}
        animate={isInView ? "animate" : "initial"}
        className="pText"
      >
        <motion.h1 variants={textVariants}>{item.title}</motion.h1>
        <motion.p variants={textVariants}>{item.desc}</motion.p>
        <motion.a variants={textVariants} href={item.link}>
          <button>View Project</button>
        </motion.a>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  // Determine if we're on a larger screen (desktop) or mobile/tablet.
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const portfolioRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set up horizontal scrolling logic only for desktop.
  const { scrollYProgress } = useScroll({ target: portfolioRef });
  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -window.innerWidth * items.length]
  );

  return (
    <div className="portfolio" ref={portfolioRef}>
      <motion.div className="pList" style={isDesktop ? { x: xTranslate } : {}}>
        {/* Render the filler element only on desktop */}
        {isDesktop && (
          <div className="empty" style={{ width: window.innerWidth }} />
        )}
        {items.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </motion.div>

      {/* Render extra sections only on desktop to drive the horizontal scroll */}
      {isDesktop && (
        <>
          <section />
          <section />
          <section />
          <section />
          <section />
        </>
      )}

      <div className="pProgress">
        <svg width="100%" height="100%" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#ddd"
            strokeWidth={20}
          />
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#dd4c62"
            strokeWidth={20}
            style={{ pathLength: scrollYProgress }}
            transform="rotate(-90 80 80)"
          />
        </svg>
      </div>
    </div>
  );
};

export default Portfolio;
