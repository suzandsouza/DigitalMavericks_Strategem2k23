import React from 'react'
import { Button } from "antd"
const AuthPatient = () => {
    let faceio;
    React.useEffect(() => {
        faceio = new faceIO("fioa6f1e");
    }, []);
    const handleAuth = async () => {
        try {
            let response = await faceio.authenticate({
                locale: "auto",
            });

            console.log(` Unique Facial ID: ${response.facialId}
              PayLoad: ${response.payload}
              `);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Button onClick={handleAuth}>Click Here to Authenticate Patient</Button>
        </div>
    )
}

export default AuthPatient