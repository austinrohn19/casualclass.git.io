class AuthService {
    
    login(userToken) {
        localStorage.setItem('id_token', userToken);
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }

    isLoggedIn() {
        return localStorage.getItem('id_token') ? true : false;
    }
}

export default new AuthService();
