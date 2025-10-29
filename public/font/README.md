# Custom Font Images

This directory contains PNG images of individual letters and characters used to spell out text with a custom handwritten font style.

## Usage

Import the `CustomFontText` component:

```tsx
import { CustomFontText } from "@/components/ui/custom-font-text"

// Basic usage
<CustomFontText text="Akash Jain" />

// With custom styling
<CustomFontText 
  text="Hello World" 
  alt="Hello World"
  letterClassName="h-8 md:h-10"  // Control letter height
  className="gap-2"               // Control spacing between letters
/>
```

## Supported Characters

- **Uppercase**: A-Z (e.g., `capital A.png`)
- **Lowercase**: a-z (e.g., `lowercase a.png`)
- **Punctuation**: `:`, `,`, `"`, `!`, `.`, `?`, `;`, `'`
- **Spaces**: Automatically rendered with appropriate spacing

## File Naming Convention

- Uppercase letters: `capital [letter].png`
- Lowercase letters: `lowercase [letter].png`
- Special characters: Named by their symbol (e.g., `colon.png`, `exclamation.png`)
