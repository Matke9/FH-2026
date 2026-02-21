# FH-2026 – FON Hackathon 2026 Static Website

A React + Vite static website supporting the FON Hackathon 2026 with three disciplines:
**FON Hackathon**, **GameJam**, and **Blockchain Challenge**.

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Vite will start a local dev server (default: `http://localhost:5173`) with hot module replacement.

### Build for production

```bash
npm run build
```

Output is placed in the `dist/` folder.  
Tailwind CSS is processed automatically by PostCSS during the build.

### Preview production build

```bash
npm run preview
```

---

## Project Structure

```
src/
├── pages/              # Top-level page components
│   ├── Home.jsx        # Landing page
│   ├── Prijava.jsx     # Application/registration page
│   └── Success.jsx     # Post-submission confirmation page
├── components/         # Shared/reusable UI components (Navbar, Footer, Button…)
│   └── index.js
├── features/           # Discipline-specific components and logic
│   ├── fon-hackathon/
│   ├── gamejam/
│   └── blockchain-challenge/
├── lib/                # Shared utility functions and helpers
│   └── index.js
├── styles/
│   └── tailwind.css    # Tailwind CSS entry file (@tailwind directives)
├── App.jsx
└── main.jsx            # App entry – imports tailwind.css
```

---

## Tailwind CSS

Tailwind is integrated via **PostCSS** (configured in `postcss.config.js`) and
processed automatically by Vite during `npm run dev` and `npm run build`.

The entry file is `src/styles/tailwind.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

This file is imported in `src/main.jsx` so Tailwind classes are available in every component.

The content scan paths are defined in `tailwind.config.js`:

```js
content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}']
```

---

## Adding New Pages

1. Create a new file in `src/pages/`, e.g. `src/pages/AboutUs.jsx`.
2. Export a default React component.
3. Register the route in your routing solution (e.g. React Router or Vite's file-based routing).

---

## Adding New Components

1. Create a new file in `src/components/`, e.g. `src/components/Button.jsx`.
2. Export the component and import it wherever it is needed.

---

## Discipline Theming

Each discipline has its own folder under `src/features/` and its own colour token in
`tailwind.config.js` (`fon-hackathon`, `gamejam`, `blockchain`).

### Approach 1 – Tailwind classes

Apply a discipline class directly on the wrapper element and use Tailwind's custom
colour tokens:

```jsx
// In a page component
<div className="theme-fon-hackathon">
  <h1 className="text-fon-hackathon">FON Hackathon</h1>
</div>
```

### Approach 2 – `data-discipline` attribute

Set `data-discipline` on a top-level element and write CSS selectors accordingly:

```jsx
<div data-discipline="gamejam">
  {/* child components read the theme from CSS custom properties */}
</div>
```

```css
/* In src/styles/tailwind.css or a global CSS file */
[data-discipline="gamejam"] {
  --color-primary: theme('colors.gamejam.DEFAULT');
}
[data-discipline="blockchain-challenge"] {
  --color-primary: theme('colors.blockchain-challenge.DEFAULT');
}
```

Both approaches work together with Tailwind's utility classes and keep discipline
styling isolated from shared components.
