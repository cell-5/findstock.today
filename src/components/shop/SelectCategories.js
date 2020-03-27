import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
const { Option } = Select;

const buildOptions = (categories) => categories.map((c, i) => <Option key={i} value={c}>{c}</Option>)




const SelectCategories = ({ onChange }) => {

    const [categories, setCategories] = useState([])
    const [chosenCategories, setChosenCategories] = useState([]);

    const handleChange = (newCategories) => { 
        console.log(newCategories); 
        setChosenCategories(newCategories); 
        onChange(newCategories);
    };

    useEffect(() => {
        fetch('/.netlify/functions/categoryList')
            .then(res => res.json())
            .then(response => {
                setCategories(response.categories)
            })
            .catch(err => console.log('Error retrieving categories: ', err))
    }, []);

    return <>
        <Select
            value={chosenCategories}
            onChange={handleChange}
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select shop category/ categories"
        >
            {buildOptions(categories)}
        </Select>
    </>
}

export default SelectCategories