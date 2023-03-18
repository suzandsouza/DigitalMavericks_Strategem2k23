import React from "react";
import { Button, Modal } from "antd";
const FaceAuth = (props) => {
  let faceio;
  React.useEffect(() => {
    faceio = new faceIO(import.meta.env.VITE_FACEIO_KEY);
  }, []);
  const [isAuth, setIsAuth] = React.useState(0);
  const [Disabled, setDisable] = React.useState(true);

  React.useEffect(() => {
    let authId = JSON.parse(localStorage.getItem("isAuth"));
    if (authId) {
      setIsAuth(true);
      setDisable(false);
    }
  }, [isAuth]);
  const handleAuth = async () => {
    try {
      let response = await faceio.enroll({
        locale: "auto",
        payload: {
          email: "example@gmail.com",
        },
      });

      let authObj = {
        facialId: response.facialId,
      };
      localStorage.setItem("isAuth", JSON.stringify(authObj));
      setIsAuth(1);
      console.log(` Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        type="primary"
        size={"large"}
        onClick={handleAuth}
        disabled={isAuth}
      >
        {isAuth === 0 ? "Authenticate" : "Authentication Done"}
      </Button>
      <Button type="primary" size="large" htmlType="submit" disabled={Disabled}>
        Register
      </Button>
    </>
  );
};

export default FaceAuth;
