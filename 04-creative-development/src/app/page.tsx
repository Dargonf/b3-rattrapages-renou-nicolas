"use client";
import { useEffect } from "react";
import "destyle.css";
import "./page.css";

function addBackgroundImage(context: CanvasRenderingContext2D) {
  const base_image = new Image();
  base_image.src = "./img/background.jpeg";
  base_image.onload = function () {
    context.drawImage(base_image, 0, 0);
  };
}

function drawClick(x: number, y: number, context: CanvasRenderingContext2D) {
  context.beginPath();
  context.arc(x, y, 3, 0, 2 * Math.PI);
  context.fillStyle = "blue";
  context.fill();
}

export default function Home() {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");

    if (!context) return;

    addBackgroundImage(context);

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      drawClick(x, y, context);
    };

    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="app">
      <canvas id="canvas"></canvas>
    </div>
  );
}
