import * as React from "react";
import { Form as AntdForm, Button } from "antd";
import { Form, InputField } from "rjv-react-antd";



const PersonalInfoForm = () => {
    const [form] = Form.useForm()
  return (
    <Form 
        form={form}
    >
      
    </Form>
  )
}

export default PersonalInfoForm
