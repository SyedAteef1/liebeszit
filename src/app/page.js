"use client"

import { useEffect, useState } from "react"

const EMAIL = "liebeszit@proton.me"
const PHONE_DISPLAY = "+41 79 828 00 36"
const PHONE_TEL = "+41798280036"

const BANK = {
  iban: "CH1608307000558059309",
  ibanPretty: "CH16 0830 7000 5580 5930 9",
  bic: "HYPLCH22",
  name: "Liebeszit",
  bank: "Hypothekarbank Lenzburg AG",
}

const TABS = ["support", "help", "theory", "login"]

const translations = {
  de: {
    tabs: {
      support: "Unterstütze uns!",
      help: "Brauchst du Hilfe?",
      theory: "Theorie und Aktion",
      login: "Mitglieder-Login",
    },
    support: {
      headline: "Wir haben den Funken – deine Spende ist der Treibstoff!",
      bankTitle: "Bankverbindung",
      labels: { iban: "IBAN", bic: "BIC", name: "Name", bank: "Bank" },
      copy: "Kopieren",
      copied: "Kopiert!",
      twintTitle: "Twint",
      twintNote: "(1,4 % Gebühren)",
      other:
        "Wenn du etwas anderes spenden möchtest (Sachwerte, Immobilien, Bitcoins usw.) oder deine kostbare Zeit mit Liebeszit teilen willst, melde dich bei uns …",
      gratitude: "Für jede Spende erhältst du die Dankbarkeit und den Segen von Liebeszit!",
      thanks: "Danke!",
    },
    help: {
      headline: "Können wir dich unterstützen?",
      questions: [
        "Hast du Fragen zu Liebe und Leben?",
        "Spürst du, dass du auf deinem persönlichen Weg Unterstützung brauchst?",
        "Bist du neugierig, was hinter all dem «Liebeszit» steckt?",
      ],
      cta: "Schreib uns!",
    },
    theory: {
      headline: "Theorie und Aktion",
      note: "Mehr folgt in Kürze.",
    },
    login: {
      headline: "Mitglieder-Login",
      username: "Benutzername",
      password: "Passwort",
      submit: "Anmelden",
      inactive: "Der Mitglieder-Login ist noch nicht aktiv.",
      joinIntro: "Möchtest du aktiv mitmachen? Schreib uns über dich:",
    },
  },
  en: {
    tabs: {
      support: "Support Us!",
      help: "Need Support?",
      theory: "Theory and Action",
      login: "Member Login",
    },
    support: {
      headline: "We got the Spark, your donation is the Fuel!",
      bankTitle: "Bank transfer",
      labels: { iban: "IBAN", bic: "BIC", name: "Name", bank: "Bank" },
      copy: "Copy",
      copied: "Copied!",
      twintTitle: "Twint",
      twintNote: "(1.4% fees)",
      other:
        "If you have anything else to donate (goods, properties, bitcoins, etc.) or you want to share your own precious time with Liebeszit, please get in touch …",
      gratitude: "For every donation you are receiving the gratitude and blessings of Liebeszit!",
      thanks: "Thank You!",
    },
    help: {
      headline: "Can we support You?",
      questions: [
        "You have questions about love and life?",
        "You feel you need support in your personal journey?",
        "You're curious about what's behind all this “Liebeszit”?",
      ],
      cta: "Drop us a message!",
    },
    theory: {
      headline: "Theory and Action",
      note: "More is coming soon.",
    },
    login: {
      headline: "Member Login",
      username: "Username",
      password: "Password",
      submit: "Log in",
      inactive: "Member login is not active yet.",
      joinIntro: "Want to become an active Participant? Write us about You:",
    },
  },
}

// Swiss German — intentionally the same in both languages
const THEORY_QUOTE = "Du besch det wo de Floss vo de Zit ufd Onändlechkeit trefft!"

function Contact() {
  return (
    <div className="flex flex-col gap-1">
      <a href={`tel:${PHONE_TEL}`} className="text-[#FAED61] transition-colors hover:text-white">
        {PHONE_DISPLAY}
      </a>
      <a href={`mailto:${EMAIL}`} className="text-[#FAED61] transition-colors hover:text-white">
        {EMAIL}
      </a>
    </div>
  )
}

