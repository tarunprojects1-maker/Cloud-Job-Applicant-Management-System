import "../styles/glass.css";
import "../styles/animations.css";

function Card({ children, className = "", style = {} }) {
  return (
    <div
      className={`glass hover-card ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default Card;