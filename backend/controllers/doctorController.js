const UserMaveric = require("../models/User");
const Images = require("../models/Images");

//Find doctors with a specialization
exports.findSpecialize = async (req, res) => {
  const { specialize } = req.body;
  //specialize will be an array
  try {
    let doctorsfound = [];
    let alldoctors = await Users.find({ role: "doctor" });
    specialize.map((special) => {
      //map through each specialization
      alldoctors.map((doctor) => {
        //map through each doctor
        //check if doctor is not already included and if doctor specialization array includes the specialization
        if (
          !doctorsfound.includes(doctor) &&
          doctor.special.includes("special")
        ) {
          doctorsfound.push(doctor);
        }
      });
    });
    return res.json(doctorsfound);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

//by admin at the Hospital
exports.authenticateUser = async (req, res, next) => {
  try {
    const { faceimage } = req.body;

    const faces = await Images.find();
    let patient;
    faces.map((face) => {
      if (face.faceimage == faceimage) {
        patient = face.userid;
      }
    });

    let token;

    return res.json({
      patient,
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

exports.makeAppointment = async (req, res, next) => {
  const { doctorid, timing } = req.body;

  try {
    let patient = await UserMaveric.findById(req.user.id);
    let doctor = await UserMaveric.findById(doctorid);

    let patientappointment = {
      user: doctor._id,
      timing: timing,
    };
    let doctorappointment = {
      user: patient._id,
      timing: timing,
    };

    patient.appointmentsmade.append(patientappointment);
    doctor.appointments.append(doctorappointment);
    await patient.save();
    await doctor.save();

    return res.status(200).json({
      success: true,
      patientappointment,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
