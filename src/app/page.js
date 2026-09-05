"use client"

import { useEffect, useState } from "react"

// TODO: replace with Martin's real contact email address
const CONTACT_EMAIL = "hallo@liebeszit.ch"

const translations = {
  de: {
    eyebrow: "Liebeszit",
    titleLine1: "Zeit für Liebe.",
    titleLine2: "Zeit zu helfen.",
    subtitle:
      "Martin hilft Menschen in schwierigen Momenten – ohne grosse Worte, einfach mit Herz. Melde dich, wenn du unterstützen möchtest: Wir schicken dir die Spendendetails persönlich zu.",
    formName: "Dein Name",
    formEmail: "Deine E-Mail",
    formMessage: "Deine Nachricht",
    formMessagePlaceholder: "Ich möchte gerne helfen…",
    submit: "Nachricht senden",
    submitNote: "Beim Absenden öffnet sich dein E-Mail-Programm mit einer vorausgefüllten Nachricht.",
    orDirect: "Oder schreib uns direkt an",
    tagline: "Mit ♥ von Martin.",
  },
  en: {
    eyebrow: "Liebeszit",
    titleLine1: "Time for love.",
    titleLine2: "Time to help.",
    subtitle:
      "Martin helps people through difficult moments — quietly, and with heart. Reach out if you'd like to support: we'll send you the payment details personally.",
    formName: "Your name",
    formEmail: "Your email",
    formMessage: "Your message",
    formMessagePlaceholder: "I'd like to help…",
    submit: "Send message",
    submitNote: "Sending this opens your email app with a pre-filled message.",
    orDirect: "Or email us directly at",
    tagline: "Made with ♥ by Martin.",
  },
}

export default function Home() {
  const [lang, setLang] = useState("de")
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  useEffect(() => {
    const saved = window.localStorage.getItem("liebeszit-lang")
    if (saved === "de" || saved === "en") {
      setLang(saved)
      return
    }
    const browserLang = navigator.language || navigator.languages?.[0] || "de"
    setLang(browserLang.toLowerCase().startsWith("de") ? "de" : "en")
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  function changeLang(next) {
    setLang(next)
    window.localStorage.setItem("liebeszit-lang", next)
  }

  const t = translations[lang]

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(
      lang === "de" ? `Liebeszit – Nachricht von ${form.name || "der Website"}` : `Liebeszit – message from ${form.name || "the website"}`
    )
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF8F3] text-[#241C1C]">
      <section className="relative flex flex-1 items-center overflow-hidden px-6 py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#D6435D]/15 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-5xl">
          <div className="mb-8 flex items-center justify-between">
            <span className="font-display flex items-center gap-2 text-lg font-semibold tracking-tight">
              <img src="/liebeszit-mark.svg" alt="" className="h-6 w-6" />
              Liebeszit
            </span>
            <div className="flex items-center gap-1 rounded-full border border-black/10 p-1 text-xs font-medium">
              {["de", "en"].map((code) => (
                <button
                  key={code}
                  onClick={() => changeLang(code)}
                  className={`rounded-full px-2.5 py-1 transition-colors ${
                    lang === code ? "bg-[#241C1C] text-white" : "text-[#241C1C]/60 hover:text-[#241C1C]"
                  }`}
                  aria-pressed={lang === code}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 sm:items-center">
            <div>
              <p className="font-display mb-3 text-sm italic tracking-wide text-[#D6435D]">{t.eyebrow}</p>
              <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
                {t.titleLine1}
                <br />
                {t.titleLine2}
              </h1>
              <p className="mt-5 max-w-md text-[#241C1C]/70">{t.subtitle}</p>
              <p className="mt-6 text-sm text-[#241C1C]/60">{t.orDirect}</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-block font-medium text-[#D6435D] underline">
                {CONTACT_EMAIL}
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-black/10 bg-white p-6">
              <div>
                <label className="mb-1 block text-sm font-medium">{t.formName}</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-lg border border-black/10 px-3 py-2 outline-none focus:border-[#D6435D]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">{t.formEmail}</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-lg border border-black/10 px-3 py-2 outline-none focus:border-[#D6435D]"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">{t.formMessage}</label>
                <textarea
                  required
                  rows={3}
                  placeholder={t.formMessagePlaceholder}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full rounded-lg border border-black/10 px-3 py-2 outline-none focus:border-[#D6435D]"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-[#D6435D] px-6 py-2.5 font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                {t.submit}
              </button>
              <p className="text-xs text-[#241C1C]/50">{t.submitNote}</p>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/5 px-6 py-4 text-center text-xs text-[#241C1C]/60">
        {t.tagline}
      </footer>
    </div>
  )
}
