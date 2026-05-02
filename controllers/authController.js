const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");


async function register(req, res, next) {
  try {
    const { email, password } = req.body;

 
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id
    });
  } catch (err) {
    next(err);
  }
}


async function login(req, res, next) {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
    );

    res.json({
    message: "Login successful",
    token
    });
   

  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };


