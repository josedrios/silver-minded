import Nav from "./components/layout/Nav";
import Home from "./components/pages/Home";
import Todo from "./components/pages/Todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div id="app-wrapper">
        <Nav />
        {/* Main tab */}
        <Routes>
          <Route path="/todo" element={<Todo />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
