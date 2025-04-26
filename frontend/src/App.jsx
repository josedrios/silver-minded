import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Time from "./pages/Time";
import Bank from "./pages/Bank";
import Mind from "./pages/Mind";
import Dash from "./pages/Dash";
import DesignSystem from "./pages/DesignSystem";

function App() {
  return (
    <Router>
      <div id="app-wrapper">
        <Nav />
        <main>
          <Routes>
            <Route path="/dash" element={<Dash />} />
            <Route path="/bank" element={<Bank />} />
            <Route path="/time" element={<Time />} />
            <Route path="/mind" element={<Mind />} />
            <Route path="/designsystem" element={<DesignSystem />} />
            <Route path="*" element={<Dash />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
