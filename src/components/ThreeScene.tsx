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
  
  const { currentSection, totalSections } = useSection();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Création des particules réactives
    const particlesCount = 3000;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const originalPositions = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i += 3) {
      const spread = 30;
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread * 0.5;
      
      positions[i] = x;
      positions[i + 1] = y;
      positions[i + 2] = z;
      
      originalPositions[i] = x;
      originalPositions[i + 1] = y;
      originalPositions[i + 2] = z;
      
      velocities[i] = 0;
      velocities[i + 1] = 0;
      velocities[i + 2] = 0;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.ShaderMaterial({
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

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 15;

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      material: particlesMaterial,
      particles: particlesMesh,
      particleSystem: {
        positions,
        velocities,
        originalPositions
      }
    };

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Animation
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      if (sceneRef.current.material && sceneRef.current.particles) {
        // Smooth mouse movement
        mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

        // Update uniforms
        sceneRef.current.material.uniforms.time.value = time;
        sceneRef.current.material.uniforms.mouse.value = new THREE.Vector2(mouseRef.current.x, mouseRef.current.y);
        sceneRef.current.material.uniforms.scroll.value = currentSection / (totalSections - 1);

        // Particle system update
        const positions = sceneRef.current.particles.geometry.attributes.position.array;
        const velocities = sceneRef.current.particleSystem!.velocities;
        const originalPositions = sceneRef.current.particleSystem!.originalPositions;

        for(let i = 0; i < positions.length; i += 3) {
          // Effet d'attraction vers la souris
          const dx = mouseRef.current.x * 10 - positions[i];
          const dy = mouseRef.current.y * 10 - positions[i + 1];
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 5) {
            velocities[i] += dx * 0.002;
            velocities[i + 1] += dy * 0.002;
          }

          // Retour à la position d'origine
          velocities[i] += (originalPositions[i] - positions[i]) * 0.01;
          velocities[i + 1] += (originalPositions[i + 1] - positions[i + 1]) * 0.01;
          velocities[i + 2] += (originalPositions[i + 2] - positions[i + 2]) * 0.01;

          // Appliquer les vélocités
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];

          // Amortissement
          velocities[i] *= 0.95;
          velocities[i + 1] *= 0.95;
          velocities[i + 2] *= 0.95;
        }

        sceneRef.current.particles.geometry.attributes.position.needsUpdate = true;
      }

      if (sceneRef.current.renderer && sceneRef.current.scene && sceneRef.current.camera) {
        sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      }
    };

    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    
    const handleResize = () => {
      if (sceneRef.current.camera && sceneRef.current.renderer) {
        sceneRef.current.camera.aspect = window.innerWidth / window.innerHeight;
        sceneRef.current.camera.updateProjectionMatrix();
        sceneRef.current.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 -z-10 w-full h-full" />;
};