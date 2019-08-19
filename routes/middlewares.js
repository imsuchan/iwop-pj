exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next()
    } else {
        res.status(403).set('need to login')
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/')
    }
}
