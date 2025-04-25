import Nav from "./components/layout/Nav";
import Calendar from "./components/pages/Calendar";
import Todo from "./components/pages/Todo";
import Finances from "./components/pages/Finances";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mind from "./components/pages/Mind";
import DesignSystem from "./components/pages/DesignSystem";


function App() {
  return (
    <Router>
      <div id="app-wrapper">
        <Nav />
        <main>
          <Routes>
            <Route path="/todo" element={<Todo />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/finances" element={<Finances />} />
            <Route path="/mind" element={<Mind />} />
            <Route path="/designsystem" element={<DesignSystem />} />
            <Route path="*" element={<Todo />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
