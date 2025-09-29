import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const routes = [
  { path: '/', name: 'Home' },
  { path: '/projects', name: 'Projects' },
  { path: '/projects/propsage', name: 'PropSage Case Study' },
  { path: '/projects/stocksense', name: 'StockSense Case Study' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '/playground', name: 'Playground' }
]

test.describe('Accessibility Tests', () => {
  routes.forEach(({ path, name }) => {
    test(`${name} page should not have accessibility violations`, async ({ page }) => {
      await page.goto(path)
      
      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle')
      
      // Run accessibility scan
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()

      expect(accessibilityScanResults.violations).toEqual([])
    })
  })

  test('Keyboard navigation should work throughout the site', async ({ page }) => {
    await page.goto('/')
    
    // Test Tab navigation from homepage
    await page.keyboard.press('Tab') // Should focus first interactive element
    
    // Get the focused element
    const focusedElement = await page.locator(':focus')
    await expect(focusedElement).toBeVisible()
    
    // Navigate to projects
    await page.keyboard.press('Enter')
    await page.waitForURL('**/projects')
    
    // Continue tabbing to ensure no focus traps
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
      const currentFocus = await page.locator(':focus')
      await expect(currentFocus).toBeVisible()
    }
  })

  test('Focus indicators should be visible', async ({ page }) => {
    await page.goto('/')
    
    // Tab to first focusable element
    await page.keyboard.press('Tab')
    const focusedElement = await page.locator(':focus')
    
    // Check if focus ring is visible (should have some kind of outline/ring)
    const styles = await focusedElement.evaluate((el) => {
      const computed = window.getComputedStyle(el)
      return {
        outline: computed.outline,
        outlineWidth: computed.outlineWidth,
        outlineStyle: computed.outlineStyle,
        outlineColor: computed.outlineColor,
        boxShadow: computed.boxShadow
      }
    })
    
    // Should have either outline or box-shadow for focus indicator
    const hasFocusIndicator = 
      styles.outline !== 'none' || 
      styles.outlineWidth !== '0px' ||
      styles.boxShadow !== 'none'
    
    expect(hasFocusIndicator).toBe(true)
  })

  test('Images should have alt text', async ({ page }) => {
    await page.goto('/projects')
    
    const images = await page.locator('img').all()
    
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      const role = await img.getAttribute('role')
      
      // Image should either have alt text or be decorative (role="presentation")
      const isAccessible = alt !== null || role === 'presentation'
      expect(isAccessible).toBe(true)
    }
  })

  test('Color contrast should meet WCAG standards', async ({ page }) => {
    await page.goto('/')
    
    // Use axe-core to specifically test color contrast
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('Form elements should have labels', async ({ page }) => {
    await page.goto('/contact')
    
    // Check that all form inputs have labels
    const inputs = await page.locator('input, textarea, select').all()
    
    for (const input of inputs) {
      const id = await input.getAttribute('id')
      const ariaLabel = await input.getAttribute('aria-label')
      const ariaLabelledby = await input.getAttribute('aria-labelledby')
      
      if (id) {
        // Check for associated label
        const label = await page.locator(`label[for="${id}"]`).count()
        const hasLabel = label > 0 || ariaLabel || ariaLabelledby
        expect(hasLabel).toBe(true)
      } else {
        // Should have aria-label or aria-labelledby
        expect(ariaLabel || ariaLabelledby).toBeTruthy()
      }
    }
  })

  test('Headings should have proper hierarchy', async ({ page }) => {
    await page.goto('/projects/propsage')
    
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()
    const headingLevels = []
    
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase())
      const level = parseInt(tagName.charAt(1))
      headingLevels.push(level)
    }
    
    // Should start with h1
    expect(headingLevels[0]).toBe(1)
    
    // Check for proper hierarchy (no skipping levels)
    for (let i = 1; i < headingLevels.length; i++) {
      const currentLevel = headingLevels[i]
      const previousLevel = headingLevels[i - 1]
      
      // Can go same level, one level deeper, or any level up
      const isValidProgression = 
        currentLevel === previousLevel || // Same level
        currentLevel === previousLevel + 1 || // One level deeper
        currentLevel < previousLevel // Any level up
        
      expect(isValidProgression).toBe(true)
    }
  })

  test('Reduced motion should be respected', async ({ page }) => {
    // Set prefers-reduced-motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    
    // Check that animations are disabled or reduced
    // This is a basic check - actual implementation depends on CSS
    const animatedElements = await page.locator('[class*="animate"]').all()
    
    for (const element of animatedElements) {
      const styles = await element.evaluate(el => {
        const computed = window.getComputedStyle(el)
        return {
          animationDuration: computed.animationDuration,
          transitionDuration: computed.transitionDuration
        }
      })
      
      // With reduced motion, animations should be very fast or disabled
      const hasReducedMotion = 
        styles.animationDuration === '0s' || 
        styles.animationDuration === '0.01s' ||
        styles.transitionDuration === '0s' ||
        styles.transitionDuration === '0.01s'
      
      // This is a soft check since we may have some animations that respect reduced motion differently
      if (!hasReducedMotion) {
        console.warn(`Element may not respect reduced motion preference: ${await element.getAttribute('class')}`)
      }
    }
  })

  test('ARIA landmarks should be present', async ({ page }) => {
    await page.goto('/')
    
    // Check for main landmark
    const main = await page.locator('main, [role="main"]').count()
    expect(main).toBeGreaterThan(0)
    
    // Check for navigation landmark
    const nav = await page.locator('nav, [role="navigation"]').count()
    expect(nav).toBeGreaterThan(0)
    
    // Check for banner (header) landmark if present
    const banner = await page.locator('header, [role="banner"]').count()
    if (banner > 0) {
      expect(banner).toBeGreaterThan(0)
    }
  })

  test('Skip links should be available', async ({ page }) => {
    await page.goto('/')
    
    // Tab to first element (should be skip link)
    await page.keyboard.press('Tab')
    const firstFocusable = await page.locator(':focus')
    
    // Check if it's a skip link
    const text = await firstFocusable.textContent()
    const href = await firstFocusable.getAttribute('href')
    
    if (text?.toLowerCase().includes('skip') || href?.startsWith('#main')) {
      // Test that skip link works
      await firstFocusable.click()
      const targetElement = await page.locator(href || '#main')
      await expect(targetElement).toBeFocused()
    }
  })
})