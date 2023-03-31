import {Create} from "./Create1";
import {  BrowserRouter, Route, Routes} from "react-router-dom";
import { Component } from "react";
import { Safe } from "./Safe";
import reskro from "./Landing";




const App = ()=> {
 

  return (
    <>
     <BrowserRouter>
     <Routes>
        <Route path="/" Component={reskro} />
        <Route path="/create" Component={Create} />
        <Route path="/acount/:id" Component={Safe}/>
</Routes>
    </BrowserRouter>
    </>
  )

}

export default App;