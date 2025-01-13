import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Home, LoginPage} from "./Routes/routes"
import "./App.css" 

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/login" element = {<LoginPage/>}></Route>
      <Route path ="/" element = {<Home/>}></Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App