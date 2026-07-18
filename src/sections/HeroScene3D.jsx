import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

// مشهد Three.js أساسي: يعرض شكل مؤقت (placeholder) بدل نموذج Blender الحقيقي.
// لما يجهز ملف الـ.glb، نستبدل قسم "المجموعة المؤقتة" بتحميله عبر GLTFLoader
// بدون ما نغيّر أي شي بمنطق الكاميرا/السكرول/الإضاءة.
const HeroScene3D = forwardRef(function HeroScene3D({ className = "" }, ref) {
  const mountRef = useRef(null);
  const stateRef = useRef({ rafId: null, progress: 0 });

  useImperativeHandle(ref, () => ({
    // GSAP ScrollTrigger يستدعي هذي الدالة كل فريم سكرول (0 = البداية، 1 = النهاية)
    setProgress(p) {
      stateRef.current.progress = p;
    },
  }));

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const state = stateRef.current;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 2.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // إضاءة: رئيسية خفيفة + إضاءة حافة (rim) من الخلف تعطي بريق خفيف على الحواف
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    const key = new THREE.DirectionalLight(0xffffff, 0.55);
    key.position.set(2, 3, 4);
    const rim = new THREE.DirectionalLight(0xffffff, 1.2);
    rim.position.set(-2, 1.5, -3);
    scene.add(ambient, key, rim);

    // --- المجموعة المؤقتة (placeholder): حرف T + حلقات مدارية + نقاط ---
    const group = new THREE.Group();

    const matteMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.55,
      metalness: 0.15,
    });

    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.12, 0.12), matteMaterial);
    bar.position.y = 0.32;
    const stem = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.55, 0.12), matteMaterial);
    stem.position.y = 0.02;
    group.add(bar, stem);

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.5,
      metalness: 0.2,
    });
    const rings = [];
    [
      { radius: 0.95, tube: 0.012, tiltX: 0.3, tiltZ: 0.1 },
      { radius: 1.05, tube: 0.01, tiltX: -0.4, tiltZ: 0.5 },
      { radius: 0.85, tube: 0.014, tiltX: 0.9, tiltZ: -0.3 },
      { radius: 1.15, tube: 0.008, tiltX: -0.15, tiltZ: -0.6 },
    ].forEach((cfg) => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(cfg.radius, cfg.tube, 12, 96),
        ringMaterial,
      );
      mesh.rotation.x = cfg.tiltX;
      mesh.rotation.z = cfg.tiltZ;
      group.add(mesh);
      rings.push(mesh);
    });

    const dotMaterial = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.4 });
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.02, 12, 12), dotMaterial);
      const r = 0.95 + (i % 3) * 0.06;
      dot.position.set(Math.cos(angle) * r, Math.sin(angle * 1.3) * 0.3, Math.sin(angle) * r);
      group.add(dot);
    }

    scene.add(group);

    const clock = new THREE.Clock();

    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const p = state.progress;

      // دوران مستمر وهادئ (idle)، دايمًا شغال
      rings.forEach((ring, i) => {
        ring.rotation.z += dt * (0.08 + i * 0.015);
      });
      group.rotation.y += dt * 0.06;

      // الكاميرا تتباعد كل ما زاد تقدم السكرول (قريب جدًا -> بعيد، اللوقو كامل)
      const targetZ = 2.2 + p * 3.3;
      camera.position.z += (targetZ - camera.position.z) * 0.08;

      renderer.render(scene, camera);
      state.rafId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(state.rafId);
      renderer.dispose();
      bar.geometry.dispose();
      stem.geometry.dispose();
      matteMaterial.dispose();
      ringMaterial.dispose();
      dotMaterial.dispose();
      rings.forEach((r) => r.geometry.dispose());
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} />;
});

export default HeroScene3D;