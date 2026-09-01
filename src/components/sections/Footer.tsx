import { asset } from '@/lib/assets'

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-7 px-5 pt-[50px] pb-20 text-center sm:px-7 sm:pt-[70px] sm:pb-[100px]">
      <img src={asset('New-Logo-Black.png')} alt="eyal doron" className="block h-20" />
      <nav className="flex flex-wrap justify-center gap-[12px_30px] text-[16px] font-medium sm:text-[18px]">
        <a href="#terms" className="text-ink hover:text-brand-violet">
          תנאי שימוש
        </a>
        <a href="#privacy" className="text-ink hover:text-brand-violet">
          מדיניות פרטיות
        </a>
        <a href="#accessibility" className="text-ink hover:text-brand-violet">
          הצהרת נגישות
        </a>
      </nav>
      <p className="text-[16px] text-ink-gray sm:text-[17px]">© 2026 ד״ר אייל דורון. כל הזכויות שמורות.</p>
    </footer>
  )
}
