const User = require("../model/user");

const login = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username});
  if(user){
    if(user.password === req.body.password){
      req.session.username = username;
      res.redirect("/");
    }else{
        req.flash("msg", "Password is incorrect");
        res.redirect("/");
    }
  }
  else{
    req.flash("msg", "User not Found");
    res.redirect("/");
  } 
};

const register = async (req, res, next) => {
    User.insertMany(req.body, (error,result)=>{
        req.flash("msg", "User Registered");
      res.redirect("/");
    });
  };
const logout = (req, res, next) => {
    req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });
  }
module.exports = {login,register, logout};