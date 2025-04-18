
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

api_key = os.environ.get("GROQ_API_KEY")
if not api_key:
    print("Error: GROQ_API_KEY environment variable not set.")
    client = None
else:
     client = Groq(api_key=api_key)

@app.route('/api/chat', methods=['POST'])
def chat_handler():
    if not client:
         return jsonify({"error": "Groq client not initialized. API key missing?"}), 500

    data = request.get_json()
    if not data or 'question' not in data or 'context' not in data:
        return jsonify({"error": "Missing 'question' or 'context' in request"}), 400

    user_question = data['question']
    event_context = data['context']

    system_prompt = """
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
    """

    prompt = f"""
System: {system_prompt}

Context from the webpage:
---
{event_context}
---

User Question: {user_question}

Answer:
"""

    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama3-8b-8192",
            temperature=0.2,
            max_tokens=150,
        )

        ai_response = chat_completion.choices[0].message.content
        return jsonify({"answer": ai_response})

    except Exception as e:
        print(f"Error calling Groq API: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)

