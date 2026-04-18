export function SiteFooter() {
  return (
    <footer
      style={{
        padding: 'var(--s-7)',
        borderTop: '1px solid var(--rule)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--s-4)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--ink-3)',
        }}
      >
        © {new Date().getFullYear()} Akash Jain
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 12,
          color: 'var(--ink-3)',
        }}
      >
        Atlanta, GA · Vol. I
      </span>
    </footer>
  )
}
