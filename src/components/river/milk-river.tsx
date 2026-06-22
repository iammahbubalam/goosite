"use client";

import { useEffect, useRef } from "react";
import { scrollState } from "@/lib/scroll";

/* Subtle ambient milk flow. One fragment shader, one WebGL context, coupled to
 * scroll progress + velocity. Cream↔white folds with a faint blue depth — a
 * whisper, never a spectacle. Falls back to a static CSS gradient when WebGL is
 * unavailable or the user prefers reduced motion. */

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_scroll;
uniform float u_vel;
float hash(vec2 p){ p = fract(p*vec2(123.34,345.45)); p += dot(p, p+34.345); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i+vec2(1.0,0.0)), c = hash(i+vec2(0.0,1.0)), d = hash(i+vec2(1.0,1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.03; a*=0.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float asp = u_res.x / u_res.y;
  vec2 p = vec2(uv.x*asp, uv.y);
  float t = u_time*0.02;
  float flow = u_scroll*2.0 + t;
  vec2 q = vec2(p.x*1.1, p.y*1.4 - flow);
  float w = fbm(q + vec2(0.0, t));
  float n = fbm(q + w*(0.5 + u_vel*0.3));
  vec3 cream = vec3(0.992,0.976,0.949);
  vec3 white = vec3(1.0,0.996,0.984);
  vec3 blue  = vec3(0.88,0.91,0.96);
  vec3 col = mix(cream, white, smoothstep(0.35,0.70,n));
  col = mix(col, blue, smoothstep(0.60,0.95,w)*0.22);
  col += (1.0-uv.y)*0.015;
  gl_FragColor = vec4(col, 1.0);
}`;

const FALLBACK_BG =
  "radial-gradient(140% 120% at 50% 0%, #fffaf3 0%, #fdfbf8 45%, #f3ece0 100%)";

export function MilkRiver() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      canvas.style.background = FALLBACK_BG;
      return;
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uScroll = gl.getUniformLocation(prog, "u_scroll");
    const uVel = gl.getUniformLocation(prog, "u_vel");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let running = true;
    let vel = 0;
    const start = performance.now();

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      vel += (Math.abs(scrollState.velocity) * 0.05 - vel) * 0.08;
      gl.uniform1f(uTime, t);
      gl.uniform1f(uScroll, scrollState.progress);
      gl.uniform1f(uVel, Math.min(vel, 2));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (running && !reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVis = () => {
      running = !document.hidden;
      if (running && !reduce) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-50 h-full w-full"
      style={{ background: FALLBACK_BG }}
    />
  );
}
