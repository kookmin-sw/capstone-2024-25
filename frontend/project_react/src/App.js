import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComponentTest from './pages/ComponentTest';
function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ComponentTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
