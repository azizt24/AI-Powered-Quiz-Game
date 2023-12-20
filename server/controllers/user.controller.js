const { CatchAsyncError } = require("../middlewares/CatchAsyncError.js");
const User = require("../models/User.js");
//const createError = require("../utils/createError.js");
//const { sendNotificationToUser } = require("../utils/notifications");

const register = CatchAsyncError(async (req, res) => {
  const { username,  email, password, age } = req.body;
  console.log(req.body)
  if (!fullName) {
    return res.status(400).json({ message: "fullName is required" });
  }
  if (await User.findOne({ username })) {
    return res.status(400).json({ message: "username already in use" });
  }

  try {
    const user = new User({
      username,
      email,
      password,
     age,
    });
    if (req.files?.image?.length > 0) {
      user.photo = req.files?.image[0]?.filename;
    }
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const login = CatchAsyncError(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required!" });
  }
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid Username or Password!" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Username or Password!" });
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message, error: error });
  }
});


module.exports = {
  register,
  login,
};
