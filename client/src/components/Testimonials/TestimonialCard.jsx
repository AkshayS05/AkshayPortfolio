import { Float, Text, useTexture } from "@react-three/drei";
import FrostedGlass from "./TransparentPlane";
import EditIcon from "./EditIcon";
import DeleteIcon from "./DeleteIcon";

const TestimonialCard = ({
  testimonial,
  username,
  rating,
  position,
  userPic,
  reviewId,
  ownerId,
  currentUserId,
  onEditClick,
  onDeleteClick,
}) => {
  // If ownerId is an object, use its _id property; otherwise, use ownerId
  const isOwner = currentUserId === (ownerId?._id || ownerId);

  const fallbackPic =
    "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png";
  const texture = useTexture(userPic || fallbackPic);

  const maxStars = "★★★★★";
  const displayedStars = maxStars.substring(0, rating);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group position={position}>
        {/* Frosted Glass Background */}
        <FrostedGlass width={9} height={6} position={[0, 0, 0]} />

        {/* Smaller Profile Picture */}
        <mesh position={[-3, 2.3, 0.01]}>
          <circleGeometry args={[0.7, 32]} />
          <meshBasicMaterial map={texture} />
        </mesh>

        {/* Smaller Username */}
        <Text
          position={[2, 2.3, 0.01]}
          fontSize={0.5}
          color="#dd4c62"
          maxWidth={2}
          anchorX="left"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000"
        >
          {username}
        </Text>

        {/* Testimonial Text */}
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.6}
          color="#f0f0f0"
          maxWidth={7.5}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="#000"
        >
          {testimonial}
        </Text>

        {/* Star Rating */}
        <Text
          position={[0, -2, 0.01]}
          fontSize={0.8}
          color="#dd4c62"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000"
        >
          {displayedStars}
        </Text>

        {/* Conditionally render Edit/Delete icons if the user is the owner */}
        {isOwner && (
          <group position={[0, -2.8, 0.02]}>
            <EditIcon
              position={[-1.2, 0, 0]}
              onClick={() => onEditClick({ reviewId, testimonial, rating })}
            />
            <DeleteIcon
              position={[1.2, 0, 0]}
              onClick={() => onDeleteClick(reviewId)}
            />
          </group>
        )}
      </group>
    </Float>
  );
};

export default TestimonialCard;
