const User = require('../models/User')

exports.getDashboard = (req, res, next)=>{
    console.log(req);
    res.render('admin/pages/index',{
        pageTitle: 'Dashboard'
    })
}