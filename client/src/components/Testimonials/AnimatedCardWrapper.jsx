// AnimatedCardWrapper.jsx
import React from "react";
import { useSpring, a } from "@react-spring/three";

const AnimatedCardWrapper = ({
  children,
  triggerDelete,
  onDeleteAnimationEnd,
}) => {
  const { scale, opacity, positionY, rotation } = useSpring({
    scale: triggerDelete ? 0 : 1,
    opacity: triggerDelete ? 0 : 1,
    positionY: triggerDelete ? -5 : 0,
    rotation: triggerDelete ? [Math.PI / 8, 0, 0] : [0, 0, 0],
    config: { tension: 300, friction: 30 },
    onRest: () => {
      if (triggerDelete) {
        onDeleteAnimationEnd && onDeleteAnimationEnd();
      }
    },
  });

  return (
    <a.group scale={scale} position-y={positionY} rotation={rotation}>
      <a.group style={{ opacity }}>{children}</a.group>
    </a.group>
  );
};

export default AnimatedCardWrapper;
