import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
const { Option } = Select;

const buildOptions = (categories) => categories.map((c, i) => <Option key={i} value={c}>{c}</Option>)




const SelectCategories = ({ value = {}, onChange }) => {

    const [categories, setCategories] = useState([])
    const [category, setChosenCategory] = useState([]);

    const triggerChange = changedValue => {
        if (onChange) {
            onChange({
                category,
                ...value,
                ...changedValue,
            });
        }
    };

    const handleChange = (newCategory) => { console.log(); setChosenCategory(newCategory); triggerChange({ category: newCategory }) }

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
            value={value.category}
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