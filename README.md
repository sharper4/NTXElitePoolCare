# North Texas Elite Pool Care Website

A modern, professional website for North Texas Elite Pool Care - your trusted pool maintenance and cleaning service in Denton County, Texas.

## Features

✅ **Modern, Responsive Design** - Works beautifully on desktop, tablet, and mobile devices  
✅ **Professional Services Showcase** - 6 service offerings with detailed descriptions  
✅ **Free Quote Form** - Captures customer inquiries with automatic email submission  
✅ **Gallery Section** - Showcase your best pool work  
✅ **Service Area Display** - Lists all served cities and areas  
✅ **Direct Contact Methods** - Phone, email, Facebook, and pool calculator links  
✅ **Fast & Professional** - Built with modern web technologies (Vite + vanilla JavaScript)

## Website Sections

1. **Navigation** - Sticky header with smooth scrolling to all sections
2. **Hero Banner** - Eye-catching headline with two CTA buttons
3. **Services** - 6 detailed service cards:
   - Weekly Pool Cleaning
   - One-Time Pool Cleaning
   - Water Testing & Chemical Balancing
   - Green Pool Recovery
   - Pool Tile Cleaning
   - Filter Cleaning & Maintenance
4. **Gallery** - 4 showcase images of your work
5. **Why Choose Us** - 6 benefit cards highlighting your strengths
6. **Service Area** - Visual display of served cities/areas
7. **Quote Form** - Collects: Name, Phone, Zip Code, Service Type, Notes
8. **Contact Methods** - Phone, Email, Facebook, Pool Calculator
9. **Footer** - Copyright and service area info

## Required Images

You need to add the following images to the `public/` folder:

| Filename | Size | Description |
|----------|------|-------------|
| PrimaryLogo.png | Logo | Your company logo (appears in header) |
| truck.png | ~800x600px | Your service truck photo |
| pool-1.png | ~600x600px | Gallery image of cleaned pool |
| pool-2.png | ~600x600px | Gallery image of cleaned pool |
| pool-3.png | ~600x600px | Gallery image of cleaned pool |
| pool-4.png | ~600x600px | Gallery image of cleaned pool |

The gallery images should be square (1:1 aspect ratio) for best results.

## Getting Started

### Development
npm install
npm run dev

The site will be available at http://localhost:5173/

### Build for Production
npm run build

This creates an optimized `dist/` folder for deployment.

### Preview Production Build
npm run preview

## Customization

### Contact Information
Edit index.html to update:
- Phone number: 940-808-POOL
- Email: ntxelitepoolcare@gmail.com
- Facebook: https://www.facebook.com/ntxelitepoolcare
- Pool Calculator: https://sharper4.github.io/PoolCalculator/

### Service Area Cities
Edit the service area section in index.html to add/remove cities served

### Colors & Styling
Edit src/style.css CSS variables at the top

## Form Functionality

The quote form currently sends inquiries via email using mailto. To set up automatic email submissions to your server, you can:

1. **Email Gateway** (Current) - Form opens user''s email client
2. **Formspree** - Free service: https://formspree.io
3. **Custom Backend** - Connect to your own server for email handling

## Deployment Options

1. **Vercel** (Recommended) - Free tier with automatic deploys: https://vercel.com
2. **Netlify** - Free hosting with continuous deployment: https://netlify.com
3. **GitHub Pages** - Free static hosting
4. **Web Hosting** - Upload `dist/` folder to any web host

## Technology Stack

- HTML5 - Semantic markup
- CSS3 - Modern responsive styling with CSS Grid & Flexbox
- JavaScript - Vanilla JS for interactivity (no frameworks)
- Vite - Fast build tool and dev server

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge)

---

© 2026 North Texas Elite Pool Care. All rights reserved.
