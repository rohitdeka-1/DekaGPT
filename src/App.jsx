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
    <div className="h-screen w-full bg-blue-600 text-white font-bold flex flex-col items-center justify-between p-5"> 
  
      <header className="text-4xl mb-6">DekaGPT</header>

  
      <div className="bg-gray-200  p-5 rounded-xl shadow-lg w-full max-w-lg">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full h-24 border rounded-md p-2 text-black bg-gray-100" 
          placeholder="Write your question..."
        />
        <button
          onClick={generateAnswer}
          className="w-full mt-3 bg-gray-600 text-white-200 py-2 rounded-md transition hover:bg-cyan-600 hover:text-black"
        >
          Generate
        </button>
      </div>

      {answer && (
        <div className="mt-6 max-h-[500px] overflow-auto w-full max-w-lg bg-gray-200 p-5 rounded-xl shadow-lg text-black">
          <h2 className="text-xl font-semibold mb-2">Answer:</h2>
          <pre className="whitespace-pre-wrap">{answer}</pre>
        </div>
      )}

      <footer className="text-sm mt-6">Copyright © Rohit Deka</footer> 
    </div>
  );
}

export default App;