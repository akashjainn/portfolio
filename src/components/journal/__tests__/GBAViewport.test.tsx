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

  it('renders key hints inside the shell', () => {
    render(<GBAViewport artifact={artifact} />)
    expect(screen.getByText('Z key')).toBeInTheDocument()
    expect(screen.getByText('X key')).toBeInTheDocument()
    expect(screen.getByText('Arrows')).toBeInTheDocument()
  })

  it('renders on touch devices without a separate keyboard guide', () => {
    mockMatchMedia(true)
    render(<GBAViewport artifact={artifact} />)
    expect(screen.queryByLabelText('Keyboard controls')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Game Boy Advance')).toBeInTheDocument()
  })
})
