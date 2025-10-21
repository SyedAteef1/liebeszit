# Feeta AI Dashboard

Production-ready dark mode dashboard for Feeta AI - an AI Operational Co-Pilot for managing and automating project workflows.

## 🚀 Access

Navigate to: `http://localhost:3000/modern-dashboard`

## 🎨 Features

### Page 1: Main Dashboard (Global Overview)

**Navbar**
- Feeta AI logo with gradient
- GitHub Sync Indicator (🟢 Synced / 🔴 Disconnected)
- Notification Bell
- Account dropdown (Switch Account | Settings | Logout)

**Sidebar**
- "+ New Project" button
- Scrollable project list with status indicators
- Bottom shortcuts: Integrations ⚙️, Reports 📊, Support 💬

**Main Content**
- Welcome header with user greeting
- 6 stats cards (3x2 grid):
  - Active Projects Count
  - Tasks in Progress
  - Completed Tasks
  - AI Insights Count
  - GitHub Sync Status
  - Team Productivity Index
- AI Insights Panel with smart suggestions
- Activity Timeline (Today, Yesterday, This Week)
- Quick Action buttons

### Page 2: Project Workspace

**Toggle Tab 1: Status Overview**
- 4 mini stats cards
- AI-generated project summary

**Toggle Tab 2: Task & Chat**
- Left Panel: Chat interface with Feeta AI
- Right Panel: Task manager with progress bars

## 🎨 Design System

### Colors
- Background: `#0F172A`
- Card Background: `#181818`
- Sidebar: `#1E1E1E`
- Navbar: `#121212`
- Primary Accent: `#00A67E`
- Secondary Accent: `#22D3EE`
- Text: `#F8FAFC`

### Typography
- Font: Inter (system fallback)
- Border Radius: `1rem` (rounded-xl)

### Effects
- Hover: Subtle neon glow with `shadow-[#00A67E]/20`
- Gradient buttons: `from-[#00A67E] to-[#22D3EE]`

## 📁 File Structure

```
src/
├── components/feeta/
│   ├── Navbar.jsx              # Top navigation bar
│   ├── Sidebar.jsx             # Left sidebar with projects
│   ├── DashboardOverview.jsx   # Main dashboard view
│   ├── ProjectView.jsx         # Individual project view
│   ├── ChatPanel.jsx           # Chat interface
│   ├── TaskList.jsx            # Task management
│   ├── StatsCard.jsx           # Reusable stat card
│   └── ActivityFeed.jsx        # Activity timeline
├── pages/
│   ├── Dashboard.jsx           # Dashboard page wrapper
│   └── Project.jsx             # Project page wrapper
├── data/
│   └── mockData.js             # Mock data for demo
└── app/
    └── modern-dashboard/
        └── page.tsx            # Main entry point
```

## 🔧 Components

### Navbar
- Sticky top navigation
- GitHub sync status indicator
- Notification bell
- User profile dropdown

### Sidebar
- Fixed width (250px)
- Project list with status dots
- Active project highlighting with gradient
- Bottom navigation shortcuts

### StatsCard
- Reusable metric display
- Icon + title + value
- Hover effects with glow

### ChatPanel
- Message bubbles (user vs Feeta)
- Input field with send button
- Auto-scroll to latest message

### TaskList
- Task cards with metadata
- Status dropdown (Pending/In Progress/Done)
- Progress bar visualization

### ActivityFeed
- Grouped by time sections
- Timestamp + activity description
- Chronological order

## 🎯 Interactivity

- Click sidebar projects → Navigate to project view
- Toggle between "Status Overview" and "Task & Chat"
- Send messages in chat (simulated AI responses)
- Change task status via dropdown
- GitHub sync indicator toggles state

## 🔄 State Management

Uses React hooks:
- `useState` for component state
- View switching (dashboard ↔ project)
- Active project tracking
- Chat message handling
- Task status updates

## 📊 Mock Data

Located in `src/data/mockData.js`:
- 3 sample projects
- Dashboard statistics
- AI insights
- Activity timeline
- Project details with tasks and chat history

## 🚀 Usage

1. Start the development server:
```bash
npm run dev
```

2. Navigate to:
```
http://localhost:3000/modern-dashboard
```

3. Interact with:
   - Click projects in sidebar
   - Toggle between Status and Task views
   - Send chat messages
   - Update task statuses

## 🎨 Customization

### Add New Project
Edit `src/data/mockData.js`:
```javascript
export const mockProjects = [
  { id: 4, name: 'New Project', status: 'active', repo: 'github.com/...' }
];
```

### Modify Colors
Update Tailwind classes:
- Primary: `bg-[#00A67E]`
- Secondary: `bg-[#22D3EE]`
- Background: `bg-[#0F172A]`

### Add Stats
In `DashboardOverview.jsx`:
```jsx
<StatsCard title="New Metric" value={value} icon="🎯" />
```

## 🔌 Integration Ready

Hooks prepared for:
- GitHub API integration
- Real-time chat with AI
- Task management system
- Activity tracking
- User authentication

## 📱 Responsive Design

- Mobile: Single column layout
- Tablet: Adjusted sidebar
- Desktop: Full grid layouts

## ✨ Next Steps

1. Connect to backend API
2. Implement real GitHub sync
3. Add AI chat integration
4. User authentication
5. Real-time updates
6. Data persistence
