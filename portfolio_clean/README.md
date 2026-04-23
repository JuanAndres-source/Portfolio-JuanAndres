# Juan Andrés Aliaga - Professional Portfolio

A production-ready personal portfolio website for Juan Andrés Aliaga Fuentes, a Software Developer specializing in Web, Mobile & Databases. Built with React, Next.js, Tailwind CSS, and modern web technologies.

## 🎯 Features

### Core Sections
- **Hero Section** - Animated typing effect with CTAs and profile showcase
- **About Me** - Professional summary, tech stack grid, and quick facts
- **Education** - Interactive timeline with university and exchange program details
- **Work Experience & Projects** - Filterable project grid with featured project spotlight
- **Skills & Technologies** - Categorized skills with proficiency indicators
- **Languages** - Multilingual display with proficiency levels and certifications
- **Contact** - Contact form and social media links

### Advanced Features
- **AI Chat Assistant** - Floating chat widget powered by Claude API (ready for integration)
- **Dark/Light Mode** - Switchable theme with smooth transitions
- **Bilingual Support** - Spanish and English language switcher
- **Konami Code Easter Egg** - Hidden terminal overlay with developer commands
- **Responsive Design** - Fully responsive for mobile, tablet, and desktop
- **SEO Optimized** - Meta tags, Open Graph, JSON-LD schema
- **Performance** - Lazy loading, code splitting, optimized images
- **PWA Ready** - Manifest and service worker support

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Animations**: Framer Motion (ready for integration)
- **Icons**: Lucide React + Simple Icons
- **AI Integration**: Anthropic Claude API (ready for integration)
- **Deployment**: Vercel-ready static site
- **Analytics**: Google Analytics 4 + Microsoft Clarity placeholders

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm/pnpm
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd juan-andres-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   The site will be available at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   # or
   pnpm build
   ```

## 🔧 Configuration

### Adding Your Profile Photo

1. Replace the profile photo placeholder in `client/src/components/Hero.tsx`:
   ```tsx
   <img 
     src="path/to/your/photo.jpg" 
     alt="Profile" 
     className="w-full h-full object-cover"
   />
   ```

2. Or upload to a CDN and use the URL directly.

### Integrating Claude AI Chat

1. Get an API key from [Anthropic](https://console.anthropic.com)

2. Add to `.env.local`:
   ```env
   VITE_ANTHROPIC_API_KEY=your_api_key_here
   ```

3. Update `client/src/components/AIChat.tsx` to use real API:
   ```tsx
   const response = await fetch('https://api.anthropic.com/v1/messages', {
     method: 'POST',
     headers: {
       'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
       'content-type': 'application/json',
     },
     body: JSON.stringify({
       model: 'claude-sonnet-4-20250514',
       max_tokens: 1024,
       system: SYSTEM_PROMPT,
       messages: [...],
     }),
   });
   ```

### Integrating Contact Form

The contact form uses Formspree by default. To enable it:

1. Sign up at [Formspree](https://formspree.io)
2. Create a new form and get your form ID
3. Update `client/src/components/Contact.tsx`:
   ```tsx
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
     // ...
   });
   ```

Alternatively, use EmailJS or another service of your choice.

### Customizing Content

All content is centralized in `client/src/lib/constants.ts`. Update:
- `PERSONAL_INFO` - Your details
- `EDUCATION` - Education history
- `PROJECTS` - Your projects
- `SKILLS_BY_CATEGORY` - Your technical skills
- `LANGUAGES` - Languages you speak

## 🎨 Design System

### Color Palette
- **Primary**: `#1e40af` (Corporate Blue)
- **Primary Light**: `#3b82f6`
- **Primary Dark**: `#0c2d6b`
- **Background**: `#ffffff` (Light) / `#0f172a` (Dark)
- **Foreground**: `#1f2937` (Light) / `#e2e8f0` (Dark)

### Typography
- **Display**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Code**: JetBrains Mono (monospace)

### Spacing
- Base unit: 4px (Tailwind default)
- Section padding: 80-120px
- Component gap: 16-24px

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Next.js configuration
4. Set environment variables if needed
5. Deploy!

### Deploy to Other Platforms

The site is a static React app and can be deployed to:
- **Netlify**: Connect GitHub repo, set build command to `npm run build`
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3 + CloudFront**: Upload `dist/` folder
- **Any static hosting**: Upload contents of `dist/` folder

## 🔐 Environment Variables

Create `.env.local` for development:

```env
VITE_ANTHROPIC_API_KEY=your_anthropic_key
VITE_ANALYTICS_ENDPOINT=your_analytics_endpoint
VITE_ANALYTICS_WEBSITE_ID=your_website_id
```

## 📊 Analytics

The site includes placeholders for:
- **Google Analytics 4** - Add your measurement ID
- **Microsoft Clarity** - Add your project ID

Update `client/index.html` with your tracking IDs.

## 🎮 Easter Egg

Press the Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) to unlock a hidden terminal with developer commands:
- `whoami` - Show identity
- `ls projects` - List projects
- `skills --list` - Show all skills
- `contact` - Show contact information
- `languages` - Show language proficiency
- `help` - Show available commands
- `clear` - Clear terminal
- `exit` - Close terminal

## 🔍 SEO

The site includes:
- Meta tags for description, keywords, author
- Open Graph tags for social sharing
- Twitter Card support
- JSON-LD Person schema
- Sitemap and robots.txt support

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- High contrast colors
- Focus indicators on interactive elements

## 📝 License

This portfolio is personal and not licensed for reuse. Feel free to use it as inspiration for your own portfolio.

## 📞 Contact

**Juan Andrés Aliaga Fuentes**
- Email: juanandres234t@gmail.com
- Phone: +34 639 058 109
- GitHub: [github.com/JuanAndres-source](https://github.com/JuanAndres-source)
- LinkedIn: [linkedin.com/in/juanandres](https://linkedin.com/in/juanandres)

## 🙏 Acknowledgments

- Built with React and Tailwind CSS
- Design inspired by modern corporate portfolios
- Icons from Lucide React
- Components from shadcn/ui

---

**Last Updated**: April 2026

For questions or suggestions, please reach out via email or LinkedIn.
