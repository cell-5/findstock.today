import React, { useEffect, useState } from 'react';
import EachDay from './EachDay';

const OpeningSchedule = ({ onChange }) => {

    const [days, setDays] = useState(['Monday','Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
    const [hoursOpen, setHoursOpen] = useState({});

    const hours = (data) => {
        setHoursOpen({
            ...hoursOpen,
            ...data
        })
        // console.log(hoursOpen);
    };

    useEffect(() => {
        onChange(hoursOpen);
    }, [hoursOpen]);

    return <>
        {days.map(day => (
            <EachDay day={day} hoursOpen={hours} key={day}/>
        ))}
    </>
}

export default OpeningSchedule;