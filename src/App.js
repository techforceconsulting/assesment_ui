import './App.css';
import CodeEditor from './components/Editor/CodeEditor';
import Home from './components/Home/home';
import Aptitude from './components/Aptitude/Aptitude';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<CodeEditor />} />
        <Route path="/aptitude" element={<Aptitude />} />
      </Routes>
    </Router>
  );
}

export default App;