import React from 'react'
import { Input, Select } from 'antd';

const { Option } = Select;

const selectBefore = (
    <Select defaultValue="http://" style={{ width: 90 }}>
        <Option value="https://">https://</Option>
        <Option value="http://">http://</Option>
    </Select>
);


export default function WebsiteLink() {
    return <>
        <div style={{ marginBottom: 16 }}>
            <Input addonBefore={selectBefore} defaultValue="www." />
        </div>
    </>
}