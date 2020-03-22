import React, { useState, useEffect } from 'react';
import { Link }  from 'react-router-dom';
import {  Form, Radio, List, Select  } from 'antd';
import CurrentLocation from './CurrentLocation';

const rangeOptions = [
  { label: '1/2 Mile', value: '1/2m' },
  { label: '1 Mile', value: '1m' },
  { label: '5 Miles', value: '5m' },
];

export default function SearchPage() {
  const [form] = Form.useForm();
  const [range, setRange] = useState('1m');
  const [coordinates, setCoordinates] = useState({});
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  function fetchShops({ latitude, longitude, range }) {
    setLoading(true);
    fetch(`/.netlify/functions/shopList/?lat=${latitude}&long=${longitude}&radius=${range}`)
      .then(res => res.json())
      .then(({ data = [] }) => {
        setLoading(false);
        setShops(data);
      })
      .catch(err => setLoading(false));
  }

  function fetchProducts() {
    fetch(`/.netlify/functions/productList`)
    .then(res => res.json())
    .then(({ data, products }) => {
      alert(data);
      setProducts(products);
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const { latitude, longitude } = coordinates || {};
    if (latitude && longitude && range) {
      fetchShops({ latitude, longitude, range });
    }
  }, [coordinates, range]);

  return (
    <div>
      <CurrentLocation onChange={setCoordinates} />
      <Radio.Group
        value={range}
        defaultValue="1m"
        buttonStyle="solid"
        onChange={e => setRange(e.target.value)}
      >
        {rangeOptions.map(({ label, value }) => (
          <Radio.Button value={value}>{label}</Radio.Button>
        ))}
      </Radio.Group>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="select multiple"
        defaultValue={['Toilet Roll/Paper']}
        onChange={setSelectedProducts}
        optionLabelProp="label"
      >
        {products.map((product, i) => (  
          <Select.Option value={product} label={product}>
            <div>
              <span role="img" aria-label={product}>
                {product}
              </span>
            </div>
          </Select.Option>
        ))}
      </Select>
      <Link to={`/shop`} activeClassName="active">
        Not looking for stock, create a shop instead?
      </Link>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={shops}
        renderItem={shop => (
        <List.Item>
          <Link to={`/stock/${shop.id}`}>{shop.name}</Link>
        </List.Item>
        )}
      />
    </div>
  );
}