import dynamic from 'next/dynamic'
import { Figure } from './Figure'
import type { JournalArtifact } from '@/lib/journal'

const ARTIFACT_COMPONENTS: Record<string, React.ComponentType<{ artifact: JournalArtifact }>> = {
  ribbon:   dynamic(() => import('./UptimeRibbon').then((m) => ({ default: m.UptimeRibbon })), { ssr: false }),
  viewport: dynamic(() => import('./GBAViewport').then((m) => ({ default: m.GBAViewport })), { ssr: false }),
  graph:    dynamic(() => import('./EvidenceGraph').then((m) => ({ default: m.EvidenceGraph })), { ssr: false }),
  model:    dynamic(() => import('./ARTriumModel').then((m) => ({ default: m.ARTriumModel })), { ssr: false }),
  horizon:  dynamic(() => import('./CSSHorizon').then((m) => ({ default: m.CSSHorizon })), { ssr: true }),
}

interface PressedSpecimenProps {
  artifact: JournalArtifact
}

export function PressedSpecimen({ artifact }: PressedSpecimenProps) {
  if (artifact.type === 'none') return null

  const ArtifactComponent = ARTIFACT_COMPONENTS[artifact.type]

  if (artifact.type === 'viewport') {
    return (
      <div style={{ margin: 'var(--s-7) 0' }}>
        {ArtifactComponent && <ArtifactComponent artifact={artifact} />}
        {artifact.caption && (
          <p style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '.04em',
            color: 'var(--fg-3)',
            marginTop: 'var(--s-3)',
            textAlign: 'center',
          }}>
            {artifact.caption}
          </p>
        )}
      </div>
    )
  }

  return (
    <Figure
      caption={artifact.caption}
      {...(artifact.aspectRatio ? { aspectRatio: artifact.aspectRatio } : {})}
    >
      {ArtifactComponent ? (
        <ArtifactComponent artifact={artifact} />
      ) : null}
    </Figure>
  )
}
