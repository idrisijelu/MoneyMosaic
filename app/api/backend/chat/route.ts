import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward the request to the backend server
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    
    // Return a fallback response if backend is not available
    return NextResponse.json({
      content: "I'm having trouble connecting to my AI services right now. Please ensure the backend server is running on port 3001, or check the setup instructions in the README.",
      type: 'text',
      suggestions: [
        "Check if backend server is running",
        "Verify OpenAI API key is set",
        "Review your spending patterns manually"
      ]
    });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'MoneyMosaic AI Chat API is running',
    timestamp: new Date().toISOString()
  });
}