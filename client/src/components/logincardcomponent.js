import React from 'react';
import logo from '../resources/miskolc-logo.svg';


class LoginCardComponent extends React.Component{

    render(){
      return(
        <div className="login-card">

            <div className="login-card-inner">
                <img src={logo} className="login-card-logo"/>
                <div className="login-card-title">
                </div>
                <div>
                    <div>
                        <input className="login-card-input" placeholder="username"/>
                    </div>
                    <div>
                    <input className="login-card-input" placeholder="password" type="password"/>
                    </div>
                </div>
                <div>
                <button className="login-card-btn">click to login</button>
                </div>
                <div>
                Don't have an account <b>sign up</b>
                </div>
                </div>
        </div>
      )
    }
}

export default LoginCardComponent;