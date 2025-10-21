import { useEffect, useRef } from 'react';

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const cyberSymbols = ['⚡', '🔒', '🛡️', '⚠️', '🔐', '💻', '🌐'];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      symbol: string;
      opacity: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        symbol: cyberSymbols[Math.floor(Math.random() * cyberSymbols.length)],
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const hexLines: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      progress: number;
      speed: number;
    }> = [];

    for (let i = 0; i < 15; i++) {
      const x1 = Math.random() * canvas.width;
      const y1 = Math.random() * canvas.height;
      const angle = Math.random() * Math.PI * 2;
      const length = Math.random() * 200 + 100;

      hexLines.push({
        x1,
        y1,
        x2: x1 + Math.cos(angle) * length,
        y2: y1 + Math.sin(angle) * length,
        progress: 0,
        speed: Math.random() * 0.01 + 0.005
      });
    }

    function draw() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      particles.forEach(particle => {
        ctx.font = '20px Arial';
        ctx.fillStyle = `rgba(96, 165, 250, ${particle.opacity})`;
        ctx.fillText(particle.symbol, particle.x, particle.y);

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.opacity = Math.sin(Date.now() * 0.001 + particle.x) * 0.3 + 0.4;
      });

      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 2;

      hexLines.forEach(line => {
        line.progress += line.speed;
        if (line.progress > 1) {
          line.progress = 0;
          line.x1 = Math.random() * canvas.width;
          line.y1 = Math.random() * canvas.height;
          const angle = Math.random() * Math.PI * 2;
          const length = Math.random() * 200 + 100;
          line.x2 = line.x1 + Math.cos(angle) * length;
          line.y2 = line.y1 + Math.sin(angle) * length;
        }

        const currentX = line.x1 + (line.x2 - line.x1) * line.progress;
        const currentY = line.y1 + (line.y2 - line.y1) * line.progress;

        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
        ctx.beginPath();
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-40"
      style={{ pointerEvents: 'none' }}
    />
  );
}
