import React, { useEffect, useState } from 'react';
import { Select, TimePicker } from 'antd';
const { Option } = Select;
const { RangePicker } = TimePicker;

const ChosenDay = ({ day = '', hoursOpen }) => {

    const [time, setTime] = useState();
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');

    const handleChange = (newTime) => { 
        setTime(newTime); 
        setTimeStart(newTime[0].format('HH:mm'));
        setTimeEnd(newTime[1].format('HH:mm'));
    };

    useEffect(() => {
        hoursOpen({[day]: [timeStart, timeEnd]});
    }, [day, timeStart, timeEnd]);

    return <div style = {{margin: '1rem', width: '100%', display: 'flex', justifyContent: 'flex-start'}}>
        <span style = {{margin: '0.25rem'}}>{ day }: </span>
        <RangePicker format={'HH:mm'} onChange={handleChange} value={time} />
    </div>
}

export default ChosenDay;