export default function Home() {
  const [lang, setLang] = useState("de")
  const [tab, setTab] = useState("support")
  const [copied, setCopied] = useState(false)

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

  async function copyIban() {
    await navigator.clipboard.writeText(BANK.iban)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const t = translations[lang]

  return (
    <div className="flex min-h-screen flex-col bg-black text-[#EDE9DC]">
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-8 sm:py-12">
        <div className="mb-6 flex justify-end">
          <div className="flex items-center gap-1 rounded-full border border-[#C4B514]/30 p-1 text-xs font-medium">
            {["de", "en"].map((code) => (
              <button
                key={code}
                onClick={() => changeLang(code)}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  lang === code ? "bg-[#C4B514] text-black" : "text-[#EDE9DC]/50 hover:text-[#EDE9DC]"
                }`}
                aria-pressed={lang === code}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <header className="flex flex-col items-center text-center">
          <img
            src="/liebeszit-logo.jpg"
            alt="Liebeszit"
            className="h-24 w-auto sm:h-28"
          />
          <h1 className="font-display mt-3 text-4xl font-light tracking-[0.18em] text-[#C4B514] sm:text-5xl">
            Liebeszit
          </h1>
        </header>

        <nav className="mt-8 flex flex-wrap justify-center gap-2">
          {TABS.map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                tab === key
                  ? "border-[#C4B514] bg-[#C4B514] font-medium text-black"
                  : "border-[#C4B514]/30 text-[#EDE9DC]/75 hover:border-[#C4B514]/70 hover:text-[#EDE9DC]"
              }`}
              aria-pressed={tab === key}
            >
              {t.tabs[key]}
            </button>
          ))}
        </nav>

        <section className="mt-8 rounded-2xl border border-[#C4B514]/25 bg-[#0A0A0A] p-6 sm:p-8">
          {tab === "support" && (
            <div className="space-y-7">
              <h2 className="font-display text-2xl leading-snug text-[#FAED61] sm:text-3xl">
                {t.support.headline}
              </h2>

              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#C4B514]">
                    {t.support.bankTitle}
                  </h3>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="text-[#EDE9DC]/50">{t.support.labels.iban}</dt>
                      <dd className="flex flex-wrap items-center gap-2">
                        <span className="font-mono tracking-tight">{BANK.ibanPretty}</span>
                        <button
                          onClick={copyIban}
                          className="rounded-full border border-[#C4B514]/40 px-2 py-0.5 text-xs text-[#C4B514] transition-colors hover:bg-[#C4B514] hover:text-black"
                        >
                          {copied ? t.support.copied : t.support.copy}
                        </button>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[#EDE9DC]/50">{t.support.labels.bic}</dt>
                      <dd className="font-mono">{BANK.bic}</dd>
                    </div>
                    <div>
                      <dt className="text-[#EDE9DC]/50">{t.support.labels.name}</dt>
                      <dd>{BANK.name}</dd>
                    </div>
                    <div>
                      <dt className="text-[#EDE9DC]/50">{t.support.labels.bank}</dt>
                      <dd>{BANK.bank}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#C4B514]">
                    {t.support.twintTitle}{" "}
                    <span className="font-normal normal-case tracking-normal text-[#EDE9DC]/50">
                      {t.support.twintNote}
                    </span>
                  </h3>
                  <img
                    src="/liebeszit-twint-qr.jpg"
                    alt={`Twint QR – ${BANK.name}`}
                    className="w-44 rounded-lg bg-white p-2"
                  />
                </div>
              </div>

              <div className="space-y-3 border-t border-[#C4B514]/20 pt-6 text-sm">
                <p className="text-[#EDE9DC]/75">{t.support.other}</p>
                <Contact />
              </div>

              <div className="space-y-1 border-t border-[#C4B514]/20 pt-6">
                <p className="text-[#EDE9DC]/75">{t.support.gratitude}</p>
                <p className="font-display text-2xl text-[#FAED61]">{t.support.thanks}</p>
              </div>
            </div>
          )}

          {tab === "help" && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl text-[#FAED61] sm:text-3xl">{t.help.headline}</h2>
              <ul className="space-y-2 text-[#EDE9DC]/75">
                {t.help.questions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
              <div className="space-y-3 border-t border-[#C4B514]/20 pt-6">
                <p className="font-display text-xl text-[#FAED61]">{t.help.cta}</p>
                <Contact />
              </div>
            </div>
          )}

          {tab === "theory" && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl text-[#FAED61] sm:text-3xl">{t.theory.headline}</h2>
              <p className="font-display text-xl italic leading-relaxed text-[#EDE9DC] sm:text-2xl">
                “{THEORY_QUOTE}”
              </p>
              <p className="text-sm text-[#EDE9DC]/50">{t.theory.note}</p>
            </div>
          )}

          {tab === "login" && (
            <div className="space-y-6">
              <h2 className="font-display text-2xl text-[#FAED61] sm:text-3xl">{t.login.headline}</h2>

              {/* Placeholder UI: no auth backend exists yet, so nothing is submitted anywhere. */}
              <form onSubmit={(e) => e.preventDefault()} className="max-w-sm space-y-3">
                <div>
                  <label htmlFor="username" className="mb-1 block text-sm text-[#EDE9DC]/60">
                    {t.login.username}
                  </label>
                  <input
                    id="username"
                    type="text"
                    disabled
                    className="w-full rounded-lg border border-[#C4B514]/25 bg-black px-3 py-2 text-[#EDE9DC] outline-none focus:border-[#C4B514] disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-1 block text-sm text-[#EDE9DC]/60">
                    {t.login.password}
                  </label>
                  <input
                    id="password"
                    type="password"
                    disabled
                    className="w-full rounded-lg border border-[#C4B514]/25 bg-black px-3 py-2 text-[#EDE9DC] outline-none focus:border-[#C4B514] disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled
                  className="w-full rounded-full bg-[#C4B514] px-6 py-2.5 font-medium text-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t.login.submit}
                </button>
                <p className="text-xs text-[#EDE9DC]/45">{t.login.inactive}</p>
              </form>

              <div className="space-y-2 border-t border-[#C4B514]/20 pt-6 text-sm">
                <p className="text-[#EDE9DC]/75">{t.login.joinIntro}</p>
                <a href={`mailto:${EMAIL}`} className="text-[#FAED61] transition-colors hover:text-white">
                  {EMAIL}
                </a>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-[#C4B514]/15 px-5 py-5 text-center text-xs text-[#EDE9DC]/40">
        Liebeszit · {PHONE_DISPLAY} · {EMAIL}
      </footer>
    </div>
  )
}
