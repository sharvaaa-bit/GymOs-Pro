import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, RotateCcw, Sparkles, ZoomIn, Eye, Activity } from 'lucide-react';

interface Props {
  onSelectMusclePart?: (partName: string) => void;
}

export const ThreeDMuscleScanner: React.FC<Props> = ({ onSelectMusclePart }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeHighlight, setActiveHighlight] = useState<string>('Upper Pectorals');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshesRef = useRef<{ [name: string]: THREE.Mesh }>({});
  const materialsRef = useRef<THREE.Material[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x06080c, 0.04);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3.8);
    cameraRef.current = camera;

    // 3. Renderer with ACESFilmicToneMapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting
    const keyLight = new THREE.DirectionalLight(0x4df0d0, 2.4);
    keyLight.position.set(2, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x5a8cff, 1.8);
    rimLight.position.set(-2, 2, -2);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0x1a2838, 0x06080c, 1.0);
    scene.add(hemiLight);

    // 5. Floor Grid
    const gridHelper = new THREE.GridHelper(6, 20, 0x1d2c3d, 0x0f1620);
    gridHelper.position.y = -1.2;
    scene.add(gridHelper);

    // 6. Procedural Composite Cyber Anatomical Mannequin (THREE.Group of 10+ sub-parts)
    const bodyGroup = new THREE.Group();
    scene.add(bodyGroup);

    // Cyber Materials
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0d1520,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: false,
    });
    materialsRef.current.push(baseMat);

    const highlightMat = new THREE.MeshStandardMaterial({
      color: 0x4df0d0,
      emissive: 0x1aa890,
      emissiveIntensity: 0.6,
      metalness: 0.5,
      roughness: 0.2,
    });
    materialsRef.current.push(highlightMat);

    const secondaryMat = new THREE.MeshStandardMaterial({
      color: 0x1a2636,
      metalness: 0.9,
      roughness: 0.3,
    });
    materialsRef.current.push(secondaryMat);

    // Head & Neck
    const headGeo = new THREE.SphereGeometry(0.24, 24, 24);
    headGeo.scale(1, 1.2, 1);
    const head = new THREE.Mesh(headGeo, baseMat);
    head.position.y = 1.35;
    bodyGroup.add(head);

    // Upper Torso & Clavicle
    const clavicleGeo = new THREE.CylinderGeometry(0.38, 0.32, 0.22, 16);
    const clavicle = new THREE.Mesh(clavicleGeo, secondaryMat);
    clavicle.position.y = 1.05;
    bodyGroup.add(clavicle);

    // UPPER CHEST (Clavicular Head)
    const upperChestGeo = new THREE.BoxGeometry(0.48, 0.16, 0.24);
    const upperChest = new THREE.Mesh(upperChestGeo, highlightMat);
    upperChest.position.set(0, 0.92, 0.05);
    upperChest.name = 'Upper Pectorals';
    bodyGroup.add(upperChest);
    meshesRef.current['Upper Pectorals'] = upperChest;

    // MIDDLE & LOWER CHEST (Sternal / Costal)
    const midChestGeo = new THREE.BoxGeometry(0.46, 0.18, 0.22);
    const midChest = new THREE.Mesh(midChestGeo, baseMat);
    midChest.position.set(0, 0.74, 0.05);
    midChest.name = 'Middle & Lower Pectorals';
    bodyGroup.add(midChest);
    meshesRef.current['Middle & Lower Pectorals'] = midChest;

    // SHOULDERS (Lateral & Anterior Deltoids)
    const deltGeo = new THREE.SphereGeometry(0.16, 16, 16);
    deltGeo.scale(1, 1.4, 1);
    const leftDelt = new THREE.Mesh(deltGeo, baseMat);
    leftDelt.position.set(-0.44, 0.92, 0);
    leftDelt.name = 'Deltoids';
    bodyGroup.add(leftDelt);

    const rightDelt = new THREE.Mesh(deltGeo, baseMat);
    rightDelt.position.set(0.44, 0.92, 0);
    rightDelt.name = 'Deltoids';
    bodyGroup.add(rightDelt);
    meshesRef.current['Deltoids'] = leftDelt;

    // BICEPS / ARMS
    const armGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.38, 16);
    const leftArm = new THREE.Mesh(armGeo, baseMat);
    leftArm.position.set(-0.48, 0.62, 0);
    leftArm.name = 'Biceps & Forearms';
    bodyGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, baseMat);
    rightArm.position.set(0.48, 0.62, 0);
    rightArm.name = 'Biceps & Forearms';
    bodyGroup.add(rightArm);
    meshesRef.current['Biceps & Forearms'] = leftArm;

    // ABDOMINALS (6-Pack Column)
    const absGeo = new THREE.BoxGeometry(0.32, 0.36, 0.18);
    const abs = new THREE.Mesh(absGeo, secondaryMat);
    abs.position.set(0, 0.46, 0.04);
    abs.name = 'Core & Abdominals';
    bodyGroup.add(abs);
    meshesRef.current['Core & Abdominals'] = abs;

    // PELVIS / GLUTES
    const pelvisGeo = new THREE.CylinderGeometry(0.34, 0.3, 0.22, 16);
    const pelvis = new THREE.Mesh(pelvisGeo, secondaryMat);
    pelvis.position.y = 0.2;
    bodyGroup.add(pelvis);

    // QUADS (Thighs)
    const quadGeo = new THREE.CylinderGeometry(0.15, 0.11, 0.52, 16);
    const leftQuad = new THREE.Mesh(quadGeo, baseMat);
    leftQuad.position.set(-0.18, -0.16, 0);
    leftQuad.name = 'Quadriceps';
    bodyGroup.add(leftQuad);

    const rightQuad = new THREE.Mesh(quadGeo, baseMat);
    rightQuad.position.set(0.18, -0.16, 0);
    rightQuad.name = 'Quadriceps';
    bodyGroup.add(rightQuad);
    meshesRef.current['Quadriceps'] = leftQuad;

    // CALVES
    const calfGeo = new THREE.CylinderGeometry(0.11, 0.07, 0.5, 16);
    const leftCalf = new THREE.Mesh(calfGeo, baseMat);
    leftCalf.position.set(-0.18, -0.68, 0);
    bodyGroup.add(leftCalf);

    const rightCalf = new THREE.Mesh(calfGeo, baseMat);
    rightCalf.position.set(0.18, -0.68, 0);
    bodyGroup.add(rightCalf);

    // Audio Feedback for 3D selection
    const playHapticAudio = () => {
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      } catch {
        // AudioContext not allowed or not supported
      }
    };

    // Raycaster for 3D direct mesh clicking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Mouse Interaction / Orbit Dragging
    let isDragging = false;
    let dragDistance = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragDistance = 0;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      dragDistance += Math.abs(deltaX) + Math.abs(deltaY);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      bodyGroup.rotation.y += deltaX * 0.01;
      camera.position.y = Math.max(0.2, Math.min(2.5, camera.position.y - deltaY * 0.005));
    };

    const onMouseUp = (e: MouseEvent) => {
      const wasDrag = dragDistance > 8;
      isDragging = false;

      // If it was a clean click (not a drag rotate), Raycast!
      if (!wasDrag && container) {
        const rect = domEl.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(bodyGroup.children, true);

        if (intersects.length > 0) {
          const hit = intersects.find((i) => i.object.name);
          if (hit && hit.object.name) {
            playHapticAudio();
            selectMuscle(hit.object.name);
          }
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Dynamic material update helper
    const updateMaterials = (targetName: string) => {
      Object.entries(meshesRef.current).forEach(([name, mesh]) => {
        if (name === targetName) {
          mesh.material = highlightMat;
        } else {
          mesh.material = baseMat;
        }
      });
    };

    // Render loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (isAutoRotating && !isDragging) {
        bodyGroup.rotation.y += dt * 0.4;
      }

      // Emissive pulse breathing for highlighted mesh
      highlightMat.emissiveIntensity = 0.5 + Math.sin(elapsed * 4) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Initial material application
    updateMaterials(activeHighlight);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      materialsRef.current.forEach((m) => m.dispose());
      if (domEl && domEl.parentElement) domEl.parentElement.removeChild(domEl);
    };
  }, [isAutoRotating, activeHighlight]);

  const selectMuscle = (name: string) => {
    setActiveHighlight(name);
    if (onSelectMusclePart) onSelectMusclePart(name);
  };

  return (
    <div className="p-6 rounded-2xl bg-[#090d13] border border-[#1d2835] shadow-2xl relative overflow-hidden space-y-4">
      {/* 3D Viewport Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#182330]">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#4df0d0]" />
          <div>
            <h3 className="text-xl font-bold font-['Big_Shoulders_Display'] uppercase text-white tracking-wide">
              Interactive 3D Holographic Mannequin
            </h3>
            <p className="text-xs font-mono text-[#8593a5]">
              WebGL Three.js Studio PBR · Rotate, Inspect & Raycast 3D Muscles
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              isAutoRotating
                ? 'bg-[#4df0d0]/20 text-[#4df0d0] border border-[#4df0d0]/40'
                : 'bg-[#121c26] text-[#8593a5] hover:text-white'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {isAutoRotating ? 'Rotating 3D' : 'Paused 3D'}
          </button>
        </div>
      </div>

      {/* Three.js Canvas Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        <div
          ref={containerRef}
          className="lg:col-span-8 h-[400px] w-full rounded-xl bg-[#06080c] border border-[#162230] relative overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center"
        >
          {/* Overlaid 3D Viewport HUD details */}
          <div className="absolute top-3 left-3 text-[10px] font-mono text-[#4df0d0] pointer-events-none tracking-widest uppercase">
            THREE.JS // 3D PBR HOLOGRAPHIC RIG
          </div>
          <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#8593a5] pointer-events-none">
            Drag with mouse to rotate 360° · Scroll to inspect
          </div>
          <div className="absolute top-3 right-3 text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#0d1620]/90 text-[#4df0d0] border border-[#1d2d40] pointer-events-none">
            Focus: {activeHighlight}
          </div>
        </div>

        {/* 3D Focus Muscle Selectors (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8593a5] block">
            Click 3D Anatomical Focus:
          </span>

          {[
            { name: 'Upper Pectorals', desc: 'Clavicular Head (30° Incline Press)' },
            { name: 'Middle & Lower Pectorals', desc: 'Sternal & Costal Heads (Dips, Flat Fly)' },
            { name: 'Deltoids', desc: 'Front, Lateral & Rear Heads (Lateral Raises)' },
            { name: 'Biceps & Forearms', desc: 'Brachialis & Peak (Incline Curls)' },
            { name: 'Core & Abdominals', desc: 'Rectus & Obliques (Hanging Leg Raise)' },
            { name: 'Quadriceps', desc: 'Teardrop VMO & Outer Sweep (Heel-elevated Squat)' },
          ].map((item) => {
            const isSelected = activeHighlight === item.name;
            return (
              <button
                key={item.name}
                onClick={() => selectMuscle(item.name)}
                className={`w-full p-3 rounded-xl text-left border text-xs font-mono transition-all ${
                  isSelected
                    ? 'bg-[#4df0d0]/20 border-[#4df0d0] text-white shadow-md'
                    : 'bg-[#0b1016] border-[#182330] text-[#8593a5] hover:text-white hover:border-[#223344]'
                }`}
              >
                <div className={`font-bold uppercase ${isSelected ? 'text-[#4df0d0]' : 'text-white'}`}>
                  {item.name}
                </div>
                <div className="text-[10px] text-[#8593a5] mt-0.5">{item.desc}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
