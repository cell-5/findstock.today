import React, {useState} from 'react';
import { Link }  from 'react-router-dom';
import CurrentLocation from './CurrentLocation';
import {  Form, Input, Radio, List, Typography  } from 'antd';


export default function SearchPage(){
    const [form] = Form.useForm();
    const [formRange, setFormRange] = useState('1m');
    const [formCoords, setFormCoords] = useState({});
   
    const onValuesChanged = ({range, coords}) => {
        setFormRange(range)
        alert(JSON.stringify({range: range, coords: coords? coords: formCoords}));
    }; 

    /* this reflect a hack to make the CurrentLocation widget work with the
    Ant forms without too much tomfoolery. Will probably bite us later
    when we do validation. But I did not really understand how to make
    it into a property when all I wanted was a event emit from CurrentLocation */
    function coordsChanged(coords){
        var latlong = {longitude : coords.longitude, latitude: coords.latitude}
        setFormCoords(latlong);
        onValuesChanged({range: formRange, coords:latlong})
     }
     const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
      ];
    const layout = 
    { 
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 14,
        }
    };
    return (
        <div>
            <Form
                {...layout}
                range={formRange}
                form={form}
                initialValues={{
                    range: formRange,
                    coords: null,
                }}
                onValuesChange={onValuesChanged}
                >
        <Form.Item label="Location" name="location">
        <CurrentLocation coordsChanged={coordsChanged}></CurrentLocation>
        </Form.Item>
       
        <Form.Item label="Range to Search" name="range">
        <Radio.Group value={formRange} defaultValue="1m" buttonStyle="solid">
            <Radio.Button value="1/2m">1/2 Miles</Radio.Button>
            <Radio.Button value="1m">1 Miles</Radio.Button>
            <Radio.Button value="5m">5 Miles</Radio.Button>
        </Radio.Group>
        </Form.Item>
        </Form>
        <Link to={`/shop`} activeClassName="active">Not looking for stock, create a shop instead?</Link>
        <List
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => (
            <List.Item>
                <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
            )}
        />
        </div>
    )
}