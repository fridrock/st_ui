import Header from './components/Header';
import './App.css';
import React from "react"
import {useAppState} from './store'
import LoginPage from './components/Login/LoginPage';
import MainPage from './components/MainPage';
import Groups from './components/Groups/Groups';
import Tests from './components/TestsComponents/Tests';
import MyTests from './components/TestsComponents/MyTests';
import MyResults from './components/results/MyResults';

function App() {
  const curPage = useAppState().getCurPage();
  return (
    <div className="App">
      <Header></Header>
      {curPage==="main" && <MainPage/>}
      {curPage==="login" && <LoginPage/>}
      {curPage==="groups" && <Groups/>}
      {curPage==="tests" && <Tests/>}
      {curPage==="mytests" && <MyTests/>}
      {curPage==="myresults" && <MyResults/>}
    </div>
  );
}

export default App;
