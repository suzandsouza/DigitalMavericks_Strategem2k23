const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema({
  //In General
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    default: "patient",
    // required: true,
  },
  phone: {
    type: Number,
  },
  age: {
    type: Number,
    // required: true,
  },
  gender: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
  },
  dob: {
    type: String,
  },
  occupation: {
    type: String,
  },

  //Patient only
  medicalrecords: {
    type: String,
  },
  faceimage: {
    type: String,
  },
  scanneddocu: {
    type: String,
  },
  appointmentsmade: [
    //array of object of doctor, token and timing
    {
      user: {
        type: mongoose.Schema.Types.ObjectId, //doctor id
        ref: "UserMavericks",
      },
      timing: {
        type: Date,
      },
      token: {
        type: Number,
      },
    },
  ],

  //Doctor only
  specialize: {
    //array of specialization
    type: [String],
  },
  appointments: [
    //array of object of user and timing
    {
      user: {
        type: mongoose.Schema.Types.ObjectId, //patient id
        ref: "UserMavericks",
      },
      timing: {
        type: Date,
      },
      token: {
        type: Number,
      },
    },
  ],
  room: {
    type: String,
  },
  availabletime: {
    type: [Date], //array of time slots
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token
UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


//compare passwords
UserSchema.methods.comparePassword=async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}

//compare passwords reset token generating pass reset token
UserSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("UserMavericks", UserSchema);
