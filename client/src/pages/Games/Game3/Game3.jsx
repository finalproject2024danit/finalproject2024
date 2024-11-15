import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MainContent from "../../../components/MainContent/MainContent";

function Planet({ position, onClick }) {
  return (
    <img
      src="https://cdn3.iconfinder.com/data/icons/unigrid-phantom-science-vol-1/60/003_005_earth_planet_space_cosmos-512.png"
      alt="Planet"
      onClick={onClick}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: "80px",
        height: "80px",
        cursor: "pointer",
      }}
    />
  );
}

// Валідація пропсів для Planet
Planet.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default function Game3() {
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [planetPosition, setPlanetPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isGameActive) {
      const timer = setTimeout(() => {
        setIsGameActive(false);
      }, 30000); // Гра триває 30 секунд

      const movePlanet = () => {
        const x = Math.floor(Math.random() * (window.innerWidth - 100));
        const y = Math.floor(Math.random() * (window.innerHeight - 100));
        setPlanetPosition({ x, y });
      };

      const planetInterval = setInterval(movePlanet, 1500); // Рухається кожні 1.5 секунди

      movePlanet(); // Перемістити планету при старті гри

      return () => {
        clearTimeout(timer);
        clearInterval(planetInterval);
      };
    }
  }, [isGameActive]);

  const startGame = () => {
    setScore(0);
    setIsGameActive(true);
  };

  const handlePlanetClick = () => {
    if (isGameActive) {
      setScore(score + 1);
    }
  };

  return (
    <MainContent title="">
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          position: "relative",
          height: "70vh",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1 style={{ color: "green", fontSize: "30px" }}>Гра &lsquo;Collect the planets&lsquo;</h1>
          <h2 style={{ color: "red", fontSize: "24px" }}>
            Time: {isGameActive ? "30 секунд" : "Гра закінчена"}
          </h2>
          <h3 style={{ color: "white", fontSize: "24px" }}>Points: {score}</h3>
        </div>
        {isGameActive ? (
          <Planet position={planetPosition} onClick={handlePlanetClick} />
        ) : (
          <button
            onClick={startGame}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              backgroundColor: isHovered ? "darkgreen" : "green",
              borderRadius: "5px",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: "20px",
              fontWeight: "600",
              outline: "none",
              padding: "20px 25px",
              textTransform: "capitalize",
              alignItems: "center",
              marginTop: "30px",
              transition: "background-color 0.3s ease, transform 0.3s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            Strart the game
          </button>
        )}
      </div>
    </MainContent>
  );
}
