const UserMaveric = require("../models/User");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorhandler");
const bcrypt = require("bcryptjs");
const Images = require("../models/Images");

exports.signUpUser = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  let role = "patient";
  try {
    if (!name) {
      return next(new ErrorHandler("Name is required", 400));
    }
    if (!email) {
      return next(new ErrorHandler("Email is required", 400));
    }
    if (!password || password.length < 6) {
      return next(
        new ErrorHandler(
          "Please enter a valid password with minimum 6 characters",
          400
        )
      );
    }
    if (!phone) {
      return next(new ErrorHandler("Please enter a valid Phone Number", 400));
    }

    let usermaveric = await UserMaveric.create({
      name,
      email,
      password,
      phone,
      role,
    });

    sendToken(usermaveric, 201, res);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.registerUser = async (req, res, next) => {
  const {
    name, //
    email, //
    age, //
    role,
    address, //
    gender, //
    faceimage, //
    phone, //
    dob, //
    specialize,
    room,
    medicalrecords, //
    occupation, //
    scanneddocu,
  } = req.body;

  if (!name) {
    return next(new ErrorHandler("Name is required", 400));
  }
  if (!email) {
    return next(new ErrorHandler("Email is required", 400));
  }
  // if (!password || password.length < 6) {
  //   return next(
  //     new ErrorHandler(
  //       "Please enter a valid password with minimum 6 characters",
  //       400
  //     )
  //   );
  // }
  if (!gender) {
    return next(new ErrorHandler("Gender is required", 400));
  }

  let usermaveric = {};
  usermaveric = await UserMaveric.findOne({ email });
  if (!usermaveric) {
    return next(
      new ErrorHandler("Invalid email or password as user does not exist", 401)
    );
  }

  if (role == "patient") {
    if (!faceimage) {
      return next(
        new ErrorHandler("Please enter a Face recognition image", 400)
      );
    }

    usermaveric.role = role;
    usermaveric.age = age;
    usermaveric.dob = dob;
    usermaveric.address = address;
    usermaveric.gender = gender;
    usermaveric.medicalrecords = medicalrecords;
    usermaveric.occupation = occupation;
    usermaveric.faceimage = faceimage;
    usermaveric.scanneddocu = scanneddocu;
    usermaveric.save();

    userid = usermaveric._id;
    try {
      await Images.create({
        userid,
        faceimage,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }

  if (role == "doctor") {
    let userid;

    if (!room) {
      return next(new ErrorHandler("Please enter a valid Room Number", 400));
    }
    if (!specialize) {
      return next(new ErrorHandler("Please enter a specialization", 400));
    }

    usermaveric = await UserMaveric.create({
      name,
      email,
      password,
      role,
      address,
      age,
      gender,
      phone,
      room,
      specialize,
    });
  }

  if (role == "admin") {
    usermaveric = await UserMaveric.create({
      name,
      email,
      password,
      role,
      // age,
      // gender,
      // phone,
    });
  }
  //call the jwt function
  sendToken(usermaveric, 201, res);
};

//login
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorHandler("Please enter your email & password to login", 400)
    );
  }
  const usermaveric = await UserMaveric.findOne({ email }).select("+password");
  // console.log(user)
  if (!usermaveric) {
    return next(
      new ErrorHandler("Invalid email or password as user does not exist", 401)
    );
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    usermaveric.password
  );

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email/password", 401));
  }
  sendToken(usermaveric, 200, res);
};

//logout
//logout user
exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};

//get all users (admin)
exports.getAllUsers = async (req, res, next) => {
  const users = await UserMaverick.find();
  res.status(200).json({
    success: true,
    users,
  });
};

//get single users (admin)
exports.getSingleUser = async (req, res, next) => {
  const user = await UserMaverick.findById(req.params.id);

  // error handling
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with the id: ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
};
