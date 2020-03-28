import React, { useEffect, useState } from 'react';
import ChosenDay from './ChosenDay';
import { Select } from 'antd';
const { Option } = Select;

const buildOptions = (days) => days.map((c, i) => <Option key={i} value={c}>{c}</Option>)

const OpeningHours = ({ onChange }) => {

    const [days, setDays] = useState(['Monday','Tuesday','Wednesday', 'Thursday', 'Friday']);
    const [chosenDays, setChosenDays] = useState([]);
    const [hoursOpen, setHoursOpen] = useState({});

    const handleChange = (newDays) => {  
        setChosenDays(newDays);
    };

    const hours = (data) => {
        setHoursOpen({
            ...hoursOpen,
            ...data
        })
    }

    useEffect(() => {
        onChange(hoursOpen);
        console.log(hoursOpen);
    }, [hoursOpen, chosenDays]);

    return <>
        <Select
            value={chosenDays}
            onChange={handleChange}
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select opening days"
        >
            {buildOptions(days)}
        </Select>
        <div>
            {chosenDays.map(chosenDay => (
                <ChosenDay key={chosenDay} day={chosenDay} hoursOpen={hours}/>
            ))}
        </div>
    </>
}

export default OpeningHours;