import { useState, useEffect } from "react";
import axios from "axios";

function Debounce() {
  const [text, setText] = useState(""); // user input
  const [delayText, setDelayText] = useState(""); // 500ms later wala input
  const [results, setResults] = useState([]); // API se data store ke liye

  // 500ms debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayText(text); // update after delay
    }, 500);

    return () => clearTimeout(timer); // timer reset ke liye
  }, [text]);

  // API call when delayText change ho
  useEffect(() => {
    if (delayText.trim() === "") {
      setResults([]); // dont show result on empty input
      return;
    }

    axios
      .get(`https://api.tvmaze.com/search/shows?q=${delayText}`)
      .then((res) => setResults(res.data)) // data set karo
      .catch((err) => console.log("Error:", err));
  }, [delayText]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Live TV Show Search</h2>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)} // input update
        placeholder="Show ka naam likho..."
        style={{ padding: "10px", width: "300px" }} //just tp for commit 
      />

      <ul style={{ marginTop: "20px" }}>
        {results.map((item) => (
          <li key={item.show.id}>{item.show.name}</li> // show ka naam dikhaye
        ))}
      </ul>
    </div>
  );
}

export default Debounce;
