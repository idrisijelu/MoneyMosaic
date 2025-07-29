# MoneyMosaic 💰

MoneyMosaic is a modern personal finance application powered by AI. Get intelligent financial guidance, budget tracking, and personalized insights from your very own Genius AI advisor.

## Features

- 🤖 **Genius AI Chat Advisor**: Get personalized financial guidance powered by OpenAI
- 📊 **Smart Dashboard**: View your financial overview with real-time insights
- 💳 **Budget Tracking**: Monitor spending across categories with visual progress bars
- 🎯 **Savings Goals**: Track progress toward your financial objectives
- 📈 **Transaction History**: Review and categorize your recent transactions
- ⚠️ **Smart Alerts**: Get warnings about overspending and celebrate milestones
- 💡 **Financial Tips**: Receive contextual advice based on your spending patterns

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- OpenAI API key (optional, but recommended for full AI functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/idrisijelu/MoneyMosaic.git
   cd MoneyMosaic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the backend server**
   ```bash
   npm run backend:dev
   ```

5. **Start the frontend (in a new terminal)**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000` to see your MoneyMosaic dashboard!

## Usage

### Dashboard
- View your financial overview including balance, income, expenses, and savings progress
- Monitor budget categories with visual indicators for spending levels
- Review recent transactions with categorization

### Genius AI Chat
- Click the 🤖 button in the bottom-right corner to open the AI chat
- Ask questions about your finances, budgeting tips, or spending habits
- Get contextual advice based on your actual financial data
- Receive alerts about overspending and celebrations for milestones

### Sample Questions for AI
- "How am I doing with my budget this month?"
- "Give me tips for saving more money"
- "Is my spending on food too high?"
- "Help me set better financial goals"

## AI Features

The Genius AI advisor provides:

- **Contextual Guidance**: Advice based on your actual financial data
- **Budget Analysis**: Insights into spending patterns and budget adherence  
- **Milestone Celebrations**: Recognition when you hit savings goals
- **Risk Alerts**: Warnings about potential overspending
- **Personalized Tips**: Suggestions tailored to your financial situation
- **Learning Foundation**: Groundwork for future AI learning from user data

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **AI**: OpenAI GPT-3.5-turbo
- **Styling**: Tailwind CSS with custom financial theme

## Development

### Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build the production application
- `npm run start` - Start production server
- `npm run backend` - Start backend server
- `npm run backend:dev` - Start backend server with auto-reload
- `npm run lint` - Run ESLint

### Project Structure

```
MoneyMosaic/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── backend/               # Express.js backend
│   └── server.js          # Main server file
├── components/            # React components
│   ├── AIChat.tsx         # AI chat component
│   └── Dashboard.tsx      # Main dashboard
├── lib/                   # Utility functions
│   └── mockData.ts        # Sample financial data
├── types/                 # TypeScript type definitions
│   └── index.ts           # Shared types
└── package.json           # Dependencies and scripts
```

## Configuration

### Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key for AI chat functionality
- `BACKEND_PORT` - Port for backend server (default: 3001)
- `NODE_ENV` - Environment mode (development/production)

### Without OpenAI API Key

The application will work without an OpenAI API key, but the AI chat will provide mock responses. To get full functionality:

1. Sign up for an OpenAI account at https://platform.openai.com
2. Generate an API key
3. Add it to your `.env.local` file

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check that both frontend (port 3000) and backend (port 3001) servers are running
2. Verify your OpenAI API key is properly set in `.env.local`
3. Review the browser console for any error messages
4. Open an issue on GitHub with detailed information about the problem

---

Built with ❤️ for better financial wellness