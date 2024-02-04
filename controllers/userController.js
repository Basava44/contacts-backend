// usually all api methos logic will be seperated in a controller files

// Express Async Handler used to handle asynchronous exceptions caused by asyncronous routes
// to use asyncHandler simply wrap around the async functions, which handles itself and passes tp exceptional handler whenever an exception occurs
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

// @desc Register User
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered!");
  }

  // bcrypt.hash is a async function
  const hashedPassword = await bcrypt.hash(password, 10);

  // create is used to create new items
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User is created ${newUser}`);
  if (newUser) {
    res.status(201).json({ _id: newUser.id, email: newUser.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @desc Login User
// @route POST /api/users/register
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });

  // Compare Passowrd with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is not valid");
  }

  res.status(200).json({ message: "Login user" });
});

// @desc Current User info
// @route POST /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
