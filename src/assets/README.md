# Profile Picture Setup

## To add your own profile picture:

1. **Add your image file** to this `src/assets/` folder
2. **Supported formats**: JPG, PNG, SVG
3. **Recommended size**: 200x200 pixels or larger (square format)
4. **File naming**: Name it `profile.jpg`, `profile.png`, or `profile.svg`

## Current Setup:
- **Hero Section**: Uses actual profile picture (`profile.jpg`)
- **About Section**: Uses actual profile picture (`profile.jpg`)
- **Fallback**: Shows "GK" initials if image fails to load

## Profile Image:
- **File**: `profile.jpg` (1.1 MB)
- **Status**: ✅ Successfully integrated
- **Used in**: Hero section and About section

## Alternative - Direct URL:
If you have a working image URL, you can also use that directly in the HTML files.

## Example:
```html
<img src="assets/profile.jpg" alt="Gourav Kumar" class="profile-img">
```
