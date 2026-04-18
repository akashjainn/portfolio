import '../../styles/journal.css'
import { SiteNav } from '@/components/journal/SiteNav'
import { SiteFooter } from '@/components/journal/SiteFooter'

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="journal-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteNav />
      <main id="main-content" style={{ flex: 1 }}>
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
