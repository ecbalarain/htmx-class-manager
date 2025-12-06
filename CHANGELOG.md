# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-12-06

### Added
- ✨ New `class-toggle` attribute for toggling classes on/off
- 🎨 Wildcard pattern support in `class-remove`:
  - Prefix matching: `bg-*` removes all classes starting with "bg-"
  - Suffix matching: `*-disabled` removes all classes ending with "-disabled"
  - Contains matching: `*-text-*` removes all classes containing "-text-"
- ⚡ Selector caching for improved performance
- 🛡️ Enhanced selector validation before applying directives
- 📊 Better error messages with detailed context

### Changed
- Refactored class operation handling to support multiple operation types
- Improved debug logging with more contextual information
- Updated documentation with extensive examples and use cases

### Performance
- Implemented Map-based selector caching
- Reduced redundant querySelector calls
- Optimized wildcard pattern matching

### Documentation
- Added comprehensive wildcard pattern examples
- Added real-world use cases for theme switching, form validation, etc.
- Expanded API reference with complete tables
- Added troubleshooting section
- Updated all CDN links to v1.1.0

## [1.0.0] - 2025-12-04

### Added
- Initial release of htmx-class-manager extension
- Support for `class-add` attribute to add classes
- Support for `class-remove` attribute to remove classes
- Multiple class support (comma-separated)
- Multiple target support (pipe-separated)
- Full CSS selector support
- Debug mode for detailed console logging
- Works with all HTMX swap modes including `hx-swap="none"`
- Automatic processing order (remove before add)
- Comprehensive documentation and examples
- TypeScript definitions
- npm package support
- CDN support (jsDelivr, unpkg)

### Features
- Declarative class manipulation from server responses
- No client-side JavaScript required
- Lightweight (< 2KB minified)
- Compatible with HTMX 1.9+ and 2.0+
- Works with all server-side frameworks
- Browser compatible (all modern browsers)

[1.1.0]: https://github.com/ecbalarain/htmx-class-manager/releases/tag/v1.1.0
[1.0.0]: https://github.com/ecbalarain/htmx-class-manager/releases/tag/v1.0.0
