import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Time from './pages/Time';
import Bank from './pages/Bank';
import { Mind, MindHome } from './pages/Mind';
import Dash from './pages/Dash';
import DesignSystem from './pages/DesignSystem';
import TreePage from './features/trees/components/TreePage';

function App() {
  return (
    <Router>
      <div id="app-wrapper">
        <Nav />
        <main>
          <Routes>
            <Route path="/dash" element={<Dash />}>
              {/* <Route path="*" element={<DashNotFound/>}/> */}
            </Route>

            <Route path="/bank" element={<Bank />}>
              {/* <Route path="*" element={<BankNotFound/>}/> */}
            </Route>

            <Route path="/time" element={<Time />}>
              {/* <Route path="*" element={<TimeNotFound/>}/> */}
            </Route>

            <Route path="/mind" element={<Mind />}>
              <Route index element={<MindHome />} />
              <Route path='tree' element={<TreePage />} />
            </Route>

            <Route path="/designsystem" element={<DesignSystem />} />
            
            <Route path="*" element={<Dash />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
