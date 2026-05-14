'use client';

import { useEffect, useRef } from 'react';

const VERT_SRC = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
out vec2 v_uv;
void main(){
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG_SRC = `#version 300 es
precision highp float;
out vec4 fragColor;
in vec2 v_uv;
uniform vec3  iResolution;
uniform float iTime;
uniform int   iFrame;
uniform vec4  iMouse;

void main(){
  vec2  r  = iResolution.xy;
  float t  = iTime;
  vec3  FC = vec3(gl_FragCoord.xy, t);
  vec4  o  = vec4(0.0);

  float s = 0.0;
  for (float i=0.0, z=0.0, d=0.0; i++<8e1;
       o += (cos(s + vec4(0.0,1.0,8.0,0.0))+1.0)/d)
  {
    vec3 p = z * normalize(FC.rgb*2.0 - r.xyy);
    vec3 a = normalize(cos(vec3(5.0,0.0,1.0) + t - d*4.0));
    p.z += 5.0;
    a = a*dot(a,p) - cross(a,p);
    for (d=1.0; d++<9.0;)
      a -= sin(a*d+t).zxy/d;
    z += d = 0.1*abs(length(p)-3.0) + 0.07*abs(cos(s=a.y));
  }
  o = tanh(o/5e3);
  fragColor = vec4(o.rgb, 1.0);
}`;

function safeCompile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  const ok = gl.getShaderParameter(sh, gl.COMPILE_STATUS);
  return { shader: ok ? sh : null, log: gl.getShaderInfoLog(sh) || '' };
}

function safeLink(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  const ok = gl.getProgramParameter(prog, gl.LINK_STATUS);
  return { program: ok ? prog : null, log: gl.getProgramInfoLog(prog) || '' };
}

export default function PhosphorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const startRef  = useRef<number>(0);
  const frameRef  = useRef<number>(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', { premultipliedAlpha: false });
    if (!gl) return;

    let disposed = false;
    let vao: WebGLVertexArrayObject | null = null;
    let vbo: WebGLBuffer | null = null;
    let program: WebGLProgram | null = null;

    vao = gl.createVertexArray();
    vbo = gl.createBuffer();
    if (!vao || !vbo) return;

    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const { shader: vs } = safeCompile(gl, gl.VERTEX_SHADER, VERT_SRC);
    const { shader: fs } = safeCompile(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return;

    const linked = safeLink(gl, vs, fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!linked.program) return;
    program = linked.program;

    const uRes   = gl.getUniformLocation(program, 'iResolution');
    const uTime  = gl.getUniformLocation(program, 'iTime');
    const uFrame = gl.getUniformLocation(program, 'iFrame');
    const uMouse = gl.getUniformLocation(program, 'iMouse');

    const resize = () => {
      const dpr = Math.max(1, Math.min(1.5, window.devicePixelRatio || 1));
      canvas.width  = Math.floor(canvas.offsetWidth  * dpr);
      canvas.height = Math.floor(canvas.offsetHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    startRef.current = performance.now();
    frameRef.current = 0;

    const tick = (now: number) => {
      if (disposed || pausedRef.current) return;
      const t = (now - startRef.current) / 1000;
      frameRef.current += 1;

      gl.useProgram(program);
      const dpr = Math.max(1, Math.min(1.5, window.devicePixelRatio || 1));
      gl.uniform3f(uRes, canvas.width, canvas.height, dpr);
      gl.uniform1f(uTime, t);
      gl.uniform1i(uFrame, frameRef.current);
      gl.uniform4f(uMouse, 0, 0, 0, 0);
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rafRef.current = requestAnimationFrame(tick);
    };

    const play  = () => {
      if (pausedRef.current) return;
      rafRef.current = requestAnimationFrame(tick);
    };
    const pause = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { pausedRef.current = false; play(); }
      else                  { pausedRef.current = true;  pause(); }
    }, { threshold: 0.05 });
    io.observe(canvas);

    return () => {
      disposed = true;
      pausedRef.current = true;
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      if (vbo)     gl.deleteBuffer(vbo);
      if (vao)     gl.deleteVertexArray(vao);
      if (program) gl.deleteProgram(program);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
