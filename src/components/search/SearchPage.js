import React, { useState, useEffect } from 'react';
import { Link }  from 'react-router-dom';
import { Radio, List, Select, Popover, Col, Row, Form, Typography } from 'antd';
import sortBy from 'lodash/sortBy';
import CurrentLocation from './CurrentLocation';
import { TOILET_PAPER } from '../../data/products';
import AutoComplete from '../google/AutoComplete';

const rangeOptions = [
  { label: '1/2 Mile', value: '1/2m' },
  { label: '1 Mile', value: '1m' },
  { label: '5 Miles', value: '5m' },
];

export default function SearchPage() {
  const [range, setRange] = useState('1m');
  const [coordinates, setCoordinates] = useState({});
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([TOILET_PAPER]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  function fetchShops({ latitude, longitude, range }) {
    setLoading(true);
    fetch(`/.netlify/functions/shopList/?lat=${latitude}&long=${longitude}&radius=${range}`)
      .then(res => res.json())
      .then(({ data = [] }) => {
        setShops(data);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }

  function fetchProducts() {
    setLoading(true);
    fetch(`/.netlify/functions/productList`)
      .then(res => res.json())
      .then(({ products }) => {
        setProducts(products);
        setLoading(false);
      })
      .catch(err => setLoading(false));
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

  useEffect(() => {
    const shopsWithStats = shops.map(shop => {
      let match = 0;
      const { products } = shop || {};
      if (products) {
        Object.keys(products).forEach(key => {
          const availability = products[key];
          if (selectedProducts.includes(key) && availability !== 'none') {
            match += 1;
          }
        })
      }
      return { ...shop, match };
    });
    setResults(sortBy(shopsWithStats, ['match']));
  }, [selectedProducts, shops]);

  return (
    <div>
      <Form initialValues={{
        range: "1m",
        products: [TOILET_PAPER]

      }}>
          <Typography.Title level={2}>Find local stock / supplies</Typography.Title>
     <Form.Item
        label="Choose location"
        name="location"
      >
        <div className="googleAutocomplete" style={{"display": "flex", flexDirection: "row"}}>
      <AutoComplete 
        onPlaceSelected={e =>setCoordinates({latitude: e.geometry.location.lat(), longitude: e.geometry.location.lng()})} 
        types={['geocode']} />
           <CurrentLocation onChange={setCoordinates} />
        </div>
      </Form.Item>
      <Form.Item
        label="Choose distance"
        name="range"
      >
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
      </Form.Item>
      <Form.Item
        label="Choose products"
        name="products"
      >
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="select multiple"
        value={selectedProducts}
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
      </Form.Item>
      </Form>
      <Link to={`/shop`} activeClassName="active">
        Not looking for stock, create a shop instead?
      </Link>
      <List
        header="Items you selected are available on the following stores"
        bordered
        dataSource={results}
        renderItem={shop => {
          let stats = 'No product match';
          const { id: shopId, name, products } = shop;
          if (products) {
            stats = '';
            Object.keys(products).forEach(key => {
              if (selectedProducts.includes(key)) {
                stats += `${key}: ${products[key]}\t`
              }
            });
          }
          return (
            <List.Item>
              <Link to={`/stock/${shopId}`}>{name}</Link>
              <Popover title={stats}>
                Match {shop.match}
              </Popover>
            </List.Item>
          );
        }}
      />
    </div>
  );
}