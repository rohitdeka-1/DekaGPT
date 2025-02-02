import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer("Loading...");

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        }
      );

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error:", error);
      setAnswer("Error generating response. Please try again.");
    }
  }

  return (

    <div className="h-screen w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white font-sans flex flex-col items-center justify-around p-8">
      <header className="text-5xl font-bold text-center">DekaGPT</header>
      
        <div className="mt-1 w-full max-w-3xl min-h-[390px] max-h-[420px] overflow-auto bg-white shadow-2xl p-6 rounded-xl text-black">
          <h2 className="text-2xl font-semibold mb-4">Answer:</h2>
          <pre className="whitespace-pre-wrap text-lg">{answer}</pre>
        </div>
      

      <div className="bg-gray-200 shadow-2xl p-2 rounded-xl w-full max-w-3xl space-y-0">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full h-25 border border-gray-300 rounded-lg p-1 text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Write your question..."
        />
        <button
          onClick={generateAnswer}
          className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold text-md  transition duration-300 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Generate
        </button>
      </div>

      

      <footer className=" text-sm text-gray-200 text-center">
        Copyright © Rohit Deka
      </footer>
    </div>
  );
}

export default App;
