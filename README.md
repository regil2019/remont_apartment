# Apartment Renovation Services Website

A modern React application for apartment renovation and interior design services. Built with Vite, React Router, and Swiper for a smooth user experience.

## Features

- **Service Calculator**: Interactive tool to estimate renovation costs
- **Service Portfolio**: Showcase of renovation projects with image gallery
- **Customer Reviews**: Testimonial slider with ratings
- **Contact Form**: Functional contact form with validation
- **Responsive Design**: Mobile-first approach with modern UI
- **Search Functionality**: Filter services by keywords
- **Accessibility**: ARIA labels and keyboard navigation support

## Tech Stack

- React 18
- Vite
- React Router DOM
- Swiper (for carousels)
- React Icons
- CSS Modules
- ESLint

## Getting Started

### Prerequisites
- Node.js 16+
- pnpm or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd remont_apartment
```

2. Install dependencies:
```bash
pnpm install
```

3. Start development server:
```bash
pnpm dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
pnpm build
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Calculator.jsx   # Cost calculator
│   ├── Header.jsx       # Navigation header
│   ├── Reviews.jsx      # Reviews page
│   └── ReviewSlider.jsx # Review carousel
├── pages/               # Route components
│   ├── Home.jsx         # Landing page
│   ├── Services.jsx     # Services showcase
│   ├── Gallery.jsx      # Project gallery
│   └── Contacts.jsx     # Contact form
├── data/                # Static data
│   └── serviceData.js   # Services information
└── images/              # Static assets
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Submit a pull request

## License

This project is licensed under the MIT License.
