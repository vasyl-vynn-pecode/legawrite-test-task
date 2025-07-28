# America's Got Talent - Live Voting System

A real-time voting application for live talent shows, built with Next.js, TypeScript, and modern React patterns.

## Features

- 🗳️ **Live Voting**: Real-time contestant voting with vote limits
- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop
- 🔄 **Real-time Updates**: Live vote count updates via polling
- 💾 **Persistent State**: Vote state persists across page reloads
- 🛡️ **Error Boundaries**: Graceful error handling and recovery
- ♿ **Accessibility**: WCAG compliant voting interface
- 🧪 **Comprehensive Testing**: Unit, integration, and E2E tests

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand + Custom Hooks
- **Forms**: React Hook Form + Zod validation
- **Testing**: Jest + React Testing Library
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── voting/             # Voting-specific components
│   └── layout/             # Layout components & Error Boundaries
├── hooks/                  # Custom React hooks
├── lib/                    # Configuration and constants
├── store/                  # Global state management
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
└── __tests__/              # Test files
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Run tests**:
   ```bash
   npm test
   ```

4. **Run linter**:
   ```bash
   npm run lint
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## Key Features Implementation

### Custom Hooks
- `useContestantVoting` - Manages voting logic per contestant
- `useVoteLimit` - Handles vote counting and limits
- `useLiveUpdates` - Manages real-time data polling
- `useVoteState` - Handles localStorage persistence

### Error Boundaries
- Component-level error boundaries
- Fallback UIs for different failure scenarios
- Graceful degradation strategies

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-optimized voting interface

### Real-time Updates
- Configurable polling intervals
- Smart polling (pauses when tab inactive)
- Visual feedback for live status

## Testing

The project includes comprehensive testing:

- **Unit Tests**: Custom hooks and utility functions
- **Component Tests**: React Testing Library
- **Integration Tests**: Full voting flow
- **E2E Tests**: Critical user journeys

Key test: Vote button disables after voting and remains disabled after page reload.

## Development Guidelines

- Follow TypeScript strict mode
- Use custom hooks for reusable logic
- Implement proper error boundaries
- Write tests for all critical functionality
- Follow accessibility best practices

## License

MIT