import { Navigation } from "@/components/site/navigation"

export const metadata = {
  title: "Resume",
  description: "Akash Jain's resume — inline viewer and downloadable PDF."
}

export default function ResumePage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="py-8">
        <div className="container max-w-5xl">
          <header className="mb-6">
            <h1 className="text-3xl font-semibold tracking-[-0.02em]">Resume</h1>
            <p className="text-muted-foreground">Inline preview with a downloadable PDF.</p>
          </header>

          <div className="rounded-lg border bg-card">
            <object
              data="/Akash_Jain_Resume.pdf#toolbar=0&view=FitH"
              type="application/pdf"
              className="w-full h-[80vh]"
              aria-label="Resume PDF viewer"
            >
              <p className="p-4">
                Your browser doesn’t support inline PDFs. Download it instead: {" "}
                <a href="/Akash_Jain_Resume.pdf" className="link">Akash_Jain_Resume.pdf</a>
              </p>
            </object>
          </div>
        </div>
      </main>
    </>
  )
}
