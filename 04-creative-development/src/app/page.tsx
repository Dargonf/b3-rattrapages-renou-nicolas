"use client";
import { useEffect } from "react";
import "destyle.css";
import "./page.css";
import FlipCard from "@/components/FlipCard";

function addBackgroundImage(context: CanvasRenderingContext2D, img: string) {
  const base_image = new Image();
  base_image.src = img;
  base_image.onload = function () {
    context.drawImage(base_image, 0, 0);
  };
}

function drawClick(x: number, y: number, context: CanvasRenderingContext2D) {
  context.beginPath();
  context.arc(x, y, 3, 0, 2 * Math.PI);
  context.fillStyle = "blue";
  context.fill();
  console.log(x, y);
}

export default function Home() {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvasLeft = document.getElementById("canvas-left") as HTMLCanvasElement;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasLeft.width = window.innerWidth;
    canvasLeft.height = window.innerHeight;

    const context = canvas.getContext("2d");
    const contextLeft = canvasLeft.getContext("2d");

    if (!context || !contextLeft) return;

    addBackgroundImage(context, "./img/background.jpeg");
    addBackgroundImage(contextLeft, "./img/background-left.png");

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
      <canvas id="canvas" className="absolute z-0"></canvas>

      <div className="absolute z-1 top-80 left-100 hover:z-20">
        <FlipCard tranparentImage="/img/embarras.png" fullImage="/img/embarras.jpg" name="Embarras" />
      </div>

      <div className="absolute z-1 top-100 left-310">
        <FlipCard tranparentImage="/img/ennui.png" fullImage="/img/ennui.jpg" name="Ennui" />
      </div>
      <canvas id="canvas-left" className="absolute z-10 pointer-events-none"></canvas>
    </div>
  );
}
