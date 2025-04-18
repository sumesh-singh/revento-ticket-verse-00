
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

    system_prompt = (
        "You are a helpful assistant for the 'Revento' event management website. "
        "Answer the user's question based *only* on the following event information provided. "
        "If the information is not in the context, clearly state that you don't have information about it from the provided text. "
        "Do not make up event details or information not present in the context. Be concise."
    )

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
