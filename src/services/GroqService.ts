
// GroqService.ts
// This service handles Groq API communication without requiring users to run a Python backend

interface GroqChatRequest {
  question: string;
  context: string;
}

interface GroqChatResponse {
  answer: string;
  error?: string;
}

class GroqService {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chatCompletion(request: GroqChatRequest): Promise<GroqChatResponse> {
    const { question, context } = request;
    
    const systemPrompt = `
    You are a knowledgeable assistant for Revento, a modern event management and ticketing platform. Here's what you know:

    Core Features:
    1. Event Creation & Management
       - Users can create and manage events
       - Support for various event types (conferences, workshops, concerts, etc.)
       - Customizable event pages with details, images, and schedules

    2. Ticketing System
       - Multiple ticket tiers (Standard, VIP, Workshop bundles)
       - Secure blockchain-based ticket verification
       - Digital wallet integration for ticket storage
       - Support for different payment methods (crypto, fiat, Stellar)

    3. User Features
       - Personal dashboards for event management
       - Ticket purchase and storage
       - Event favorites and reminders
       - Attendance history and rewards program

    4. Platform Benefits
       - Instant ticketing with blockchain verification
       - Interactive venue maps
       - 24/7 AI support
       - Rewards system for regular attendees

    When answering:
    - Use ONLY the provided context from the webpage combined with this knowledge
    - For specific event details, rely solely on the context provided
    - If information isn't available, clearly state that
    - Be friendly and professional
    - Keep responses concise and focused
    `;

    try {
      console.log('Sending request to Groq API...');
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: `
Context from the webpage:
---
${context}
---

User Question: ${question}
`
            }
          ],
          temperature: 0.2,
          max_tokens: 250
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { answer: '', error: errorData.error?.message || 'Failed to communicate with Groq API' };
      }

      const data = await response.json();
      return { answer: data.choices[0].message.content };
    } catch (error) {
      return { answer: '', error: 'An error occurred while processing your request' };
    }
  }
}

// Export a singleton instance with the API key
export const groqService = new GroqService('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');

// Export type for use in components
export type { GroqChatRequest, GroqChatResponse };
