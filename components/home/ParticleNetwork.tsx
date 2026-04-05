"use client";

import { useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════
// Interactive Network Visualization
// - Fixed network nodes with labels (router, switch, cloud…)
// - Edges between nodes with animated data packets flowing
// - Mouse proximity creates temporary connections + glow
// - Ambient floating particles for depth
// - 60fps Canvas rendering, reduced-motion aware
// ═══════════════════════════════════════════════════════════

const ACCENT = { r: 56, g: 189, b: 248 }; // #38BDF8
const ACCENT2 = { r: 125, g: 211, b: 252 }; // #7DD3FC
const WHITE = { r: 255, g: 255, b: 255 };

// ── Network Topology ──
interface NetNode {
  id: string;
  label: string;
  x: number; // 0-1 normalized
  y: number; // 0-1 normalized
  r: number;
  isPrimary: boolean;
}

const NODES: NetNode[] = [
  { id: "core", label: "CORE", x: 0.5, y: 0.45, r: 14, isPrimary: true },
  { id: "cloud", label: "CLOUD", x: 0.5, y: 0.08, r: 10, isPrimary: true },
  { id: "wan", label: "WAN", x: 0.85, y: 0.2, r: 9, isPrimary: false },
  { id: "fw", label: "FIREWALL", x: 0.82, y: 0.52, r: 9, isPrimary: false },
  { id: "lan", label: "LAN", x: 0.72, y: 0.78, r: 9, isPrimary: false },
  { id: "vpn", label: "VPN", x: 0.42, y: 0.82, r: 8, isPrimary: false },
  { id: "ids", label: "IDS", x: 0.2, y: 0.7, r: 8, isPrimary: false },
  { id: "dmz", label: "DMZ", x: 0.15, y: 0.38, r: 9, isPrimary: false },
  { id: "sw", label: "SWITCH", x: 0.68, y: 0.32, r: 8, isPrimary: false },
  { id: "ap", label: "AP", x: 0.3, y: 0.22, r: 8, isPrimary: false },
  { id: "srv", label: "SERVER", x: 0.28, y: 0.55, r: 9, isPrimary: true },
  { id: "db", label: "DB", x: 0.58, y: 0.65, r: 8, isPrimary: false },
];

const EDGES: [string, string][] = [
  ["core", "cloud"], ["core", "wan"], ["core", "fw"], ["core", "lan"],
  ["core", "dmz"], ["core", "sw"], ["core", "ap"], ["core", "srv"],
  ["core", "vpn"], ["core", "db"],
  ["cloud", "wan"], ["cloud", "ap"],
  ["fw", "lan"], ["fw", "sw"],
  ["dmz", "ap"], ["dmz", "ids"],
  ["srv", "db"], ["srv", "ids"],
  ["lan", "vpn"], ["vpn", "ids"],
  ["sw", "wan"],
];

// ── Data Packet ──
interface DataPacket {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  color: { r: number; g: number; b: number };
  size: number;
  trail: number;
}

// ── Ambient Particle ──
interface AmbientParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  pulsePhase: number;
}

