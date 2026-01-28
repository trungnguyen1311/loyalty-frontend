# Project Rules

## UI & Styling

- **Tailwind Config**: Always use the defined colors in `tailwind.config.js`. Do not hardcode hex values in components.
- **Color Palettes**: Use `surface*`, `text*`, `neutral*`, and other semantic tokens generated from Figma. Avoid using raw colors.
- **New Colors**: If a new color is needed, check if it exists in Figma/Tailwind config first. If not, add it to the config (derived from Figma) before using.

## Strict Design Implementation (1:1)

- **Zero-Guessing Policy**: NEVER assume, guess, or estimate design values (font-size, font-weight, spacing, line-height, etc.). ALL values MUST be extracted directly from the Figma MCP JSON fields.
- **No Intuition**: Do not adjust values based on what "seems right" or "looks better". Follow the technical data 100%.
- **Validation**: If you find an inconsistency (e.g., similar elements having different sizes), report it to the user or re-run a deep extraction to confirm, but NEVER guess.
