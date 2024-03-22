import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComponentTest from './pages/ComponentTest';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Test from './pages/Test';


function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<ComponentTest />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/ttt" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
