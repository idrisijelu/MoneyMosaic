const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.BACKEND_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI (will be null if no API key provided)
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Financial AI Assistant system prompt
const SYSTEM_PROMPT = `You are Genius AI, a friendly and knowledgeable financial advisor for MoneyMosaic. 

Your role is to:
- Provide practical financial guidance, budgeting tips, and encouragement
- Flag risky spending patterns and celebrate financial milestones
- Answer financial questions with empathy and expertise
- Be contextually aware of the user's financial situation
- Keep responses concise but helpful (2-3 sentences max)
- Use a supportive, encouraging tone

You should avoid:
- Giving specific investment advice or guarantees
- Being overly technical or using financial jargon
- Making predictions about market performance
- Recommending specific financial products

Remember: You're here to educate, encourage, and guide users toward better financial habits.`;

// Mock response when OpenAI API is not available
const getMockResponse = (message, financialContext) => {
  const mockResponses = [
    {
      content: "I understand you're looking for financial guidance! While I'd love to provide personalized advice, I need an OpenAI API key to be fully functional. In the meantime, I can see you're doing well with your budget management!",
      type: 'text'
    },
    {
      content: "Great question about your finances! To give you the best AI-powered advice, please make sure to set up the OpenAI API key. For now, I notice you have a healthy savings rate - keep it up!",
      type: 'tip'
    },
    {
      content: "I'm here to help with your financial questions! Once the OpenAI integration is set up, I'll be able to provide more detailed, contextual advice based on your spending patterns and goals.",
      type: 'text'
    }
  ];
  
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
};

// Analyze financial context to provide insights
const analyzeFinancialContext = (context) => {
  if (!context) return '';
  
  let contextSummary = '';
  
  if (context.totalBalance !== undefined) {
    contextSummary += `User has a total balance of $${context.totalBalance}. `;
  }
  
  if (context.monthlyIncome && context.monthlyExpenses) {
    const surplus = context.monthlyIncome - context.monthlyExpenses;
    contextSummary += `Monthly income: $${context.monthlyIncome}, expenses: $${context.monthlyExpenses}, surplus: $${surplus}. `;
  }
  
  if (context.currentSavings && context.savingsGoal) {
    const savingsProgress = (context.currentSavings / context.savingsGoal) * 100;
    contextSummary += `Savings progress: ${savingsProgress.toFixed(1)}% of $${context.savingsGoal} goal. `;
  }
  
  if (context.budgets) {
    const overBudgetCategories = context.budgets.filter(b => b.spent > b.budgeted * 0.8);
    if (overBudgetCategories.length > 0) {
      contextSummary += `Near or over budget in: ${overBudgetCategories.map(b => b.category).join(', ')}. `;
    }
  }
  
  return contextSummary;
};

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, financialContext } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // If OpenAI is not configured, return mock response
    if (!openai) {
      const mockResponse = getMockResponse(message, financialContext);
      return res.json({
        content: mockResponse.content,
        type: mockResponse.type,
        suggestions: [
          "Set up your budget categories",
          "Review your spending patterns",
          "Increase your emergency fund"
        ]
      });
    }
    
    // Analyze financial context
    const contextSummary = analyzeFinancialContext(financialContext);
    
    // Create messages for OpenAI
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      { 
        role: 'system', 
        content: `Current user financial context: ${contextSummary || 'No financial data available.'}`
      },
      { role: 'user', content: message }
    ];
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 150,
      temperature: 0.7,
    });
    
    const aiResponse = completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response right now.';
    
    // Determine response type based on content
    let responseType = 'text';
    if (aiResponse.toLowerCase().includes('congratulations') || aiResponse.toLowerCase().includes('great job')) {
      responseType = 'celebration';
    } else if (aiResponse.toLowerCase().includes('warning') || aiResponse.toLowerCase().includes('careful')) {
      responseType = 'alert';
    } else if (aiResponse.toLowerCase().includes('tip') || aiResponse.toLowerCase().includes('consider')) {
      responseType = 'tip';
    }
    
    res.json({
      content: aiResponse,
      type: responseType,
      suggestions: [
        "Tell me about my spending habits",
        "How can I save more money?",
        "Am I on track with my budget?"
      ]
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      error: 'Failed to process chat request',
      content: 'I apologize, but I encountered an error while processing your request. Please try again.',
      type: 'text'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    openaiConfigured: !!openai,
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`🚀 MoneyMosaic Backend running on port ${port}`);
  console.log(`📊 OpenAI integration: ${openai ? '✅ Enabled' : '❌ Disabled (set OPENAI_API_KEY)'}`);
});