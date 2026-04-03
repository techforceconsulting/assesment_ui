import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const CATEGORY_OPTIONS = [
  { value: "Quantitative Aptitude", icon: "🧮", color: "#f687b3" },
  { value: "Logical Reasoning", icon: "🧩", color: "#b794f4" },
  { value: "Verbal Ability", icon: "📝", color: "#63b3ed" },
  { value: "Data Interpretation", icon: "📊", color: "#48bb78" },
  { value: "Abstract Reasoning", icon: "🔮", color: "#f6ad55" },
  { value: "Critical Thinking", icon: "💡", color: "#fc8181" },
];

const DIFFICULTY_OPTIONS = ["easy", "medium", "hard"];

const emptyQuestion = {
  question: "",
  options: ["", "", "", ""],
  correct: 0,
  difficulty: "medium",
  explanation: "",
  category: CATEGORY_OPTIONS[0].value,
};

export default function Admin() {
  const navigate = useNavigate();

  const [screen, setScreen] = useState("dashboard");
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({ ...emptyQuestion });
  const [editIndex, setEditIndex] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("admin_questions");
    if (saved) {
      setQuestions(JSON.parse(saved));
    }
    setTimeout(() => setAnimateIn(true), 50);
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      localStorage.setItem("admin_questions", JSON.stringify(questions));
    }
  }, [questions]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleOptionChange = (index, value) => {
    const newOpts = [...formData.options];
    newOpts[index] = value;
    setFormData({ ...formData, options: newOpts });
  };

  const validateForm = () => {
    if (!formData.question.trim()) {
      showToast("Question text is required", "error");
      return false;
    }
    if (formData.options.some((opt) => !opt.trim())) {
      showToast("All 4 options are required", "error");
      return false;
    }
    if (!formData.explanation.trim()) {
      showToast("Explanation is required", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editIndex !== null) {
      const updated = [...questions];
      updated[editIndex] = { ...formData, id: updated[editIndex].id };
      setQuestions(updated);
      showToast("Question updated successfully");
      setEditIndex(null);
    } else {
      const newQ = { ...formData, id: Date.now() };
      setQuestions([...questions, newQ]);
      showToast("Question added successfully");
    }
    setFormData({ ...emptyQuestion });
    setScreen("dashboard");
  };

  const handleEdit = (index) => {
    setFormData({ ...questions[index] });
    setEditIndex(index);
    setScreen("form");
  };

  const handleDelete = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
    localStorage.setItem("admin_questions", JSON.stringify(updated));
    setDeleteConfirm(null);
    showToast("Question deleted");
  };

  const openAddForm = () => {
    setFormData({ ...emptyQuestion });
    setEditIndex(null);
    setScreen("form");
  };

  const filteredQuestions = questions.filter((q) => {
    const matchCat = filterCategory === "All" || q.category === filterCategory;
    const matchDiff = filterDifficulty === "All" || q.difficulty === filterDifficulty;
    const matchSearch =
      !searchQuery ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchDiff && matchSearch;
  });

  const getCategoryMeta = (catName) =>
    CATEGORY_OPTIONS.find((c) => c.value === catName) || CATEGORY_OPTIONS[0];

  const statsByCategory = CATEGORY_OPTIONS.map((cat) => ({
    ...cat,
    count: questions.filter((q) => q.category === cat.value).length,
  }));

  const statsByDifficulty = {
    easy: questions.filter((q) => q.difficulty === "easy").length,
    medium: questions.filter((q) => q.difficulty === "medium").length,
    hard: questions.filter((q) => q.difficulty === "hard").length,
  };

  if (screen === "form") {
    const catMeta = getCategoryMeta(formData.category);
    return (
      <div className="adm-root">
        <div className="adm-particles">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="adm-particle"
              style={{ "--delay": `${i * 0.5}s`, "--x": `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        <header className="adm-top-bar">
          <div className="adm-brand" onClick={() => navigate("/admin")} style={{ cursor: "pointer" }}>
            <span className="adm-brand-icon">⚙</span>
            <span className="adm-brand-name">AdminPanel</span>
          </div>
          <div className="adm-header-badge" style={{ "--ac": catMeta.color }}>
            {editIndex !== null ? "Edit Question" : "New Question"}
          </div>
          <button className="adm-btn-back" onClick={() => { setScreen("dashboard"); setEditIndex(null); }}>
            ← Back
          </button>
        </header>

        <main className="adm-form-main">
          <div className="adm-form-card">
            <div className="adm-form-card-glow" />

            <div className="adm-form-header">
              <h2 className="adm-form-title">
                {editIndex !== null ? "Edit Question" : "Add New Question"}
              </h2>
              <p className="adm-form-sub">Fill in all fields to create an assessment question</p>
            </div>

            <div className="adm-form-grid">
              <div className="adm-field-group adm-field-full">
                <label className="adm-label">Category</label>
                <div className="adm-select-wrap">
                  <select
                    className="adm-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.value}
                      </option>
                    ))}
                  </select>
                  <span className="adm-select-arrow">▾</span>
                </div>
              </div>

              <div className="adm-field-group adm-field-full">
                <label className="adm-label">Difficulty</label>
                <div className="adm-diff-selector">
                  {DIFFICULTY_OPTIONS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`adm-diff-btn adm-diff-${d} ${formData.difficulty === d ? "adm-diff-active" : ""}`}
                      onClick={() => setFormData({ ...formData, difficulty: d })}
                    >
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="adm-field-group adm-field-full">
                <label className="adm-label">Question Text</label>
                <textarea
                  className="adm-textarea"
                  rows="3"
                  placeholder="Enter the question..."
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                />
              </div>

              {formData.options.map((opt, i) => (
                <div key={i} className="adm-field-group adm-field-half">
                  <label className="adm-label">
                    Option {String.fromCharCode(65 + i)}
                    {formData.correct === i && <span className="adm-correct-tag">Correct</span>}
                  </label>
                  <div className="adm-option-input-wrap">
                    <input
                      type="text"
                      className="adm-input"
                      placeholder={`Enter option ${String.fromCharCode(65 + i)}`}
                      value={opt}
                      onChange={(e) => handleOptionChange(i, e.target.value)}
                    />
                    <button
                      type="button"
                      className={`adm-mark-correct ${formData.correct === i ? "adm-marked" : ""}`}
                      onClick={() => setFormData({ ...formData, correct: i })}
                      title="Mark as correct answer"
                    >
                      {formData.correct === i ? "✓" : "○"}
                    </button>
                  </div>
                </div>
              ))}

              <div className="adm-field-group adm-field-full">
                <label className="adm-label">Explanation</label>
                <textarea
                  className="adm-textarea"
                  rows="2"
                  placeholder="Explain why the correct answer is right..."
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                />
              </div>
            </div>

            <div className="adm-form-actions">
              <button className="adm-btn-cancel" onClick={() => { setScreen("dashboard"); setEditIndex(null); }}>
                Cancel
              </button>
              <button className="adm-btn-save" onClick={handleSubmit}>
                {editIndex !== null ? "Update Question" : "Add Question"} →
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="adm-root">
      <div className="adm-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="adm-particle"
            style={{ "--delay": `${i * 0.4}s`, "--x": `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {toast && (
        <div className={`adm-toast adm-toast-${toast.type}`}>
          <span>{toast.type === "success" ? "✓" : "✕"}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {deleteConfirm !== null && (
        <div className="adm-overlay">
          <div className="adm-confirm-card">
            <div className="adm-confirm-icon">🗑</div>
            <h3 className="adm-confirm-title">Delete Question?</h3>
            <p className="adm-confirm-text">This action cannot be undone.</p>
            <div className="adm-confirm-actions">
              <button className="adm-btn-cancel" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="adm-btn-delete" onClick={() => handleDelete(deleteConfirm)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="adm-top-bar">
        <div className="adm-brand" onClick={() => navigate("/admin")} style={{ cursor: "pointer" }}>
          <span className="adm-brand-icon">⚙</span>
          <span className="adm-brand-name">AdminPanel</span>
        </div>
        <div className="adm-header-meta">
          <div className="adm-meta-chip">
            <span>📦</span>
            <span>{questions.length} Questions</span>
          </div>
          <div className="adm-meta-chip">
            <span>📂</span>
            <span>{CATEGORY_OPTIONS.length} Categories</span>
          </div>
        </div>
        <div className="adm-user-chip">
          <div className="adm-avatar">A</div>
          <div>
            <div className="adm-uname">Admin</div>
            <div className="adm-uid">ADMIN_001</div>
          </div>
        </div>
      </header>

      <main className={`adm-main ${animateIn ? "adm-animate-in" : ""}`}>
        <div className="adm-hero">
          <div className="adm-hero-badge">Admin Dashboard</div>
          <h1 className="adm-hero-title">
            Question <span className="adm-gradient-text">Management</span>
          </h1>
          <p className="adm-hero-sub">Add, edit and manage assessment questions for all categories</p>
        </div>

        <div className="adm-stats-row">
          <div className="adm-stat-card adm-stat-total">
            <span className="adm-stat-icon">📋</span>
            <div>
              <span className="adm-stat-value">{questions.length}</span>
              <span className="adm-stat-label">Total Questions</span>
            </div>
          </div>
          {Object.entries(statsByDifficulty).map(([diff, count]) => (
            <div key={diff} className={`adm-stat-card adm-stat-${diff}`}>
              <span className="adm-stat-icon">
                {diff === "easy" ? "🟢" : diff === "medium" ? "🟡" : "🔴"}
              </span>
              <div>
                <span className="adm-stat-value">{count}</span>
                <span className="adm-stat-label">{diff.charAt(0).toUpperCase() + diff.slice(1)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="adm-cat-chips">
          {statsByCategory.map((cat) => (
            <div
              key={cat.value}
              className="adm-cat-chip"
              style={{ "--ac": cat.color }}
            >
              <span>{cat.icon}</span>
              <span>{cat.value}</span>
              <span className="adm-cat-chip-count">{cat.count}</span>
            </div>
          ))}
        </div>

        <div className="adm-toolbar">
          <div className="adm-search-bar">
            <span className="adm-search-icon">🔍</span>
            <input
              type="text"
              className="adm-search-input"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="adm-search-clear" onClick={() => setSearchQuery("")}>
                ✕
              </button>
            )}
          </div>

          <div className="adm-filters">
            <div className="adm-filter-select-wrap">
              <select
                className="adm-filter-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.value}</option>
                ))}
              </select>
              <span className="adm-filter-arrow">▾</span>
            </div>

            <div className="adm-filter-select-wrap">
              <select
                className="adm-filter-select"
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
              >
                <option value="All">All Difficulty</option>
                {DIFFICULTY_OPTIONS.map((d) => (
                  <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                ))}
              </select>
              <span className="adm-filter-arrow">▾</span>
            </div>
          </div>

          <button className="adm-btn-add" onClick={openAddForm}>
            + Add Question
          </button>
        </div>

        <div className="adm-questions-list">
          {filteredQuestions.length === 0 ? (
            <div className="adm-empty">
              <span className="adm-empty-icon">{questions.length === 0 ? "📭" : "🔎"}</span>
              <h3>{questions.length === 0 ? "No questions yet" : "No matching questions"}</h3>
              <p>{questions.length === 0 ? "Start by adding your first question" : "Try adjusting your filters"}</p>
              {questions.length === 0 && (
                <button className="adm-btn-add adm-btn-add-empty" onClick={openAddForm}>
                  + Add First Question
                </button>
              )}
            </div>
          ) : (
            filteredQuestions.map((q, idx) => {
              const catMeta = getCategoryMeta(q.category);
              const realIndex = questions.findIndex((oq) => oq.id === q.id);
              return (
                <div key={q.id} className="adm-q-card" style={{ "--ac": catMeta.color }}>
                  <div className="adm-q-card-accent" />
                  <div className="adm-q-header">
                    <div className="adm-q-badges">
                      <span className="adm-q-cat-badge" style={{ "--ac": catMeta.color }}>
                        {catMeta.icon} {q.category}
                      </span>
                      <span className={`adm-q-diff-badge adm-q-diff-${q.difficulty}`}>
                        {q.difficulty}
                      </span>
                    </div>
                    <div className="adm-q-actions">
                      <button className="adm-q-edit-btn" onClick={() => handleEdit(realIndex)}>
                        ✏ Edit
                      </button>
                      <button className="adm-q-delete-btn" onClick={() => setDeleteConfirm(realIndex)}>
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                  <p className="adm-q-text">{q.question}</p>
                  <div className="adm-q-options">
                    {q.options.map((opt, oi) => (
                      <div
                        key={oi}
                        className={`adm-q-opt ${oi === q.correct ? "adm-q-opt-correct" : ""}`}
                      >
                        <span className="adm-q-opt-label">{String.fromCharCode(65 + oi)}</span>
                        <span>{opt}</span>
                        {oi === q.correct && <span className="adm-q-opt-check">✓</span>}
                      </div>
                    ))}
                  </div>
                  {q.explanation && (
                    <div className="adm-q-explanation">
                      <span>💡</span>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
