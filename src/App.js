import './App.scss';
import React, { useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory} from "react-router-dom";
import Main from "./pages/Main";
import Header from './pages/header';
import Landing from './pages/LandingPage';

function PrivateRoute(props){
  const history = useHistory()
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token === 'undefined'){
      history.push("/")
    }
  },[])
  return(
    <Route  {...props}></Route>
  )
}

export default function App() {

  return (
    <Router>
      <div className="App">       
        <Header/>
        <Switch>
          <Route exact path="/" component={Landing} />
          <PrivateRoute exact path="/main" component={Main} />
          <Redirect from="*" to="/main" />
        </Switch>      
      </div>
    </Router>
  );
}