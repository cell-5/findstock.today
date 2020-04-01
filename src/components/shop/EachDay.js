import React, { useEffect, useState } from 'react';
import { Checkbox, TimePicker } from 'antd';
const { RangePicker } = TimePicker;

const EachDay = ({ day = '', hoursOpen }) => {

    const [time, setTime] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [toHoursOpen, setToHoursOpen] = useState({isOpen: isOpen, from: '', to: ''});

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
    };

    useEffect(() => {
        hoursOpen({[day]: toHoursOpen});
    }, [isOpen, toHoursOpen]);

    return (
        <div style = {{margin: '0.25rem', width: '100%', display: 'flex', justifyContent: 'space-around'}}>
            <div style = {{width: '40%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Checkbox onChange={handleIsOpenChange} checked={isOpen} >{day} :</Checkbox>
            </div>
            <div style = {{width: '100%', display: 'flex', justifyContent: 'flex-start'}}>
                <RangePicker format={'HH:mm'} onChange={handleTimeChange} value={time} />
            </div>
        </div>
    );
}

export default EachDay;