import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Web3Storage } from "web3.storage";
import Title from "antd/es/typography/Title";
import FaceAuth from "../FaceAuth/FaceAuth";
import { InboxOutlined, UploadOutlined, DeleteFilled } from "@ant-design/icons";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  DatePicker,
  Button,
  InputNumber,
  Divider,
  Upload,
  message,
} from "antd";


// IPFS
const apiToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEIzQjE2NEJjMzM3MTFBMmQyQTEyYzIwYkE2MjA3YjIzQWExQTY0NzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzg4OTM2MDg0MzEsIm5hbWUiOiJpcGZzX2RvY3MifQ.wXK5hTOg_J3rgNGKf5Rw0D6keTv7KjfJq1ZbsTpTxyQ";
const url = "";
const client = new Web3Storage({ token: apiToken });
let file;
const handleUpload = async () => {
  console.log(document.getElementById("input").files[0]);
  var fileInput = document.getElementById("input");
  const rootCid = await client.put(fileInput.files, {
    name: "user documents",
    maxRetries: 3,
  });
  console.log(rootCid);
  // const res = await client.get(rootCid);
  // const files = await res.files();
  // url = URL.createObjectURL(files[0]);
  file = rootCid;
  // console.log(typeof file, file);
};


//IPFS ends
const PatientRegistrationFrom = () => {
  const { Option } = Select;
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [isAuth, setIsAuth] = React.useState(0);
  const [records, setrecords] = useState([]);
  const [openAuthModal, setOpenAuthModal] = React.useState(0);
  const onFinish = (values) => {
    let data = values;
    let faceid = JSON.parse(localStorage.getItem("isAuth"));
    data.faceimage = faceid.facialId;
    data.role = "patient";


    data.scanneddocu = file;
    console.log("Received values of form: ", data);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // let body = JSON.parse(data);
    axios
      .post("http://localhost:5000/api/users/newroute", data, config)
      .then((response) => {
        console.log(response);
      });
  };


  const patientformData = {
    name: "",
    email: "",
    address: "",
    age: "",
    dob: "",
    gender: "",
    role: "patient",
    phone: "",
    medicalrecords: "",
    occupation: "",
    faceimage: "",
    scanneddocu: "", //taking the hash of the scanned files
  };


  //   const onChange = (e) => {
  //     setPatientFormData({ ...patientformData, [e.target.name]: e.target.value }); //only for strings
  //   };


  // React.useEffect(()=>{
  //     let authId = JSON.parse(localStorage.getItem("isAuth"))
  //     if(authId)
  //     {
  //         setIsAuth(true)
  //     }
  // },[])
  //   const patientformData = {
  //     age: "",
  //     phone_number: "",
  //     upload: "",
  //   };


  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };


  const UploadRequest = (arg1, arg2) => {
    console.log("ARG1 , 2", arg1, arg2);
  };


  const handleChange = (e) => {
    console.log(e);
  };


  const addRecords = useCallback(() => {
    let obj = {
      id: "",
      name: "",
      fileDetails: "",
    };
    let newArr = [...records];
    newArr.push(obj);
    console.log(newArr);
    let arr = newArr.map((rec, index) => {
      return {
        ...rec,
        id: `upload${index}`,
      };
    });
    setrecords(arr);
  }, [records]);


  console.log(records);


  const openAuth = () => {
    console.log("OPEN AUTH");
    setOpenAuthModal((prev) => !prev);
  };


  const handleRecordUploadFile = (e, index) => {
    let id = index;


    console.log(id, e.target.files[0]);
    let arr = [...records];
    let name_id = `upload${id}`;
    let data = arr?.find((d) => d.id === name_id);
    if (data) {
      let newArr = arr.map((rec) => {
        if (rec.id === name_id) {
          rec.fileDetails = e.target.files[0];
        }
        return rec;
      });
      setrecords(newArr);
    }
  };


  const handleRecordName = (e, index) => {
    let id = index;
    console.log(id);
    let arr = [...records];
    let name_id = `upload${id}`;
    let data = arr?.find((d) => d.id === name_id);
    // console.log(data)
    if (data) {
      let newArr = arr.map((rec) => {
        if (rec.id === name_id) {
          rec.name = e.target.value;
        }
        return rec;
      });
      setrecords(newArr);
    }
  };


  const handleDeleteRecord = (index) => {
    let id = index;
    console.log(id);
    let arr = [...records];
    let name_id = `upload${id}`;
    let data_index = arr?.findIndex((d) => d.id === name_id);
    console.log(data_index);
    if (data_index !== -1) {
      if (data_index === 0 && arr.length === 1) setrecords([]);
      else {
        let newArr = arr.slice(data_index, data_index + 1);
        let arr_ = newArr.map((rec, index) => {
          return {
            ...rec,
            id: `upload${index}`,
          };
        });
        setrecords(arr_);
      }
    }
  };


  const DisplayDecord = records?.map((rec, index) => {
    return (
      <Row key={index} id={`${index}`} align="middle">
        <Col sm={22} lg={11}>
          <Form.Item>
            <Input type={"text"} placeholder={"Enter document Name"} />
          </Form.Item>
        </Col>
        <Col sm={22} lg={11}>
          <Form.Item
            placeholder="Choose File To Upload"
            valuePropName="fileList"
          >
            <input
              type={"file"}
              onChange={(e) => handleRecordUploadFile(e, index)}
            />
          </Form.Item>
        </Col>
        <Col lg={2}>
          <DeleteFilled onClick={() => handleDeleteRecord(index)} />
        </Col>
      </Row>
    );
  });


  const [faceId, setFaceId] = useState("");


  const handleFaceId = (e) => {
    console.log(e);
  };


  return (
    <section className="patient_form_container">
      <Title>Register as a Patient</Title>
      <section className="form">
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={patientformData}
          scrollToFirstError
          className="patient__registration"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "please Enter Your Name" }]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "please Enter Your Address" }]}
          >
            <Input />
          </Form.Item>
          <Row>
            <Col sm={24} lg={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: "email",
                    message: "Enter Valid Email",
                  },
                  {
                    required: true,
                    message: "Enter Your Email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={24} lg={12}>
              <Form.Item
                name="phone"
                label="Phone "
                rules={[
                  {
                    required: true,
                    message: "Enter Your Phone Number!",
                  },
                ]}
              >
                <Input type="tel" pattern="[0-9]{10}" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={24} lg={8}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Please select gender!",
                  },
                ]}
              >
                <Select placeholder="select your gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col sm={24} lg={8}>
              <Form.Item
                name="dob"
                label="DOB"
                rules={[
                  {
                    required: true,
                    message: "Enter Your Date Of Birth!",
                  },
                ]}
              >
                <input type="date" name="dob" />
              </Form.Item>
            </Col>
            <Col sm={24} lg={8}>
              <Form.Item
                name="age"
                label="Age"
                rules={[
                  {
                    required: true,
                    message: "Enter Your Age!",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>


          <Form.Item
            label="Occupation"
            name="occupation"
            rules={[{ required: true, message: "please Enter Your Address" }]}
          >
            <Input />
          </Form.Item>
          <Divider orientation="left">Medical Info</Divider>


          <Form.Item name="medicalrecords">
            <TextArea
              rows={10}
              placeholder=" Any known allergies, current medications, past surgeries, chronic conditions, and medical procedures."
            />
          </Form.Item>


          {/* <Form.Item name="lifestylehabits">
            <TextArea
              rows={4}
              placeholder="Enter lifestyle habits (such as smoking or alcohol consumption), and physical activity."
            />
          </Form.Item> */}


          {/* <Form.Item name="medicalrecords">
            <TextArea rows={3} placeholder="Enter Reason For Visit" />
          </Form.Item> */}


          <Divider orientation="left">Medical Records</Divider>
          <section>
            <div>
              <label for="file">Choose the file to upload</label>
              <input type="file" id="input" name="file" multiple />
            </div>
            <Button onClick={handleUpload}>Upload document</Button>
          </section>
          <section className="patient__records">
            {DisplayDecord}
            <Button type="dashed" onClick={addRecords}>
              Add Record
            </Button>
          </section>


          <Divider orientation="left">Authenticate Yourself </Divider>


          <FaceAuth handleFaceId={handleFaceId} />


          {/* <Button
            type="primary"
        size="large"*/}
        </Form>
      </section>
    </section>
  );
};


export default PatientRegistrationFrom;



