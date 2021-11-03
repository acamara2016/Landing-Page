const User = require('../models/User')
const Url = require('../models/Url')
exports.getDashboard = (req, res, next)=>{
    var ip = req.ip;
    console.log(ip);
    const id = req.session.user._id.toString()
    Url.find({by:id}).then(urls=>{
        res.render('admin/pages/links',{
            pageTitle: 'Links',
            path: '/dashboard',
            domain: 'http://localhost:3000',
            urls: urls,
            user: req.session.user
        })
    })
}

exports.getLinks = (req, res, next) => {
    var ip = req.ip;
    console.log(ip);
    const id = req.session.user._id.toString()
    Url.find({by:id}).then(urls=>{
        res.render('admin/pages/links',{
            pageTitle: 'Links',
            path: '/links',
            domain: 'http://localhost:3000',
            urls: urls,
            user: req.session.user
        })
    })
}