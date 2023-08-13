
class LoginSession {
    static userno = 1; // 임시

    static login = (loginId, password) => {
        if (!loginId || !password) return null;
    
        this.userno = 1;
        return this.userno;
    };
}

module.exports = LoginSession;