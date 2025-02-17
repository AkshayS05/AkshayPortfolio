import { TypeAnimation } from "react-type-animation";
import { motion } from "motion/react";
const Speech = () => {
  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1 }}
      className="bubbleContainer"
    >
      <div className="bubble">
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            1000,
            "I specialize in building scalable, production-ready MERN stack applications that deliver seamless performance.",
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            "Need a custom WordPress theme to enhance your website's speed and user experience? You're in the right place!",
            1000,
          ]}
          wrapper="span"
          speed={40}
          deletionSpeed={60}
          repeat={Infinity}
        />
      </div>
      <img src="man.png" alt="man" />
    </motion.div>
  );
};

export default Speech;
