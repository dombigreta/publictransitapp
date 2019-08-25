import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import LoginCardComponent from './components/logincard.component';
import RegistrateComponent from './components/registratecard.component';

class App extends React.Component {
  state = {
    isLoginPage:true
  }

  render(){
    return (
      <React.Fragment>
     {this.state.isLoginPage ?  <LoginCardComponent changeView={() => this.setState({isLoginPage:false})}/>  
                              : <RegistrateComponent changeView={() => this.setState({isLoginPage:true})}/>}
      <div className="video-background">
        <video autoPlay loop muted>
          <source src={require('./resources/firstvideo.mp4')} type="video/mp4"/>
        </video>
      </div>
      </React.Fragment>
    );
  }
}

export default App;
