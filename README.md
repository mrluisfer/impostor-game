# 🕵️ Impostor Game

A real-time multiplayer word guessing game inspired by social deduction mechanics. Players receive secret words while impostors get subtle clues — can you identify who's faking it?

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-Rolldown-646CFF?logo=vite&logoColor=white)](https://vite.dev/)

## ✨ Features

- **🎮 Pass-and-Play Multiplayer** — Share one device among all players for seamless local gameplay
- **🎯 Multiple Categories** — Choose from various word categories to customize each round
- **👥 Flexible Player Count** — Support for 3+ players with configurable impostor count
- **📱 Mobile-First Design** — Optimized touch interactions, safe area support, and responsive UI
- **🔒 Privacy-Focused Reveals** — Discrete word display prevents accidental peeking
- **💾 Persistent Player Data** — Player names saved to localStorage for quick restarts

## 🎯 How to Play

1. **Setup Phase** — Add player names and select one or more word categories
2. **Configuration** — Choose how many impostors will be in the game
3. **Word Assignment** — Each player privately views their assigned word or clue
4. **Discussion** — Players describe their words while impostors try to blend in
5. **Voting** — Identify and eliminate suspected impostors
6. **Reveal** — Unmask the impostors to see who won!

## 🛠️ Tech Stack

| Technology                                        | Purpose                                            |
| ------------------------------------------------- | -------------------------------------------------- |
| [React 19](https://react.dev/)                    | UI framework with latest concurrent features       |
| [TypeScript 5.9](https://www.typescriptlang.org/) | Type-safe development experience                   |
| [Tailwind CSS 4](https://tailwindcss.com/)        | Utility-first styling with CSS-first configuration |
| [daisyUI 5](https://daisyui.com/)                 | Component library with dark theme support          |
| [Vite + Rolldown](https://vite.dev/)              | Next-gen bundler for lightning-fast builds         |
| [Lucide React](https://lucide.dev/)               | Beautiful, consistent iconography                  |

## 📁 Project Structure

```
src/
├── components/          # React UI components
│   ├── CategorySelector.tsx   # Category selection grid with toggle-all
│   ├── GameBoard.tsx          # Main game view with player cards
│   ├── GameConfig.tsx         # Player/impostor count configuration
│   ├── PlayerCard.tsx         # Individual player card with reveal logic
│   ├── PlayerForm.tsx         # Add new players form
│   ├── PlayerList.tsx         # Display and manage player roster
│   └── PlayerReveal.tsx       # Private word reveal flow
├── hooks/
│   ├── useGame.ts             # Core game state management
│   └── useBodyScrollLock.ts   # Modal scroll lock utility
├── data/
│   └── categories.ts          # Word categories and clues database
├── types/
│   └── game.ts                # TypeScript interfaces and types
├── App.tsx                    # Root component with game phases
├── main.tsx                   # Application entry point
└── index.css                  # Global styles and Tailwind config
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.x or higher
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/mrluisfer/impostor-web.git
cd impostor-web

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

| Command        | Description                         |
| -------------- | ----------------------------------- |
| `pnpm dev`     | Start development server with HMR   |
| `pnpm build`   | Type-check and build for production |
| `pnpm preview` | Preview production build locally    |
| `pnpm lint`    | Run ESLint for code quality         |

## 📱 Mobile Optimizations

This app implements comprehensive mobile CSS best practices:

- **Touch Behavior** — Disabled tap highlights, optimized touch targets (min 48px)
- **Scroll Management** — `overscroll-behavior` prevents pull-to-refresh conflicts
- **Safe Areas** — Full support for iPhone notch, Dynamic Island, and home indicator
- **Form Handling** — 16px minimum font size prevents iOS auto-zoom on inputs
- **Scroll Locking** — Body scroll lock hook for modal interactions

## 🎨 Theming

The app uses a custom daisyUI theme (`impostor`) with dark mode as default:

```css
@plugin "daisyui/theme" {
  name: "impostor";
  default: true;
  color-scheme: "dark";
  /* Custom OKLCH color palette */
}
```

## 🏗️ Architecture Decisions

### State Management

Game state is managed through a custom `useGame` hook using React's `useState` and `useCallback`. This approach provides:

- Centralized state logic without external dependencies
- Predictable state updates with immutable patterns
- Easy testing and debugging

### Styling Strategy

Tailwind CSS v4 with CSS-first configuration eliminates the need for `tailwind.config.js`. Theme variables and plugins are declared directly in `index.css` using the new `@theme` and `@plugin` directives.

### Build Tooling

Using [Rolldown-Vite](https://vite.dev/guide/rolldown) — Vite's experimental Rust-based bundler — for significantly faster builds compared to esbuild/Rollup.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature-amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Luis Fernando Alvarez Manriquez**

Full-Stack Software Engineer specialized in modern web technologies with a strong focus on performance optimization and clean code architecture.

[![GitHub](https://img.shields.io/badge/GitHub-mrluisfer-181717?logo=github&logoColor=white)](https://github.com/mrluisfer)
[![Email](https://img.shields.io/badge/Email-mrluisfeer%40gmail.com-EA4335?logo=gmail&logoColor=white)](mailto:mrluisfeer@gmail.com)

---

<p align="center">
  Made with ❤️ for game nights everywhere
</p>
