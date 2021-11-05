import decode from 'jwt-decode'

class AuthService {

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (error) {
            return false
        }
    }
    
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
