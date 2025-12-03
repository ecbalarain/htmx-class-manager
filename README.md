# HTMX Class Manager Extension

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTMX](https://img.shields.io/badge/htmx-2.0%2B-orange.svg)

A powerful HTMX extension that allows you to dynamically add or remove CSS classes from elements based on server responses, without requiring JavaScript.

## ✨ Features

- 🎯 **Declarative**: Use simple HTML attributes in server responses
- 🚀 **Powerful**: Supports any valid CSS selector
- 🔄 **Flexible**: Add/remove single or multiple classes
- 📦 **Lightweight**: < 2KB minified
- 🐛 **Debuggable**: Built-in debug mode with detailed console logging
- ⚡ **Fast**: Optimized for performance
- 🌐 **Universal**: Works with all server-side frameworks

## 📦 Installation

### Via CDN (Recommended)

```html
<script src="https://unpkg.com/htmx.org@2.0.0"></script>
<script src="https://unpkg.com/htmx-class-manager@1.0.0/dist/class-manager.min.js"></script>
```

Or use jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/htmx.org@2.0.0"></script>
<script src="https://cdn.jsdelivr.net/npm/htmx-class-manager@1.0.0/dist/class-manager.min.js"></script>
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
    <!-- Your content -->
</body>
```

Or on specific elements:

```html
<div hx-ext="class-manager">
    <!-- Only this section uses the extension -->
</div>
```

### 2. Use in Server Responses

In your server's HTML response, add `class-add` or `class-remove` attributes:

```html
<!-- Server returns this partial HTML -->
<div class-add="#myElement:highlight"></div>
```

That's it! The extension will automatically add the `highlight` class to the element with `id="myElement"`.

## 📖 Usage

### Basic Syntax

```html
<div class-add="selector:class1,class2"></div>
<div class-remove="selector:class1,class2"></div>
```

**Format**: `"selector:classes"` where:
- `selector` = Any valid CSS selector
- `classes` = Comma-separated class names (no dots)
- Multiple targets = Separate with pipe `|`

### Examples

#### Add Single Class

```html
<div class-add="#box:highlighted"></div>
```

#### Remove Single Class

```html
<div class-remove="#box:hidden"></div>
```

#### Add Multiple Classes

```html
<div class-add="#box:active,selected,primary"></div>
```

#### Target Multiple Elements

```html
<div class-add=".card:selected"></div>
<!-- Adds 'selected' to ALL elements with class 'card' -->
```

#### Multiple Targets, Different Classes

```html
<div class-add="#header:active|#sidebar:visible|.items:highlighted"></div>
```

#### Combine Add and Remove (Tab Switching)

```html
<div 
    class-remove=".tab:active"
    class-add=".tab[data-tab='2']:active"
></div>
```

**Note**: `class-remove` is always processed BEFORE `class-add`, making tab switching work correctly.

## 🎯 Real-World Examples

### Tab System

```python
# Django view
def switch_tab(request, tab_id):
    return HttpResponse(f'''
        <div 
            class-remove=".tab:active"
            class-add=".tab[data-tab='{tab_id}']:active"
        ></div>
    ''')
```

```html
<!-- HTML -->
<div class="tabs">
    <button hx-get="/tabs/1" hx-swap="none">Tab 1</button>
    <button hx-get="/tabs/2" hx-swap="none">Tab 2</button>
</div>
```

### Accordion

```python
def open_accordion(request, section_id):
    return HttpResponse(f'''
        <div 
            class-remove=".accordion-section:open"
            class-add="#section-{section_id}:open"
        ></div>
    ''')
```

### Multi-Select

```python
def select_items(request):
    item_ids = request.GET.getlist('ids')
    selectors = '|'.join([f"#item-{id}:selected" for id in item_ids])
    return HttpResponse(f'<div class-add="{selectors}"></div>')
```

### Form Validation

```python
def validate_field(request):
    if is_valid:
        return HttpResponse('''
            <div 
                class-remove="#email:error,shake"
                class-add="#email:success"
            ></div>
        ''')
    else:
        return HttpResponse('''
            <div 
                class-remove="#email:success"
                class-add="#email:error,shake"
            ></div>
        ''')
```

### Loading States

```python
def start_loading(request):
    return HttpResponse('<div class-add="#submit-btn:loading,disabled"></div>')

def stop_loading(request):
    return HttpResponse('<div class-remove="#submit-btn:loading,disabled"></div>')
```

## 🔧 Advanced Usage

### Complex CSS Selectors

The extension supports **any valid CSS selector**:

```html
<!-- Descendant selector -->
<div class-add="#header .nav-item:active"></div>

<!-- Child selector -->
<div class-add="#sidebar > .menu-item:highlighted"></div>

<!-- Attribute selector -->
<div class-add="[data-id='5']:selected"></div>

<!-- Pseudo-classes -->
<div class-add="li:nth-child(2):highlighted"></div>

<!-- Multiple conditions -->
<div class-add=".tab[data-tab='3'] > .content:visible"></div>
```

### Debug Mode

Enable detailed console logging:

```javascript
// In your browser console or script
htmx.config.extensions['class-manager'].debug = true;
```

Or modify the extension file:

```javascript
init: function(api) {
    this.api = api;
    this.debug = true; // Enable debug mode
}
```

Debug output shows:
- Received partial HTML
- Which directives are being processed
- Elements matched
- Classes before and after changes
- Summary of operations

### Working with Different Swap Modes

The extension works with all HTMX swap modes:

```html
<!-- Works with hx-swap="none" -->
<button hx-get="/highlight" hx-swap="none">Highlight</button>

<!-- Works with innerHTML (default) -->
<div hx-get="/content" hx-target="#container">Load</div>

<!-- Works with outerHTML -->
<div hx-get="/replace" hx-swap="outerHTML">Replace</div>
```

## 🌍 Server-Side Examples

### Django

```python
from django.http import HttpResponse

def highlight_item(request, item_id):
    return HttpResponse(f'<div class-add="#item-{item_id}:highlight"></div>')
```

### Flask

```python
from flask import Response

@app.route('/highlight/<item_id>')
def highlight_item(item_id):
    return Response(f'<div class-add="#item-{item_id}:highlight"></div>')
```

### Express.js

```javascript
app.get('/highlight/:itemId', (req, res) => {
    res.send(`<div class-add="#item-${req.params.itemId}:highlight"></div>`);
});
```

### Ruby on Rails

```ruby
def highlight_item
  render html: "<div class-add='#item-#{params[:id]}:highlight'></div>".html_safe
end
```

### PHP / Laravel

```php
public function highlightItem($itemId) {
    return "<div class-add='#item-{$itemId}:highlight'></div>";
}
```

### ASP.NET

```csharp
public IActionResult HighlightItem(int itemId)
{
    return Content($"<div class-add='#item-{itemId}:highlight'></div>", "text/html");
}
```

## 📋 API Reference

### Attributes

#### `class-add`

Adds classes to elements matching the selector.

**Syntax**: `class-add="selector:class1,class2,class3"`

**Multiple targets**: `class-add="sel1:classes|sel2:classes"`

#### `class-remove`

Removes classes from elements matching the selector.

**Syntax**: `class-remove="selector:class1,class2,class3"`

**Multiple targets**: `class-remove="sel1:classes|sel2:classes"`

### Processing Order

1. All `class-remove` directives are processed first
2. Then all `class-add` directives are processed

This ensures correct behavior for operations like tab switching.

### Selector Format

```
selector:class1,class2,class3
```

- **selector**: Any valid CSS selector
  - ID: `#myId`
  - Class: `.myClass`
  - Attribute: `[data-id="5"]`
  - Pseudo-class: `:first-child`
  - Complex: `.parent > .child[attr="value"]:nth-child(2)`

- **classes**: Comma-separated class names (without dots)
  - Single: `active`
  - Multiple: `active,selected,primary`

- **Multiple targets**: Use pipe `|` to separate
  - `#box1:active|#box2:inactive|.items:visible`

## 🎨 CSS Examples

Pair the extension with these CSS classes:

```css
/* Visibility */
.hidden { display: none; }
.visible { display: block; }

/* States */
.active {
    background-color: #007bff;
    color: white;
}

.selected {
    border: 2px solid #007bff;
    background-color: #e7f3ff;
}

/* Feedback */
.highlight {
    background-color: #fff3cd;
    animation: pulse 0.5s;
}

.error {
    border-color: #dc3545;
    background-color: #f8d7da;
}

.success {
    border-color: #28a745;
    background-color: #d4edda;
}

/* Loading */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

/* Animations */
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}

.shake { animation: shake 0.3s; }
```

## ❓ FAQ

**Q: Does this work with `hx-swap="none"`?**  
A: Yes! The extension processes responses even when content isn't swapped into the DOM.

**Q: Can I use complex CSS selectors?**  
A: Yes! Any selector that works with `document.querySelectorAll()` will work.

**Q: What if the selector matches multiple elements?**  
A: The classes will be added/removed from ALL matching elements.

**Q: Can I use this with other HTMX extensions?**  
A: Yes! It's fully compatible with other extensions.

**Q: Does it work with server-sent events (SSE) or WebSockets?**  
A: Yes! It works with any HTMX event that returns HTML.

**Q: What about performance?**  
A: The extension is highly optimized and has minimal overhead. It only processes elements with directive attributes.

## 🐛 Troubleshooting

**Classes not being added?**
1. Check browser console for errors
2. Verify CSS selector syntax
3. Ensure target elements exist when directive runs
4. Enable debug mode to see detailed logs

**Wrong order of operations?**
- Remember: `class-remove` always processes before `class-add`

**Selector not matching?**
- Test your selector in browser console: `document.querySelectorAll('your-selector')`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the [HTMX](https://htmx.org/) ecosystem
- Inspired by the need for declarative class manipulation in server-side applications

## 📞 Support

- 🐛 [Report a bug](https://github.com/ecbalarain/htmx-class-manager/issues)
- 💡 [Request a feature](https://github.com/ecbalarain/htmx-class-manager/issues)
- 📖 [Documentation](https://github.com/ecbalarain/htmx-class-manager)

## 🔗 Links

- [HTMX Official Site](https://htmx.org/)
- [HTMX Extensions](https://htmx.org/extensions/)
- [GitHub Repository](https://github.com/ecbalarain/htmx-class-manager)

---

Made with ❤️ for the HTMX community
