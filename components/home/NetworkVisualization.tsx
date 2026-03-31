"use client";

import { motion } from "framer-motion";

const NODES = [
  { id: "core", x: 380, y: 310, r: 18,  label: "Core",  pulse: true  },
  { id: "n1",   x: 110, y: 110, r: 11,  label: "WAN",   pulse: false },
  { id: "n2",   x: 580, y: 95,  r: 11,  label: "Cloud", pulse: true  },
  { id: "n3",   x: 680, y: 305, r: 10,  label: "FW",    pulse: false },
  { id: "n4",   x: 565, y: 510, r: 11,  label: "LAN",   pulse: false },
  { id: "n5",   x: 360, y: 565, r: 10,  label: "VPN",   pulse: false },
  { id: "n6",   x: 125, y: 495, r: 10,  label: "IDS",   pulse: false },
  { id: "n7",   x: 50,  y: 305, r: 10,  label: "DMZ",   pulse: false },
  { id: "n8",   x: 490, y: 182, r: 10,  label: "SW",    pulse: true  },
  { id: "n9",   x: 210, y: 188, r: 10,  label: "AP",    pulse: false },
];

// Only animate every other edge — halves the animation count
const EDGES: [string, string][] = [
  ["core","n1"], ["core","n2"], ["core","n3"], ["core","n4"],
  ["core","n5"], ["core","n6"], ["core","n7"], ["core","n8"],
  ["core","n9"], ["n2","n3"],   ["n8","n3"],   ["n1","n7"],
  ["n1","n9"],   ["n4","n5"],   ["n5","n6"],   ["n6","n7"],
];

// Only animate half the edges for flow dots
const ANIMATED_EDGES = EDGES.filter((_, i) => i % 2 === 0);
const FLOW_DUR = [2.8, 3.4, 2.2, 3.8, 2.6, 3.1, 2.4, 3.6];

function getNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export default function NetworkVisualization() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg
        viewBox="0 0 740 650"
        preserveAspectRatio="xMidYMid meet"
        className="w-[82%] h-[82%]"
        aria-hidden="true"
      >
        <defs>
          {/* Single shared glow — cheaper than per-node filters */}
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Edges ── */}
        {EDGES.map(([aId, bId], i) => {
          const a = getNode(aId);
          const b = getNode(bId);
          return (
            <line
              key={`e-${i}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="#38BDF8" strokeWidth="1.2" strokeOpacity="0.18"
            />
          );
        })}

        {/* ── Flow dots — only on half the edges ── */}
        {ANIMATED_EDGES.map(([aId, bId], i) => {
          const a = getNode(aId);
          const b = getNode(bId);
          const dur = FLOW_DUR[i % FLOW_DUR.length];
          return (
            <circle key={`f-${i}`} r="3" fill="#38BDF8">
              <animate attributeName="cx" values={`${a.x};${b.x};${a.x}`} dur={`${dur}s`} repeatCount="indefinite" begin={`${i * 0.45}s`} />
              <animate attributeName="cy" values={`${a.y};${b.y};${a.y}`} dur={`${dur}s`} repeatCount="indefinite" begin={`${i * 0.45}s`} />
              <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.1;0.9;1" dur={`${dur}s`} repeatCount="indefinite" begin={`${i * 0.45}s`} />
            </circle>
          );
        })}

        {/* ── Nodes ── */}
        {NODES.map((node) => {
          const isCore = node.id === "core";
          const pillW = isCore ? 52 : 44;
          const pillH = isCore ? 20 : 18;

          return (
            <g key={node.id}>
              {/* Pulse ring — only on 3 nodes */}
              {node.pulse && (
                <circle cx={node.x} cy={node.y} fill="none" stroke="#38BDF8" strokeWidth="1.5" opacity="0">
                  <animate attributeName="r"       values={`${node.r + 4};${node.r + 28}`} dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.45;0"                           dur="3s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Halo — no filter */}
              <circle
                cx={node.x} cy={node.y}
                r={node.r + (isCore ? 12 : 7)}
                fill={isCore ? "rgba(56,189,248,0.12)" : "rgba(56,189,248,0.06)"}
              />

              {/* Dot — single shared filter */}
              <circle
                cx={node.x} cy={node.y} r={node.r}
                fill="#38BDF8"
                fillOpacity={isCore ? 1 : 0.85}
                filter="url(#nodeGlow)"
              />

              {/* Label pill */}
              <rect
                x={node.x - pillW / 2}
                y={node.y - node.r - pillH - 6}
                width={pillW} height={pillH}
                rx={pillH / 2}
                fill="rgba(9,9,11,0.85)"
                stroke="rgba(56,189,248,0.25)"
                strokeWidth="1"
              />
              <text
                x={node.x}
                y={node.y - node.r - 6 - pillH / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={isCore ? "11" : "10"}
                fontFamily="ui-monospace, monospace"
                fontWeight={isCore ? "700" : "500"}
                fill={isCore ? "#38BDF8" : "rgba(56,189,248,0.9)"}
                letterSpacing="0.08em"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* ── Status panel ── */}
        <g transform="translate(18, 18)">
          <rect width="152" height="80" rx="10"
            fill="rgba(17,17,19,0.9)" stroke="rgba(56,189,248,0.2)" strokeWidth="1" />
          <circle cx="18" cy="21" r="5" fill="#38BDF8">
            <animate attributeName="opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <text x="30" y="25" fontSize="11" fontFamily="ui-monospace,monospace" fontWeight="600" fill="rgba(56,189,248,0.95)">NETWORK LIVE</text>
          <text x="14" y="46" fontSize="10" fontFamily="ui-monospace,monospace" fill="rgba(255,255,255,0.4)">NODES</text>
          <text x="80" y="46" fontSize="10" fontFamily="ui-monospace,monospace" fontWeight="600" fill="rgba(56,189,248,0.85)">10 ACTIVE</text>
          <text x="14" y="64" fontSize="10" fontFamily="ui-monospace,monospace" fill="rgba(255,255,255,0.4)">UPTIME</text>
          <text x="80" y="64" fontSize="10" fontFamily="ui-monospace,monospace" fontWeight="600" fill="rgba(56,189,248,0.85)">99.97%</text>
        </g>

        {/* ── Latency badge ── */}
        <g transform="translate(560, 572)">
          <rect width="162" height="40" rx="9"
            fill="rgba(17,17,19,0.88)" stroke="rgba(56,189,248,0.18)" strokeWidth="1" />
          <text x="14" y="24" fontSize="10" fontFamily="ui-monospace,monospace" fill="rgba(255,255,255,0.38)">AVG LATENCY</text>
          <text x="114" y="24" fontSize="10" fontFamily="ui-monospace,monospace" fontWeight="700" fill="#38BDF8">{"<2ms"}</text>
        </g>
      </svg>
    </motion.div>
  );
}
