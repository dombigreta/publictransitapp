import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import LoginCardComponent from './components/logincardcomponent';
import  WithAuth from './components/withauth';
import AuthHelperMethods from './components/customobjects/authhelpermethods';

function App() {

  return (
    <React.Fragment>
    <LoginCardComponent/>
    <div className="video-background">
      <video autoPlay loop muted>
        <source src={require('./resources/firstvideo.mp4')} type="video/mp4"/>
      </video>
    </div>
    </React.Fragment>
  );
}

export default WithAuth(App);
