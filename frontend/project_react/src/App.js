// App.js
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComponentTest from './pages/ComponentTest';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Test from './pages/Test';
import Nav1 from './pages/Nav1';
import WordOrderSelection from './pages/games/wordOrder/1st_WordOrderSelection';
import CrossWordIntro from './pages/games/crossWord/1st_CrossWordIntro';
import WordOrderIntro from './pages/games/wordOrder/2nd_WordOrderIntro';
import TwentyHeadsIntro from './pages/games/twentyHeads/1st_TwentyHeadsIntro';
import WordOrderGame from './pages/games/wordOrder/3rd_WordOrderGame';
import Chatbot from './pages/Chatbot';
import JobPage from './pages/JobPage';
import JobDetailPage from './pages/JobDetail';
function App() {
  return (
    <div id="App">
      <BrowserRouter>
        <Routes>
          {/*<Route path="/" element={<SignIn />} />*/}
          <Route path="/" element={<JobDetailPage />} />
          <Route path="/chatbot" element={<Chatbot />} />
          {/*<Route path="/job" element={<JobPage />} />*/}
          <Route path="/job-detail" element={<JobDetailPage />} />

          {/*<Route path="/" element={<InputTest />} />*/}
          <Route path="/test" element={<ComponentTest />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/auth/*" element={<SignUp />} />
          <Route path="/ttt" element={<Test />} />

          {/* 게임 페이지 */}
          <Route path="/game" element={<Nav1 />} />
          <Route
            path="/game/wordOrderSelection"
            element={<WordOrderSelection />}
          />
          <Route
            path="/game/wordOrderIntro/:category"
            element={<WordOrderIntro />}
          />
          <Route
            path="/game/wordOrderGame/:category"
            element={<WordOrderGame />}
          />
          <Route path="/game/crossWordIntro" element={<CrossWordIntro />} />
          <Route path="/game/twentyHeadsIntro" element={<TwentyHeadsIntro />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