const AMBIENT_COUNT = 50;
const MOUSE_RADIUS = 200;
const PACKET_COLORS = [
  ACCENT,
  ACCENT2,
  { r: 14, g: 165, b: 233 },  // #0EA5E9
  WHITE,
];

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const packetsRef = useRef<DataPacket[]>([]);
  const ambientRef = useRef<AmbientParticle[]>([]);
  const rafRef = useRef(0);
  const timeRef = useRef(0);
  const reducedMotion = useRef(false);

  const getNodePos = useCallback((node: NetNode, w: number, h: number) => {
    return { x: node.x * w, y: node.y * h };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
    };
    mq.addEventListener("change", handleMotionChange);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Init ambient particles
    const initAmbient = (w: number, h: number) => {
      const particles: AmbientParticle[] = [];
      for (let i = 0; i < AMBIENT_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          r: Math.random() * 1.2 + 0.5,
          opacity: Math.random() * 0.25 + 0.08,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
      ambientRef.current = particles;
    };

    // Spawn data packets
    const spawnPacket = () => {
      const edgeIdx = Math.floor(Math.random() * EDGES.length);
      const reverse = Math.random() > 0.5;
      const [a, b] = EDGES[edgeIdx];
      const fromIdx = NODES.findIndex(n => n.id === (reverse ? b : a));
      const toIdx = NODES.findIndex(n => n.id === (reverse ? a : b));
      if (fromIdx === -1 || toIdx === -1) return;

      packetsRef.current.push({
        fromIdx,
        toIdx,
        progress: 0,
        speed: 0.003 + Math.random() * 0.004,
        color: PACKET_COLORS[Math.floor(Math.random() * PACKET_COLORS.length)],
        size: 2 + Math.random() * 2,
        trail: 0.06 + Math.random() * 0.08,
      });
    };

    // Resize
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (ambientRef.current.length === 0) initAmbient(width, height);
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Packet spawn interval
    const spawnInterval = setInterval(() => {
      if (packetsRef.current.length < 25) {
        spawnPacket();
        // Sometimes spawn 2-3 at once for burst effect
        if (Math.random() > 0.6) spawnPacket();
        if (Math.random() > 0.85) spawnPacket();
      }
    }, 300);

    // Initial packets
    for (let i = 0; i < 12; i++) spawnPacket();

    // ── Animation Loop ──
    const animate = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const mouse = mouseRef.current;
      const time = timeRef.current++;

      ctx.clearRect(0, 0, w, h);

      if (reducedMotion.current) {
        // Static render for reduced motion
        drawStaticNetwork(ctx, w, h);
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // ── 1. Draw ambient particles ──
      const ambient = ambientRef.current;
      for (const p of ambient) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const pulse = Math.sin(time * 0.02 + p.pulsePhase) * 0.5 + 0.5;
        const alpha = p.opacity * (0.6 + pulse * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${alpha})`;
        ctx.fill();
      }

      // ── 2. Draw edges ──
      for (const [aId, bId] of EDGES) {
        const a = NODES.find(n => n.id === aId)!;
        const b = NODES.find(n => n.id === bId)!;
        const pa = getNodePos(a, w, h);
        const pb = getNodePos(b, w, h);

        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.12)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ── 3. Draw data packets (the magic!) ──
      const packets = packetsRef.current;
      for (let i = packets.length - 1; i >= 0; i--) {
        const pkt = packets[i];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        const from = getNodePos(NODES[pkt.fromIdx], w, h);
        const to = getNodePos(NODES[pkt.toIdx], w, h);

        // Current position
        const px = from.x + (to.x - from.x) * pkt.progress;
        const py = from.y + (to.y - from.y) * pkt.progress;

        // Trail (draw multiple points behind)
        const trailSteps = 6;
        for (let t = trailSteps; t >= 0; t--) {
          const tp = Math.max(0, pkt.progress - t * pkt.trail / trailSteps);
          const tx = from.x + (to.x - from.x) * tp;
          const ty = from.y + (to.y - from.y) * tp;
          const trailAlpha = (1 - t / trailSteps) * 0.7;
          const trailSize = pkt.size * (1 - t / trailSteps * 0.6);

          ctx.beginPath();
          ctx.arc(tx, ty, trailSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${pkt.color.r},${pkt.color.g},${pkt.color.b},${trailAlpha})`;
          ctx.fill();
        }

        // Glow around packet head
        ctx.beginPath();
        ctx.arc(px, py, pkt.size * 4, 0, Math.PI * 2);
        const grd = ctx.createRadialGradient(px, py, 0, px, py, pkt.size * 4);
        grd.addColorStop(0, `rgba(${pkt.color.r},${pkt.color.g},${pkt.color.b},0.2)`);
        grd.addColorStop(1, `rgba(${pkt.color.r},${pkt.color.g},${pkt.color.b},0)`);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // ── 4. Draw nodes ──
      for (const node of NODES) {
        const pos = getNodePos(node, w, h);
        const isCore = node.id === "core";

        // Pulse ring for primary nodes
        if (node.isPrimary) {
          const pulseSize = node.r + 8 + Math.sin(time * 0.03 + NODES.indexOf(node)) * 4;
          const pulseAlpha = 0.15 + Math.sin(time * 0.03 + NODES.indexOf(node)) * 0.1;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, pulseSize, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${pulseAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Node halo
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, node.r + (isCore ? 8 : 5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${isCore ? 0.08 : 0.04})`;
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${isCore ? 0.9 : 0.6})`;
        ctx.fill();

        // Inner bright dot
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, node.r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${isCore ? 0.8 : 0.5})`;
        ctx.fill();

        // Node glow
        if (isCore) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, node.r * 2.5, 0, Math.PI * 2);
          const coreGlow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, node.r * 2.5);
          coreGlow.addColorStop(0, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.15)`);
          coreGlow.addColorStop(1, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0)`);
          ctx.fillStyle = coreGlow;
          ctx.fill();
        }

        // Label
        const labelY = pos.y - node.r - 10;
        ctx.font = `${isCore ? 600 : 500} ${isCore ? 9 : 7.5}px ui-monospace, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Label background pill
        const textWidth = ctx.measureText(node.label).width;
        const pillW = textWidth + 12;
        const pillH = isCore ? 16 : 14;
        ctx.beginPath();
        ctx.roundRect(pos.x - pillW / 2, labelY - pillH / 2, pillW, pillH, pillH / 2);
        ctx.fillStyle = "rgba(9,9,11,0.85)";
        ctx.fill();
        ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.2)`;
        ctx.lineWidth = 0.7;
        ctx.stroke();

        ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${isCore ? 0.9 : 0.65})`;
        ctx.fillText(node.label, pos.x, labelY);
      }

      // ── 5. Mouse interaction ──
      if (mouse.x > -9000) {
        // Draw connections from mouse to nearby nodes
        for (const node of NODES) {
          const pos = getNodePos(node, w, h);
          const dx = mouse.x - pos.x;
          const dy = mouse.y - pos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS) {
            const alpha = (1 - dist / MOUSE_RADIUS) * 0.5;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(pos.x, pos.y);
            ctx.strokeStyle = `rgba(${ACCENT2.r},${ACCENT2.g},${ACCENT2.b},${alpha})`;
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Highlight the node
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, node.r + 3, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${ACCENT2.r},${ACCENT2.g},${ACCENT2.b},${alpha * 0.8})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }

        // Mouse glow
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.7)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 35, 0, Math.PI * 2);
        const mouseGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 35);
        mouseGrad.addColorStop(0, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.15)`);
        mouseGrad.addColorStop(1, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0)`);
        ctx.fillStyle = mouseGrad;
        ctx.fill();

        // Ambient particles react to mouse
        for (const p of ambient) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 0) {
            const force = (1 - dist / 150) * 0.02;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
          // Damping
          p.vx *= 0.995;
          p.vy *= 0.995;
        }
      }

      // ── 6. Status HUD ──
      drawHUD(ctx, time);

      rafRef.current = requestAnimationFrame(animate);
    };

    // Static render for reduced motion
    const drawStaticNetwork = (c: CanvasRenderingContext2D, w: number, h: number) => {
      for (const [aId, bId] of EDGES) {
        const a = NODES.find(n => n.id === aId)!;
        const b = NODES.find(n => n.id === bId)!;
        const pa = getNodePos(a, w, h);
        const pb = getNodePos(b, w, h);
        c.beginPath();
        c.moveTo(pa.x, pa.y);
        c.lineTo(pb.x, pb.y);
        c.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.1)`;
        c.lineWidth = 1;
        c.stroke();
      }
      for (const node of NODES) {
        const pos = getNodePos(node, w, h);
        c.beginPath();
        c.arc(pos.x, pos.y, node.r, 0, Math.PI * 2);
        c.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.5)`;
        c.fill();
      }
    };

    // HUD overlay
    const drawHUD = (c: CanvasRenderingContext2D, t: number) => {
      // Status panel — top right area of network
      const hudX = 16;
      const hudY = 16;

      c.beginPath();
      c.roundRect(hudX, hudY, 140, 56, 8);
      c.fillStyle = "rgba(17,17,19,0.88)";
      c.fill();
      c.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.12)`;
      c.lineWidth = 0.7;
      c.stroke();

      // Blinking dot
      const blink = Math.sin(t * 0.05) * 0.5 + 0.5;
      c.beginPath();
      c.arc(hudX + 14, hudY + 18, 3.5, 0, Math.PI * 2);
      c.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${0.4 + blink * 0.6})`;
      c.fill();

      c.font = "600 9px ui-monospace, monospace";
      c.textAlign = "left";
      c.textBaseline = "middle";
      c.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.9)`;
      c.fillText("NETWORK LIVE", hudX + 24, hudY + 18);

      c.font = "500 8px ui-monospace, monospace";
      c.fillStyle = "rgba(255,255,255,0.3)";
      c.fillText("UPTIME", hudX + 12, hudY + 38);
      c.fillStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.8)`;
      c.fillText("99.97%", hudX + 62, hudY + 38);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(spawnInterval);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      mq.removeEventListener("change", handleMotionChange);
    };
  }, [getNodePos]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ pointerEvents: "auto" }}
    />
  );
}
