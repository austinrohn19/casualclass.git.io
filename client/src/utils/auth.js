class AuthService {
    
    login(userToken) {
        localStorage.setItem('id_token', userToken);
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }

}

export default new AuthService();
