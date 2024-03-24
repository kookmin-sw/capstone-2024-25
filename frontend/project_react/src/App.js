import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComponentTest from './pages/ComponentTest';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Test from './pages/Test';
import Nav1 from './pages/Nav1';
import IntroCrossWord from './pages/games/crossWord/IntroCrossWord';
import IntroWordOrder from './pages/games/wordOrder/IntroWordOrder';
import IntroTwentyHeads from './pages/games/twentyHeads/IntroTwentyHeads';


function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<ComponentTest />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/game" element={<Nav1 />} />
          <Route path="/game/crossWord" element={<IntroCrossWord />} />
          <Route path="/game/wordOrder" element={<IntroWordOrder />} />
          <Route path="/game/twentyHeads" element={<IntroTwentyHeads />} />
          <Route path="/ttt" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
