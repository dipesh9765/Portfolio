# Dipesh Marathe - Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, JavaScript, and Tailwind CSS.

## Features

- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Modern UI**: Clean, professional design with smooth animations and transitions
- **Mobile Navigation**: Hamburger menu with swipe gesture support
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic content
- **Performance Optimized**: Minified CSS and optimized assets

## Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom styles with Tailwind CSS
- **JavaScript**: Interactive functionality and animations
- **Tailwind CSS v4**: Utility-first CSS framework

## Setup and Development

### Prerequisites

- Node.js (for package management)
- Tailwind CSS standalone CLI (included in project)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dipesh9765/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

### Development Workflow

#### Building CSS

To build the CSS for development (with watch mode):
```bash
npm run build-css
```

To build the CSS for production (minified):
```bash
npm run build-css-prod
```

#### File Structure

```
Portfolio/
├── src/
│   └── input.css          # Tailwind CSS source file
├── assets/
│   ├── css/
│   │   ├── main.css       # Original theme CSS
│   │   └── tailwind.css   # Generated Tailwind CSS
│   ├── js/               # JavaScript files
│   └── images/           # Image assets
├── tailwind.config.js    # Tailwind configuration
├── tailwindcss.exe       # Standalone Tailwind CLI
└── index.html           # Main HTML file
```

### Customization

#### Tailwind Configuration

The Tailwind configuration is located in `tailwind.config.js`. You can customize:
- Color palette
- Typography
- Spacing
- Breakpoints
- Animations

#### Custom Styles

Custom CSS is written in `src/input.css` using:
- Standard CSS for complex layouts
- Tailwind utilities for rapid styling
- Custom components for reusable patterns

### Deployment

1. Build the production CSS:
```bash
npm run build-css-prod
```

2. Upload all files to your web server

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Minified CSS (~10KB)
- Optimized images
- Efficient animations
- Mobile-first responsive design

## License

This project is licensed under the MIT License.

## Contact

**Dipesh Marathe**
- Email: dipeshmarathe9765@gmail.com
- LinkedIn: [dipesh9765](https://www.linkedin.com/in/dipesh9765/)
- GitHub: [dipesh9765](https://github.com/dipesh9765/) 