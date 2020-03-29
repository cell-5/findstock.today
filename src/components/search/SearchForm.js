import React from 'react';
import { Form, Typography, Radio, Select } from 'antd';
import CurrentLocation from './CurrentLocation';
import AutoComplete from '../google/AutoComplete';
import { TOILET_PAPER } from '../../data/products';

const rangeOptions = [
  { label: '1/2 Mile', value: '1/2m' },
  { label: '1 Mile', value: '1m' },
  { label: '5 Miles', value: '5m' },
];

export default function SearchForm(props) {
  const {
    range,
    products,
    selectedProducts,
    setRange,
    setCoordinates,
    setSelectedProducts,
  } = props;

  return (
    <>
      <Form initialValues={{
        range: "1m",
        products: [TOILET_PAPER]
      }}>
        <Typography.Title level={2}>Find local stock / supplies</Typography.Title>

        <Form.Item
          label="Choose location"
          name="location"
        >
          <div
            className="googleAutocomplete"
            style={{"display": "flex", "flex-direction": "row"}}
          >
            <AutoComplete 
              onPlaceSelected={e => setCoordinates({
                latitude: e.geometry.location.lat(),
                longitude: e.geometry.location.lng(),
              })} 
              types={['geocode']}
            />
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
    </>
  )
}