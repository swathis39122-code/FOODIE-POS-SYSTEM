# 🍽️ Swathi Restaurant Website

A modern, clean, and responsive restaurant website built with HTML, CSS, and JavaScript. Perfect for a small to medium restaurant business or as a portfolio project.

## 📋 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and attractive design with a warm color theme suitable for food business
- **Multiple Pages**: 
  - Home page with hero banner and call-to-action
  - Menu page with categorized food items
  - About Us page with restaurant story
  - Gallery page for food and restaurant images
  - Contact page with Google Maps integration
- **WhatsApp Integration**: Floating button for easy online ordering
- **Mobile-Friendly Navigation**: Hamburger menu for mobile devices
- **Smooth Animations**: Scroll animations and hover effects
- **Form Validation**: Contact form with client-side validation

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

### Installation

1. **Download or Clone** the project files to your computer

2. **Open the Project**:
   - Navigate to the project folder
   - Open `index.html` in your web browser
   - That's it! No build process or server required

3. **File Structure**:
   ```
   RESTAURANT/
   ├── index.html          # Home page
   ├── menu.html           # Menu page
   ├── about.html          # About Us page
   ├── gallery.html        # Gallery page
   ├── contact.html        # Contact page
   ├── css/
   │   └── style.css       # Main stylesheet
   ├── js/
   │   └── script.js       # JavaScript functionality
   ├── images/             # Place your images here
   └── README.md           # This file
   ```

## 🎨 Customization Guide

### 1. Update Restaurant Information

**Contact Details** (`contact.html`):
- Replace the address, phone number, and email
- Update the Google Maps embed URL (instructions in the file)

**WhatsApp Number** (`js/script.js`):
- Find the line: `const phoneNumber = '1234567890';`
- Replace with your WhatsApp number (include country code, no + sign)
- Example: `'919876543210'` for India

### 2. Update Menu Items (`menu.html`)

- Edit the menu items, prices, and descriptions
- Add or remove categories as needed
- Update prices in Indian Rupees (₹) or change currency symbol

### 3. Add Your Images

**Gallery Images** (`gallery.html`):
- Replace the Unsplash placeholder URLs with your actual images
- Recommended: Save images in the `images/` folder
- Update image paths: `src="images/your-image.jpg"`

**Hero Background** (`index.html`):
- Add a hero background image to `images/hero-bg.jpg`
- Or update the CSS background image path in `css/style.css`

### 4. Customize Colors (`css/style.css`)

Edit the CSS variables at the top of `style.css`:
```css
:root {
    --primary-color: #d4a574;    /* Main brand color */
    --secondary-color: #8b4513;  /* Dark accent */
    --accent-color: #ff6b35;     /* Call-to-action color */
    /* ... more variables */
}
```

### 5. Update About Us Content (`about.html`)

- Edit the restaurant story
- Update values and mission statement
- Add your own content

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔧 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive features
- **Font Awesome**: Icons (via CDN)
- **Google Fonts**: Web fonts (optional, can be added)

## 📝 Code Comments

The code is well-commented for beginners:
- HTML: Section comments explaining each part
- CSS: Organized with clear section headers
- JavaScript: Step-by-step explanations

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📞 Support

For questions or customization help:
- Check the code comments
- Review the HTML structure
- Inspect CSS classes and IDs

## 📄 License

This project is open source and available for personal and commercial use.

## 🎯 Future Enhancements (Optional)

- Add a backend for contact form submissions
- Integrate online ordering system
- Add customer reviews section
- Implement a blog/news section
- Add multi-language support
- Integrate payment gateway

## 📸 Image Recommendations

For best results, use:
- **Hero Image**: 1920x1080px (landscape)
- **Gallery Images**: 800x800px (square)
- **Food Images**: High quality, well-lit photos
- **Format**: JPG or PNG

## ✨ Tips for Beginners

1. **Start Small**: Make one change at a time
2. **Test Often**: Check your changes in the browser frequently
3. **Use Browser DevTools**: Right-click → Inspect to see how elements work
4. **Read Comments**: The code includes helpful comments
5. **Experiment**: Try changing colors, fonts, and content

---

**Made with ❤️ for Swathi Restaurant**

Enjoy building your restaurant website! 🍽️





