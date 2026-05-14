'use client';

import { useEffect, useRef } from 'react';

const VERT = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
void main(){ gl_Position = vec4(a_pos,0.0,1.0); }`;

const FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2  u_res;
uniform float u_time;

float tanh1(float x){ float e=exp(2.0*x); return (e-1.0)/(e+1.0); }
vec4  tanh4(vec4 v){ return vec4(tanh1(v.x),tanh1(v.y),tanh1(v.z),tanh1(v.w)); }

void main(){
  vec3 FC = vec3(gl_FragCoord.xy, 0.0);
  vec3 r   = vec3(u_res, max(u_res.x, u_res.y));
  float t  = u_time;
  vec4 o   = vec4(0.0);
  vec3 p   = vec3(0.0);
  vec3 v   = vec3(1.0, 2.0, 6.0);
  float i=0.0, z=1.0, d=1.0, f=1.0;

  for(; i++<3e1;
      o.rgb += (cos((p.x + z + v)*0.1)+1.0)/d/f/z)
  {
    p = z * normalize(FC*2.0 - r.xyy);
    vec4 m = cos((p + sin(p)).y*0.4 + vec4(0.0,33.0,11.0,0.0));
    p.xz = mat2(m) * p.xz;
    p.x += t / 0.2;
    z += (d = length(cos(p/v)*v + v.zxx/7.0) /
              (f = 2.0 + d/exp(p.y*0.2)));
  }

  o = tanh4(0.2*o);
  o.a = 1.0;
  fragColor = o;
}`;

export default function ATCShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', { premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type: number, src: string): WebGLShader => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(sh) ?? 'compile error');
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    gl.useProgram(prog);

    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1,-1,  1,-1, -1, 1,
      -1, 1,  1,-1,  1, 1,
    ]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const uRes  = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');

    const resize = () => {
      const dpr = Math.max(1, Math.min(1.5, window.devicePixelRatio || 1));
      const w = Math.floor(canvas.offsetWidth  * dpr);
      const h = Math.floor(canvas.offsetHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width  = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    let raf = 0;
    const t0 = performance.now();
    const draw = () => {
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(draw);
    };

    const play  = () => { if (!raf) raf = requestAnimationFrame(draw); };
    const pause = () => { cancelAnimationFrame(raf); raf = 0; };

    const io = new IntersectionObserver(([e]) => e.isIntersecting ? play() : pause(), { threshold: 0.05 });
    io.observe(canvas);
    play();

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
    />
  );
}
