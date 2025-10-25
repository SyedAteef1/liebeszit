# Feeta AI Frontend

Next.js frontend for AI-powered project management with GitHub and Slack integration.

## Features

- **Project Management**: Create projects and connect GitHub repositories
- **AI Task Assistant**: Analyze tasks and generate implementation plans
- **Slack Integration**: Assign subtasks to Slack channels
- **Authentication**: JWT-based login/register

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

### 3. Accept Backend SSL Certificate

1. Open `https://localhost:5000` in browser
2. Click "Advanced" → "Proceed to localhost"
3. This allows frontend to make HTTPS API calls

## Pages

- `/login` - Login and registration
- `/test` - Main project management interface
- `/test_intent` - AI task analysis testing

## Components

- **AITaskAssistant**: Task analysis with clarification questions and plan generation
- **SlackConnectButton**: Slack OAuth and connection status

## Tech Stack

- Next.js 14
- React Hooks
- Tailwind CSS

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── login/page.jsx           # Authentication
│   │   ├── test/page.jsx            # Main project page
│   │   └── test_intent/page.jsx     # AI testing
│   └── components/
│       ├── AITaskAssistant.jsx      # AI task analysis
│       └── SlackConnectButton.jsx   # Slack OAuth
└── package.json
```

## Usage Flow

1. **Register/Login** at `/login`
2. **Connect GitHub** from navbar
3. **Create Project** and select repository
4. **Analyze Task** with AI assistant
5. **Answer Questions** if task is ambiguous
6. **Assign to Slack** from generated subtasks

## API Integration

All API calls use `https://localhost:5000`:
- Authentication endpoints
- GitHub OAuth and repository fetching
- Slack OAuth and messaging
- AI task analysis and plan generation

## License

MIT
