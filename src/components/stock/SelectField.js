import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function SelectField(props) {
  const {
    showSearch,
    allowClear,
    placeholder,
    options,
    handleChange,
    value,
  } = props;
  return (
    <>
      <Select
        showSearch={showSearch}
        allowClear={allowClear}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      >
        {options.map(option => (
          <Option
            value={option}
            key={option}
          >
            {option}
          </Option>
        ))};
      </Select>
    </>
  )
}