import { useState } from "react";
import { motion } from "framer-motion";

const CONTACT_INFO = [
  {
    label: "البريد الإلكتروني",
    value: "info@turkiomargroup.com",
    href: "mailto:info@turkiomargroup.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 6.5L12 13L20 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "رقم الجوال",
    value: "0559793959",
    href: "tel:+966559793959",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.5 4H9.5L11 8L8.8 9.5C9.6 11.3 11 12.7 12.8 13.5L14.3 11.3L18.3 12.8V15.8C18.3 17 17.3 18 16 17.9C10.8 17.5 6.5 13.2 6 8C5.9 6.7 5.3 5 6.5 4Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
   label: "العنوان",
    value: "الطائف . المملكة العربية السعودية",
    href: "https://maps.app.goo.gl/UfVugJdbHCpoiVs2A?g_st=com.google.maps.preview.copy",
    icon: (

      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 21C12 21 19 14.5 19 9.5C19 5.9 15.9 3 12 3C8.1 3 5 5.9 5 9.5C5 14.5 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactSection() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | "success"

  function updateField(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
    // بمجرد ما يبدأ يكتب صح، نشيل رسالة الخطأ عن هذا الحقل فورًا
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: null }));
    }
  }

  function validate() {
    const next = {};
    if (!values.name.trim()) {
      next.name = "الاسم مطلوب";
    }
    if (!values.email.trim()) {
      next.email = "البريد الإلكتروني مطلوب";
    } else if (!EMAIL_RE.test(values.email.trim())) {
      next.email = "صيغة البريد الإلكتروني غير صحيحة";
    }
    if (!values.message.trim()) {
      next.message = "الرجاء كتابة رسالتك";
    }
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus(null);
      return;
    }

    // TODO: هنا نربط لاحقًا خدمة إرسال فعلية (Formspree/Backend)
    setStatus("success");
    setValues({ name: "", email: "", message: "" });
  }

  const fieldClass = (field) =>
    `w-full rounded-full border bg-paper px-6 py-3.5 text-sm text-ink placeholder:text-slate-light focus:outline-none ${
      errors[field]
        ? "border-red-400 focus:border-red-500"
        : "border-line focus:border-ink"
    }`;

  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-8 md:px-12">
    <div className="rounded-[40px] bg-gradient-to-b from-white to-[#ececec] p-8 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.22),0_15px_35px_-15px_rgba(0,0,0,0.12),inset_0_1px_0_0_rgba(255,255,255,0.8)] md:p-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              <span className="font-bold text-ink">لنبني معاً</span>{" "}
              <span className="font-normal text-slate">قيمة تدوم.</span>
            </h2>
            <p className="mb-8 max-w-sm text-sm leading-relaxed text-slate md:text-base">
              سواء كنت تدرس فرصة للشراكة أو ترغب ببساطة في معرفة المزيد عن المجموعة، يسعدنا دائماً تواصلك معنا.
            </p>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-1">
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  value={values.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={fieldClass("name")}
                />
                {errors.name && (
                  <p className="mt-1.5 mr-2 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={values.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={fieldClass("email")}
                />
                {errors.email && (
                  <p className="mt-1.5 mr-2 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="mb-3">
                <textarea
                  placeholder="حدثنا عن مشروعك…"
                  rows={5}
                  value={values.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className={`w-full resize-none rounded-3xl border bg-paper px-6 py-4 text-sm text-ink placeholder:text-slate-light focus:outline-none ${
                    errors.message
                      ? "border-red-400 focus:border-red-500"
                      : "border-line focus:border-ink"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 mr-2 text-xs text-red-500">{errors.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className="mt-2 w-full rounded-full bg-ink py-4 text-sm font-medium tracking-wide text-paper"
              >
                إرسال
              </motion.button>

              {status === "success" && (
                <p className="mt-3 text-center text-sm text-ink">
                  تم استلام رسالتك، بنتواصل معك قريبًا.
                </p>
              )}

              <p className="mt-3 text-center text-xs text-slate-light">
                سوف نحافظ على خصوصية بياناتك
              </p>
            </form>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-[24px] md:min-h-full">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(155deg, #3d3d3d 0%, #1c1c1c 55%, #060606 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25), transparent 55%)",
              }}
            />

            <div className="relative flex h-full flex-col justify-center gap-10 p-8 md:p-10">
              {CONTACT_INFO.map((item) => {
                const Wrapper = item.href ? "a" : "div";
                return (
                  <Wrapper
                    key={item.label}
                    {...(item.href ? { href: item.href } : {})}
                    className="group flex items-center gap-4"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors group-hover:border-white/50">
                      <span className="h-5 w-5">{item.icon}</span>
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-xs tracking-[0.15em] text-white/50 uppercase">
                        {item.label}
                      </span>
                      <span className="text-base font-medium break-words text-white md:text-lg">
                        {item.value}
                      </span>
                    </span>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}