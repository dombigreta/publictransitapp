import React from 'react';
import AuthHelperMethods from './customobjects/authhelpermethods';


export default function withAuth(AuthComponent){
const Auth = new AuthHelperMethods();
    
    return class AuthWrapped extends React.Component{
        state = {
            confirm:false,
            loaded:false
        }
        componentDidMount(){
            //if not logged in
            if(!Auth.loggedIn()){
                this.props.history.replace('/login'); // should be redirected to the login page
            }
            else{
                try{
                    const confirm = Auth.getConfirm();
                    this.setState({
                        confirm:confirm,
                        loaded:true
                    })
                }catch(err){
                    Auth.logout();
                    this.props.history.replace('/login');
                }
            }

        }
        
        render(){
            if(this.state.loaded){
                if(this.state.confirm){
                    return <AuthComponent history={this.props.history} confirm={this.state.confirm}/>
                }
                else{
                    return null;
                }
            }else{
                return null;
            }
           
        }
    }
}