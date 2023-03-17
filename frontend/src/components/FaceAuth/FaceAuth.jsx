import React from 'react'
import {Button  , Modal} from "antd"
const FaceAuth = () => {
  let faceio;
  React.useEffect(() => {
      faceio = new faceIO(import.meta.env.VITE_FACEIO_KEY);
  }, []);

  const handleAuth = async () => {
    try {
      let response = await faceio.enroll({
        locale: "auto",
        payload: {
          email: "example@gmail.com",
        },
      });

      console.log(` Unique Facial ID: ${response.facialId}
      Enrollment Date: ${response.timestamp}
      Gender: ${response.details.gender}
      Age Approximation: ${response.details.age}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
    <Button type='primary' size={"large"}  onClick={handleAuth}>Authenticate</Button>
  )
}

export default FaceAuth