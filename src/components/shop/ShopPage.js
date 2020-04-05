import React, { useState } from 'react';

import { Form, Input, Button, Checkbox, Typography, Layout, Tooltip } from 'antd';
import AddressSearchInput from './AddressSearchInput'
import SelectCategories from './SelectCategories'
import WebsiteLink from './WebSiteInput';
import OpeningSchedule from './OpeningSchedule';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
;

export default function ShopForm() {

  const [longLat, setLongLat] = useState({ long: 0, lat: 0 })
  const [form] = Form.useForm();

  const onFinish = values => {

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

    // Send data to db via POST
    values.geo = longLat;
    values.links = [values.shopLink]; // Push to array
    fetch(`/.netlify/functions/shopCreate`, {
      method: 'POST',
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch(err => console.log(err));

    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        {...layout}
        name="shop"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Typography.Title style={{ textAlign: 'center' }} level={2}>Create Shop</Typography.Title>
        <Form.Item
          label="Shop Name"
          name="name"
          rules={[{ required: true, message: 'Please input your shop name' }]}
        >
          <Input />

        </Form.Item>
        <Form.Item
          label="Shop web link"
          name="shopLink"
          rules={[{ required: true, message: 'Please input your shop link' }]}
        >
          <WebsiteLink />
        </Form.Item>
        <Form.Item name="chosenCategories" label="Select Category" rules={[{ required: true, message: 'Please select your shop category' }]}>
          <SelectCategories />
        </Form.Item>
        <Form.Item name="address" label="Please enter your shop's address"
          rules={[{ required: true, message: 'Please input the address of your shop' }]}
        >
          <AddressSearchInput setLongLat={setLongLat} />
        </Form.Item>

        <Form.Item name="openingHours" label="Please select days open">
          <OpeningSchedule />
        </Form.Item>

        <Form.Item style={{ textAlign: 'right' }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        </Form.Item>
      </Form>
    </>
  );
};
