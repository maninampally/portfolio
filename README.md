# Manikanth Nampally - Portfolio Website

A modern, professional single-page portfolio website built with HTML, CSS, and vanilla JavaScript. Optimized for AI/ML engineering, data engineering, and backend development roles.

## 🌟 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Toggle**: User preference saved in localStorage
- **Active Navigation**: Automatically highlights current section while scrolling
- **Contact Form**: Client-side validation with modern UI
- **Professional Sections**:
  - Hero section with value proposition and highlights
  - About section with career story and quick facts
  - Skills organized by category (Programming, Data & AI, Backend, Cloud, Tools)
  - Detailed project showcases with problem-solution-impact format
  - Work experience timeline with placeholders for LinkedIn data
  - Certifications and education
  - Contact form with social links
- **Modern Aesthetics**: Clean design with smooth animations and transitions
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation support
- **SEO Optimized**: Meta tags, Open Graph tags, and semantic structure

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── style.css           # All styles
├── assets/
│   ├── images/
│   │   └── profile.png # Your profile photo
│   ├── icons/          # Icons (if needed)
│   └── resume.pdf      # Your resume PDF
└── README.md           # This file
```

## 🚀 Quick Start

### Local Development

1. **Clone or download** this repository
2. **Add your profile photo**:
   - Replace `assets/images/profile.png` with your professional photo
   - Recommended size: 400x400px or larger (square format)
3. **Add your resume**:
   - Replace `assets/resume.pdf` with your actual resume PDF
4. **Open in browser**:
   - Simply double-click `index.html` or
   - Use VS Code Live Server extension for live reloading

### Customization

#### 1. Update Personal Information

**Meta Tags** (in `<head>` section):
- Update meta descriptions
- Update Open Graph tags for social sharing

**Hero Section**:
- Update your name, headline, and value statement
- Customize highlights to match your experience

**About Section**:
- Write your personal story and journey
- Update quick facts with your information

**Skills**:
- Add/remove technologies based on your expertise
- Organize by relevance to target roles

**Projects**:
- Replace placeholder projects with your actual work
- Add GitHub repo links and live demo URLs
- Include specific metrics and impact

**Experience**:
- Fill in the placeholder experience cards with data from your LinkedIn:
  - Job titles, company names, locations
  - Start/end dates
  - 3-5 bullet points highlighting achievements
  - Technologies used

**Certifications & Education**:
- Add your certifications with issuing organizations and dates
- Fill in bachelor's degree information
- Update graduation dates and relevant coursework

**Contact**:
- Verify email, LinkedIn, and GitHub links are correct

#### 2. Color Scheme Customization

Edit CSS variables in `style.css` (`:root` section):

```css
:root {
  --accent: #2563eb;        /* Primary color */
  --accent-dark: #1e40af;   /* Hover states */
  --success: #10b981;       /* Success indicators */
  /* ... other variables */
}
```

#### 3. Connect Contact Form to Backend

The contact form currently has client-side validation only. To make it functional:

**Option A - FormSpree (Easiest)**:
```html
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- form fields -->
</form>
```

**Option B - Custom Backend**:
Update the fetch URL in the JavaScript section:
```javascript
await fetch('YOUR_API_ENDPOINT', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, subject, message })
});
```

**Option C - EmailJS**:
Integrate EmailJS for email sending without backend.

## 🌐 Deployment

### Option 1: GitHub Pages (Recommended - Free)

1. **Create a GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Save

3. **Access your site**:
   - URL: `https://YOUR_USERNAME.github.io/YOUR_REPO/`
   - Custom domain supported (optional)

### Option 2: Netlify (Free)

1. **Via Drag & Drop**:
   - Go to [Netlify](https://netlify.com)
   - Drag your portfolio folder to the deployment zone
   - Get instant URL

2. **Via Git**:
   - Connect your GitHub repository
   - Netlify auto-deploys on every push
   - Custom domain supported

### Option 3: Vercel (Free)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   cd portfolio
   vercel
   ```

3. **Follow prompts** for deployment

### Option 4: Traditional Web Hosting

1. **Upload files** via FTP/SFTP:
   - Upload all files to your hosting's `public_html` or `www` folder
   - Maintain folder structure

2. **Access via your domain**

## ✅ Pre-Deployment Checklist

- [ ] Profile photo added and optimized
- [ ] Resume PDF uploaded
- [ ] All LinkedIn data filled in (experience, education, certifications)
- [ ] Project links working (GitHub repos, live demos)
- [ ] Email, LinkedIn, GitHub links verified
- [ ] Contact form configured (if using backend)
- [ ] SEO meta tags updated with your information
- [ ] Tested on mobile, tablet, and desktop
- [ ] Tested in different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Dark mode tested
- [ ] All links open correctly (target="_blank" for external links)
- [ ] Images load properly
- [ ] No console errors in browser DevTools

## 🎨 Design Philosophy

This portfolio is designed to:
- **Immediately communicate value** - Clear headline and concise value proposition
- **Show, don't just tell** - Detailed project breakdowns with impact metrics
- **Build credibility** - Professional presentation, certifications, work experience
- **Make it easy to connect** - Multiple contact methods, working contact form
- **Be memorable** - Modern design, smooth interactions, attention to detail

## 📝 Content Writing Tips

### Hero Section
- **Headline**: Be specific about your role (not generic "Software Engineer")
- **Value Statement**: Answer "What problem do you solve?" in 1-2 sentences
- **Highlights**: Use specific numbers and technologies

### Projects
- **Use STAR format**: Situation, Task, Action, Result
- **Include metrics**: "Improved performance by 40%", "Reduced costs by 30%"
- **Show technical depth**: List specific technologies, architectures, patterns used

### Experience
- **Start with action verbs**: Developed, Designed, Implemented, Built, Optimized
- **Quantify impact**: Numbers, percentages, user counts, performance gains
- **Be specific**: "Built REST APIs for hospital management" vs "Worked on backend"

## 🐛 Troubleshooting

### Images not loading
- Check file paths are correct (case-sensitive on some servers)
- Ensure image files are uploaded
- Check browser console for 404 errors

### Dark mode not persisting
- Check browser allows localStorage
- Test in non-incognito mode

### Contact form not working
- Check JavaScript console for errors
- Ensure form validation is passing
- Verify backend endpoint is configured

### Responsive issues
- Test using browser DevTools device emulation
- Check CSS media queries
- Validate HTML structure

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 📄 License

This portfolio template is free to use. Feel free to customize it for your needs.

## 🤝 Contributing

If you find bugs or have suggestions:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📞 Need Help?

Feel free to reach out if you need assistance with customization or deployment!

**Good luck with your job search! 🚀**
