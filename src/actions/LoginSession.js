
class LoginSession {
    static getUsernoFromSession = (req) => {
        return req.session.userno || null;
    };

    static login = (loginId, password) => {
        if (!loginId || !password) return null;

        console.log('Userno in session:', req.session.userno);

        return req.session.userno;
    };
}

module.exports = LoginSession;