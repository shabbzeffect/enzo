# Accessibility Checklist

## ✅ Implemented

### Semantic HTML & Landmarks
- [x] Proper heading hierarchy (h1 → h2 → h3)
- [x] Landmark regions: `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`
- [x] Breadcrumb navigation with `aria-label`
- [x] `role="dialog"` for mobile menu
- [x] `role="alert"` for form validation messages
- [x] `role="img"` for rating stars and charts

### Keyboard Navigation
- [x] Focus indicators via `focus-visible-ring` utility class
- [x] Skip link to main content
- [x] All interactive elements focusable
- [x] Mobile menu with `aria-expanded`, `aria-controls`
- [x] Filter panels with `aria-hidden`, `aria-label`
- [x] Toggle buttons with `aria-pressed`
- [x] Tabbed interfaces with proper `aria-selected`

### Form Accessibility
- [x] Labels for all inputs (`<label>` + `htmlFor`)
- [x] Required field indicators (`aria-hidden="true"` for visual *)
- [x] Error messages with `role="alert"`
- [x] `autoComplete` attributes on auth fields
- [x] Select elements with proper labels

### Images & Media
- [x] Alt text on all images (via `getImageUrl` + Next.js Image)
- [x] `aria-hidden="true"` for decorative images
- [x] Product image gallery with thumbnail `aria-label` and `aria-pressed`

### ARIA Attributes
- [x] `aria-label` on icon-only buttons
- [x] `aria-expanded` on collapsible elements
- [x] `aria-controls` linking triggers to targets
- [x] `aria-hidden` for dynamically hidden content
- [x] `aria-pressed` for toggle states
- [x] `aria-labelledby` for dialog titles
- [x] `aria-modal="true"` for modal dialogs

### Color & Contrast
- [x] CSS custom properties for theming
- [x] Focus indicators not reliant on color alone
- [x] Status indicators with text + color (not color-only)

### Screen Reader Support
- [x] Breadcrumb separators hidden with `aria-hidden`
- [x] Rating breakdown with `aria-label`
- [x] Price history chart with descriptive `aria-label`
- [x] External links with `rel="noopener noreferrer"`

## ⚠️ Known Issues / To Improve

### High Priority
- [ ] Add `lang` attribute to `<html>` (currently set in layout.tsx)
- [ ] Ensure all pages have unique, descriptive `<title>`
- [ ] Verify color contrast ratios meet WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Add `aria-live` regions for dynamic content updates

### Medium Priority
- [ ] Add skip link target (`id="main"`) on all pages
- [ ] Ensure dropdown/filter menus close on Escape key
- [ ] Add `aria-describedby` for form field help text
- [ ] Test with actual screen readers (NVDA, VoiceOver)

### Low Priority
- [ ] Add `prefers-reduced-motion` support for animations
- [ ] Provide text transcripts for any future audio/video
- [ ] Add `aria-orientation` to slider components

## Testing

### Automated
```bash
# Run axe-core in development
npm install --save-dev @axe-core/react
# Add to _app.tsx in development only
```

### Manual
- [ ] Navigate entire site with keyboard only
- [ ] Test with VoiceOver (macOS) / NVDA (Windows)
- [ ] Verify focus order is logical
- [ ] Check zoom up to 200% (WCAG 1.4.4)
- [ ] Test with high contrast mode

## References
- WCAG 2.1 AA Guidelines
- WAI-ARIA Authoring Practices
- Next.js Accessibility Docs
- axe-core Rules