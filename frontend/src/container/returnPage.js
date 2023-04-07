import React from 'react';
import { useState } from 'react';
import '../css/returnPage.css';
import DisplayEquipment from './displayEquipment';
import { Button, Checkbox, Form, Input, Col, DatePicker } from 'antd';

const ReturnPage = () => {
    const { RangePicker } = DatePicker;
    const [form] = Form.useForm();
    const [display, setDisplay] = useState(false);
    const [props, setProps] = useState({});


    const onFinish = (values) => {
        console.log('Success:', values);
        setProps(values);
        setDisplay(true);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onReset = () => {
        form.resetFields();
    };

    return (
      <>
        {display ?
            <DisplayEquipment type='return' props={props}/>
            :
            <div className='formContainer'>
            <Form
                  form={form}
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 10,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  className='form'
                >
                <h1> Return Information </h1>
                  <Form.Item label="Activity" name="Activity">
                    <Input />
                  </Form.Item>

                  <Form.Item label="Returner" name="Name" rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label="Return Date" name="date" rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                  <Button type="primary" htmlType="submit" style={{ background: "rgb(189, 159, 127)" }}>
                    Submit
                  </Button>
                  <Button type="primary" htmlType="button" onClick={onReset} style={{ background: "rgb(189, 159, 127)" }}>
                    Reset
                  </Button>
                  </Form.Item>
            </Form>
            </div>
        }
      </>
    )
}
export default ReturnPage