import Header from './components/Header';
import './App.css';
import React from "react"
import {useAppState} from './store'
import LoginPage from './components/Login/LoginPage';
import MainPage from './components/MainPage';
import Groups from './components/Groups/Groups';
import Tests from './components/TestsComponents/Tests';

function App() {
  const curPage = useAppState().getCurPage();
  return (
    <div className="App">
      <Header></Header>
      {curPage==="main" && <MainPage/>}
      {curPage==="login" && <LoginPage/>}
      {curPage==="groups" && <Groups/>}
      {curPage==="tests" && <Tests/>}
    </div>
  );
}

export default App;
