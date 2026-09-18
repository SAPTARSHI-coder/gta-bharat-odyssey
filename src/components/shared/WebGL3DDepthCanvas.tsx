import React, { useEffect, useRef } from 'react';

interface WebGL3DDepthCanvasProps {
  imageSrc: string;
  depthSrc: string;
  intensity?: number;
}

const VERTEX_SHADER_SOURCE = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = (position + 1.0) * 0.5;
    vUv.y = 1.0 - vUv.y; // Flip Y for WebGL texture coordinates
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform sampler2D uDepth;
  uniform vec2 uMouse;
  uniform vec2 uScale;
  uniform vec2 uOffset;

  void main() {
    // Aspect ratio correction (object-fit: cover)
    vec2 uv = (vUv - 0.5) * uScale + 0.5 + uOffset;

    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }

    // Read depth: 1.0 is near camera (foreground), 0.0 is far away (background)
    float depth = texture2D(uDepth, uv).r;

    // True 3D stereoscopic parallax displacement
    // Closer objects move faster and in direction of mouse; distant objects stay still
    vec2 parallax = (depth - 0.35) * uMouse;

    // Slight chromatic aberration on depth edges for realistic optical lens physics
    float r = texture2D(uTexture, uv + parallax * 1.02).r;
    float g = texture2D(uTexture, uv + parallax).g;
    float b = texture2D(uTexture, uv + parallax * 0.98).b;

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function loadTexture(gl: WebGLRenderingContext, url: string, callback: (tex: WebGLTexture, img: HTMLImageElement) => void) {
  const texture = gl.createTexture();
  if (!texture) return;
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    callback(texture, image);
  };
  image.src = url;
}

export function WebGL3DDepthCanvas({ imageSrc, depthSrc, intensity = 0.035 }: WebGL3DDepthCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: true, powerPreference: 'high-performance' });
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry (2 triangles covering -1 to 1)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTextureLoc = gl.getUniformLocation(program, 'uTexture');
    const uDepthLoc = gl.getUniformLocation(program, 'uDepth');
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');
    const uScaleLoc = gl.getUniformLocation(program, 'uScale');
    const uOffsetLoc = gl.getUniformLocation(program, 'uOffset');

    let mainTexture: WebGLTexture | null = null;
    let depthTexture: WebGLTexture | null = null;
    let imageAspect = 16 / 9;

    loadTexture(gl, imageSrc, (tex, img) => {
      mainTexture = tex;
      imageAspect = img.naturalWidth / img.naturalHeight;
    });

    loadTexture(gl, depthSrc, (tex) => {
      depthTexture = tex;
    });

    // Mouse tracking with inertia/smoothing
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Map mouse -0.5 to 0.5 from screen center
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * intensity;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * intensity;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId: number;

    const render = () => {
      if (!canvas || !gl) return;

      // Smooth camera interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;

      // Handle canvas resize
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }

      // Compute object-fit: cover scaling
      const screenAspect = displayWidth / displayHeight;
      let scaleX = 1.0;
      let scaleY = 1.0;

      if (screenAspect > imageAspect) {
        // Screen is wider than image: crop top and bottom
        scaleY = imageAspect / screenAspect;
      } else {
        // Screen is taller than image: crop left and right
        scaleX = screenAspect / imageAspect;
      }

      gl.useProgram(program);

      gl.uniform2f(uScaleLoc, scaleX, scaleY);
      gl.uniform2f(uOffsetLoc, 0.0, 0.0);
      gl.uniform2f(uMouseLoc, currentMouseX, currentMouseY);

      if (mainTexture && depthTexture) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, mainTexture);
        gl.uniform1i(uTextureLoc, 0);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, depthTexture);
        gl.uniform1i(uDepthLoc, 1);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mainTexture) gl.deleteTexture(mainTexture);
      if (depthTexture) gl.deleteTexture(depthTexture);
      gl.deleteProgram(program);
    };
  }, [imageSrc, depthSrc, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: 'block' }}
    />
  );
}
