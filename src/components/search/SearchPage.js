import React, {useState, useEffect} from 'react';
import { Link }  from 'react-router-dom';
import CurrentLocation from './CurrentLocation';
import {  Form, Input, Radio, List, Typography, Select  } from 'antd';
import { set } from 'mongoose';



export default function SearchPage(){
    const [form] = Form.useForm();
    const [formRange, setFormRange] = useState('1m');
    const [formCoords, setFormCoords] = useState({});
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
   
    const onValuesChanged = ({range, coords}) => {
        setFormRange(range)
        var latestValues = {range: range, coords: coords? coords: formCoords}
        fetchShops(latestValues)
    };
    
    const fetchShops = ({ coords, range })=>{
        setLoading(true)
        fetch(`/.netlify/functions/shopList/?lat=${coords.latitude}&long=${coords.longitude}&radius=${range}`)
            .then(res => res.json())
            .then(response => {
               const  shops = response.data
               setLoading(false)
               setShops(shops) 

            })
            .catch(err => setLoading(false))
    }
    
    const fetchProducts = () => {
        fetch(`/.netlify/functions/productList`)
            .then(res => res.json())
            .then(response => {
            alert(response.data);
               const  products = response.products
               setProducts(products) 

            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchProducts()
      }, []);

    /* this reflect a hack to make the CurrentLocation widget work with the
    Ant forms without too much tomfoolery. Will probably bite us later
    when we do validation. But I did not really understand how to make
    it into a property when all I wanted was a event emit from CurrentLocation */
    function coordsChanged(coords){
        var latlong = {longitude : coords.longitude, latitude: coords.latitude}
        setFormCoords(latlong);
        onValuesChanged({range: formRange, coords:latlong})
    }
    function handleChange(change){
        alert(`Product selected ${change}`);
    }
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
        <Form.Item label="Product to Search" name="product">
        <Select
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="select multiple"
    defaultValue={['Toilet Roll/Paper']}
    onChange={handleChange}
    optionLabelProp="label"
  >
      {products.map((product, i) => {     
           return (<Select.Option value={product} label={product}>
           <div>
             <span role="img" aria-label={product}>
               {product}
             </span>
           </div>
         </Select.Option>) 
        })}
    
    </Select>
        </Form.Item>
        </Form>
        <Link to={`/shop`} activeClassName="active">Not looking for stock, create a shop instead?</Link>
        {/* use loading property to show spinner */}
        <List
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={shops}
            renderItem={shop => (
            <List.Item>
                <Typography.Text mark>[ITEM]</Typography.Text> {shop.name}
            </List.Item>
            )}
        />
        </div>
    )
}