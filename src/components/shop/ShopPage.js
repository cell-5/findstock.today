import React, { useState } from 'react';

import { Form, Input, Button, Checkbox, Typography, Layout,Tooltip } from 'antd';
import AddressSearchInput from './AddressSearchInput'
import SelectCategories from './SelectCategories'
import WebsiteLink from './WebSiteInput';
import OpeningHours from './OpeningHours';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
;

export default function ShopForm() {

  const [latlong, setLatLong] = useState({ lat: 0, lng: 0 })
  const [form] = Form.useForm();

  const onFinish = values => {

    console.log('values', values)
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
    values.geo = { long: 1, lat: 2 };  // Temp geo
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
    <Form
      {...layout}
      name="shop"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
    >
      <Typography.Title level={2}>Create Shop</Typography.Title>
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
      <Form.Item name="postCode" label="Please select your shop's address"
        rules={[{ required: true, message: 'Please input the address of your shop' }]}
      >
        <AddressSearchInput handleLatLong={setLatLong} />
      </Form.Item>

      <Form.Item name="openingHours" label="Please select days open">
        <OpeningHours />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
