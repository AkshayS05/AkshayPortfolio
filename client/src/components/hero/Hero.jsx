import { Canvas } from "@react-three/fiber";
import "./hero.css";
import Speech from "./Speech";
import { motion } from "motion/react";
import Shape from "./Shape";
import { Suspense } from "react";

const awardVariants = {
  initial: { x: -100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.2 },
  },
};
const followVariants = {
  initial: { y: -100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.2 },
  },
};

const Hero = ({ user, onAuthOpen, onReviewOpen, onLogout }) => (
  <div className="hero">
    <div className="hSection left">
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="hTitle"
      >
        Hey {user?.name || "There"}, <br />
        I'm Akshay!
      </motion.h1>
      {console.log(user)}
      <motion.div
        variants={awardVariants}
        initial="initial"
        animate="animate"
        className="awards"
      >
        <motion.h2>Top rated developer</motion.h2>
        <motion.p variants={awardVariants}>
          I'm a passionate web developer with an Electrical Engineering
          background and a full‑stack cloud certification from Humber College. I
          specialize in the MERN stack, JavaScript, HTML/CSS, and modern UI
          frameworks.
        </motion.p>
        <motion.div variants={awardVariants} className="awardList">
          <motion.img variants={awardVariants} src="award1.png" alt="Award 1" />
          <motion.img variants={awardVariants} src="award2.png" alt="Award 2" />
          <motion.img variants={awardVariants} src="award3.png" alt="Award 3" />
        </motion.div>
      </motion.div>
      {/* 3D Auth Controls placed below Top rated developer */}
      <motion.div
        className="auth-controls"
        initial={{ opacity: 0, y: 50, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1 }}
        whileHover={{ rotateX: 5 }}
      >
        {!user ? (
          <button className="auth-btn" onClick={onAuthOpen}>
            Login / Register
          </button>
        ) : (
          <>
            <button className="auth-btn" onClick={onReviewOpen}>
              ⭐ Review My Services
            </button>
            <button className="auth-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </motion.div>
      <motion.a
        animate={{ y: [0, 5], opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        href="#services"
        className="scroll"
      >
        <svg
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={{ y: [0, 5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            d="M5 9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9Z"
            stroke="white"
            strokeWidth="1"
          />
          <circle cx="12" cy="12" r="3" fill="white">
            <animate
              attributeName="cy"
              from="12"
              to="18"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </motion.a>
    </div>

    <div className="hSection right">
      <motion.div
        variants={followVariants}
        initial="initial"
        animate="animate"
        className="follow"
      >
        <motion.a
          variants={followVariants}
          href="https://www.instagram.com/byte_book_exchange?igsh=cjFtcnF1dm1lcDF0"
        >
          <img src="/instagram.png" alt="instagram" />
        </motion.a>
        <motion.a
          variants={followVariants}
          href="https://www.linkedin.com/in/akshaysharma05/"
        >
          <img src="/linkedin.png" alt="linkedin" />
        </motion.a>
        <motion.a
          variants={followVariants}
          href="https://www.youtube.com/@masteringieltsexam3945"
        >
          <img src="/youtube.png" alt="youtube" />
        </motion.a>
        <motion.div variants={followVariants} className="followTextContainer">
          <div className="followText">Follow Me</div>
        </motion.div>
      </motion.div>

      <Speech />

      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1 }}
        className="certificate"
      >
        <img src="/certificate.png" alt="certificate" />
        Certified Developer
        <br />
        Professional
        <br />
        UI Designer
      </motion.div>

      <motion.a
        animate={{ x: [200, 0], opacity: [0, 1] }}
        transition={{ duration: 2 }}
        href="/#contact"
        className="contactLink"
      >
        <motion.div
          className="contactButton"
          animate={{ rotate: [0, 360] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 200 200" width="150" height="150">
            <circle cx="100" cy="100" r="90" fill="pink" />
            <path
              id="innerCirclePath"
              fill="none"
              d="M 100,100 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
            />
            <text className="circleText">
              <textPath href="#innerCirclePath">Hire Now .</textPath>
            </text>
            <text className="circleText">
              <textPath href="#innerCirclePath" startOffset="44%">
                Contact Me .
              </textPath>
            </text>
          </svg>
          <div className="arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="black"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </div>
        </motion.div>
      </motion.a>
    </div>

    <div className="bg">
      <Canvas>
        <Suspense fallback="Loading...">
          <Shape />
        </Suspense>
      </Canvas>
      <div className="hImg">
        <img src="/hero.png" alt="main-image" />
      </div>
    </div>
  </div>
);

export default Hero;
