import { useEffect, useRef } from 'react';
import useMousePosition from '../hooks/useMousePosition';
import useReducedMotion from '../hooks/useReducedMotion';

export default function Background3D({ isMobile }) {
  const canvasRef = useRef(null);
  const mousePosition = useMousePosition();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // 3D Particle Constellation Node Settings
    const particleCount = isMobile ? 35 : 80;
    const fov = 350;
    const particles = [];
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#3b82f6'];

    // Initialize 3D particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 - 200,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.55 + 0.3,
      });
    }

    // Camera 3D rotation angles
    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let time = 0;

    const render = () => {
      time += 0.01;

      // Mouse influence on 3D rotation
      if (!isMobile && !prefersReducedMotion) {
        targetRotY = ((mousePosition.x - width / 2) / (width / 2)) * 0.12;
        targetRotX = -((mousePosition.y - height / 2) / (height / 2)) * 0.12;
      }
      rotX += (targetRotX - rotX) * 0.04;
      rotY += (targetRotY - rotY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Render Soft Volumetric Glowing Nebulae Orbs (NO VERTICAL LINES)
      const nebulae = [
        { x: width * 0.25, y: height * 0.3, r: width * 0.3, color: 'rgba(99, 102, 241, 0.12)' },
        { x: width * 0.75, y: height * 0.65, r: width * 0.35, color: 'rgba(139, 92, 246, 0.10)' },
        { x: width * 0.5, y: height * 0.5, r: width * 0.25, color: 'rgba(236, 72, 153, 0.07)' },
      ];

      nebulae.forEach((n) => {
        const pulse = Math.sin(time + n.x * 0.001) * 20;
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r + pulse);
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      // Projected 2D points storage
      const projectedPoints = [];

      // Update & Render 3D Particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;

          const maxDistX = width * 0.75;
          const maxDistY = height * 0.75;
          if (p.x < -maxDistX) p.x = maxDistX;
          if (p.x > maxDistX) p.x = -maxDistX;
          if (p.y < -maxDistY) p.y = maxDistY;
          if (p.y > maxDistY) p.y = -maxDistY;
          if (p.z < -200) p.z = 600;
          if (p.z > 600) p.z = -200;
        }

        // 3D Y Rotation
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const rx = p.x * cosY - p.z * sinY;
        const rz = p.z * cosY + p.x * sinY;

        // 3D X Rotation
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const ry = p.y * cosX - rz * sinX;
        const finalZ = rz * cosX + p.y * sinX;

        // Perspective projection
        const scale = fov / (fov + finalZ + 300);
        if (scale <= 0) continue;

        const projX = rx * scale + width / 2;
        const projY = ry * scale + height / 2;
        const projRadius = Math.max(0.5, p.radius * scale);
        const depthAlpha = Math.min(1, Math.max(0.05, scale * p.alpha * 0.85));

        projectedPoints.push({
          x: projX,
          y: projY,
          z: finalZ,
          color: p.color,
          alpha: depthAlpha,
        });

        // Draw particle node
        ctx.beginPath();
        ctx.arc(projX, projY, projRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = depthAlpha;
        ctx.fill();
      }

      // Draw Constellation Neural Lines
      const maxConnDist = isMobile ? 95 : 140;
      ctx.lineWidth = 0.8;

      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p1 = projectedPoints[i];
          const p2 = projectedPoints[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnDist) {
            const lineAlpha = (1 - dist / maxConnDist) * Math.min(p1.alpha, p2.alpha) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, p1.color);
            grad.addColorStop(1, p2.color);

            ctx.strokeStyle = grad;
            ctx.globalAlpha = lineAlpha;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, mousePosition, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.9,
      }}
    />
  );
}
