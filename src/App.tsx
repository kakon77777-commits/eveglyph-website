import { useLang, COPY } from './i18n'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { LoopSection } from './components/LoopSection'
import { Demo } from './components/Demo'
import { Pillars } from './components/Pillars'
import { QuickStart } from './components/QuickStart'
import { Trust } from './components/Trust'
import { Footer } from './components/Footer'

export default function App() {
  const [lang, setLang] = useLang()
  const copy = COPY[lang]
  return (
    <div className="min-h-screen">
      <Nav copy={copy} lang={lang} setLang={setLang} />
      <main>
        <Hero copy={copy} />
        <LoopSection copy={copy} />
        <Demo copy={copy} />
        <Pillars copy={copy} />
        <QuickStart copy={copy} />
        <Trust copy={copy} />
      </main>
      <Footer copy={copy} />
    </div>
  )
}
