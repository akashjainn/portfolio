import { render, screen } from '@testing-library/react'
import { GBAViewport } from '../GBAViewport'
import type { JournalArtifact } from '@/lib/journal'

const artifact: JournalArtifact = {
  type: 'viewport',
  caption: 'Adventure Time GBA',
}

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

describe('GBAViewport', () => {
  beforeEach(() => {
    mockMatchMedia(false)
  })

  it('renders the GBA shell with correct aria-label', () => {
    render(<GBAViewport artifact={artifact} />)
    expect(screen.getByLabelText('Game Boy Advance')).toBeInTheDocument()
  })

  it('renders the #gba-player element for EmulatorJS', () => {
    render(<GBAViewport artifact={artifact} />)
    expect(document.getElementById('gba-player')).toBeInTheDocument()
  })

  it('shows keyboard guide on non-touch devices', () => {
    mockMatchMedia(false)
    render(<GBAViewport artifact={artifact} />)
    expect(screen.getByLabelText('Keyboard controls')).toBeInTheDocument()
  })

  it('hides keyboard guide on touch devices', () => {
    mockMatchMedia(true)
    render(<GBAViewport artifact={artifact} />)
    expect(screen.queryByLabelText('Keyboard controls')).not.toBeInTheDocument()
  })
})
