import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Coding.css';

const questionsBank = {
  JavaScript: [
    { id: 1, question: "What is the output of `typeof null` in JavaScript?", options: ["null", "undefined", "object", "string"], correct: 2 },
    { id: 2, question: "Which method adds an element to the END of an array?", options: ["push()", "pop()", "shift()", "unshift()"], correct: 0 },
    { id: 3, question: "What does `===` check in JavaScript?", options: ["Only value", "Only type", "Both value and type", "Reference equality"], correct: 2 },
    { id: 4, question: "Which of the following is NOT a JavaScript data type?", options: ["Boolean", "Symbol", "Float", "BigInt"], correct: 2 },
    { id: 5, question: "What is a closure in JavaScript?", options: ["Closes the browser window", "Function with access to outer scope", "Terminates a loop", "Handles exceptions"], correct: 1 },
    { id: 6, question: "What does the `spread` operator (`...`) do?", options: ["Multiplies values", "Spreads elements of an iterable", "Declares rest params", "Converts string to array"], correct: 1 },
    { id: 7, question: "What is the purpose of `Promise` in JavaScript?", options: ["Stores data", "Handles async operations", "Creates loops", "Defines classes"], correct: 1 },
  ],
  Python: [
    { id: 1, question: "What is the output of `type([])` in Python?", options: ["<class 'array'>", "<class 'list'>", "<class 'tuple'>", "<class 'set'>"], correct: 1 },
    { id: 2, question: "Which keyword defines a function in Python?", options: ["function", "def", "func", "define"], correct: 1 },
    { id: 3, question: "What does `//` operator do in Python?", options: ["Division", "Floor division", "Modulo", "Exponentiation"], correct: 1 },
    { id: 4, question: "Which is used to create a virtual environment in Python?", options: ["pip", "conda", "venv", "Both B & C"], correct: 3 },
    { id: 5, question: "What is a list comprehension in Python?", options: ["Understanding lists", "Concise way to create lists", "Sorting lists", "Deleting list elements"], correct: 1 },
    { id: 6, question: "What does `*args` do in a Python function?", options: ["Keyword arguments", "Variable positional arguments", "Returns multiple values", "Defines optional args"], correct: 1 },
    { id: 7, question: "Which Python data structure uses key-value pairs?", options: ["List", "Tuple", "Set", "Dictionary"], correct: 3 },
  ],
  Java: [
    { id: 1, question: "What is the default value of a boolean in Java?", options: ["true", "false", "null", "0"], correct: 1 },
    { id: 2, question: "Which keyword is used to inherit a class in Java?", options: ["implements", "inherits", "extends", "super"], correct: 2 },
    { id: 3, question: "What is the size of an `int` in Java?", options: ["16 bits", "32 bits", "64 bits", "8 bits"], correct: 1 },
    { id: 4, question: "Which is NOT an access modifier in Java?", options: ["public", "private", "protected", "internal"], correct: 3 },
    { id: 5, question: "What does the `final` keyword do in Java?", options: ["Prevents inheritance/overriding", "Finalizes memory", "Ends a program", "Declares abstract methods"], correct: 0 },
    { id: 6, question: "What is an interface in Java?", options: ["A class with no methods", "A blueprint with abstract methods", "A static class", "A data type"], correct: 1 },
    { id: 7, question: "What is JVM in Java?", options: ["Java Virtual Machine", "Java Variable Manager", "Java Version Method", "Java Visual Module"], correct: 0 },
  ],
  "C++": [
    { id: 1, question: "What operator is used for dynamic memory allocation in C++?", options: ["malloc", "alloc", "new", "create"], correct: 2 },
    { id: 2, question: "What is a pointer in C++?", options: ["A variable storing another variable's address", "A type of array", "A function reference", "A library import"], correct: 0 },
    { id: 3, question: "How do you declare a reference variable in C++?", options: ["int *ref = var;", "int &ref = var;", "int ref = &var;", "ref int = var;"], correct: 1 },
    { id: 4, question: "What does STL stand for in C++?", options: ["Standard Testing Library", "Standard Template Library", "Simple Type Library", "System Thread Library"], correct: 1 },
    { id: 5, question: "What is a destructor in C++?", options: ["Creates objects", "Deletes objects and frees memory", "Inherits from base class", "Initializes variables"], correct: 1 },
    { id: 6, question: "What is function overloading in C++?", options: ["Same function, different implementations", "Multiple functions with same name but different parameters", "Creating virtual functions", "Deleting a function"], correct: 1 },
    { id: 7, question: "Which header file is needed for `cout` in C++?", options: ["stdio.h", "conio.h", "iostream", "string.h"], correct: 2 },
  ],
  "C#": [
    { id: 1, question: "What is the base class of all classes in C#?", options: ["Class", "Object", "System", "Base"], correct: 1 },
    { id: 2, question: "Which keyword defines an interface in C#?", options: ["abstract", "interface", "class", "struct"], correct: 1 },
    { id: 3, question: "What does LINQ stand for in C#?", options: ["Language Integrated Query", "Linked Integer Query", "Language Interface Query", "List Integrated Query"], correct: 0 },
    { id: 4, question: "What is a delegate in C#?", options: ["A type of class", "Multiple inheritance", "A type-safe function pointer", "Exception handling"], correct: 2 },
    { id: 5, question: "Which is used for async programming in C#?", options: ["async/await", "thread/run", "promise/then", "coroutine/yield"], correct: 0 },
    { id: 6, question: "What is the difference between `ref` and `out` in C#?", options: ["No difference", "`ref` requires initialization, `out` does not", "`out` requires initialization, `ref` does not", "Both require initialization"], correct: 1 },
    { id: 7, question: "What is a nullable type in C#?", options: ["A type that can hold null values", "A type with no value", "An empty class", "A type with default values"], correct: 0 },
  ],
  Ruby: [
    { id: 1, question: "What symbol defines an instance variable in Ruby?", options: ["$", "@", "#", "&"], correct: 1 },
    { id: 2, question: "How do you print output in Ruby?", options: ["console.log()", "print()", "puts", "echo"], correct: 2 },
    { id: 3, question: "What is a block in Ruby?", options: ["Code in do...end or {}", "A variable type", "A class method", "A module"], correct: 0 },
    { id: 4, question: "Which method iterates over an array in Ruby?", options: ["forEach", "each", "loop", "iterate"], correct: 1 },
    { id: 5, question: "What does `nil` represent in Ruby?", options: ["Zero", "False", "Absence of value", "Empty string"], correct: 2 },
    { id: 6, question: "What is a symbol in Ruby?", options: ["A string constant", "An immutable identifier", "A method name", "A class reference"], correct: 1 },
    { id: 7, question: "Which keyword is used to define a class method in Ruby?", options: ["static", "self", "class", "module"], correct: 1 },
  ],
  Go: [
    { id: 1, question: "Which keyword creates a goroutine in Go?", options: ["thread", "async", "go", "goroutine"], correct: 2 },
    { id: 2, question: "Which is used for goroutine communication in Go?", options: ["Mutex", "Channel", "Semaphore", "Pipe"], correct: 1 },
    { id: 3, question: "What is the zero value of a boolean in Go?", options: ["true", "false", "nil", "0"], correct: 1 },
    { id: 4, question: "How are errors handled in Go?", options: ["try/catch", "Using error return values", "exception handling", "throws keyword"], correct: 1 },
    { id: 5, question: "What does `:=` do in Go?", options: ["Assignment only", "Short variable declaration and assignment", "Type declaration", "Constant declaration"], correct: 1 },
    { id: 6, question: "What is a struct in Go?", options: ["A loop construct", "A composite data type", "A function type", "A module"], correct: 1 },
    { id: 7, question: "What package is used for formatted I/O in Go?", options: ["io", "os", "fmt", "sys"], correct: 2 },
  ],
  PHP: [
    { id: 1, question: "What does PHP stand for?", options: ["Personal Home Page", "PHP: Hypertext Preprocessor", "Private Home Page", "Preprocessed HTML Page"], correct: 1 },
    { id: 2, question: "Which symbol starts a variable in PHP?", options: ["@", "#", "$", "&"], correct: 2 },
    { id: 3, question: "How do you create an array in PHP?", options: ["array(1,2,3)", "[1,2,3]", "Both A and B", "new Array(1,2,3)"], correct: 2 },
    { id: 4, question: "Which superglobal gets form data in PHP?", options: ["$_GET and $_POST", "$_FORM", "$GET and $POST", "$_DATA"], correct: 0 },
    { id: 5, question: "Which function includes a file in PHP?", options: ["import()", "include()", "require()", "Both B and C"], correct: 3 },
    { id: 6, question: "What is a trait in PHP?", options: ["A class type", "A reusable set of methods", "An interface", "A namespace"], correct: 1 },
    { id: 7, question: "Which PHP function counts array elements?", options: ["length()", "size()", "count()", "total()"], correct: 2 },
  ],
  TypeScript: [
    { id: 1, question: "What is TypeScript?", options: ["A database language", "A typed superset of JavaScript", "A CSS preprocessor", "A backend framework"], correct: 1 },
    { id: 2, question: "How do you declare a type in TypeScript?", options: ["var x: number", "type x = number", "let x: number", "Both A and C"], correct: 3 },
    { id: 3, question: "What is an `interface` in TypeScript?", options: ["A class blueprint", "A contract for object shapes", "A function type", "A module"], correct: 1 },
    { id: 4, question: "What is the `any` type in TypeScript?", options: ["A type that accepts all values", "A numeric type", "An error type", "A boolean type"], correct: 0 },
    { id: 5, question: "What does `readonly` do in TypeScript?", options: ["Makes variable constant", "Prevents property modification after init", "Creates a getter", "Defines abstract property"], correct: 1 },
    { id: 6, question: "What is a generic in TypeScript?", options: ["A universal variable", "A reusable type placeholder", "A global function", "A base class"], correct: 1 },
    { id: 7, question: "How do you compile TypeScript to JavaScript?", options: ["npm run build", "tsc filename.ts", "ts compile", "babel filename.ts"], correct: 1 },
  ],
  Rust: [
    { id: 1, question: "What is ownership in Rust?", options: ["A memory management system", "A module system", "An error handling system", "A type system"], correct: 0 },
    { id: 2, question: "What does `mut` mean in Rust?", options: ["A module", "Mutable variable", "A method", "Multiple types"], correct: 1 },
    { id: 3, question: "What is a `Result<T, E>` type in Rust?", options: ["A generic container", "An error-handling type", "A tuple type", "A reference type"], correct: 1 },
    { id: 4, question: "What is borrowing in Rust?", options: ["Using a library", "Referencing without taking ownership", "Copying data", "Moving data between threads"], correct: 1 },
    { id: 5, question: "What keyword defines a function in Rust?", options: ["function", "fn", "def", "func"], correct: 1 },
    { id: 6, question: "What is a trait in Rust?", options: ["A data type", "A collection of methods", "A struct", "A module"], correct: 1 },
    { id: 7, question: "What does `cargo` do in Rust?", options: ["Compiles Rust code", "Manages packages and build system", "Runs tests only", "Formats code"], correct: 1 },
  ],
};

