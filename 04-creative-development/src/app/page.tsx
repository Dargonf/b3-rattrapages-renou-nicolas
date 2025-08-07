"use client";
import { useEffect } from "react";
import "destyle.css";
import "./page.css";
import FlipCard from "@/components/FlipCard";

const platsAssocies: Record<string, { img: string; nom: string; desc: string }> = {
  Anxiété: {
    img: "/img/gratin.webp",
    nom: "Gratin de macaronis",
    desc: "Un classique réconfortant pour apaiser les tensions.",
  },
  Envie: {
    img: "/img/macaron.avif",
    nom: "Macarons multicolores",
    desc: "Gourmands et irrésistibles, comme l'envie.",
  },
  Embarras: {
    img: "/img/veloute.avif",
    nom: "Velouté potiron-châtaigne",
    desc: "Un velouté tout en douceur pour se faire tout petit.",
  },
  Ennui: {
    img: "/img/pizza.webp",
    nom: "Pizza 4 fromages",
    desc: "On la connaît par cœur… et pourtant, on y revient toujours.",
  },
};

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

    const cards = document.querySelectorAll(".flip-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", (e) => {
        const emotion = (card as HTMLElement).dataset.name;
        const plat = platsAssocies[emotion ?? ""];

        if (plat) {
          const bubble = document.getElementById("plat-bubble") as HTMLElement;
          const img = document.getElementById("plat-img") as HTMLImageElement;
          const name = document.getElementById("plat-name") as HTMLElement;
          const desc = document.getElementById("plat-desc") as HTMLElement;

          const rect = (card as HTMLElement).getBoundingClientRect();
          bubble.style.left = `${rect.right + 10}px`;
          bubble.style.top = `${rect.top}px`;
          bubble.classList.remove("hidden");

          img.src = plat.img;
          img.alt = plat.nom;
          name.textContent = plat.nom;
          desc.textContent = plat.desc;
        }
      });

      card.addEventListener("mouseleave", () => {
        const bubble = document.getElementById("plat-bubble") as HTMLElement;
        bubble.classList.add("hidden");
      });
    });

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="app">
      <canvas id="canvas" className="absolute z-0"></canvas>

      <div className="absolute z-1 top-80 left-100 hover:z-20 flip-card" data-name="Embarras">
        <FlipCard tranparentImage="/img/embarras.png" fullImage="/img/embarras.jpg" name="Embarras" />
      </div>

      <div className="absolute z-1 top-100 left-310 flip-card" data-name="Ennui">
        <FlipCard tranparentImage="/img/ennui.png" fullImage="/img/ennui.jpg" name="Ennui" />
      </div>

      <div className="absolute z-1 top-120 left-215 hover:z-20 flip-card" data-name="Envie">
        <FlipCard tranparentImage="/img/envie.png" fullImage="/img/envie.jpg" name="Envie" />
      </div>

      <div className="absolute z-20 top-110 left-10 flip-card" data-name="Anxiété">
        <FlipCard tranparentImage="/img/anxiete.png" fullImage="/img/anxiete.jpg" name="Anxiété" />
      </div>

      <canvas id="canvas-left" className="absolute z-10 pointer-events-none"></canvas>

      <div id="plat-bubble" className="hidden fixed z-50 bg-white/90 rounded-full p-4 w-96 text-center shadow-lg transition-all duration-300 ease-in-out">
        <img id="plat-img" src="null" alt="" className="w-24 h-24 mx-auto rounded-full object-cover mb-2" />
        <h4 id="plat-name" className="font-bold text-md"></h4>
        <p id="plat-desc" className="text-sm text-gray-700"></p>
      </div>
    </div>
  );
}
