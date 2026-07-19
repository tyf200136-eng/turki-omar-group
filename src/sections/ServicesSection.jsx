import { useEffect, useRef, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// GSAP يتجاهل transform-origin المكتوب بـ CSS على عناصر SVG ويستخدم (0,0) افتراضيًا،
// فلازم نمرر transformOrigin صراحة لكل تحريك scale/rotate — هذي دوال مساعدة عامة لذلك
const centerOrigin = (i, target) => {
  const b = target.getBBox();
  return `${b.x + b.width / 2}px ${b.y + b.height / 2}px`;
};
const attrOrigin = (attrX, attrY) => (i, target) =>
  `${target.getAttribute(attrX)}px ${target.getAttribute(attrY)}px`;
const bottomCenterOrigin = (i, target) => {
  const b = target.getBBox();
  return `${b.x + b.width / 2}px ${b.y + b.height}px`;
};

// --- الأيقونات: كل عنصر مهم عليه data-role عشان نقدر نحركه بشكل مخصص بعدين ---

const IconStartupManagement = forwardRef((props, ref) => (
  <svg ref={ref} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g data-role="building">
      <path data-shade="1" data-opacity="0.32" d="M30 46 L42 36 L70 36 L58 46 Z" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path data-shade="1" data-opacity="0.22" d="M58 46 L70 36 L70 76 L58 86 Z" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path data-shade="1" data-opacity="0.12" d="M30 46 L58 46 L58 86 L30 86 Z" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M37 55 H45 M37 63 H45 M37 71 H45 M48 55 H53 M48 63 H53" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </g>
    <g data-role="gear" style={{ transformOrigin: "56px 26px" }}>
      <circle cx="56" cy="26" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M56 13 L56 17 M56 35 L56 39 M43 26 L47 26 M65 26 L69 26 M47 17 L50 20 M62 32 L65 35 M47 35 L50 32 M62 20 L65 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
));
IconStartupManagement.displayName = "IconStartupManagement";

const IconStrategicPartnerships = forwardRef((props, ref) => (
  <svg ref={ref} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle data-role="circle" data-shade="1" data-opacity="0.16" cx="38" cy="50" r="25" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.5" />
    <circle data-role="circle" data-shade="1" data-opacity="0.16" cx="62" cy="50" r="25" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.5" />
    <g data-role="link" style={{ transformOrigin: "50px 49px" }}>
      <rect x="38" y="45" width="16" height="8" rx="4" transform="rotate(-40 46 49)" stroke="currentColor" strokeWidth="1.5" />
      <rect x="46" y="45" width="16" height="8" rx="4" transform="rotate(-40 54 49)" stroke="currentColor" strokeWidth="1.5" />
    </g>
  </svg>
));
IconStrategicPartnerships.displayName = "IconStrategicPartnerships";

const IconScalableOperations = forwardRef((props, ref) => (
  <svg ref={ref} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g data-role="connector">
      <path d="M50 37 L50 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M47 28 L50 23 L53 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <g data-role="connector">
      <path d="M61 57 L73 65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M69 60 L73 65 L67 66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <g data-role="connector">
      <path d="M39 57 L27 65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M31 60 L27 65 L33 66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <circle data-role="node" data-shade="1" data-opacity="0.24" cx="50" cy="50" r="13" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.6" />
    <circle data-role="node" data-shade="1" data-opacity="0.16" cx="50" cy="16" r="7" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.5" />
    <circle data-role="node" data-shade="1" data-opacity="0.16" cx="79" cy="70" r="7" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.5" />
    <circle data-role="node" data-shade="1" data-opacity="0.16" cx="21" cy="70" r="7" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.5" />
  </svg>
));
IconScalableOperations.displayName = "IconScalableOperations";

const IconInvestmentGrowth = forwardRef((props, ref) => (
  <svg ref={ref} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <line x1="14" y1="85" x2="92" y2="85" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <g data-role="bar">
      <path data-shade="1" data-opacity="0.14" d="M20 68 H34 V85 H20 Z" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path data-shade="1" data-opacity="0.26" d="M20 68 L25 62 L39 62 L34 68 Z" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </g>
    <g data-role="bar">
      <path data-shade="1" data-opacity="0.14" d="M44 50 H58 V85 H44 Z" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path data-shade="1" data-opacity="0.26" d="M44 50 L49 44 L63 44 L58 50 Z" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </g>
    <g data-role="bar">
      <path data-shade="1" data-opacity="0.14" d="M68 28 H82 V85 H68 Z" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path data-shade="1" data-opacity="0.26" d="M68 28 L73 22 L87 22 L82 28 Z" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </g>
    <path d="M27 63 L51 45 L75 23 L90 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M82 12 L90 12 L90 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle data-role="node" data-shade="1" data-opacity="0.3" cx="90" cy="12" r="3.5" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.5" />
  </svg>
));
IconInvestmentGrowth.displayName = "IconInvestmentGrowth";

const IconGovernanceOversight = forwardRef((props, ref) => (
  <svg ref={ref} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path data-role="shield" data-shade="1" data-opacity="0.16" d="M25 20 H75 C75 20, 75 55, 50 78 C25 55, 25 20, 25 20 Z" fill="currentColor" style={{ fillOpacity: 0, transformOrigin: "50px 20px" }} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle data-role="scan-ring" cx="50" cy="46" r="20" stroke="currentColor" strokeWidth="1" style={{ transformOrigin: "50px 46px" }} />
    <path data-role="check" d="M36 47 L45 57 L66 31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transformOrigin: "50px 44px" }} />
  </svg>
));
IconGovernanceOversight.displayName = "IconGovernanceOversight";

const IconTechSolutions = forwardRef((props, ref) => (
  <svg ref={ref} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g data-role="bulb">
      <path data-shade="1" data-opacity="0.18" d="M50 16 C36 16, 27 26, 27 39 C27 49, 33 54, 37 61 L37 68 H63 L63 61 C67 54, 73 49, 73 39 C73 26, 64 16, 50 16 Z" fill="currentColor" style={{ fillOpacity: 0 }} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M41 73 H59 M43 78 H57 M45 83 H55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path data-role="spark" d="M50 30 L50 44 M42 37 L58 37 M45 45 L55 53 M55 45 L45 53" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" style={{ transformOrigin: "50px 41px" }} />
    </g>
    <line data-role="pulseline" x1="55" y1="20" x2="72" y2="12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <circle data-role="node" cx="72" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <line data-role="pulseline" x1="63" y1="30" x2="82" y2="26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <circle data-role="node" cx="82" cy="26" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <line data-role="pulseline" x1="65" y1="45" x2="84" y2="48" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <circle data-role="node" cx="84" cy="48" r="2.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
));
IconTechSolutions.displayName = "IconTechSolutions";

const SERVICES = [
  {
    title: "تأسيس وتشغيل وإدارة الشركات",
    icon: IconStartupManagement,
    desc: "تأسيس وتشغيل وإدارة الشركات الناشئة والمتوسطة لضمان استمراريتها ونموها التجاري بكفاءة.",
  },
  {
    title: "بناء الشراكات والاستحواذ",
    icon: IconStrategicPartnerships,
    desc: "بناء الشراكات الاستراتيجية المتينة والاستحواذ المباشر على الفرص الاستثمارية الواعدة في السوق.",
  },
  {
    title: "نماذج تشغيل مرنة وقابلة للتوسع",
    icon: IconScalableOperations,
    desc: "تصميم وتطبيق نماذج تشغيلية فعالة وقابلة للتوسع السريع تخدم متطلبات العصر الجديد للشركات والمؤسسات.",
  },
  {
    title: "الخطط الاستثمارية والنمو المؤسسي",
    icon: IconInvestmentGrowth,
    desc: "تطوير خطط استثمارية دقيقة ودعم بنية النمو المؤسسي لتحقيق قيمة وأصول مستدامة وطويلة المدى.",
  },
  {
    title: "الإشراف الكامل والحوكمة",
    icon: IconGovernanceOversight,
    desc: "الإشراف على الحوكمة الرشيدة، والإدارات المالية والتشغيلية الصارمة لحماية وحفظ قيم الكيانات التابعة.",
  },
  {
    title: "الحلول الإبداعية والتقنية",
    icon: IconTechSolutions,
    desc: "تقديم وتطبيق حزمة متكاملة من الحلول الإبداعية والتقنية من خلال منظومة شركاتنا المتخصصة والمحترفة.",
  },
];

// المشاهد المخصصة لكل أيقونة — تشتغل مرة وحدة بعد ما يخلص الرسم، وتستمر لحالها للأبد
const ICON_SCENES = [
  // 0: تأسيس الشركات — الترس يدور فوق المبنى
  (svg) => {
    const gear = svg.querySelector('[data-role="gear"]');
    if (gear) gear.classList.add("icon-gear-spin");
  },
  // 1: الشراكات — حلقة الربط تنبض وتكبر شوي عند نقطة تقاطع الدائرتين
  (svg) => {
    const link = svg.querySelector('[data-role="link"]');
    if (link) {
      gsap.to(link, {
        scale: 1.15,
        opacity: 0.55,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50px 49px",
      });
    }
  },
  // 2: نماذج التشغيل — المكعبات تنبض بهدوء، أسهم الربط تومض
  (svg) => {
    const nodes = svg.querySelectorAll('[data-role="node"]');
    const connectors = svg.querySelectorAll('[data-role="connector"]');
    if (nodes.length) {
      gsap.to(nodes, {
        opacity: 0.45,
        duration: 1.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });
    }
    if (connectors.length) {
      gsap.to(connectors, {
        opacity: 0.3,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }
  },
  // 3: النمو الاستثماري — الأعمدة "تتنفس" لفوق، والنقطة بالقمة تنبض
  (svg) => {
    const bars = svg.querySelectorAll('[data-role="bar"]');
    const node = svg.querySelector('[data-role="node"]');
    if (bars.length) {
      gsap.to(bars, {
        scaleY: 1.08,
        duration: 1.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
        transformOrigin: bottomCenterOrigin,
      });
    }
    if (node) {
      gsap.to(node, {
        scale: 1.25,
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "90px 12px",
      });
    }
  },
  // 4: الحوكمة — الدرع يميل بهدوء، الحلقة تدور كرادار مراقبة مستمر، العلامة تنبض تأكيدًا
  (svg) => {
    const shield = svg.querySelector('[data-role="shield"]');
    const ring = svg.querySelector('[data-role="scan-ring"]');
    const check = svg.querySelector('[data-role="check"]');
    if (shield) {
      gsap.to(shield, {
        rotate: 2.5,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50px 20px",
      });
    }
    if (ring) {
      ring.style.strokeDasharray = "3 5";
      gsap.to(ring, {
        rotation: 360,
        duration: 7,
        ease: "none",
        repeat: -1,
        transformOrigin: "50px 46px",
      });
    }
    if (check) {
      gsap.to(check, {
        scale: 1.08,
        duration: 1.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50px 44px",
      });
    }
  },
  // 5: الحلول التقنية — إشارات تسري بالخطوط، اللمبة تتنفس بهدوء، الدائرة الداخلية تومض
  (svg) => {
    const bulb = svg.querySelector('[data-role="bulb"]');
    const spark = svg.querySelector('[data-role="spark"]');
    const nodes = svg.querySelectorAll('[data-role="node"]');
    const pulseLines = svg.querySelectorAll('[data-role="pulseline"]');

    if (bulb) {
      gsap.to(bulb, {
        scale: 1.03,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: centerOrigin,
      });
    }
    if (spark) {
      gsap.to(spark, {
        opacity: 0.35,
        duration: 1.1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
    if (nodes.length) {
      gsap.to(nodes, {
        opacity: 0.4,
        duration: 1.1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.25,
      });
    }
    pulseLines.forEach((el, idx) => {
      let len = 20;
      try {
        len = el.getTotalLength();
      } catch {
        // تجاهل
      }
      el.style.strokeDasharray = `${len * 0.35} ${len}`;
      gsap.to(el, {
        strokeDashoffset: -len,
        duration: 1.4,
        ease: "none",
        repeat: -1,
        delay: idx * 0.35,
      });
    });
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const cardRefs = useRef([]);
  const bodyRefs = useRef([]);
  const iconRefs = useRef([]);
  const iconShapesRef = useRef([]);
  const progressLineRef = useRef(null);

  // تفاعل hover مخصص لكل أيقونة — نبضة/انطلاقة سريعة إضافية فوق الحركة المستمرة الأساسية
  const handleIconHoverEnter = (i) => {
    const svg = iconRefs.current[i];
    if (!svg) return;

    if (i === 0) {
      const building = svg.querySelector('[data-role="building"]');
      const gear = svg.querySelector('[data-role="gear"]');
      if (building)
        gsap.to(building, {
          scale: 1.04,
          duration: 0.35,
          ease: "power2.out",
          transformOrigin: bottomCenterOrigin,
        });
      if (gear) gear.style.animationDuration = "1.4s";
    } else if (i === 1) {
      const circles = svg.querySelectorAll('[data-role="circle"]');
      const link = svg.querySelector('[data-role="link"]');
      if (circles.length)
        gsap.to(circles, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          stagger: 0.05,
          transformOrigin: centerOrigin,
        });
      if (link)
        gsap.to(link, {
          scale: 1.3,
          duration: 0.35,
          ease: "back.out(3)",
          yoyo: true,
          repeat: 1,
          transformOrigin: "50px 49px",
        });
    } else if (i === 2) {
      const nodes = svg.querySelectorAll('[data-role="node"]');
      const connectors = svg.querySelectorAll('[data-role="connector"]');
      if (nodes.length)
        gsap.to(nodes, {
          scale: 1.15,
          duration: 0.3,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          stagger: 0.06,
          transformOrigin: centerOrigin,
        });
      if (connectors.length)
        gsap.to(connectors, {
          opacity: 0.25,
          duration: 0.25,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          stagger: 0.08,
        });
    } else if (i === 3) {
      const bars = svg.querySelectorAll('[data-role="bar"]');
      const node = svg.querySelector('[data-role="node"]');
      if (bars.length)
        gsap.to(bars, {
          scaleY: 1.2,
          duration: 0.35,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          stagger: 0.06,
          transformOrigin: bottomCenterOrigin,
        });
      if (node)
        gsap.to(node, {
          scale: 1.6,
          duration: 0.3,
          ease: "back.out(3)",
          yoyo: true,
          repeat: 1,
          transformOrigin: "90px 12px",
        });
    } else if (i === 4) {
      const shield = svg.querySelector('[data-role="shield"]');
      const ring = svg.querySelector('[data-role="scan-ring"]');
      const check = svg.querySelector('[data-role="check"]');
      if (shield)
        gsap.to(shield, {
          scale: 1.04,
          duration: 0.35,
          ease: "power2.out",
          transformOrigin: centerOrigin,
        });
      if (ring)
        gsap.to(ring, {
          scale: 1.18,
          opacity: 0.5,
          duration: 0.4,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          transformOrigin: "50px 46px",
        });
      if (check)
        gsap.to(check, {
          scale: 1.2,
          duration: 0.3,
          ease: "back.out(3)",
          yoyo: true,
          repeat: 1,
          transformOrigin: "50px 44px",
        });
    } else if (i === 5) {
      const bulb = svg.querySelector('[data-role="bulb"]');
      const nodes = svg.querySelectorAll('[data-role="node"]');
      if (bulb)
        gsap.to(bulb, {
          scale: 1.08,
          duration: 0.35,
          ease: "power2.out",
          transformOrigin: centerOrigin,
        });
      if (nodes.length)
        gsap.to(nodes, {
          scale: 1.4,
          duration: 0.3,
          ease: "back.out(3)",
          yoyo: true,
          repeat: 1,
          stagger: 0.08,
          transformOrigin: attrOrigin("cx", "cy"),
        });
    }
  };

  const handleIconHoverLeave = (i) => {
    const svg = iconRefs.current[i];
    if (!svg) return;

    if (i === 0) {
      const building = svg.querySelector('[data-role="building"]');
      const gear = svg.querySelector('[data-role="gear"]');
      if (building)
        gsap.to(building, {
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
          transformOrigin: bottomCenterOrigin,
        });
      if (gear) gear.style.animationDuration = "6s";
    } else if (i === 4) {
      const shield = svg.querySelector('[data-role="shield"]');
      if (shield)
        gsap.to(shield, {
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
          transformOrigin: centerOrigin,
        });
    } else if (i === 5) {
      const bulb = svg.querySelector('[data-role="bulb"]');
      if (bulb)
        gsap.to(bulb, {
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
          transformOrigin: centerOrigin,
        });
    }
  };

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const ctx = gsap.context(() => {
      iconRefs.current.forEach((svg, i) => {
        if (!svg) return;
        const shapes = svg.querySelectorAll("path, circle, line, rect");
        const list = [];
        shapes.forEach((el) => {
          let length = 40;
          try {
            length = el.getTotalLength();
          } catch {
            // fallback
          }
          el.style.strokeDasharray = `${length}`;
          el.style.strokeDashoffset = `${length}`;

          const isNode =
            el.tagName === "circle" && parseFloat(el.getAttribute("r")) <= 3.5;

          list.push({ el, length, isNode });
        });
        iconShapesRef.current[i] = list;
      });

      ScrollTrigger.create({
        trigger: timeline,
        start: "top 75%",
        end: "bottom 35%",
        scrub: 0.4,
        onUpdate: (self) => {
          if (progressLineRef.current) {
            progressLineRef.current.style.height = `${self.progress * 100}%`;
          }
        },
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const body = bodyRefs.current[i];
        if (!body) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top 78%",
          end: "top 30%",
          scrub: 0.4,
          onUpdate: (self) => {
            body.style.height = `${self.progress * 17}em`;
          },
        });
      });

      // الرسم التدريجي، وبعده مباشرة تشغيل المشهد المخصص لكل أيقونة
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const shapes = iconShapesRef.current[i] || [];
        if (!shapes.length) return;
        const svg = iconRefs.current[i];

        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          once: true,
          onEnter: () => {
            const nodes = shapes.filter((s) => s.isNode).map((s) => s.el);
            const lines = shapes.filter((s) => !s.isNode).map((s) => s.el);
            const sortedLines = [...lines].sort((a, b) => {
              const lenA = shapes.find((s) => s.el === a)?.length || 0;
              const lenB = shapes.find((s) => s.el === b)?.length || 0;
              return lenB - lenA;
            });

            const tl = gsap.timeline({
              onComplete: () => {
                const faces = svg.querySelectorAll("[data-shade]");
                if (faces.length) {
                  gsap.to(faces, {
                    fillOpacity: (idx, el) => parseFloat(el.dataset.opacity) || 0.15,
                    duration: 0.7,
                    ease: "power2.out",
                    stagger: 0.05,
                  });
                }
                const scene = ICON_SCENES[i];
                if (scene && svg) scene(svg);
              },
            });

            tl.to(sortedLines, {
              strokeDashoffset: 0,
              duration: 1.6,
              ease: "power3.out",
              stagger: 0.06,
            });

            if (nodes.length) {
              tl.to(
                nodes,
                {
                  strokeDashoffset: 0,
                  duration: 0.45,
                  ease: "back.out(1.7)",
                  stagger: 0.07,
                },
                "-=0.6",
              );
            }
          },
        });
      });
    }, timeline);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-6 py-28 md:px-12 md:py-40"
      dir="rtl"
    >
      <div className="mb-16 flex flex-col gap-4 md:mb-24 md:max-w-xl text-right">
        <span className="text-xs tracking-[0.3em] text-slate uppercase">
          ماذا نقدم
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-5xl">
          الابتكار الهندسي المتكامل
        </h2>
      </div>

      <div ref={timelineRef} className="relative">
        <div className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 border-l border-dashed border-line md:block" />

        <div
          ref={progressLineRef}
          className="absolute top-0 left-1/2 hidden w-px -translate-x-1/2 bg-ink md:block"
          style={{ height: "0%" }}
        />

        <div className="flex flex-col gap-24 md:gap-[70px]">
          {SERVICES.map((s, i) => {
            const isRight = i % 2 === 1;
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                ref={(el) => (cardRefs.current[i] = el)}
                onMouseEnter={() => handleIconHoverEnter(i)}
                onMouseLeave={() => handleIconHoverLeave(i)}
                className={`relative md:w-[46%] text-right ${
                  isRight ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
                }`}
              >
                <div
                  className="absolute top-1 hidden h-2.5 w-2.5 rounded-full bg-ink md:block"
                  style={isRight ? { right: "-1.45rem" } : { left: "-1.45rem" }}
                />

                <span className="mb-3 block text-sm text-slate-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 text-2xl font-semibold text-ink">
                  {s.title}
                </h3>

                <div className="h-[17em]">
                  <div
                    ref={(el) => (bodyRefs.current[i] = el)}
                    className="overflow-hidden transition-none"
                    style={{ height: "0em" }}
                  >
                    <div className="mb-4 flex h-40 w-full items-center justify-center rounded-2xl bg-mist">
                      <Icon
                        ref={(el) => (iconRefs.current[i] = el)}
                        className="h-20 w-20 text-ink md:h-24 md:w-24"
                      />
                    </div>
                    <p className="max-w-sm text-sm leading-relaxed text-slate">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}