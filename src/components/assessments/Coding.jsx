import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Coding.css';

// ❌ questionsBank remove cheyyaledu (backup ga vadachu future lo)

const languageMeta = {
  JavaScript: { icon: "⚡", color: "#F7DF1E", bg: "#1a1a00", desc: "Web & Node.js" },
  Python:     { icon: "🐍", color: "#4fc3f7", bg: "#001a22", desc: "Data & AI" },
  Java:       { icon: "☕", color: "#f89820", bg: "#1a0e00", desc: "Enterprise" },
  "C++":      { icon: "⚙️", color: "#00e5ff", bg: "#001a1f", desc: "Systems" },
};

const TOTAL_TIME = 15 * 60;
const OPT_LABELS = ['A', 'B', 'C', 'D'];

export default function Coding() {

  const [screen, setScreen] = useState('select');
  const [selectedLang, setSelectedLang] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  // 🔥 NEW STATE (backend questions)
  const [questions, setQuestions] = useState([]);

  const meta = selectedLang ? languageMeta[selectedLang] : null;

  // ⏱ Timer
  useEffect(() => {
    if (screen !== 'test') return;
    if (timeLeft <= 0) { setScreen('result'); return; }

    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [screen, timeLeft]);

  // 🔥 FETCH QUESTIONS (DUMMY API)
  useEffect(() => {
    if (!selectedLang) return;

    fetch("https://mocki.io/v1/0a1b2c3d-questions-demo") // 👉 later replace
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error(err));

  }, [selectedLang]);

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const startTest = (lang) => {
    setSelectedLang(lang);
    setCurrentQ(0);
    setAnswers({});
    setFlagged({});
    setTimeLeft(TOTAL_TIME);
    setScreen('test');
  };

  const selectAnswer = (i) =>
    setAnswers(prev => ({ ...prev, [currentQ]: i }));

  const toggleFlag = () =>
    setFlagged(prev => ({ ...prev, [currentQ]: !prev[currentQ] }));

  const score = questions.filter((q, i) => answers[i] === q.correct).length;

  // 🔥 LOADING STATE
  if (screen === 'test' && !questions.length) {
    return <h2 style={{ textAlign: "center" }}>Loading Questions...</h2>;
  }

  // ─── SELECT SCREEN ───
  if (screen === 'select') {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Select Language</h1>

        {Object.keys(languageMeta).map(lang => (
          <button key={lang} onClick={() => startTest(lang)}>
            {lang}
          </button>
        ))}
      </div>
    );
  }

  // ─── RESULT ───
  if (screen === 'result') {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Result</h2>
        <p>Score: {score} / {questions.length}</p>

        <button onClick={() => setScreen('select')}>
          Back
        </button>
      </div>
    );
  }

  // ─── TEST ───
  const q = questions[currentQ];

  return (
    <div style={{ padding: "20px" }}>
      <h3>Time Left: {fmt(timeLeft)}</h3>

      <h2>{q.question}</h2>

      {q.options.map((opt, i) => (
        <div key={i}>
          <button onClick={() => selectAnswer(i)}>
            {OPT_LABELS[i]} - {opt}
          </button>
        </div>
      ))}

      <br />

      <button
        onClick={() => setCurrentQ(currentQ - 1)}
        disabled={currentQ === 0}
      >
        Prev
      </button>

      {currentQ < questions.length - 1 ? (
        <button onClick={() => setCurrentQ(currentQ + 1)}>
          Next
        </button>
      ) : (
        <button onClick={() => setScreen('result')}>
          Submit
        </button>
      )}
    </div>
  );
}