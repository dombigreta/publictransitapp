import React from 'react';
import logo from '../resources/miskolc-logo.svg';
import axios from 'axios';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';



class LoginCardComponent extends React.Component{

  constructor(props){
    super(props);
  }

  state = {
    username:'',
    password:'',
    passwordFieldType:'password',
    errors:{
      username:'',
      password:''
    },
    formError:''
  }



  componentDidMount(){
    let accessToken = localStorage.getItem('accessToken');
    if(accessToken){
      localStorage.removeItem('accessToken');
    }
  }

  validateForm = () => {
    let errors = {
      username:'',
      password:''
    };

    let isValid = true;

    for(let key of Object.keys(errors)){
      if(this.state.hasOwnProperty(key)){
        if(this.state[key].length == 0 || this.state[key].trim() == ''){
          errors[key] = `${key} must be filled!`;
          isValid = false;
        }
      }
    }
    this.setState({errors:errors});
    return isValid;
  }

  handleSubmit = () => {
     if(!this.validateForm()) return;
      let loginInfo = {
        username:this.state.username,
        password:this.state.password
      }

      axios.post('/account/loginWithPassword', loginInfo).then((response) => {
        const { user } = response.data;
        localStorage.setItem('accessToken',user.token);
      })
      .catch((err) => {
        const { error } = err.response.data;
        this.setState({formError:error});
      });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter' || e.key === 13){
      this.handleSubmit();
    }
  } 

  handleInputChange = (e) => {
    const {name, value} = e.target;
    const {errors} = this.state;
    errors[name] = '';
    this.setState({[name]:value, errors:errors, formError:''});
  }

  toggleShowPassword = () => {
   let type = this.state.passwordFieldType;
   switch(type){
     case 'password':{
       this.setState({passwordFieldType:'text'});
     }
     break;
     case 'text':{
       this.setState({passwordFieldType:'password'});
     }
     break;
   }
  }

    render(){
      return(
        <div className="login-card">
                <ReactCssTransitionGroup
                    transitionName="toggle"
                    transitionEnterTimeout={400}
                    transitionLeaveTimeout={400}>
                      {this.state.formError.length == 0 ? null : <div className="from-error-container">{this.state.formError}</div> }
                </ReactCssTransitionGroup>
            <div className="login-card-inner">
                <img src={logo} className="login-card-logo"/>
                <div className="login-card-title">
                </div>
                <div>
                    <div className="login-card-input-container">
                        <input  name="username" 
                                className="login-card-input form-control" 
                                placeholder="username"
                                autoComplete="new-password"
                                type="text"
                                onChange={this.handleInputChange}
                                onKeyPress={this.handleKeyPress}/>
                      <span>{this.state.errors['username']}</span>
                    </div>
                    <div className="login-card-input-container">
                      <div className="input-container">
                      <input name="password" 
                              className="login-card-input form-control"
                              placeholder="password"
                              onChange={this.handleInputChange}
                              onKeyPress={this.handleKeyPress}
                              type={this.state.passwordFieldType}/>

                        <span onClick={this.toggleShowPassword} 
                              className={`login-card-input-show-pswd-icon fa ${this.state.passwordFieldType == 'password' ? 'fa-eye': 'fa-eye-slash'}`}>
                        </span>
                      </div>
                      <span>{this.state.errors['password']}</span>
                    </div>
                </div>
                <div>
                <button onClick={this.handleSubmit}  className="login-card-btn">login</button>
                <div className="text-center">Don't have an account? <span className="strong" onClick={this.props.changeView}>Sign up!</span></div>
                </div>
                </div>
        </div>
      )
    }
}

export default LoginCardComponent;