# Quick Start Guide

Get started with htmx-class-manager in 5 minutes!

## 1. Include the Scripts

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Load HTMX -->
    <script src="https://unpkg.com/htmx.org@2.0.0"></script>
    
    <!-- Load Class Manager Extension -->
    <script src="https://unpkg.com/htmx-class-manager@1.0.0/dist/class-manager.min.js"></script>
</head>
<body hx-ext="class-manager">
    <!-- Your content here -->
</body>
</html>
```

## 2. Create Your HTML

```html
<button hx-get="/api/highlight" hx-swap="none">
    Highlight Box
</button>

<div id="myBox" class="box">
    This box will be highlighted
</div>
```

## 3. Set Up Your Server

### Python (Flask)
```python
from flask import Flask, Response

app = Flask(__name__)

@app.route('/api/highlight')
def highlight():
    return Response('<div class-add="#myBox:highlighted"></div>')

if __name__ == '__main__':
    app.run(debug=True)
```

### Node.js (Express)
```javascript
const express = require('express');
const app = express();

app.get('/api/highlight', (req, res) => {
    res.send('<div class-add="#myBox:highlighted"></div>');
});

app.listen(3000);
```

### Django
```python
from django.http import HttpResponse

def highlight(request):
    return HttpResponse('<div class-add="#myBox:highlighted"></div>')
```

### PHP
```php
<?php
header('Content-Type: text/html');
echo '<div class-add="#myBox:highlighted"></div>';
?>
```

## 4. Add Some CSS

```css
.box {
    padding: 20px;
    border: 2px solid #ddd;
    transition: all 0.3s;
}

.box.highlighted {
    background-color: #fff3cd;
    border-color: #ffc107;
    transform: scale(1.05);
}
```

## 5. Try It Out!

1. Start your server
2. Open your browser
3. Click the "Highlight Box" button
4. Watch the box get highlighted!

## Common Patterns

### Remove a Class
```html
<!-- Server returns -->
<div class-remove="#myBox:hidden"></div>
```

### Multiple Classes
```html
<!-- Server returns -->
<div class-add="#myBox:active,selected,primary"></div>
```

### Tab Switching
```html
<!-- Server returns -->
<div 
    class-remove=".tab:active"
    class-add=".tab[data-tab='2']:active"
></div>
```

### Multiple Elements
```html
<!-- Server returns -->
<div class-add=".card:selected"></div>
```

## Debug Mode

To see detailed logging in browser console:

```javascript
// Enable debug mode
htmx.config.extensions['class-manager'].debug = true;
```

## Next Steps

- Read the full [README.md](README.md)
- Check out [examples](examples/)
- See [PUBLISHING.md](PUBLISHING.md) if you want to contribute

## Need Help?

- 📖 [Full Documentation](README.md)
- 🐛 [Report Issues](https://github.com/ecbalarain/htmx-class-manager/issues)
- 💬 [HTMX Discord](https://htmx.org/discord)

Happy coding! 🚀
