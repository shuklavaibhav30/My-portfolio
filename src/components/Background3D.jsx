import { useEffect, useRef } from 'react';

export default function Background3D({ isMobile }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Helper to draw clean hexagon
    const drawHexagon = (cx, cy, r) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    // Fixed, carefully placed geometric shapes at balanced positions (margins, corners)
    // Completely stable: never moving, drifting, or jumping with mouse movement
    const fixedShapes = [
      { xRatio: 0.05, yRatio: 0.12, size: 22, type: 'cube', color: '#e86c60', rotation: 0.25, alpha: 0.22 },
      { xRatio: 0.94, yRatio: 0.08, size: 18, type: 'circle', color: '#4ade80', rotation: 0, alpha: 0.2 },
      { xRatio: 0.48, yRatio: 0.04, size: 14, type: 'cube', color: '#ffd6ce', rotation: 0.4, alpha: 0.28 },
      { xRatio: 0.03, yRatio: 0.42, size: 24, type: 'circle', color: '#3e6356', rotation: 0, alpha: 0.18 },
      { xRatio: 0.96, yRatio: 0.38, size: 20, type: 'cube', color: '#ffd6ce', rotation: 0.6, alpha: 0.25 },
      { xRatio: 0.52, yRatio: 0.52, size: 16, type: 'cube', color: '#cfe2e8', rotation: 0.15, alpha: 0.22 },
      { xRatio: 0.08, yRatio: 0.72, size: 22, type: 'cube', color: '#3e6356', rotation: 0.5, alpha: 0.2 },
      { xRatio: 0.92, yRatio: 0.76, size: 20, type: 'circle', color: '#e86c60', rotation: 0, alpha: 0.2 },
      { xRatio: 0.45, yRatio: 0.88, size: 18, type: 'circle', color: '#4ade80', rotation: 0, alpha: 0.18 },
      { xRatio: 0.04, yRatio: 0.94, size: 20, type: 'cube', color: '#ffd6ce', rotation: 0.3, alpha: 0.24 },
      { xRatio: 0.95, yRatio: 0.95, size: 24, type: 'cube', color: '#cfe2e8', rotation: 0.7, alpha: 0.2 },
    ];

    const drawStaticBackground = () => {
      if (!canvas) return;
      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);

      ctx.clearRect(0, 0, width, height);

      const isDark =
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        (!document.documentElement.getAttribute('data-theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);

      // 1. Subtle warm Hacktoberfest ambient glows
      const grad1 = ctx.createRadialGradient(
        width * 0.15,
        height * 0.2,
        0,
        width * 0.15,
        height * 0.2,
        width * 0.45
      );
      grad1.addColorStop(
        0,
        isDark ? 'rgba(232, 108, 96, 0.08)' : 'rgba(232, 108, 96, 0.035)'
      );
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.85,
        height * 0.7,
        0,
        width * 0.85,
        height * 0.7,
        width * 0.5
      );
      grad2.addColorStop(
        0,
        isDark ? 'rgba(62, 99, 86, 0.12)' : 'rgba(62, 99, 86, 0.045)'
      );
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Stable Hexagonal Honeycomb Grid (Calm & Non-Moving)
      const hexRadius = isMobile ? 38 : 52;
      const hexHeight = Math.sqrt(3) * hexRadius;
      const hexWidth = 2 * hexRadius;
      const xSpacing = hexWidth * 0.75;
      const ySpacing = hexHeight;

      ctx.save();
      const baseLineColor = isDark
        ? 'rgba(246, 244, 238, 0.045)'
        : 'rgba(28, 28, 28, 0.035)';
      ctx.strokeStyle = baseLineColor;
      ctx.lineWidth = 1;

      const cols = Math.ceil(width / xSpacing) + 2;
      const rows = Math.ceil(height / ySpacing) + 2;

      for (let col = -1; col < cols; col++) {
        const cx = col * xSpacing;
        const yOffset = col % 2 === 0 ? 0 : ySpacing / 2;
        for (let row = -1; row < rows; row++) {
          const cy = row * ySpacing + yOffset;
          drawHexagon(cx, cy, hexRadius - 1);
          ctx.stroke();
        }
      }
      ctx.restore();

      // 3. Stable Geometric Shapes (Fixed, Non-Moving, High UX Quality)
      fixedShapes.forEach((s) => {
        const x = s.xRatio * width;
        const y = s.yRatio * height;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = isDark ? s.alpha * 0.75 : s.alpha;

        if (s.type === 'cube') {
          // Sharp neo-brutalist square with crisp border
          ctx.fillStyle = s.color;
          ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size);
          ctx.strokeStyle = isDark ? '#ffffff' : '#1c1c1c';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
        } else {
          // Clean neo-brutalist circle with crisp border
          ctx.beginPath();
          ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.fill();
          ctx.strokeStyle = isDark ? '#ffffff' : '#1c1c1c';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.restore();
      });
    };

    drawStaticBackground();

    const handleResize = () => {
      drawStaticBackground();
    };

    window.addEventListener('resize', handleResize);

    // Re-draw if theme changes (Light/Dark toggle)
    const observer = new MutationObserver(() => {
      drawStaticBackground();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
