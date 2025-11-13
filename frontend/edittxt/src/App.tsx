import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  useEffect(() => {
    updateInfoFromBackend();
  }, []);

  const sendToBackEnd = async () => {
    if (!input.trim()) return;
    try {
      const res = await fetch("http://localhost:3000/Txt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      updateInfoFromBackend();
    } catch (error) {
      console.error("Error sending to backend:", error);
    }
  };

  const updateInfoFromBackend = async () => {
    try {
      const res = await fetch("http://localhost:3000/Txt");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setOutput(data.txtData || "");
    } catch (error) {
      console.error("Error fetching from backend:", error);
      setOutput("Error: Failed to fetch data from backend");
    }
  };
  return (
    <div className="appcontainer">
      <div className="inputcontainer">
        <h1>Write to backend!</h1>
        <textarea
          className="input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></textarea>
        <button className="btn" onClick={sendToBackEnd}>
          Send Text
        </button>
      </div>
      <div className="outputcontainer">
        <h1>Output from backend!</h1>
        <textarea className="input" readOnly value={output}></textarea>
      </div>
    </div>
  );
}

export default App;
