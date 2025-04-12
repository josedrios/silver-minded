import Nav from "./components/layout/Nav";
import Calendar from "./components/pages/Calendar";
import Todo from "./components/pages/Todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {  

  return (
    <Router>
      <div id="app-wrapper">
        <Nav />
        <main>
        <Routes>
          <Route path="/todo" element={<Todo />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/" element={<Todo />} />
          <Route path="*" element={<Todo />} />
        </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
