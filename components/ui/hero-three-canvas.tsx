"use client";

import * as React from "react";
import * as THREE from "three";

interface CloudPuff {
  sprite: THREE.Sprite;
  baseX: number;
  baseY: number;
  baseZ: number;
  baseScaleX: number;
  baseScaleY: number;
  phase: number;
  driftSpeed: number;
  bobSpeed: number;
  rotationSpeed: number;
}

interface CloudCluster {
  group: THREE.Group;
  baseX: number;
  baseY: number;
  baseZ: number;
  velocity: number;
  puffs: CloudPuff[];
}

export function HeroThreeCanvas() {
  const mountRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check accessibility motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── 1. PROCEDURAL VOLUMETRIC CLOUD PUFF TEXTURES ──
    // Generates a soft multi-stop Gaussian radial cloud plume on an offscreen canvas
    const createCloudTexture = (isWispy = false): THREE.CanvasTexture => {
      const size = 256;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      if (!ctx) return new THREE.CanvasTexture(canvas);

      ctx.clearRect(0, 0, size, size);

      const drawPuff = (cx: number, cy: number, r: number, alpha: number) => {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        if (isWispy) {
          grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.85})`);
          grad.addColorStop(0.3, `rgba(240, 249, 255, ${alpha * 0.55})`);
          grad.addColorStop(0.65, `rgba(219, 234, 254, ${alpha * 0.2})`);
          grad.addColorStop(0.9, `rgba(186, 230, 253, ${alpha * 0.05})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        } else {
          grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.95})`);
          grad.addColorStop(0.35, `rgba(240, 249, 255, ${alpha * 0.75})`);
          grad.addColorStop(0.6, `rgba(224, 242, 254, ${alpha * 0.4})`);
          grad.addColorStop(0.85, `rgba(186, 230, 253, ${alpha * 0.12})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      };

      if (isWispy) {
        // Ethereal elongated cirrus mist
        drawPuff(128, 128, 120, 0.65);
        drawPuff(100, 128, 90, 0.45);
        drawPuff(156, 128, 90, 0.45);
      } else {
        // Fluffy, dense cumulus billowing billow
        drawPuff(128, 128, 115, 0.85); // Core
        drawPuff(100, 118, 92, 0.7);   // Left flank
        drawPuff(156, 124, 88, 0.68);  // Right flank
        drawPuff(126, 100, 80, 0.62);  // Upper dome
        drawPuff(138, 146, 75, 0.55);  // Lower billow
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const cumulusTexture = createCloudTexture(false);
    const wispyTexture = createCloudTexture(true);

    // ── 2. THREE.JS SCENE, CAMERA & RENDERER SETUP ──
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 75);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    // ── 3. ARCHITECTURAL 3D CLOUD FORMATIONS ──
    // Generates majestic, volumetric cloud clusters floating at various depths
    const isMobile = width < 768;
    const clusterConfigs = [
      // Cluster 1: High-Altitude Upper Horizon Cirrocumulus (Deep background, slow drift)
      {
        centerX: -50,
        centerY: 30,
        centerZ: -45,
        velocity: 0.85,
        numPuffs: isMobile ? 8 : 14,
        scaleRange: [38, 58] as [number, number],
        radiusX: 35,
        radiusY: 12,
        opacity: 0.38,
        texture: wispyTexture,
      },
      // Cluster 2: Upper-Left Majestic Cumulus (Midground, fluffy volume)
      {
        centerX: -25,
        centerY: 18,
        centerZ: -20,
        velocity: 1.25,
        numPuffs: isMobile ? 10 : 18,
        scaleRange: [42, 68] as [number, number],
        radiusX: 40,
        radiusY: 16,
        opacity: 0.52,
        texture: cumulusTexture,
      },
      // Cluster 3: Upper-Right Floating Cloud Bank (Mid-foreground, soft sunlight edge)
      {
        centerX: 35,
        centerY: 22,
        centerZ: -10,
        velocity: 1.05,
        numPuffs: isMobile ? 10 : 16,
        scaleRange: [44, 72] as [number, number],
        radiusX: 38,
        radiusY: 15,
        opacity: 0.48,
        texture: cumulusTexture,
      },
      // Cluster 4: Central Atmospheric Vapor (Subtle ambient depth behind hero headline)
      {
        centerX: 0,
        centerY: -4,
        centerZ: -30,
        velocity: 0.75,
        numPuffs: isMobile ? 6 : 12,
        scaleRange: [48, 76] as [number, number],
        radiusX: 45,
        radiusY: 14,
        opacity: 0.32,
        texture: wispyTexture,
      },
      // Cluster 5: Foreground Ambient Mist (Drifting across lower viewpoint for 3D depth)
      {
        centerX: -15,
        centerY: -28,
        centerZ: 15,
        velocity: 1.45,
        numPuffs: isMobile ? 6 : 10,
        scaleRange: [55, 90] as [number, number],
        radiusX: 50,
        radiusY: 18,
        opacity: 0.22,
        texture: wispyTexture,
      },
    ];

    const clusters: CloudCluster[] = [];

    clusterConfigs.forEach((cfg) => {
      const group = new THREE.Group();
      group.position.set(cfg.centerX, cfg.centerY, cfg.centerZ);
      scene.add(group);

      const puffs: CloudPuff[] = [];

      for (let i = 0; i < cfg.numPuffs; i++) {
        const material = new THREE.SpriteMaterial({
          map: cfg.texture,
          transparent: true,
          opacity: cfg.opacity * (0.8 + Math.random() * 0.4),
          depthWrite: false,
          blending: THREE.NormalBlending,
        });

        const sprite = new THREE.Sprite(material);

        // Clustered organic distribution within ellipsoid
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.pow(Math.random(), 0.6);
        const offsetX = Math.cos(angle) * cfg.radiusX * dist;
        const offsetY = Math.sin(angle) * cfg.radiusY * dist + (Math.random() - 0.5) * 6;
        const offsetZ = (Math.random() - 0.5) * 14;

        sprite.position.set(offsetX, offsetY, offsetZ);

        const scale = cfg.scaleRange[0] + Math.random() * (cfg.scaleRange[1] - cfg.scaleRange[0]);
        const aspectVariance = 0.85 + Math.random() * 0.35;
        const scaleX = scale * aspectVariance;
        const scaleY = scale;
        sprite.scale.set(scaleX, scaleY, 1);

        // Random subtle initial rotation
        material.rotation = Math.random() * Math.PI * 2;

        group.add(sprite);

        puffs.push({
          sprite,
          baseX: offsetX,
          baseY: offsetY,
          baseZ: offsetZ,
          baseScaleX: scaleX,
          baseScaleY: scaleY,
          phase: Math.random() * Math.PI * 2,
          driftSpeed: (Math.random() - 0.5) * 0.2,
          bobSpeed: 0.35 + Math.random() * 0.35,
          rotationSpeed: (Math.random() - 0.5) * 0.008,
        });
      }

      clusters.push({
        group,
        baseX: cfg.centerX,
        baseY: cfg.centerY,
        baseZ: cfg.centerZ,
        velocity: cfg.velocity,
        puffs,
      });
    });

    // ── 4. RESPONSIVE MOUSE PARALLAX & SCROLL INTERACTION ──
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let scrollY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetMouseX = (e.clientX - halfW) / halfW;
      targetMouseY = (e.clientY - halfH) / halfH;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 700;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // ── 5. BUTTER-SMOOTH ANIMATION LOOP (FLUID VOLUMETRIC MOTION) ──
    let animId: number;
    let lastTime = performance.now();
    const startTime = lastTime;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;

      // Damped smooth mouse tracking (spring lerp)
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      // Camera responds with delicate spatial perspective
      camera.position.x = currentMouseX * 5.5;
      camera.position.y = -currentMouseY * 3.5 + Math.min(scrollY * 0.015, 25);
      camera.lookAt(0, 0, 0);

      // Animate each cloud formation
      clusters.forEach((cluster) => {
        // Horizontal drift across the sky
        cluster.group.position.x += cluster.velocity * delta * 1.8;

        // Wrap around smoothly when cluster moves off the right horizon
        const wrapLimit = 135;
        if (cluster.group.position.x > wrapLimit) {
          cluster.group.position.x = -wrapLimit - 25;
        }

        // Animate individual puffs inside the cluster
        cluster.puffs.forEach((puff) => {
          // Gentle vertical breathing / harmonic undulation
          const bob = Math.sin(elapsed * puff.bobSpeed + puff.phase) * 1.5;
          puff.sprite.position.y = puff.baseY + bob;

          // Subtle organic expansion & contraction (breathing cloud billow)
          const breath = 1 + Math.sin(elapsed * 0.25 + puff.phase) * 0.045;
          puff.sprite.scale.set(
            puff.baseScaleX * breath,
            puff.baseScaleY * breath,
            1
          );

          // Ethereal slow lobe rotation
          puff.sprite.material.rotation += puff.rotationSpeed * delta;
        });
      });

      renderer.render(scene, camera);
    };

    // If reduced motion is requested, render one clean frame and pause
    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    // ── 6. CLEANUP & MEMORY DISPOSAL ──
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      clusters.forEach((cluster) => {
        cluster.puffs.forEach((puff) => {
          puff.sprite.material.dispose();
          cluster.group.remove(puff.sprite);
        });
        scene.remove(cluster.group);
      });

      cumulusTexture.dispose();
      wispyTexture.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden opacity-85"
      aria-hidden="true"
    />
  );
}
