# Trello Clone

A full-featured Trello clone built with Next.js, TypeScript, and SCSS. This project demonstrates clean architecture, SOLID principles, and modern React patterns.

## 🚀 Technologies

- **Next.js 16.1.1** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **SCSS** - Styling with variables, mixins, and nesting
- **Zustand 5.0.2** - Lightweight state management
- **@hello-pangea/dnd 18.0.1** - Drag and drop library (fork of react-beautiful-dnd)
- **localStorage** - Client-side data persistence

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── hooks/           # Custom React hooks
│   ├── useBoard.ts  # Board state and actions hook
│   └── index.ts     # Hooks exports
├── store/           # Zustand stores
│   ├── boardStore.ts # Board state management
│   └── index.ts     # Store exports
├── styles/          # SCSS files
│   ├── _variables.scss # SCSS variables
│   ├── _mixins.scss    # SCSS mixins
│   └── main.scss       # Main stylesheet
├── types/           # TypeScript type definitions
│   └── index.ts     # All type definitions
└── utils/           # Utility functions
    ├── constants.ts  # App constants and demo data
    ├── idGenerator.ts # ID generation utilities
    └── localStorage.ts # localStorage helpers
```

## 🏗️ Architecture

### State Management
- **Zustand** for global state management
- Manual localStorage persistence for data persistence
- Separated state and actions for better performance

### Type Safety
- Comprehensive TypeScript types for all entities
- Type-safe store actions
- Interface segregation following SOLID principles

### Styling
- SCSS with variables for theming
- Mixins for reusable patterns
- Responsive design with media queries
- Custom scrollbar styling

### Drag and Drop
- @hello-pangea/dnd for drag and drop functionality
- DragDropContext for board-level drag handling
- Draggable components for cards
- Droppable components for lists

### Data Persistence
- Client-side only (no backend)
- localStorage for data persistence
- Automatic save on state changes
- Demo board initialization

## 🎯 Features

### Implemented
- ✅ Type definitions for Board, List, Card, and Comment
- ✅ Zustand store with all CRUD operations
- ✅ Custom hooks for board management
- ✅ SCSS structure with variables and mixins
- ✅ localStorage utilities
- ✅ ID generation utilities
- ✅ Demo board data

### To Be Implemented
- Additional board features
- Enhanced card management
- Advanced drag and drop features
- Additional responsive UI improvements

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📝 Code Quality

### Principles
- **SOLID** - Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **DRY** - Don't Repeat Yourself
- **Clean Code** - Readable, maintainable, and well-documented
- **Type Safety** - Full TypeScript coverage

### Best Practices
- Separation of concerns (UI, Logic, State)
- Reusable components and hooks
- Custom hooks for complex logic
- Utility functions for common operations
- SCSS variables and mixins for styling consistency

## 🎨 Styling

All styles use SCSS with:
- Variables for colors, typography, spacing
- Mixins for common patterns (flexbox, buttons, inputs)
- Responsive breakpoints
- Custom scrollbar styling
- Focus states and transitions

## 📦 Dependencies

### Production
- `next@16.1.1` - Next.js framework
- `react@19.2.3` & `react-dom@19.2.3` - React library
- `zustand@^5.0.2` - State management
- `@hello-pangea/dnd@^18.0.1` - Drag and drop library

### Development
- `typescript@^5` - TypeScript compiler
- `sass@^1.83.0` - SCSS compiler
- `eslint@^9` - Linting
- `eslint-config-next@16.1.1` - Next.js ESLint configuration
- `@types/node@^20`, `@types/react@^19`, `@types/react-dom@^19` - Type definitions

## 🔄 Data Flow

1. **Initialization**: Board loads from localStorage or uses demo board
2. **State Updates**: Zustand store manages all state changes
3. **Persistence**: Every state change automatically saves to localStorage
4. **Components**: React components consume state via custom hooks

## 📚 Type Definitions

- `Board` - Main board container
- `List` - Lists within a board
- `Card` - Cards within lists
- `Comment` - Comments on cards
- `BoardState` - Store state interface
- `BoardAction` - Action types (for reference)

## 🚧 Next Steps

1. Enhanced UI components and features
2. Additional drag and drop improvements
3. Advanced card and comment features
4. Performance optimizations
5. Additional responsive design improvements
6. UI/UX polish

## 📄 License

This project is for demonstration purposes.
