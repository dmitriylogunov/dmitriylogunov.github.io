# Project-Specific Instructions for Claude

## Jekyll Site Configuration

This is a Jekyll site hosted on GitHub Pages with custom styling.

### SASS/SCSS Compatibility Guidelines

**IMPORTANT**: This site is deployed on GitHub Pages, which uses Jekyll 3.x with an older Sass compiler. To ensure compatibility:

#### ✅ SASS Directives That CAN Be Used (GitHub Pages Compatible):

1. **@import** - Use for importing partials
   ```scss
   @import "variables";
   @import "typography";
   ```

2. **Legacy Color Functions** - Use these instead of modern alternatives:
   - `darken($color, $amount)`
   - `lighten($color, $amount)`
   - `saturate($color, $amount)`
   - `desaturate($color, $amount)`
   - `mix($color1, $color2, $weight)`
   - `rgba($color, $alpha)`

3. **Standard SASS Features**:
   - Variables: `$variable-name`
   - Nesting
   - Mixins: `@mixin` and `@include`
   - Extends: `@extend`
   - Functions: `@function`
   - Control directives: `@if`, `@for`, `@each`, `@while`
   - Interpolation: `#{$variable}`

#### ❌ SASS Directives That CANNOT Be Used (Not Supported by GitHub Pages):

1. **@use** - Modern module system (use @import instead)
   ```scss
   // Don't use:
   @use 'sass:color';
   @use 'variables' as *;
   
   // Use instead:
   @import 'variables';
   ```

2. **@forward** - Module forwarding (not supported)

3. **Module Functions** - Built-in module syntax:
   ```scss
   // Don't use:
   color.adjust($color, $lightness: 10%)
   math.div($a, $b)
   
   // Use instead:
   lighten($color, 10%)
   $a / $b  // or calc($a / $b) for future compatibility
   ```

4. **Modern Sass Features**:
   - CSS custom properties in SASS calculations
   - `@supports` within SASS
   - Module namespacing

### File Structure

- `_sass/` - Contains all SCSS partials
  - `variables.scss` - Color scheme, fonts, spacing
  - `typography.scss` - Base typography styles
  - `main.scss` - Main layout and components
  - `footer.scss` - Footer specific styles
  - `gallery.scss` - Gallery component styles
  - `timeline.scss` - Timeline component styles
- `assets/css/styles.scss` - Main SCSS file that imports all partials
- `_config.yml` - Jekyll configuration (includes SASS settings)

### Deprecation Warnings

The project is configured to suppress SASS deprecation warnings in `_config.yml`:
```yaml
sass:
  sass_dir: _sass
  style: compressed
  quiet_deps: true
  silence_deprecations: 
    - import
    - global-builtin
    - color-functions
```

These warnings appear in local development but don't affect GitHub Pages deployment.

### Testing Locally vs GitHub Pages

When developing locally:
- You may see deprecation warnings (suppressed via config)
- Modern SASS features might work locally but will fail on GitHub Pages
- Always test with `bundle exec jekyll build` before pushing

### Key Commands

```bash
# Build site locally
bundle exec jekyll build

# Serve site locally
bundle exec jekyll serve

# Update dependencies
bundle update
```

### Important Notes

1. Always use `@import` instead of `@use` for GitHub Pages compatibility
2. Use legacy color functions (`darken`, `lighten`) instead of `color.adjust`
3. Import variables globally in the main styles.scss file
4. Test builds locally before pushing to ensure GitHub Pages compatibility

### Vibe Coding Post Note

"Keep my style but feel free to re-phrase to better follow the english language general structure."

### Writing Style Instructions

When creating or editing posts:
- Re-word minimally, for style only
- Do not add anything else as it makes too obvious that the text is AI generated
- Keep the original voice and intention intact