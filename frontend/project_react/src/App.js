// App.js
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComponentTest from './pages/ComponentTest';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Test from './pages/Test';
import Nav1 from './pages/Nav1';
import Nav4 from './pages/Nav4';
import Nav5 from './pages/Nav5';
import WordOrderSelection from './pages/games/wordOrder/1st_WordOrderSelection';
import CrossWordIntro from './pages/games/crossWord/1st_CrossWordIntro';
import WordOrderIntro from './pages/games/wordOrder/2nd_WordOrderIntro';
import TwentyHeadsIntro from './pages/games/twentyHeads/1st_TwentyHeadsIntro';
import WordOrderGame from './pages/games/wordOrder/3rd_WordOrderGame';
import Chatbot from './pages/Chatbot';
import JobPage from './pages/JobPage';
import JobDetailPage from './pages/JobDetail';
import JobDetailPage2 from './pages/JobDetail2';
import MyPage from './pages/MyPage';
import LoadingPage from './pages/LoadingPage';
import './fonts/Font.css';
import { createGlobalStyle } from 'styled-components';
import TwentyHeadsGame from './pages/games/twentyHeads/2nd_TwentyHeadsGame';
import CrossWordGame from './pages/games/crossWord/2nd_CrossWordGame';

function App() {
  return (
    <div id="App">
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/job" element={<JobPage />} />
          <Route path="/job-detail/:jobId" element={<JobDetailPage />} />
          <Route path="/job-detail2" element={<JobDetailPage2 />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/loading" element={<LoadingPage />} />

          <Route path="/test" element={<ComponentTest />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/auth/*" element={<LoadingPage />} />
          <Route path="/ttt" element={<Test />} />

          <Route path="/map" element={<Nav5 />} />

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
          <Route path="/game/crossWordGame" element={<CrossWordGame />} />
          <Route path="/game/twentyHeadsIntro" element={<TwentyHeadsIntro />} />
          <Route path="/game/wordOrderGame" element={<TwentyHeadsGame />} />

          {/* To do */}
          <Route path="/toDo" element={<Nav4 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Pretendard', sans-serif;
  }
`;
