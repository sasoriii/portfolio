import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSection } from '@/context/SectionContext';

const customShader = {
  vertexShader: `
    uniform float time;
    uniform vec2 mouse;
    uniform float scroll;
    varying vec3 vColor;
    
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Calcul de la distance par rapport au centre
      float distanceFromCenter = length(position.xy) * 0.05;
      
      // Variation de couleur basée sur la distance et le temps
      float purpleIntensity = sin(time + distanceFromCenter) * 0.3;
      vec3 baseWhite = vec3(1.0, 1.0, 1.0);
      vec3 purple = vec3(0.486, 0.227, 0.851); // #7C3AED
      vColor = mix(baseWhite, purple, purpleIntensity);
      
      // Taille des points variable
      gl_PointSize = (2.0 - distanceFromCenter) * 2.0;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    
    void main() {
      // Création d'un point doux
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
      
      // Couleur finale avec effet de brillance
      gl_FragColor = vec4(vColor, alpha * 0.8);
    }
  `
};

export const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    material?: THREE.ShaderMaterial;
    particles?: THREE.Points;
    particleSystem?: {
      positions: Float32Array;
      velocities: Float32Array;
      originalPositions: Float32Array;
    };
  }>({});
  
  const { currentSection } = useSection();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Configuration de la caméra
    camera.position.z = 5;

    // Création du système de particules
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      originalPositions[i] = positions[i];
      originalPositions[i + 1] = positions[i + 1];
      originalPositions[i + 2] = positions[i + 2];

      velocities[i] = (Math.random() - 0.5) * 0.01;
      velocities[i + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i + 2] = (Math.random() - 0.5) * 0.01;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        scroll: { value: 0 }
      },
      vertexShader: customShader.vertexShader,
      fragmentShader: customShader.fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      material,
      particles,
      particleSystem: {
        positions,
        velocities,
        originalPositions
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const animate = () => {
      if (!sceneRef.current.material || !sceneRef.current.particles || !sceneRef.current.particleSystem) return;

      const positions = sceneRef.current.particles.geometry.attributes.position.array as Float32Array;
      const velocities = sceneRef.current.particleSystem.velocities;
      const originalPositions = sceneRef.current.particleSystem.originalPositions;

      // Mise à jour de la position de la souris avec lerp
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.1;

      // Animation des particules
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Force de retour vers la position d'origine
        const dx = originalPositions[i] - positions[i];
        const dy = originalPositions[i + 1] - positions[i + 1];
        const dz = originalPositions[i + 2] - positions[i + 2];

        velocities[i] += dx * 0.002;
        velocities[i + 1] += dy * 0.002;
        velocities[i + 2] += dz * 0.002;

        // Amortissement
        velocities[i] *= 0.98;
        velocities[i + 1] *= 0.98;
        velocities[i + 2] *= 0.98;
      }

      // Mise à jour des uniforms
      sceneRef.current.material.uniforms.time.value += 0.01;
      sceneRef.current.material.uniforms.mouse.value.set(mouseRef.current.x, mouseRef.current.y);
      sceneRef.current.material.uniforms.scroll.value = currentSection;

      sceneRef.current.particles.geometry.attributes.position.needsUpdate = true;
      sceneRef.current.renderer?.render(sceneRef.current.scene!, sceneRef.current.camera!);
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!sceneRef.current.camera || !sceneRef.current.renderer) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      sceneRef.current.camera.aspect = width / height;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [currentSection]);

  return <div ref={mountRef} className="fixed top-0 left-0 -z-10 w-full h-full" />;
};