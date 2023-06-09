const User = require('../models/user');
const jwt = require('jsonwebtoken');

//Create/Register the user in db by using name,email and password
module.exports.register = async function (req, res) {
  //Check if all field enter
  if (
    req.body.email == undefined ||
    req.body.name == undefined ||
    req.body.password == undefined
  ) {
    return res.status(206).json({
      message: 'Incomplete data provided',
    });
  }

  //Check if the user is already registered in db
  let Email = req.body.email;
  let userExists = await User.findOne({ email: Email });
  if (userExists) {
    userExists = await userExists.toObject();

    delete userExists.password;
    return res.status(405).json({
      data: {
        user: userExists,
      },
      message: 'User already registered',
    });
  }

  try {
    let createdUser = await (await User.create(req.body)).toObject();

    if (createdUser) {
      delete createdUser.password;
      return res.status(200).json({
        data: {
          user: createdUser,
        },
        message: 'Successfully registered',
      });
    } else {
      return res.status(500).json({
        message: 'OOPS!! Error',
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: 'OOPS!! Error',
    });
  }
};

//Login for User using email and password, generate JWT token for user
module.exports.login = async function (req, res) {
  console.log(req.body);
  if (req.body.email == undefined || req.body.password == undefined) {
    return res.status(206).json({
      message: 'Incomplete data provided',
    });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      let pass = req.body.password;
      let pwdDb = user.password;
      if (pass == pwdDb) {
        return res.status(200).json({
          data: {
            token: jwt.sign(user.toJSON(), 'userapi', {
              expiresIn: 10000000,
            }),
          },
        });
      }
    }
    return res.status(401).json({
      message: 'Invalid Email/Password',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'OOPS!! Error',
    });
  }
};
