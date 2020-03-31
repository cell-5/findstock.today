import React, { useState, useEffect } from 'react'
import { Input, Select } from 'antd';

const { Option } = Select;


export default function WebsiteLink({ onChange }) {
    
    const [pref, setPref] = useState('http://')
    const [site, setSite] = useState('www.')

    const inputChange = (e) => {
        // console.log(e.target.value);
        setSite(e.target.value);
    };

    const prefChange = (value) => {
        // console.log(value);
        setPref(value)
    };

    useEffect(() => {
        onChange(pref + site);
        console.log(pref + site);
    }, [pref, site]);

    const selectBefore = (
        <Select value={pref} style={{ width: 90 }} onChange={ prefChange }>
            <Option value="https://">https://</Option>
            <Option value="http://">http://</Option>
        </Select>
    );

    return <>
        <div style={{ marginBottom: 16 }}>
            <Input addonBefore={selectBefore} value={site} onChange={ inputChange }/>
        </div>
    </>
}