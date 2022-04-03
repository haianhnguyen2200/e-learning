class authController {
    // [GET] /auth/login
    login(req, res) {
        res.render('auth/login');
    }

    // [GET] /auth/register
    register(req, res) {
        res.render('auth/register');
    }
}

module.exports = new authController();
