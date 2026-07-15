import { useEffect, useRef } from "react";
import * as THREE from "three";

const STATE_COUNT = 3;

// Build the orbiting curved lines + dots that surround the T
function buildOrbitGroup() {
  const group = new THREE.Group();
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x1a1a1a,
    transparent: true,
    opacity: 0.55,
  });
  const dotMat = new THREE.MeshBasicMaterial({ color: 0x0a0a0a });

  const rings = [
    { radius: 2.2, arcs: 3, tilt: 0.15 },
    { radius: 2.8, arcs: 4, tilt: -0.25 },
    { radius: 3.4, arcs: 2, tilt: 0.4 },
  ];

  const arcMeshes = [];
  const dotMeshes = [];

  rings.forEach((ring, ringIdx) => {
    for (let a = 0; a < ring.arcs; a++) {
      const start = (Math.PI * 2 * a) / ring.arcs + ringIdx * 0.4;
      const arcLength = (Math.PI * 2) / ring.arcs - 0.5;
      const points = [];
      const segments = 32;
      for (let s = 0; s <= segments; s++) {
        const theta = start + (arcLength * s) / segments;
        points.push(
          new THREE.Vector3(
            Math.cos(theta) * ring.radius,
            Math.sin(theta) * ring.radius,
            0,
          ),
        );
      }
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geo, lineMat.clone());
      line.rotation.z = ring.tilt;
      line.userData.ring = ringIdx;
      group.add(line);
      arcMeshes.push(line);

      const dotGeo = new THREE.SphereGeometry(0.045 + ringIdx * 0.01, 12, 12);
      const dot = new THREE.Mesh(dotGeo, dotMat.clone());
      const dotTheta = start + arcLength;
      dot.position.set(
        Math.cos(dotTheta) * ring.radius,
        Math.sin(dotTheta) * ring.radius,
        0,
      );
      dot.rotation.z = ring.tilt;
      const pivot = new THREE.Group();
      pivot.rotation.z = ring.tilt;
      pivot.add(dot);
      dot.position.applyAxisAngle(new THREE.Vector3(0, 0, 1), 0);
      group.add(pivot);
      dotMeshes.push(pivot);
    }
  });

  return { group, arcMeshes, dotMeshes };
}

function buildLetterT() {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    metalness: 0.1,
    roughness: 0.4,
  });

  const barGeo = new THREE.BoxGeometry(1.5, 0.26, 0.26);
  const bar = new THREE.Mesh(barGeo, mat);
  bar.position.y = 0.62;
  group.add(bar);

  const stemGeo = new THREE.BoxGeometry(0.26, 1.35, 0.26);
  const stem = new THREE.Mesh(stemGeo, mat);
  stem.position.y = -0.06;
  group.add(stem);

  return group;
}

export default function LogoScene({ progressRef, className }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 0.5);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    const root = new THREE.Group();
    scene.add(root);

    const tLetter = buildLetterT();
    root.add(tLetter);

    const { group: orbitGroup, arcMeshes, dotMeshes } = buildOrbitGroup();
    root.add(orbitGroup);

    let frameId;
    const clock = new THREE.Clock();

    function resize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    function animate() {
      frameId = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const progress = progressRef.current ?? 0;
      const stage = progress * (STATE_COUNT - 1);
      const stageIdx = Math.min(STATE_COUNT - 2, Math.floor(stage));
      const localT = stage - stageIdx;

      // continuous slow rotation of whole orbit assembly, always active
      orbitGroup.rotation.z += dt * 0.18;
      orbitGroup.rotation.x = Math.sin(elapsed * 0.15) * 0.12;

      // Base per-state transforms for T + orbit "shape" reading:
      // state 0 (About): compact, orbit tight, camera near-front
      // state 1 (Vision): orbit expands outward, T tilts, camera pulls back slightly
      // state 2 (Focus): orbit contracts tightly around T again, sharper, forward push
      const states = [
        { orbitScale: 1.0, tRotY: 0.0, tRotX: 0.0, camZ: 9, groupRotY: 0 },
        { orbitScale: 1.55, tRotY: 0.9, tRotX: 0.15, camZ: 10.2, groupRotY: 0.55 },
        { orbitScale: 0.72, tRotY: -0.8, tRotX: -0.1, camZ: 7.8, groupRotY: -0.5 },
      ];

      const a = states[stageIdx];
      const b = states[stageIdx + 1];
      const ease = localT * localT * (3 - 2 * localT); // smoothstep

      const orbitScale = THREE.MathUtils.lerp(a.orbitScale, b.orbitScale, ease);
      const tRotY = THREE.MathUtils.lerp(a.tRotY, b.tRotY, ease);
      const tRotX = THREE.MathUtils.lerp(a.tRotX, b.tRotX, ease);
      const camZ = THREE.MathUtils.lerp(a.camZ, b.camZ, ease);
      const groupRotY = THREE.MathUtils.lerp(a.groupRotY, b.groupRotY, ease);

      orbitGroup.scale.setScalar(orbitScale);
      tLetter.rotation.y = tRotY + Math.sin(elapsed * 0.3) * 0.05;
      tLetter.rotation.x = tRotX;
      camera.position.z = camZ;
      root.rotation.y = groupRotY;

      // subtle idle bob
      root.position.y = Math.sin(elapsed * 0.6) * 0.05;

      // dots twinkle
      dotMeshes.forEach((pivot, i) => {
        const dot = pivot.children[0];
        const s = 0.85 + 0.25 * Math.sin(elapsed * 1.4 + i);
        dot.scale.setScalar(s);
      });

      arcMeshes.forEach((line, i) => {
        line.material.opacity = 0.4 + 0.2 * Math.sin(elapsed * 0.8 + i * 0.7);
      });

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [progressRef]);

  return <div ref={mountRef} className={className} />;
}
