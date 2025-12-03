# Publishing Guide

This guide will help you publish the htmx-class-manager extension to npm and make it available via CDN.

## Prerequisites

1. **GitHub Account**: Create a repository at https://github.com/ecbalarain/htmx-class-manager
2. **npm Account**: Sign up at https://www.npmjs.com/signup
3. **Git**: Installed on your system
4. **Node.js & npm**: Installed on your system

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `htmx-class-manager`
3. Description: "HTMX extension for dynamically adding/removing CSS classes"
4. Make it **public**
5. Don't initialize with README (we already have one)
6. Click "Create repository"

## Step 2: Push Code to GitHub

```bash
cd /Users/arain/Desktop/dev/projects/planko/htmx-class-manager

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial release v1.0.0"

# Add remote
git remote add origin https://github.com/ecbalarain/htmx-class-manager.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Create a Git Tag

```bash
# Create and push tag for v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## Step 4: Publish to npm

```bash
# Login to npm (first time only)
npm login

# Verify you're logged in
npm whoami

# Publish the package
npm publish
```

If the package name is already taken, you can use a scoped package:
```bash
# Update package.json name to "@yourusername/htmx-class-manager"
npm publish --access public
```

## Step 5: CDN Access

Once published to npm, your package will automatically be available on CDNs:

### jsDelivr
```html
<script src="https://cdn.jsdelivr.net/npm/htmx-class-manager@1.0.0/dist/class-manager.min.js"></script>
```

### unpkg
```html
<script src="https://unpkg.com/htmx-class-manager@1.0.0/dist/class-manager.min.js"></script>
```

**Note**: It may take a few minutes for CDNs to pick up your package.

## Step 6: Create GitHub Release

1. Go to https://github.com/ecbalarain/htmx-class-manager/releases/new
2. Choose tag: `v1.0.0`
3. Release title: `v1.0.0 - Initial Release`
4. Description: Copy from CHANGELOG.md
5. Attach files (optional):
   - `dist/class-manager.js`
   - `dist/class-manager.min.js`
6. Click "Publish release"

## Step 7: Submit to HTMX Extensions List

1. Fork the HTMX repository: https://github.com/bigskysoftware/htmx
2. Edit the extensions page
3. Add your extension to the community extensions list
4. Submit a pull request

## Step 8: Promote Your Extension

### Share on Social Media
- Twitter/X with hashtags: #htmx #webdev #javascript
- Reddit: r/htmx, r/webdev
- Dev.to: Write an article about your extension

### Update README.md
- Add badges for npm version, downloads, license
- Link to live examples
- Add screenshots/GIFs

### Create Documentation Site (Optional)
- Use GitHub Pages
- Host examples online
- Create interactive demos

## Updating the Extension

### Version Bump

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major
```

This will:
1. Update `package.json`
2. Create a git commit
3. Create a git tag

### Publish Update

```bash
git push && git push --tags
npm publish
```

## Troubleshooting

### "Package name already taken"
Use a scoped package name in `package.json`:
```json
{
  "name": "@yourusername/htmx-class-manager"
}
```

### "Need to authenticate"
```bash
npm login
# Enter your username, password, and email
```

### "No permission to publish"
Make sure you're logged in with the correct account:
```bash
npm whoami
```

## Best Practices

1. **Semantic Versioning**: Follow semver strictly
2. **Changelog**: Update CHANGELOG.md for every release
3. **Tests**: Add tests before major updates
4. **Examples**: Keep examples up-to-date
5. **Documentation**: Keep README.md comprehensive
6. **Issues**: Respond to GitHub issues promptly
7. **Breaking Changes**: Document clearly and bump major version

## Checklist Before Publishing

- [ ] All examples work correctly
- [ ] README.md is complete and accurate
- [ ] CHANGELOG.md is updated
- [ ] Version number is correct in package.json
- [ ] LICENSE file is present
- [ ] Code is minified
- [ ] No sensitive information in code
- [ ] Git repository is clean
- [ ] All files are committed

## After Publishing

1. Test CDN links work
2. Test npm installation: `npm install htmx-class-manager`
3. Verify package page on npm: https://www.npmjs.com/package/htmx-class-manager
4. Share announcement
5. Monitor for issues

## Support

If you encounter issues:
1. Check npm documentation: https://docs.npmjs.com/
2. HTMX Discord: https://htmx.org/discord
3. GitHub Issues: Create an issue in your repository

---

Good luck with your extension! 🚀
