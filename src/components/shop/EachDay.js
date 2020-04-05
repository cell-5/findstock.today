import React, { useEffect, useState } from 'react';
import { Checkbox, TimePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = TimePicker;

const EachDay = ({ day = '', hoursOpen }) => {

    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleIsOpenChange = (e) => {
        setIsOpen(e.target.checked);
    }

    const handleTimeChange = (newTime) => {
        newTime && setTimeStart(newTime[0].format('HH:mm'));
        newTime && setTimeEnd(newTime[1].format('HH:mm'));
    };

    useEffect(() => {
        hoursOpen({
            [day]: {
                isOpen: isOpen,
                from: timeStart,
                to: timeEnd
            }
        });
    }, [isOpen, timeStart, timeEnd]);

    return (
        <div style={{ margin: '0.25rem', width: '100%', display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ width: '40%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Checkbox onChange={handleIsOpenChange} checked={isOpen} >{day}</Checkbox>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                <RangePicker
                    defaultValue={[moment('09:00', 'HH:mm'), moment('21:00', 'HH:mm')   ]}
                    format={'HH:mm'}
                    minuteStep={15}
                    onChange={handleTimeChange} />
            </div>
        </div>
    );
}

export default EachDay;