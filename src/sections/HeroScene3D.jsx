import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// يحمّل نموذج الشعار الحقيقي (logo.glb) بدل الشكل المؤقت.
// العقدة "Rotor" تدور ببطء حوالين حرف الـT، و"T_Letter" يبقى ثابت.
const HeroScene3D = forwardRef(function HeroScene3D({ className = "" }, ref) {
  const mountRef = useRef(null);
  const stateRef = useRef({ rafId: null, progress: 0 });

  useImperativeHandle(ref, () => ({
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
    camera.position.set(0, 0, 2.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    const key = new THREE.DirectionalLight(0xffffff, 0.6);
    key.position.set(2, 3, 4);
    const rim = new THREE.DirectionalLight(0xffffff, 1.1);
    rim.position.set(-2, 1.5, -3);
    scene.add(ambient, key, rim);

    let rotorNode = null;
    let logoGroup = null;
    let disposed = false;

    const loader = new GLTFLoader();
    loader.load(
      "/models/logo.glb",
      (gltf) => {
        if (disposed) return;
        logoGroup = gltf.scene;
        rotorNode = logoGroup.getObjectByName("Rotor");

        // تصحيح الاتجاه: النموذج يجي مفروش (مسطّح أفقيًا) من تصدير SVG→Blender،
        // نديره 90° حول محور X عشان يوقف بوجهه للكاميرا زي الشعار الأصلي
        logoGroup.rotation.x = Math.PI / 2;

        logoGroup.position.y = -0.85; // يبدأ منزّل، نصه العلوي بس يبان
        scene.add(logoGroup);
      },
      undefined,
      (err) => {
        console.error("فشل تحميل نموذج الشعار (logo.glb):", err);
      },
    );

    const clock = new THREE.Clock();

    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const p = state.progress;

      if (rotorNode) {
        // دوران بطيء ومستمر حوالين حرف الـT — دورة كاملة كل ~18 ثانية تقريبًا
        rotorNode.rotation.y += dt * ((Math.PI * 2) / 18);
      }

      if (logoGroup) {
        // الكشف العمودي: بأول 20% من السكرول بس — اللوقو يطلع ويتمركز
        const revealP = Math.min(1, p / 0.2);
        const targetY = -0.85 * (1 - revealP);
        logoGroup.position.y += (targetY - logoGroup.position.y) * 0.1;
      }

      const targetZ = 2.4 + p * 1.6;
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
      disposed = true;
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(state.rafId);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} />;
});

export default HeroScene3D;