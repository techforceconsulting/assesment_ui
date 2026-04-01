import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories, fetchQuestions, submitAnswers } from "../../services/aptitudeApi";
import "./Aptitude.css";

const TOTAL_TIME = 20 * 60;
const OPT_LABELS = ["A", "B", "C", "D"];

export default function Aptitude() {
  const navigate = useNavigate();


  const [screen, setScreen] = useState("loading");
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [animateIn, setAnimateIn] = useState(false);
  const startTimeRef = useRef(null);
  const questionCardRef = useRef(null);


  useEffect(() => {
    let mounted = true;
    fetchCategories()
      .then((cats) => {
        if (mounted) {
          setCategories(cats);
          setScreen("select");
          setTimeout(() => setAnimateIn(true), 50);
        }
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      });
    return () => { mounted = false; };
  }, []);


  useEffect(() => {
    if (screen !== "test") return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [screen, timeLeft]);

  const fmt = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const startTest = useCallback(async (catName) => {
    setSelectedCat(catName);
    setScreen("preparing");
    setError(null);
    try {
      const qs = await fetchQuestions(catName);
      setQuestions(qs);
      setCurrentQ(0);
      setAnswers({});
      setFlagged({});
      setTimeLeft(TOTAL_TIME);
      startTimeRef.current = Date.now();
      setScreen("test");
    } catch (err) {
      setError(err.message);
      setScreen("select");
    }
  }, []);

  const selectAnswer = (i) => {
    setAnswers((prev) => ({ ...prev, [currentQ]: i }));
  };

  const clearAnswer = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ];
      return copy;
    });
  };

  const toggleFlag = () =>
    setFlagged((prev) => ({ ...prev, [currentQ]: !prev[currentQ] }));

  const getStatus = (i) => {
    if (answers[i] !== undefined && flagged[i]) return "flagged-answered";
    if (answers[i] !== undefined) return "answered";
    if (flagged[i]) return "flagged";
    return "unanswered";
  };

  const goToQuestion = (idx) => {
    setCurrentQ(idx);
    if (questionCardRef.current) {
      questionCardRef.current.classList.remove("apt-fade-in");
      void questionCardRef.current.offsetWidth;
      questionCardRef.current.classList.add("apt-fade-in");
    }
  };

  const handleSubmit = useCallback(async () => {
    setShowConfirm(false);
    setScreen("submitting");
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    try {
      const result = await submitAnswers(selectedCat, answers);
      result.timeTaken = elapsed;
      setResultData(result);
      setScreen("result");
    } catch (err) {
      setError(err.message);
      setScreen("test");
    }
  }, [selectedCat, answers]);

  const answeredCount = Object.keys(answers).length;
  const catMeta = categories.find((c) => c.name === selectedCat);

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );


  if (screen === "loading" || screen === "preparing" || screen === "submitting") {
    const msgs = {
      loading: "Loading Assessment Portal…",
      preparing: "Preparing Your Assessment…",
      submitting: "Evaluating Your Responses…",
    };
    return (
      <div className="apt-root">
        <div className="apt-particles">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="apt-particle"
              style={{ "--delay": `${i * 0.4}s`, "--x": `${Math.random() * 100}%` }}
            />
          ))}
        </div>
        <div className="apt-loader-wrap">
          <div className="apt-loader-ring">
            <div className="apt-spinner" />
          </div>
          <p className="apt-loader-text">{msgs[screen]}</p>
          <div className="apt-loader-dots">
            <span /><span /><span />
          </div>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="apt-root">
        <div className="apt-loader-wrap">
          <div className="apt-error-icon">⚠️</div>
          <h2 className="apt-error-title">Something went wrong</h2>
          <p className="apt-error-msg">{error}</p>
          <button className="apt-btn-primary apt-btn-retry" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }


  if (screen === "select") {
    return (
      <div className="apt-root">
        <div className="apt-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="apt-particle"
              style={{ "--delay": `${i * 0.3}s`, "--x": `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        <header className="apt-top-bar">
          <div className="apt-brand" onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
            <span className="apt-brand-icon">🧠</span>
            <span className="apt-brand-name">AptitudeIQ</span>
          </div>
          <div className="apt-header-meta">
            <div className="apt-meta-chip">
              <span>📋</span>
              <span>{categories.length} Categories</span>
            </div>
            <div className="apt-meta-chip">
              <span>⏱</span>
              <span>20 min each</span>
            </div>
          </div>
          <div className="apt-user-chip">
            <div className="apt-avatar">S</div>
            <div>
              <div className="apt-uname">Student</div>
              <div className="apt-uid">STU_2024_001</div>
            </div>
          </div>
        </header>

        <main className={`apt-select-main ${animateIn ? "apt-animate-in" : ""}`}>
          <div className="apt-select-hero">
            <div className="apt-hero-badge">Aptitude Assessment</div>
            <h1 className="apt-select-title">
              Master Your <span className="apt-gradient-text">Aptitude Skills</span>
            </h1>
            <p className="apt-select-sub">
              Choose a category below to begin your timed assessment. Each test has 7 expert-curated
              questions with detailed explanations.
            </p>
          </div>

          <div className="apt-search-bar">
            <span className="apt-search-icon">🔍</span>
            <input
              type="text"
              className="apt-search-input"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="apt-search-clear" onClick={() => setSearchQuery("")}>
                ✕
              </button>
            )}
          </div>

          <div className="apt-cat-grid">
            {filteredCategories.map((cat, idx) => (
              <button
                key={cat.name}
                className="apt-cat-card"
                onClick={() => startTest(cat.name)}
                style={{
                  "--lc": cat.color,
                  "--lbg": cat.bg,
                  "--card-delay": `${idx * 0.08}s`,
                }}
              >
                <div className="apt-ccard-glow" />
                <span className="apt-ccard-icon">{cat.icon}</span>
                <span className="apt-ccard-name">{cat.name}</span>
                <span className="apt-ccard-desc">{cat.desc}</span>
                <div className="apt-ccard-footer">
                  <span className="apt-ccard-count">{cat.questionCount} Questions</span>
                  <span className="apt-ccard-arrow">→</span>
                </div>
                <div className="apt-ccard-difficulty">
                  <span className="apt-diff-dot apt-diff-easy" />
                  <span className="apt-diff-dot apt-diff-medium" />
                  <span className="apt-diff-dot apt-diff-hard" />
                  <span className="apt-diff-label">Mixed Difficulty</span>
                </div>
              </button>
            ))}
          </div>

          {filteredCategories.length === 0 && (
            <div className="apt-no-results">
              <span className="apt-no-results-icon">🔎</span>
              <p>No categories match your search</p>
            </div>
          )}
        </main>
      </div>
    );
  }


  if (screen === "result" && resultData) {
    const { score, total, percentage, grade, gradeIcon, difficultyBreakdown } = resultData;
    return (
      <div className="apt-root">
        <header className="apt-top-bar">
          <div className="apt-brand">
            <span className="apt-brand-icon">🧠</span>
            <span className="apt-brand-name">AptitudeIQ</span>
          </div>
        </header>
        <div className="apt-result-wrap">
          <div className="apt-result-card" style={{ "--lc": catMeta?.color || "#b794f4" }}>
            <div className="apt-result-glow" />

            <div className="apt-result-icon">{gradeIcon}</div>
            <h2 className="apt-result-grade">{grade}</h2>
            <p className="apt-result-cat">{catMeta?.icon} {selectedCat}</p>

            <div className="apt-score-ring">
              <svg viewBox="0 0 120 120" className="apt-ring-svg">
                <circle cx="60" cy="60" r="50" className="apt-ring-bg" />
                <circle
                  cx="60" cy="60" r="50"
                  className="apt-ring-fill"
                  style={{
                    "--pct": percentage,
                    "--lc": catMeta?.color || "#b794f4",
                    strokeDasharray: `${percentage * 3.14} 314`,
                  }}
                />
              </svg>
              <div className="apt-ring-text">
                <span className="apt-ring-score">{score}</span>
                <span className="apt-ring-total">/{total}</span>
              </div>
            </div>

            <div className="apt-result-pct" style={{ color: catMeta?.color || "#b794f4" }}>
              {percentage}% Score
            </div>

            <div className="apt-result-stats">
              <div className="apt-rstat apt-rstat-correct">
                <span className="apt-rstat-val">{score}</span>
                <span>Correct</span>
              </div>
              <div className="apt-rstat apt-rstat-wrong">
                <span className="apt-rstat-val">{total - score}</span>
                <span>Wrong</span>
              </div>
              <div className="apt-rstat apt-rstat-time">
                <span className="apt-rstat-val">
                  {resultData.timeTaken ? fmt(resultData.timeTaken) : "--:--"}
                </span>
                <span>Time</span>
              </div>
            </div>


            <div className="apt-difficulty-breakdown">
              <h4 className="apt-db-title">Performance by Difficulty</h4>
              <div className="apt-db-grid">
                {Object.entries(difficultyBreakdown).map(([diff, data]) => (
                  <div key={diff} className={`apt-db-item apt-db-${diff}`}>
                    <div className="apt-db-bar-container">
                      <div
                        className="apt-db-bar-fill"
                        style={{
                          width: data.total > 0 ? `${(data.correct / data.total) * 100}%` : "0%",
                        }}
                      />
                    </div>
                    <div className="apt-db-info">
                      <span className="apt-db-label">{diff.charAt(0).toUpperCase() + diff.slice(1)}</span>
                      <span className="apt-db-score">{data.correct}/{data.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="apt-result-actions">
              <button className="apt-btn-outline" onClick={() => setScreen("review")}>
                📖 Review Answers
              </button>
              <button className="apt-btn-outline" onClick={() => startTest(selectedCat)}>
                🔄 Retry
              </button>
              <button
                className="apt-btn-primary"
                style={{ "--lc": catMeta?.color || "#b794f4" }}
                onClick={() => {
                  setScreen("select");
                  setAnimateIn(true);
                }}
              >
                Try Another Category
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  if (screen === "review" && resultData) {
    return (
      <div className="apt-root">
        <header className="apt-top-bar">
          <div className="apt-brand">
            <span className="apt-brand-icon">🧠</span>
            <span className="apt-brand-name">AptitudeIQ</span>
          </div>
          <div className="apt-lang-pill" style={{ "--lc": catMeta?.color || "#b794f4" }}>
            <span>{catMeta?.icon}</span>
            <span>Answer Review</span>
          </div>
          <button
            className="apt-btn-back"
            onClick={() => setScreen("result")}
          >
            ← Back to Results
          </button>
        </header>

        <div className="apt-review-container">
          <div className="apt-review-summary">
            <span className="apt-review-score" style={{ color: catMeta?.color || "#b794f4" }}>
              {resultData.score}/{resultData.total} Correct
            </span>
            <span className="apt-review-pct">{resultData.percentage}%</span>
          </div>

          {resultData.results.map((r, idx) => (
            <div
              key={idx}
              className={`apt-review-card ${r.isCorrect ? "apt-review-correct" : "apt-review-wrong"}`}
            >
              <div className="apt-review-q-header">
                <span className="apt-review-q-num">Q{idx + 1}</span>
                <span className={`apt-review-diff apt-review-diff-${r.difficulty}`}>
                  {r.difficulty}
                </span>
                <span className={`apt-review-badge ${r.isCorrect ? "apt-badge-correct" : "apt-badge-wrong"}`}>
                  {r.isCorrect ? "✓ Correct" : "✗ Wrong"}
                </span>
              </div>
              <p className="apt-review-question">{r.question}</p>
              <div className="apt-review-options">
                {r.options.map((opt, oi) => {
                  let cls = "apt-review-opt";
                  if (oi === r.correctAnswer) cls += " apt-review-opt-correct";
                  if (oi === r.userAnswer && !r.isCorrect) cls += " apt-review-opt-wrong";
                  return (
                    <div key={oi} className={cls}>
                      <span className="apt-review-opt-label">{OPT_LABELS[oi]}</span>
                      <span>{opt}</span>
                      {oi === r.correctAnswer && <span className="apt-review-check">✓</span>}
                      {oi === r.userAnswer && oi !== r.correctAnswer && (
                        <span className="apt-review-cross">✗</span>
                      )}
                    </div>
                  );
                })}
              </div>
              {r.explanation && (
                <div className="apt-review-explanation">
                  <span className="apt-review-exp-icon">💡</span>
                  <p>{r.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }


  const q = questions[currentQ];
  if (!q) return null;

  return (
    <div className="apt-root apt-test-root" style={{ "--lc": catMeta?.color || "#b794f4", "--lbg": catMeta?.bg || "#0e0018" }}>


      {showConfirm && (
        <div className="apt-overlay">
          <div className="apt-confirm-card">
            <div className="apt-confirm-icon">📝</div>
            <h3 className="apt-confirm-title">Submit Assessment?</h3>
            <p className="apt-confirm-text">
              You've answered <strong>{answeredCount}</strong> of{" "}
              <strong>{questions.length}</strong> questions.
              {answeredCount < questions.length && (
                <span className="apt-confirm-warn">
                  {" "}⚠ {questions.length - answeredCount} question(s) are unanswered.
                </span>
              )}
            </p>
            <div className="apt-confirm-actions">
              <button className="apt-btn-outline" onClick={() => setShowConfirm(false)}>
                Continue Test
              </button>
              <button className="apt-btn-submit" onClick={handleSubmit}>
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}


      <header className="apt-test-header">
        <div className="apt-brand">
          <span className="apt-brand-icon">🧠</span>
          <span className="apt-brand-name">AptitudeIQ</span>
        </div>
        <div className="apt-lang-pill">
          <span>{catMeta?.icon}</span>
          <span>{selectedCat}</span>
        </div>
        <div className="apt-header-right">
          <div
            className={`apt-timer ${
              timeLeft < 180 ? "apt-timer-urgent" : timeLeft < 300 ? "apt-timer-warn" : ""
            }`}
          >
            <span className="apt-timer-icon">⏱</span>
            <span>{fmt(timeLeft)}</span>
          </div>
          <div className="apt-user-chip apt-user-chip-sm">
            <div className="apt-avatar">S</div>
            <span className="apt-uname">Student</span>
          </div>
        </div>
      </header>

      <div className="apt-test-body">


        <main className="apt-question-main">

          <div className="apt-progress-wrap">
            <div className="apt-progress-bar">
              <div
                className="apt-progress-fill"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              />
            </div>
            <span className="apt-progress-label">
              Q {currentQ + 1} / {questions.length}
            </span>
          </div>


          <div className="apt-question-card apt-fade-in" ref={questionCardRef}>
            <div className="apt-question-top">
              <div className="apt-q-badges">
                <span className="apt-q-badge">Question {currentQ + 1}</span>
                {q.difficulty && (
                  <span className={`apt-q-diff apt-q-diff-${q.difficulty}`}>{q.difficulty}</span>
                )}
              </div>
              <div className="apt-q-actions">
                {answers[currentQ] !== undefined && (
                  <button className="apt-clear-btn" onClick={clearAnswer}>
                    ✕ Clear
                  </button>
                )}
                <button
                  className={`apt-flag-btn ${flagged[currentQ] ? "apt-flagged" : ""}`}
                  onClick={toggleFlag}
                >
                  {flagged[currentQ] ? "🚩 Flagged" : "🏳️ Flag"}
                </button>
              </div>
            </div>
            <p className="apt-question-text">{q.question}</p>
          </div>


          <div className="apt-options">
            {q.options.map((opt, i) => (
              <button
                key={i}
                className={`apt-option ${answers[currentQ] === i ? "apt-option-selected" : ""}`}
                onClick={() => selectAnswer(i)}
              >
                <span
                  className={`apt-opt-label ${answers[currentQ] === i ? "apt-opt-label-active" : ""}`}
                >
                  {OPT_LABELS[i]}
                </span>
                <span className="apt-opt-text">{opt}</span>
                {answers[currentQ] === i && <span className="apt-check">✓</span>}
              </button>
            ))}
          </div>


          <div className="apt-nav">
            <button
              className="apt-btn-prev"
              onClick={() => goToQuestion(currentQ - 1)}
              disabled={currentQ === 0}
            >
              ← Previous
            </button>
            <div className="apt-nav-center">
              <span className="apt-answered-info">
                {answeredCount}/{questions.length} answered
              </span>
            </div>
            {currentQ < questions.length - 1 ? (
              <button className="apt-btn-next" onClick={() => goToQuestion(currentQ + 1)}>
                Next →
              </button>
            ) : (
              <button className="apt-btn-submit" onClick={() => setShowConfirm(true)}>
                Submit Test ✓
              </button>
            )}
          </div>
        </main>


        <aside className="apt-sidebar">
          <div className="apt-sidebar-section">
            <div className="apt-sidebar-title-row">
              <h3 className="apt-sidebar-title">Question Map</h3>
              <span className="apt-total-chip">{questions.length} Total</span>
            </div>
            <div className="apt-qmap">
              {questions.map((_, i) => (
                <button
                  key={i}
                  className={`apt-qmap-btn apt-qmap-${getStatus(i)} ${
                    i === currentQ ? "apt-qmap-current" : ""
                  }`}
                  onClick={() => goToQuestion(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="apt-legend">
            <div className="apt-legend-item">
              <span className="apt-dot apt-dot-answered" />
              Answered ({answeredCount})
            </div>
            <div className="apt-legend-item">
              <span className="apt-dot apt-dot-flagged" />
              Flagged ({Object.values(flagged).filter(Boolean).length})
            </div>
            <div className="apt-legend-item">
              <span className="apt-dot apt-dot-unanswered" />
              Unanswered ({questions.length - answeredCount})
            </div>
          </div>

          <div className="apt-stats-card">
            <div className="apt-stat-row">
              <span className="apt-stat-label">Progress</span>
              <span className="apt-stat-val">
                {Math.round((answeredCount / questions.length) * 100)}%
              </span>
            </div>
            <div className="apt-mini-progress">
              <div
                className="apt-mini-fill"
                style={{ width: `${(answeredCount / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="apt-tip-card">
            <div className="apt-tip-title">💡 Quick Tip</div>
            <p className="apt-tip-body">
              Flag tricky questions and revisit them before submitting. You can clear your answer
              and re-select anytime.
            </p>
          </div>

          <button className="apt-btn-submit-side" onClick={() => setShowConfirm(true)}>
            Submit Test
          </button>
        </aside>
      </div>
    </div>
  );
}