import React, { useState } from 'react';

import { Form, Input, Button, Checkbox } from 'antd';
import AddressSearchInput from './AddressSearchInput'
import SelectCategories from './SelectCategories'
import WebsiteLink from './WebSiteInput';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function ShopForm() {

  const [latlong, setLatLong] = useState({ lat: 0, lng: 0 })
  const [form] = Form.useForm();

  const onFinish = values => {

    console.log(values)
    //   { 
    //     "name":"My Shop",
    //     "categories": [ "Grocery"], 
    //     "links": [ "https://www.google.com","https://www.facebook.com" ],
    //     "address": "10 Lower Anchor Street, Chelmsford, CM20AS, UK",
    //     "postcode": "CM2 OAS",
    //     "geo": [ 1 , 2],
    //     "active": true, 
    //     "openingHours": {
    //    "Monday": [ "0900", "2300"],	
    //    "Tuesday": [ "0000", "2359"],	
    //    "Wednesday": ["0700", "0400"],	
    //    "Friday": ["0400", "1200"]	
    //     }
    //  }
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="shop"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <Form.Item
        label="Shop Name"
        name="shopName"
        rules={[{ required: true, message: 'Please input your shop name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Shop Link"
        name="shopLink"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="categories" label="Select Category" rules={[{ required: true, message: 'Please select your shop category' }]}>
        <SelectCategories />
      </Form.Item>
      <Form.Item name="postCode" label="Please select your address">
        <AddressSearchInput handleLatLong={setLatLong} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
