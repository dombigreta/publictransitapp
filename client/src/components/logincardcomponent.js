import React from 'react';
import logo from '../resources/miskolc-logo.svg';


class LoginCardComponent extends React.Component{

  state = {
    username:'',
    password:''
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('accessToken');
    if(accessToken){
      localStorage.removeItem('accessToken');
    }
  }

  handleLogin = () => {
      let loginInfo = {
        username:this.state.username,
        password:this.state.password
      }

      fetch('/account/loginWithPassword',
      {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(loginInfo)
      }).then((response) => {
        if(response.status >= 200 && response.status < 300){
          return response.json();
        }
        else{
          let error = response.statusText;
          throw error;
        }
      })
      .then((data) => {
        localStorage.setItem('accessToken', data.user.token);
      });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter' || e.key === 13){
      this.handleLogin();
    }
  } 

  handleInputChange = (e) => {
    let label = e.target.name;
    let value = e.target.value;
    this.setState({[label]:value});
  }

    render(){
      return(
        <div className="login-card">

            <div className="login-card-inner">
                <img src={logo} className="login-card-logo"/>
                <div className="login-card-title">
                </div>
                <div>
                    <div>
                        <input  name="username" 
                                className="login-card-input" 
                                placeholder="username"
                                onChange={this.handleInputChange}
                                onKeyPress={this.handleKeyPress}/>
                    </div>
                    <div>
                    <input name="password" 
                            className="login-card-input"
                            placeholder="password"
                            onChange={this.handleInputChange}
                            onKeyPress={this.handleKeyPress}
                            type="password"/>
                    </div>
                </div>
                <div>
                <button onClick={this.handleLogin} className="login-card-btn">click to login</button>
                </div>
                <div>
                Don't have an account? <b>sign up</b>
                </div>
                </div>
        </div>
      )
    }
}

export default LoginCardComponent;