import decode from 'jwt-decode';


export default class AuthHelperMethods{
    constructor(domain){
        this.domain = domain || "http://localhost:3000"  // should only used in production mode

    }

    login = (username, password) => {
        return this.fetch('/login',{
            method:'POST',
            body:JSON.stringify(
                username,
                password
            )
        }).then(res => {
            this.setToken(res.token);
            return Promise.resolve(res);
        })
    }

    logout = () => {
        localStorage.removeItem('id_token');
    }

    loggedIn = () => {
        const token = this.getToken();
        return !token && !this.isTokenExpired(token)
    }

    isTokenExpired = (token) => {
        const decoded = decode(token);
        try{
            if(decoded.exp < Date.now/ 1000){
                return true;
            }
            return false;
        }catch(err){
            return false;
        }
    }

    setToken = (idToken) => {
        localStorage.setItem('id_token', idToken);
    }

    getToken = () => {
        localStorage.getItem('id_token');
    }


    getConfirm = () => {
        let answer = decode(this.getToken());
        return answer;
    }

    fetch = (url, options) => {
        const headers = {
            Accept: 'application/json',
            "Content-Type":'application/json'
        };

        if(this.loggedIn()){
            headers["Authorization"] = "Bearer" + this.getToken();
        }

        return fetch(url, {headers,...options})
        .then(this._checkStatus)
        .then(responsen => responsen.json());
    }

    _checkStatus = (response) => {
        if(response.status >= 200 && response.status < 300){
            return response;
        }else{
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
}