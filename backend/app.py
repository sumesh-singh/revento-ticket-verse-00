
import os
from flask import Flask, request, jsonify
from flask_cors import CORS # Import CORS
from groq import Groq
from dotenv import load_dotenv

load_dotenv() # Load environment variables from .env file

app = Flask(__name__)
CORS(app) # Enable CORS for all routes, allowing frontend requests

# --- SECURITY WARNING ---
# Ensure GROQ_API_KEY is set as an environment variable
# NEVER hardcode your API key in the code.
# Use a .env file locally (add .env to .gitignore)
# Set environment variables in your deployment environment.
api_key = os.environ.get("GROQ_API_KEY")
if not api_key:
    print("Error: GROQ_API_KEY environment variable not set.")
    # In a real app, you might want to exit or disable the chat feature
    # For this example, we'll allow it to run but Groq calls will fail.
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
    event_context = data['context'] # Context scraped from the frontend HTML

    # --- Basic Prompt Engineering ---
    # Instruct the model to use ONLY the provided context.
    system_prompt = (
        "You are a helpful assistant for the 'Awesome Event Management' website. "
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
                    "role": "user", # We combine system, context, and user question into one user message for simplicity here
                    "content": prompt,
                }
            ],
            # Choose a model available via Groq, e.g., llama3-8b-8192 or mixtral-8x7b-32768
            model="llama3-8b-8192",
            temperature=0.2, # Lower temperature for more factual, less creative responses
            max_tokens=150,
            # top_p=1, # Defaults often work well
            # stop=None, # Defaults often work well
            # stream=False, # Set to True for streaming responses
        )

        ai_response = chat_completion.choices[0].message.content
        return jsonify({"answer": ai_response})

    except Exception as e:
        print(f"Error calling Groq API: {e}") # Log error server-side
        # Provide a generic error to the frontend for security
        return jsonify({"error": "An error occurred while processing your request."}), 500

if __name__ == '__main__':
    # Use 0.0.0.0 to be accessible on the network if needed,
    # otherwise 127.0.0.1 is fine for local development.
    # Debug=True is helpful for development but should be False in production.
    app.run(host='0.0.0.0', port=5001, debug=True)
