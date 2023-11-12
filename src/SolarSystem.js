import React, { useEffect, useState, useRef } from "react";
import "./SolarSystem.css";

const planetsData = [
  { name: "Mercury", radius: 30, distance: 80, color: "gray" },
  { name: "Venus", radius: 50, distance: 120, color: "orange" },
  { name: "Earth", radius: 60, distance: 180, color: "blue" },
  // Add more planets as needed
];

const SolarSystem = () => {
  const canvasRef = useRef(null);
  const [planets, setPlanets] = useState(planetsData);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawPlanet = (planet) => {
      ctx.beginPath();
      ctx.arc(
        planet.distance,
        canvas.height / 2,
        planet.radius,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = planet.color;
      ctx.fill();
      ctx.closePath();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      planets.forEach((planet) => {
        drawPlanet(planet);
      });

      requestAnimationFrame(draw);
    };

    canvas.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const updatedPlanets = planets.map((planet) => {
        const dx = mouseX - planet.distance;
        const dy = mouseY - canvas.height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < planet.radius) {
          return { ...planet, color: getRandomColor() };
        }

        return planet;
      });

      setPlanets(updatedPlanets);
    });

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    window.onload = () => {
      window.dispatchEvent(new Event("resize"));
      draw();
    };

    return () => {
      window.removeEventListener("resize");
      canvas.removeEventListener("click");
    };
  }, [planets]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return <canvas ref={canvasRef} id="solarSystemCanvas"></canvas>;
};

export default SolarSystem;
