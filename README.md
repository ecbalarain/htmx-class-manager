# HTMX Class Manager Extension

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTMX](https://img.shields.io/badge/htmx-2.0%2B-orange.svg)

A powerful HTMX extension that allows you to dynamically add, remove, or toggle CSS classes from elements based on server responses, without requiring JavaScript.

## ✨ Features

- 🎯 **Declarative**: Use simple HTML attributes in server responses
- 🚀 **Powerful**: Supports any valid CSS selector
- 🔄 **Flexible**: Add/remove/toggle single or multiple classes
- 🎨 **Wildcard Support**: Remove classes by pattern (e.g., `bg-*`, `*-disabled`)
- 📦 **Lightweight**: < 3KB minified
- 🐛 **Debuggable**: Built-in debug mode with detailed console logging
- ⚡ **Fast**: Selector caching for optimal performance
- 🛡️ **Robust**: Advanced error handling and validation
- 🌐 **Universal**: Works with all server-side frameworks

## 📦 Installation

### Via CDN (Recommended)

```html
<script src="https://unpkg.com/htmx.org@2.0.0"></script>
<script src="https://unpkg.com/htmx-class-manager@1.1.0/dist/class-manager.min.js"></script>
```

Or use jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.0"></script>
<script src="https://cdn.jsdelivr.net/npm/htmx-class-manager@1.1.0/dist/class-manager.min.js"></script>
```

### Via npm

```bash
npm install htmx-class-manager
```

Then include in your project:

```javascript
import 'htmx-class-manager';
```

### Download Directly

Download `class-manager.min.js` from the [releases page](https://github.com/ecbalarain/htmx-class-manager/releases) and include it in your HTML:

```html
<script src="path/to/class-manager.min.js"></script>
```

## 🚀 Quick Start

### 1. Enable the Extension

Add `hx-ext="class-manager"` to your HTML:

```html
<body hx-ext="class-manager">
    <-l Your content -->
</body>
```

Or on specific elements:

```html
<div hx-ext="class-manager">
    <-l Only this section uses the extension -->
</div>
```

### 2. Use in Server Responses

In your server's HTML response, add `class-add`, `class-remove`, or `class-toggle` attributes:

```html
<-l Server returns this partial HTML -->
<div class-add="#myElement:highlight"></div>
```

That's it! The extension will automatically add the `highlight` class to the element with `id="myElement"`.

## 📖 Usage

### Basic Syntax

```html
<div class-add="selector:class1,class2"></div>
<div class-remove="selector:class1,class2"></div>
<div class-toggle="selector:class1,class2"></div>
```

**Format**: `"selector:classes"` where:
- `selector` = Any valid CSS selector
- `classes` = Comma-separated class names (no dots)
- Multiple targets = Separate with pipe `|`

### Examples

#### Add Classes

```html
<-l Add single class -->
<div class-add="#alert:visible"></div>

<-l Add multiple classes -->
<div class-add="#alert:visible,fade-in,shadow-lg"></div>

<-l Multiple targets -->
<div class-add="#alert:visible | .notification:active"></div>
```

#### Remove Classes

```html
<-l Remove single class -->
<div class-remove="#loader:hidden"></div>

<-l Remove multiple classes -->
<div class-remove="#modal:open,active,visible"></div>

<-l Multiple targets -->
<div class-remove="#modal:open | .overlay:visible"></div>
```

#### Toggle Classes

```html
<-l Toggle single class -->
<div class-toggle="#sidebar:collapsed"></div>

<-l Toggle multiple classes -->
<div class-toggle="#menu:open,active"></div>

<-l Multiple targets -->
<div class-toggle="#menu:open | .overlay:visible"></div>
```

### 🎨 Wildcard Patterns (NEW in v1.1.0)

Remove classes that match a pattern using wildcards in `class-remove`:

#### Prefix Match (`bg-*`)
Remove all classes starting with a prefix:

```html
<-l Remove all background color classes -->
<div class-remove="#element:bg-*"></div>

<-l Removes: bg-red-500, bg-blue-300, bg-gray-100, etc. -->
```

#### Suffix Match (`*-disabled`)
Remove all classes ending with a suffix:

```html
<-l Remove all disabled state classes -->
<div class-remove=".button:*-disabled"></div>

<-l Removes: is-disabled, btn-disabled, input-disabled, etc. -->
```

#### Contains Match (`*-text-*`)
Remove all classes containing a substring:

```html
<-l Remove all text-related utility classes -->
<div class-remove="#content:*-text-*"></div>

<-l Removes: has-text-centered, no-text-transform, etc. -->
```

#### Practical Wildcard Examples

```html
<-l Replace Tailwind color scheme -->
<div class-remove="#button:bg-*,text-*"
     class-add="#button:bg-blue-500,text-white"></div>

<-l Clear all state classes -->
<div class-remove=".form-input:*-error,*-success,*-warning"></div>

<-l Remove all responsive classes -->
<div class-remove="#grid:sm-*,md-*,lg-*"></div>
```

### Advanced Usage

#### Complex Selectors

```html
<-l Use any CSS selector -->
<div class-add=".card > .header:highlighted"></div>
<div class-add="[data-status='active']:badge-success"></div>
<div class-add="#parent .child:animated"></div>
```

#### Combining Operations

```html
<-l Process in order: remove, then add, then toggle -->
<div class-remove="#element:old-class"
     class-add="#element:new-class"
     class-toggle="#element:active"></div>
```

#### Real-World Example: Toast Notifications

**Server Response (Django/Flask/Rails):**
```html
<-l Show toast with animation -->
<div class-add="#toast:opacity-100,translate-y-0"
     class-remove="#toast:opacity-0,translate-y-2"></div>
```

**HTML:**
```html
<div id="toast" class="opacity-0 translate-y-2 transition-all">
    Success! Your changes have been saved.
</div>
```

#### Real-World Example: Modal Management

**Server Response:**
```html
<-l Open modal and add overlay -->
<div class-add="#modal:flex | #overlay:block"
     class-remove="#modal:hidden | #overlay:hidden"></div>
```

**HTML:**
```html
<div id="modal" class="hidden">Modal Content</div>
<div id="overlay" class="hidden">Backdrop</div>
```

#### Real-World Example: Form Validation

**Server Response:**
```html
<-l Clear old states, show error -->
<div class-remove="#email-field:*-success,*-error"
     class-add="#email-field:border-red-500,text-red-600"></div>
```

## 🎯 Use Cases

### Loading States

**Server starts processing:**
```html
<div class-add="#submit-btn:opacity-50,cursor-not-allowed"
     class-remove="#submit-btn:hover:bg-blue-600"></div>
```

**Server completes:**
```html
<div class-remove="#submit-btn:opacity-50,cursor-not-allowed"
     class-add="#submit-btn:hover:bg-blue-600"></div>
```

### Theme Switching

```html
<-l Switch from light to dark theme -->
<div class-remove="body:bg-*,text-*"
     class-add="body:bg-gray-900,text-white"></div>
```

### Navigation Active States

```html
<-l Update active nav item -->
<div class-remove=".nav-item:active,font-bold"
     class-add="#nav-home:active,font-bold"></div>
```

### Form Feedback

```html
<-l Show success state -->
<div class-remove=".form-group:*-error"
     class-add=".form-group:border-green-500,text-green-600"></div>
```

### Tab Switching

```html
<-l Activate new tab -->
<div class-remove=".tab:active,border-blue-500"
     class-add="#tab-2:active,border-blue-500"></div>
```

## 🔧 Configuration

### Debug Mode

Enable detailed console logging:

```javascript
// In your browser console or script
htmx.config.extensions = htmx.config.extensions || {};
htmx.config.extensions['class-manager'] = { debug: true };
```

Or programmatically:

```javascript
// After extension loads
const ext = htmx.ext['class-manager'];
if (ext) ext.debug = true;
```

When enabled, you'll see:
- Server responses received
- Classes being added/removed/toggled
- Validation errors and warnings
- Selector matching results

## 📚 API Reference

### Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| `class-add` | Add classes to target elements | `class-add="#el:class1,class2"` |
| `class-remove` | Remove classes from target elements | `class-remove="#el:class1,class2"` |
| `class-toggle` | Toggle classes on target elements | `class-toggle="#el:class1,class2"` |

### Directive Format

```
attribute="selector:class1,class2,class3 | selector2:class4"
```

- **Selector**: Any valid CSS selector (id, class, attribute, etc.)
- **Classes**: Comma-separated class names (without dots)
- **Multiple Targets**: Separated by pipe `|`
- **Wildcards**: Use `*` for pattern matching (class-remove only)

### Wildcard Patterns

| Pattern | Matches | Example |
|---------|---------|---------|
| `prefix-*` | Classes starting with prefix | `bg-*` matches `bg-red-500`, `bg-blue-300` |
| `*-suffix` | Classes ending with suffix | `*-disabled` matches `is-disabled`, `btn-disabled` |
| `*-substring-*` | Classes containing substring | `*-text-*` matches `has-text-bold` |

## 🎬 Complete Examples

### Example 1: Toast Notification System

**HTML:**
```html
<body hx-ext="class-manager">
    <div id="toast" 
         class="hidden opacity-0 transition-all duration-300">
        <p id="toast-message"></p>
    </div>
    
    <button hx-post="/save" 
            hx-target="#toast-message">
        Save
    </button>
</body>
```

**Server Response (Success):**
```html
<div class-remove="#toast:hidden,opacity-0"
     class-add="#toast:opacity-100">
    <p>✓ Saved successfully!</p>
</div>
```

**Server Response (Error):**
```html
<div class-remove="#toast:hidden,opacity-0,bg-*"
     class-add="#toast:opacity-100,bg-red-500">
    <p>✗ Error saving data</p>
</div>
```

### Example 2: Dynamic Form Validation

**HTML:**
```html
<form hx-ext="class-manager">
    <input id="email" 
           type="email" 
           hx-post="/validate-email"
           hx-trigger="blur"
           class="border-2">
    <span id="email-error"></span>
</form>
```

**Server Response (Valid):**
```html
<div class-remove="#email:border-*,*-error"
     class-add="#email:border-green-500"></div>
```

**Server Response (Invalid):**
```html
<div class-remove="#email:border-*,*-success"
     class-add="#email:border-red-500">
    <span id="email-error" class="text-red-600">Invalid email</span>
</div>
```

### Example 3: Sidebar Navigation

**HTML:**
```html
<nav hx-ext="class-manager">
    <a id="nav-home" class="nav-item active">Home</a>
    <a id="nav-about" class="nav-item" hx-get="/about">About</a>
    <a id="nav-contact" class="nav-item" hx-get="/contact">Contact</a>
</nav>
```

**Server Response (About page):**
```html
<div class-remove=".nav-item:active,font-bold"
     class-add="#nav-about:active,font-bold">
    <-l About page content -->
</div>
```

### Example 4: Theme Switcher

**Server Response (Dark Mode):**
```html
<div class-remove="body:bg-*,text-*"
     class-add="body:bg-gray-900,text-gray-100"
     class-remove=".card:bg-*"
     class-add=".card:bg-gray-800"></div>
```

**Server Response (Light Mode):**
```html
<div class-remove="body:bg-*,text-*"
     class-add="body:bg-white,text-gray-900"
     class-remove=".card:bg-*"
     class-add=".card:bg-gray-100"></div>
```

## ⚠️ Important Notes

### Wildcard Limitations
- Wildcards (`*`) are **only supported in `class-remove`**
- Using wildcards in `class-add` or `class-toggle` will show a warning (in debug mode)

### Processing Order
When multiple attributes are present, they execute in this order:
1. `class-remove`
2. `class-add`
3. `class-toggle`

### Selector Validation
- Invalid CSS selectors are detected and skipped
- Enable debug mode to see validation errors
- Selectors are cached for performance

### Attribute Cleanup
After processing, the `class-add`, `class-remove`, and `class-toggle` attributes are automatically removed from elements.

## 🐛 Troubleshooting

### Classes not being applied?

1. **Enable debug mode** to see what's happening
2. **Check your selector** - ensure it's valid CSS
3. **Verify the element exists** when the response is processed
4. **Check the order** - remove happens before add

### Wildcard not working?

1. Wildcards only work with `class-remove`
2. Ensure the pattern is correct (`bg-*`, `*-disabled`)
3. Enable debug mode to see matching classes

### Performance issues?

1. The extension caches selectors automatically
2. Avoid overly complex selectors when possible
3. Use specific selectors (IDs) instead of broad ones

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/ecbalarain/htmx-class-manager)
- [NPM Package](https://www.npmjs.com/package/htmx-class-manager)
- [HTMX Documentation](https://htmx.org)
- [Report Issues](https://github.com/ecbalarain/htmx-class-manager/issues)

## 📝 Changelog

### v1.1.0 (2025-12-06)
- ✨ Added `class-toggle` attribute for toggling classes
- 🎨 Added wildcard pattern support in `class-remove` (`bg-*`, `*-disabled`, `*-text-*`)
- ⚡ Added selector caching for improved performance
- 🛡️ Enhanced error handling and selector validation
- 📚 Improved documentation with more examples

### v1.0.0 (2025-01-01)
- 🎉 Initial release
- ✅ `class-add` and `class-remove` functionality
- 🐛 Debug mode
- 📦 Multiple selector support

---

Made with ❤️ for the HTMX community
