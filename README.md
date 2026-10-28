# Vipin Kumar Chandel – Personal Portfolio Website

A professional, responsive developer portfolio website built for the **CodeOrbit Tech Full Stack Development Internship**.
Constructed with pure **HTML5, CSS3, and vanilla JavaScript** — zero frameworks, zero external dependencies, no build step.

---

## 👤 Developer Profile & Information

- **Name**: Vipin Kumar Chandel
- **Role**: Full Stack &amp; Frontend Developer
- **Education**: B.Tech in Computer Science and Engineering (2023–2027), Prestige Institute of Engineering Management and Research (PIEMR), Indore
- **Academic Standing**: CGPA: 7.92 / 10 | SGPA: 8.75
- **Internship**: Full Stack Development Intern – CodeOrbit Tech (6 months project experience)
- **Club Leadership**: Web Admin – DevHub Club, PIEMR
- **Email**: vipinchandel2003@gmail.com
- **Phone**: +91-7509858483
- **Location**: Indore, Madhya Pradesh, India
- **LinkedIn**: [linkedin.com/in/vipin-kumar-chandel](https://linkedin.com/in/vipin-kumar-chandel)
- **GitHub**: [github.com/vipinchandel2003](https://github.com/vipinchandel2003)

---

## 📁 File Structure

```
portfolio/
├── index.html          # Clean, semantic single-page application structure
├── css/
│   └── style.css       # Dark navy & teal design system, BEM methodology, responsive breakpoints
├── js/
│   └── script.js       # Vanilla JS modules: scroll effects, typing animation, form validation
└── README.md           # Documentation, setup guide, and verification checklist
```

---

## 🌟 Featured Projects

1. **MedGrid Care – Real-Time Centralized Healthcare Resource Sharing & Hospital Management System**
   - *Recognition*: 🏆 1st Rank at Urjotsav 2K26 Project Exhibition & Engineering@Prestige Exhibition
   - *Core Features*: Centralized hospital workflow coordination, inter-facility resource sharing, and reducing emergency-care delays during the golden hour.
   - *Stack*: React.js, Django REST Framework, WebSockets, Redis, MySQL

2. **Smart District Hospital Queue Management System** (Sep 2025 – Dec 2025)
   - *Role*: Frontend Development & Research | Team Size: 4
   - *Core Features*: Minimizes patient wait times through live visibility into appointment queues, JWT-authenticated patient and doctor role-based dashboards, and live token tracking.
   - *Stack*: React.js, Django REST Framework (DRF), WebSockets, Django Channels, Redis, JWT

3. **On-Call Mechanic System** (Nov 2025 – Dec 2025)
   - *Role*: Frontend Development & Research | Team Size: 6
   - *Core Features*: Location-aware platform connecting stranded motorists with nearby roadside mechanics, dynamic service-request management, and separate dashboards for users and mechanics.
   - *Stack*: React.js, Django REST Backend, MySQL, RESTful APIs

---

## 🛠️ Technical Skills

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), React.js, Responsive UI, Role-Based Dashboards
- **Backend & APIs**: Django, Django REST Framework (DRF), RESTful APIs, Node.js, Express.js, JWT
- **Languages & Databases**: C++, Java, Python, SQL (MySQL), MongoDB
- **Real-Time & DevOps**: WebSockets, Django Channels, Redis, Git, GitHub, VS Code, OOP & DSA Fundamentals

---

## 🚀 Running Locally

No installation or build step is required. Open `index.html` directly in any modern browser:

```bash
# Option 1 – Direct launch
Double-click index.html in File Explorer

# Option 2 – VS Code Live Server
Right-click index.html → "Open with Live Server"

# Option 3 – Python local server
cd portfolio
python -m http.server 8080
# Visit http://localhost:8080 in your browser
```

---

## 📬 Contact Form — Real Delivery Integration

The contact form currently performs strict, accessible client-side validation (required fields, name length, email regex, and message length) and informs the user with an accessible status notice.

Because this is a static frontend with no active backend server by default, actual message delivery requires connecting to an endpoint. You can connect it in 2 minutes:

### Option A: [Formspree](https://formspree.io) (Free Tier, Recommended)
1. Register a free account at [Formspree](https://formspree.io) and create a form with target email `vipinchandel2003@gmail.com`.
2. In `js/script.js`, locate `form.addEventListener('submit', ...)` and replace the notice with:
```js
const formData = new FormData(form);
fetch('https://formspree.io/f/YOUR_ENDPOINT_ID', {
  method: 'POST',
  body: formData,
  headers: { 'Accept': 'application/json' }
})
  .then(res => {
    if (res.ok) {
      showStatus('✅ Thank you, Vipin has received your message!', 'success');
      form.reset();
    } else {
      showStatus('❌ Submission error. Please email directly at vipinchandel2003@gmail.com', 'error');
    }
  })
  .catch(() => showStatus('❌ Network error. Please try again or call directly.', 'error'));
```

### Option B: [EmailJS](https://www.emailjs.com) (Client-Side Email SDK)
Include EmailJS SDK and invoke `emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)` upon successful validation.

---

## ✅ Requirement Compliance Checklist

| # | Requirement | Implementation & Verification | Status |
|---|---|---|---|
| 1.1 | Only HTML5, CSS3, Vanilla JS | Completely native; zero frameworks, zero libraries | ✅ |
| 1.2 | No React, Bootstrap, Tailwind | No external CSS/JS dependencies loaded | ✅ |
| 1.3 | Required sections included | Hero, About Me, Skills, Projects, Contact, Footer | ✅ |
| 1.4 | Responsive on mobile/tablet/desktop | Responsive flex/grid, mobile drawer menu, tested down to 360px | ✅ |
| 1.5 | Semantic HTML & modular architecture | `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`, BEM CSS | ✅ |
| 2.1 | Navigation bar with working section links | Fixed frosted navbar, scroll-spy, smooth scroll navigation | ✅ |
| 2.2 | Visual hero section with CTA buttons | Typographic gradient, live typing effect, "View My Work" & "Get In Touch" CTAs | ✅ |
| 2.3 | About Me section | Authentic PIEMR education details, CodeOrbit Tech internship, achievements | ✅ |
| 2.4 | Skills section | Categorized: Frontend, Backend, Languages & Databases, Real-Time & DevOps | ✅ |
| 2.5 | Projects section | MedGrid Care, Smart District Queue System, On-Call Mechanic System | ✅ |
| 2.6 | Contact form with validation | Per-field blur & submit validation, email regex, ARIA alerts | ✅ |
| 2.7 | Professional footer | Dynamic year, copyright, navigation links | ✅ |
| 2.8 | Theme & design aesthetic | Dark Navy (`#0d1117`) & Teal (`#14b8a6`) palette | ✅ |
| 2.9 | Accessibility | Visible `:focus-visible` rings, skip link, ARIA live regions, WCAG AA contrast | ✅ |
| 2.10 | Mobile navigation | Accessible hamburger button, keyboard Escape support, outside-click close | ✅ |
| 3.1 | Authentic Resume Data | All contact details, CGPA, projects, and skills populated from resume | ✅ |
| 4.1 | Transparent contact notice | Clear status notice indicating backend delivery requirements | ✅ |
| 5.1 | No build step required | Runs directly in modern browsers without compilation | ✅ |
