import React from 'react';
import logo from '../resources/miskolc-logo.svg';


class RegistrateComponent extends React.Component{

    state = {
        username: '',
        password:'',
        passwordConfirm:'',
        email:'',
        errors:{
            password:'',
            passwordConfirm:'',
            email:'',
            username:''
        }
    }
    
    emailRegex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

    handleInputChange = (e) => {
        const {name, value} = e.target;
        const {errors} = this.state;
        errors[name] = '';
        this.setState({[name]:value, errors:errors});
    }

    validateForm = () => {
        let rawErrors = {
            username:'',
            email:'',
            password:'',
            passwordConfirm:''
        };

        let isValid = true;

        if(this.state.username.length < 5 || this.state.username.trim() === ''){
           rawErrors.username = 'username must be at least 5 character long';
           isValid = false;
        } 
        if(this.state.password.length < 8 || this.state.password.trim() === ''){
            rawErrors.password = 'password must be at least 8 character long';
            isValid = false;
        }

        if(this.state.passwordConfirm !== this.state.password ){
             rawErrors.passwordConfirm = 'passwords must be the same';
             isValid = false;
        }
        if(this.state.email.length == 0 || this.state.email === '' ||!this.emailRegex.test(this.state.email)){
            rawErrors.email = 'invalid email format!';
            isValid = false;
        }
        this.setState({errors:rawErrors});
        return isValid;
    }

    handleSubmit = () => {

        if(!this.validateForm()) return;
        let registrateInfo = {
            username:this.state.username,
            password:this.state.password,
            email:this.state.email
        }

        fetch('/account/createUser',
        {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(registrateInfo)
        }).then((response) => response.json())
        .then((data) => console.log(data));
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
                                onChange={this.handleInputChange}/>
                        <div>{this.state.errors['username']}</div>
                    </div>
                    <div>
                    <input name="password" 
                            className="login-card-input"
                            placeholder="password"
                            onChange={this.handleInputChange}
                            type="password"/>
                        <div>{this.state.errors['password']}</div>
                    </div>
                    <div>
                        <input  name="passwordConfirm" 
                                className="login-card-input" 
                                placeholder="confirm your password"
                                onChange={this.handleInputChange}
                                type="password"/>
                        <div>{this.state.errors['passwordConfirm']}</div>
                    </div>
                    <div>
                        <input  name="email" 
                                className="login-card-input" 
                                placeholder="email"
                                onChange={this.handleInputChange}/>
                        <div>{this.state.errors['email']}</div>
                    </div>
                </div>
                <div>
                <button onClick={this.handleSubmit} className="login-card-btn">submit</button>
                </div>
                <div className="text-center"> Already a member? <span onClick={this.props.changeView}>Log in</span>
                </div>
                </div>
        </div>
        )
    }

}

export default RegistrateComponent;