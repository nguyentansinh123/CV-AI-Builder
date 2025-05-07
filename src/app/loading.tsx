"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";

export default function Loading() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const updateSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", updateSize);
    updateSize();

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 50;

    class Particle {
      x!: number;
      y!: number;
      radius!: number;
      color!: string;
      speedX!: number;
      speedY!: number;
      directionAngle!: number;
      velocity!: number;

      constructor() {
        if (!canvas) return; 
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 5 + 2;
        this.color = isDarkMode 
          ? `hsla(${Math.random() * 60 + 180}, 80%, 60%, ${Math.random() * 0.5 + 0.5})` // Blue spectrum for dark mode
          : `hsla(${Math.random() * 60 + 210}, 80%, 50%, ${Math.random() * 0.5 + 0.5})`; // Blue spectrum for light mode
        this.directionAngle = Math.random() * Math.PI * 2;
        this.velocity = Math.random() * 0.5 + 0.2;
        this.speedX = Math.cos(this.directionAngle) * this.velocity;
        this.speedY = Math.sin(this.directionAngle) * this.velocity;
      }

      update() {
        if (!canvas) return; 
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      if (!canvas || !ctx) return; 
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode 
              ? `rgba(100, 200, 255, ${1 - distance / maxDistance * 0.8})`
              : `rgba(0, 100, 200, ${1 - distance / maxDistance * 0.8})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    const animate = () => {
      if (!canvas || !ctx) return; 
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)";
      ctx.font = "bold 40px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Building Your CV", canvas.width / 2, canvas.height / 2 - 15);
      
      ctx.font = "20px sans-serif";
      ctx.fillText("Loading your professional journey...", canvas.width / 2, canvas.height / 2 + 30);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />
      <div className="z-10 flex flex-col items-center">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 animate-spin">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-300 absolute top-0 left-8" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
            <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-300 absolute bottom-0 right-8" />
          </div>
        </div>
      </div>
    </div>
  );
}