"use client";

import { ShaderField } from "@/components/shader/shader-field";

/**
 * A vessel full of milk. A rich, flowing milk gradient fills the whole panel
 * (caustic shader), with a drifting wave at the liquid surface, soft foam above
 * it, and depth shading below — so it reads as a glass of fresh milk rather than
 * an empty box. All decorative layers degrade gracefully (the shader handles
 * reduced motion; CSS drifts simply stop).
 */
export function MilkVessel() {
  return (
    <div className="absolute inset-0">
      {/* living milk body */}
      <ShaderField
        colors={["#ffffff", "#fdf4e3", "#efe0c6", "#e2d2b2", "#cdd9ec"]}
        speed={0.32}
        distortion={1}
        swirl={1}
        fallback="linear-gradient(180deg, #fffdf9 0%, #fbf1df 45%, #ecdcc1 100%)"
        className="opacity-100"
      />

      {/* depth at the base of the liquid */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#e3d3b4]/70 via-[#ecdfc6]/20 to-transparent" />

      {/* foam / air above the surface line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-[#fffefb] via-[#fffefb]/70 to-transparent" />

      {/* drifting milk surface */}
      <div className="pointer-events-none absolute inset-x-0 top-[27%] animate-milk-bob">
        <div className="animate-milk-surface w-[200%]">
          <svg
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            className="h-10 w-full"
          >
            <path
              d="M0,30 C150,8 300,52 450,30 C600,8 750,52 900,30 C1050,8 1150,40 1200,30 L1200,60 L0,60 Z"
              fill="#fffaf1"
              opacity="0.9"
            />
            <path
              d="M0,30 C150,8 300,52 450,30 C600,8 750,52 900,30 C1050,8 1150,40 1200,30"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              opacity="0.7"
            />
          </svg>
        </div>
      </div>

      {/* glass highlight */}
      <div className="pointer-events-none absolute -left-10 -top-6 h-44 w-44 rounded-full bg-white/55 blur-3xl" />
      {/* soft gold rim accent */}
      <div className="pointer-events-none absolute inset-0 rounded-[3rem] ring-1 ring-inset ring-gold/20" />
    </div>
  );
}