const languageMeta = {
  JavaScript: { icon: "⚡", color: "#F7DF1E", bg: "#1a1a00", desc: "Web & Node.js" },
  Python:     { icon: "🐍", color: "#4fc3f7", bg: "#001a22", desc: "Data & AI" },
  Java:       { icon: "☕", color: "#f89820", bg: "#1a0e00", desc: "Enterprise" },
  "C++":      { icon: "⚙️", color: "#00e5ff", bg: "#001a1f", desc: "Systems" },
  "C#":       { icon: "🔷", color: "#b39ddb", bg: "#11001a", desc: ".NET & Games" },
  Ruby:       { icon: "💎", color: "#ef5350", bg: "#1a0000", desc: "Web Dev" },
  Go:         { icon: "🔵", color: "#00e5cc", bg: "#001a18", desc: "Cloud & APIs" },
  PHP:        { icon: "🐘", color: "#9575cd", bg: "#0e0015", desc: "Web Backend" },
  TypeScript: { icon: "📘", color: "#42a5f5", bg: "#001022", desc: "Typed JS" },
  Rust:       { icon: "🦀", color: "#ff7043", bg: "#1a0800", desc: "System Safety" },
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

  const questions = selectedLang ? questionsBank[selectedLang] : [];
  const meta = selectedLang ? languageMeta[selectedLang] : null;

  useEffect(() => {
    if (screen !== 'test') return;
    if (timeLeft <= 0) { setScreen('result'); return; }
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [screen, timeLeft]);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const startTest = (lang) => {
    setSelectedLang(lang);
    setCurrentQ(0);
    setAnswers({});
    setFlagged({});
    setTimeLeft(TOTAL_TIME);
    setScreen('test');
  };

  const selectAnswer = (i) => setAnswers(prev => ({ ...prev, [currentQ]: i }));
  const toggleFlag = () => setFlagged(prev => ({ ...prev, [currentQ]: !prev[currentQ] }));

  const getStatus = (i) => {
    if (answers[i] !== undefined && flagged[i]) return 'flagged-answered';
    if (answers[i] !== undefined) return 'answered';
    if (flagged[i]) return 'flagged';
    return 'unanswered';
  };

  const score = questions.filter((q, i) => answers[i] === q.correct).length;
  const percent = questions.length ? Math.round((score / questions.length) * 100) : 0;
  const answeredCount = Object.keys(answers).length;

  /* ─── LANGUAGE SELECT ─── */
  if (screen === 'select') {
    return (
      <div className="ca-root">
        <div className="ca-particles">
          {[...Array(20)].map((_, i) => <div key={i} className="ca-particle" style={{ '--delay': `${i * 0.3}s`, '--x': `${Math.random() * 100}%` }} />)}
        </div>

        <header className="ca-top-bar">
          <div className="ca-brand">
            <span className="ca-brand-icon">&lt;/&gt;</span>
            <span className="ca-brand-name">CodeAssess</span>
          </div>
          <div className="ca-user-chip">
            <div className="ca-avatar">S</div>
            <div>
              <div className="ca-uname">Student</div>
              <div className="ca-uid">STU_2024_001</div>
            </div>
          </div>
        </header>

        <main className="ca-select-main">
          <div className="ca-select-hero">
            <div className="ca-hero-badge">Assessment Portal</div>
            <h1 className="ca-select-title">Choose Your <span className="ca-gradient-text">Programming Language</span></h1>
            <p className="ca-select-sub">Select a language and test your knowledge with curated MCQ questions</p>
          </div>

          <div className="ca-lang-grid">
            {Object.keys(questionsBank).map(lang => {
              const m = languageMeta[lang];
              return (
                <button key={lang} className="ca-lang-card" onClick={() => startTest(lang)}
                  style={{ '--lc': m.color, '--lbg': m.bg }}>
                  <div className="ca-lcard-glow" />
                  <span className="ca-lcard-icon">{m.icon}</span>
                  <span className="ca-lcard-name">{lang}</span>
                  <span className="ca-lcard-desc">{m.desc}</span>
                  <div className="ca-lcard-footer">
                    <span className="ca-lcard-arrow">→</span>
                  </div>
                </button>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  /* ─── RESULT ─── */
  if (screen === 'result') {
    const grade = percent >= 80 ? 'Excellent!' : percent >= 60 ? 'Well Done!' : percent >= 40 ? 'Keep Practicing!' : 'Needs Improvement';
    const gradeIcon = percent >= 80 ? '🏆' : percent >= 60 ? '🎉' : percent >= 40 ? '📚' : '💪';
    return (
      <div className="ca-root">
        <header className="ca-top-bar">
          <div className="ca-brand">
            <span className="ca-brand-icon">&lt;/&gt;</span>
            <span className="ca-brand-name">CodeAssess</span>
          </div>
        </header>
        <div className="ca-result-wrap">
          <div className="ca-result-card" style={{ '--lc': meta.color }}>
            <div className="ca-result-glow" />
            <div className="ca-result-icon">{gradeIcon}</div>
            <h2 className="ca-result-grade">{grade}</h2>
            <p className="ca-result-lang">{meta.icon} {selectedLang} Assessment</p>

            <div className="ca-score-ring">
              <svg viewBox="0 0 120 120" className="ca-ring-svg">
                <circle cx="60" cy="60" r="50" className="ca-ring-bg" />
                <circle cx="60" cy="60" r="50" className="ca-ring-fill"
                  style={{ '--pct': percent, '--lc': meta.color,
                    strokeDasharray: `${percent * 3.14} 314` }} />
              </svg>
              <div className="ca-ring-text">
                <span className="ca-ring-score">{score}</span>
                <span className="ca-ring-total">/{questions.length}</span>
              </div>
            </div>

            <div className="ca-result-pct" style={{ color: meta.color }}>{percent}% Score</div>

            <div className="ca-result-stats">
              <div className="ca-rstat ca-rstat-correct"><span className="ca-rstat-val">{score}</span><span>Correct</span></div>
              <div className="ca-rstat ca-rstat-wrong"><span className="ca-rstat-val">{questions.length - score}</span><span>Wrong</span></div>
              <div className="ca-rstat ca-rstat-time"><span className="ca-rstat-val">{fmt(TOTAL_TIME - timeLeft)}</span><span>Time Taken</span></div>
            </div>

            <div className="ca-result-actions">
              <button className="ca-btn-outline" onClick={() => startTest(selectedLang)}>Retry</button>
              <button className="ca-btn-primary" style={{ '--lc': meta.color }} onClick={() => setScreen('select')}>Try Another Language</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── TEST SCREEN ─── */
  const q = questions[currentQ];
  return (
    <div className="ca-root ca-test-root" style={{ '--lc': meta.color, '--lbg': meta.bg }}>

      {/* Header */}
      <header className="ca-test-header">
        <div className="ca-brand">
          <span className="ca-brand-icon">&lt;/&gt;</span>
          <span className="ca-brand-name">CodeAssess</span>
        </div>
        <div className="ca-lang-pill">
          <span>{meta.icon}</span>
          <span>{selectedLang} Assessment</span>
        </div>
        <div className="ca-header-right">
          <div className={`ca-timer ${timeLeft < 180 ? 'ca-timer-urgent' : timeLeft < 300 ? 'ca-timer-warn' : ''}`}>
            <span className="ca-timer-icon">⏱</span>
            <span>{fmt(timeLeft)}</span>
          </div>
          <div className="ca-user-chip ca-user-chip-sm">
            <div className="ca-avatar">S</div>
            <span className="ca-uname">Student</span>
          </div>
        </div>
      </header>

      <div className="ca-test-body">

        {/* Main */}
        <main className="ca-question-main">
          {/* Progress bar */}
          <div className="ca-progress-wrap">
            <div className="ca-progress-bar">
              <div className="ca-progress-fill" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
            </div>
            <span className="ca-progress-label">Q {currentQ + 1} / {questions.length}</span>
          </div>

          {/* Question card */}
          <div className="ca-question-card">
            <div className="ca-question-top">
              <span className="ca-q-badge">Question {currentQ + 1}</span>
              <button className={`ca-flag-btn ${flagged[currentQ] ? 'ca-flagged' : ''}`} onClick={toggleFlag}>
                {flagged[currentQ] ? '🚩 Flagged' : '🏳️ Flag'}
              </button>
            </div>
            <p className="ca-question-text">{q.question}</p>
          </div>

          {/* Options */}
          <div className="ca-options">
            {q.options.map((opt, i) => (
              <button key={i}
                className={`ca-option ${answers[currentQ] === i ? 'ca-option-selected' : ''}`}
                onClick={() => selectAnswer(i)}>
                <span className={`ca-opt-label ${answers[currentQ] === i ? 'ca-opt-label-active' : ''}`}>
                  {OPT_LABELS[i]}
                </span>
                <span className="ca-opt-text">{opt}</span>
                {answers[currentQ] === i && <span className="ca-check">✓</span>}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="ca-nav">
            <button className="ca-btn-prev" onClick={() => setCurrentQ(q => q - 1)} disabled={currentQ === 0}>
              ← Previous
            </button>
            <div className="ca-nav-center">
              <span className="ca-answered-info">{answeredCount}/{questions.length} answered</span>
            </div>
            {currentQ < questions.length - 1
              ? <button className="ca-btn-next" onClick={() => setCurrentQ(q => q + 1)}>Save & Next →</button>
              : <button className="ca-btn-submit" onClick={() => setScreen('result')}>Submit Test ✓</button>
            }
          </div>
        </main>

        {/* Sidebar */}
        <aside className="ca-sidebar">
          <div className="ca-sidebar-section">
            <div className="ca-sidebar-title-row">
              <h3 className="ca-sidebar-title">Question Map</h3>
              <span className="ca-total-chip">{questions.length} Total</span>
            </div>
            <div className="ca-qmap">
              {questions.map((_, i) => (
                <button key={i}
                  className={`ca-qmap-btn ca-qmap-${getStatus(i)} ${i === currentQ ? 'ca-qmap-current' : ''}`}
                  onClick={() => setCurrentQ(i)}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="ca-legend">
            <div className="ca-legend-item"><span className="ca-dot ca-dot-answered" />Answered</div>
            <div className="ca-legend-item"><span className="ca-dot ca-dot-flagged" />Flagged</div>
            <div className="ca-legend-item"><span className="ca-dot ca-dot-unanswered" />Not Answered</div>
          </div>

          <div className="ca-tip-card">
            <div className="ca-tip-title">💡 Quick Tip</div>
            <p className="ca-tip-body">Flag questions you're unsure about and review them before submitting.</p>
          </div>

          <button className="ca-btn-submit-side" onClick={() => setScreen('result')}>
            Submit Test
          </button>
        </aside>
      </div>
    </div>
  );
}
