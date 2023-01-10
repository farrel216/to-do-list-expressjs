const User = require ("../model/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
    try {
    const user = await User.find();
    res.status(200).send({
        message: "Get user berhasil",
        data: user,
    });  
    } catch (error) {
        res.status(500).send({
            message: "Get user gagal",
            data: error,
        });
    }
};

const register = async (req,res) => {
  const { username, password, confPassword } = req.body;
  if (password !== confPassword) {
    return res.status(400).send({ message: "Password tidak sama" });
  }
  if (password.length < 8) {
    return res.status(400).send({ message: "Password minimal 8 karakter" });
  }
  const user = await User.findOne({ username });
  if (user) {
    return res.status(400).send({ message: "Username sudah terdaftar" });
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await User.create({
      username,
      password: hashPassword,
    }).then(() => {
      res.status(200).send({ message: "Register berhasil" });
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username});
    if (!user) {
        return res.status(404).send({ message: "Username tidak terdaftar" });
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if(result){
            const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
            const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1h" });
            User.updateOne({ _id: user._id }, { refresh_token: refreshToken }).then(() => {
              res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 3600000});
              res.status(200).send({ message: "Login berhasil", accessToken});
            }).catch((error) => {
                res.status(500).send({ message: "Login gagal", error });
            });
        }
        else{
            return res.status(400).send({ message: "Password salah" });

        }
    });
}

const logout = async (req, res) => {
  const token = req.cookies['refreshToken'];
  if(!token) return res.status(204).send({message:"No Content"})
  const user = await User.findOne({refresh_token:token})
  if(user){
    await User.updateOne({ _id: user._id }, { refresh_token: null }).then(() => {
      res.clearCookie('refreshToken');
      res.status(200).send({ message: "Logout berhasil"});
    })
}
}

module.exports = { register, getUser, login, logout };
