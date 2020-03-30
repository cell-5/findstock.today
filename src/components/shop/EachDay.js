import React, { useEffect, useState } from 'react';
import { Checkbox, TimePicker } from 'antd';
const { RangePicker } = TimePicker;

const EachDay = ({ day = '', hoursOpen }) => {

    const [time, setTime] = useState();
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [toHoursOpen, setToHoursOpen] = useState({isOpen: isOpen, from: timeStart, to: timeEnd});

    const handleIsOpenChange = (e) => {
        setIsOpen(e.target.checked);
    }

    const handleTimeChange = (newTime) => { 
        setToHoursOpen({
            isOpen: isOpen,
            from: newTime[0].format('HH:mm'),
            to: newTime[1].format('HH:mm'),
        });
        setTime(newTime); 
        setTimeStart(newTime[0].format('HH:mm'));
        setTimeEnd(newTime[1].format('HH:mm'));
    };

    useEffect(() => {
        hoursOpen({[day]: toHoursOpen});
    }, [isOpen, toHoursOpen]);

    return (
        <div style = {{margin: '0.25rem', width: '100%', display: 'flex', justifyContent: 'flex-start'}}>
            <Checkbox onChange={handleIsOpenChange}>{day}</Checkbox>
            <span style = {{marginRight: '0.25rem'}}>: </span>
            <RangePicker format={'HH:mm'} onChange={handleTimeChange} value={time} />
        </div>
    );
}

export default EachDay;