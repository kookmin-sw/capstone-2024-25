import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider defaultSetOptions={{ path: '/' }}>
    {/* 쿠키 전역 사용을 위한 컨텍스트 제공.
    - 매번 새로운 쿠키 객체를 생성하지 않고 CookiesProvider가 제공하는 컨텍스트를 활용하여 쿠키 접근
    - 페이지 이동이나 새로고침을 해도 쿠키객체가 유지됨. */}
    <App />
  </CookiesProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
