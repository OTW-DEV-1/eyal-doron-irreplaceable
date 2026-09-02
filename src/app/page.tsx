import { MotionProvider } from '@/components/MotionProvider'
import { Header } from '@/components/sections/Header'
import { Hero } from '@/components/sections/Hero'
import { CreativityStrip } from '@/components/sections/CreativityStrip'
import { Logos } from '@/components/sections/Logos'
import { IntroVideo } from '@/components/sections/IntroVideo'
import { Problem } from '@/components/sections/Problem'
import { Turn } from '@/components/sections/Turn'
import { Gallery } from '@/components/sections/Gallery'
import { Process } from '@/components/sections/Process'
import { Benefits } from '@/components/sections/Benefits'
import { Journey } from '@/components/sections/Journey'
import { How } from '@/components/sections/How'
import { More } from '@/components/sections/More'
import { About } from '@/components/sections/About'
import { Voices } from '@/components/sections/Voices'
import { Faq } from '@/components/sections/Faq'
import { Price } from '@/components/sections/Price'
import { Closing } from '@/components/sections/Closing'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'

export default function Page() {
  return (
    <div className="overflow-x-clip overflow-y-visible text-right text-ink">
      <MotionProvider />
      <Header />
      <Hero />
      <CreativityStrip />
      <Logos />
      <IntroVideo />
      <Problem />
      <Turn />
      <Gallery />
      <Process />
      <Benefits />
      <Journey />
      <How />
      <More />
      <About />
      <Voices />
      <Faq />
      <Price />
      <Closing />
      <Contact />
      <Footer />
    </div>
  )
}
