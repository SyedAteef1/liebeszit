# Frontend - Feeta Integration Platform

Next.js application providing UI for Slack and Jira integrations.

## Tech Stack
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://localhost:5000
```

### 3. Run Development Server
```bash
npm run dev
```
App runs on `http://localhost:3000`

## Architecture

### App Router Structure
```
src/app/
├── page.js                 # Home page
├── dashboard/              # Main dashboard
├── slack/                  # Slack integration page
├── slack-success/          # Slack OAuth success
├── jira/                   # Jira integration page
├── jira-success/           # Jira OAuth success
└── github-success/         # GitHub OAuth success
```

### Components
```
src/components/integrations/
├── Integrations.jsx        # Slack integration UI
├── JiraIntegration.jsx     # Jira integration UI
└── GitHubIntegration.jsx   # GitHub integration UI
```

## Features

### Slack Integration (`/slack`)
**Connect Flow:**
1. Click "Connect with Slack"
2. OAuth authorization
3. Redirect to `/slack-success`
4. Display channels and workspace info

**Capabilities:**
- View all channels (public, private, DMs)
- Send messages to channels
- Mention users in messages
- AI-powered task generation
- View workspace members

**UI Components:**
- Channel list with icons
- Message composer
- User selector for mentions
- Account details display

### Jira Integration (`/jira`)
**Connect Flow:**
1. Click "Connect with Jira"
2. OAuth authorization
3. Redirect to `/jira-success`
4. Display projects and issues

### GitHub Integration (`/github-success`)
**Connect Flow:**
1. Click "Connect with GitHub"
2. OAuth authorization
3. Redirect to `/github-success`
4. Display repositories and code search

**Capabilities:**
- View all repositories
- Search code within repositories
- View file details
- Direct links to GitHub

**UI Components:**
- Repository list with stars and language
- Code search interface
- Search results with file paths

**Capabilities:**
- View all projects
- List issues per project
- Create new issues (Task/Bug/Story)
- Assign issues to team members
- Add comments
- Change issue status (transitions)
- Set priority (Highest to Lowest)
- Set Impact/Effort for prioritization

**Views:**
1. **List View** - All issues with metadata
2. **Impact/Effort Matrix** - 2x2 prioritization grid
   - Quick Wins (High Impact, Low Effort)
   - Major Projects (High Impact, High Effort)
   - Fill Ins (Low Impact, Low Effort)
   - Time Sinks (Low Impact, High Effort)

**UI Components:**
- Project selector
- Issue cards with badges
- Modal forms for actions
- Priority matrix visualization

## How It Works

### State Management
Uses React hooks for local state:
- `useState` - Component state
- `useEffect` - Data fetching
- `useSearchParams` - URL parameters

### API Communication
```javascript
// Example: Fetch Jira projects
const response = await fetch(
  `https://localhost:5000/jira/api/projects?user_id=${userId}`
);
const data = await response.json();
```

### OAuth Success Handling
```javascript
// Extract params from URL
const user_id = searchParams.get('user_id');
const cloud_id = searchParams.get('cloud_id');

// Store in localStorage
localStorage.setItem('jira_user_id', user_id);

// Fetch data
fetchProjects(user_id);
```

### Impact/Effort System
Issues tagged with labels:
- `impact-high` / `impact-low`
- `effort-high` / `effort-low`

Quadrant calculation:
```javascript
const getQuadrant = (impact, effort) => {
  if (impact === 'high' && effort === 'low') return 'Quick Wins';
  if (impact === 'high' && effort === 'high') return 'Major Projects';
  if (impact === 'low' && effort === 'low') return 'Fill Ins';
  if (impact === 'low' && effort === 'high') return 'Time Sinks';
};
```

## Styling

### Tailwind Classes
- `bg-blue-600` - Primary actions
- `bg-green-100` - Success states
- `border rounded-md` - Card styling
- `hover:shadow-md` - Interactive feedback

### Responsive Design
- Mobile: Single column
- Desktop: Grid layouts with `lg:grid-cols-3`

## File Structure
```
frontend/
├── src/
│   ├── app/
│   │   ├── page.js
│   │   ├── dashboard/page.jsx
│   │   ├── slack/page.jsx
│   │   ├── slack-success/page.jsx
│   │   ├── jira/page.jsx
│   │   └── jira-success/page.jsx
│   └── components/
│       └── integrations/
│           ├── Integrations.jsx
│           └── JiraIntegration.jsx
├── public/
├── package.json
└── next.config.mjs
```

## Development

### Hot Reload
Next.js automatically reloads on file changes

### Error Handling
```javascript
try {
  const response = await fetch(url);
  const data = await response.json();
} catch (error) {
  console.error('Error:', error);
}
```

### Modals
Reusable modal pattern:
```javascript
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50">
    <div className="bg-white rounded-lg p-6">
      {/* Modal content */}
    </div>
  </div>
)}
```

## Build & Deploy

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
- `NEXT_PUBLIC_API_URL` - Backend API URL
- Update for production deployment

## Browser Support
- Chrome, Firefox, Safari, Edge (latest versions)
- Requires JavaScript enabled
- LocalStorage for session persistence
