import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Select, List, Button, Row } from 'antd';
import without from 'lodash/without';
import { PRODUCTS } from '../../data/products';
import SelectField from './SelectField';

const { Item } = List;

export default function EditStock() {
  const { shopId } = useParams();
  const [shop, setShop] = useState();
  const [shopProducts, setShopProducts] = useState({});
  const [productOptions, setProductOptions] = useState([]);
  const [newProduct, setNewProduct] = useState();
  const [newProductStock, setNewProductStock] = useState();
  const [loading, setLoading] = useState(true);

  function fetchShop(shopId) {
    setLoading(true);
    fetch(`/.netlify/functions/shopRead/?id=${shopId}`)
      .then(response => response.json())
      .then(({ data }) => {
        setShop(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err)
        setLoading(false);
      });
  }

  function updateStock(products) {
    setLoading(true);
    fetch(`/.netlify/functions/stockUpdate/`, {
      method: 'POST',
      body: JSON.stringify({
        id: shopId,
        products,
      }),
    })
      .then(response => response.json())
      .then(() => {
        setShopProducts(products);
        setLoading(false);
      })
      .catch(err => {
        console.error(err)
        setLoading(false);
      });
  }

  function handleAdd() {
    if (newProduct && newProductStock) {
      const products = {
        ...shopProducts,
        [newProduct]: newProductStock,
      };
      updateStock(products);
    }
  }

  function handleStockChange(product) {
    const products = {
      ...shopProducts,
      ...product,
    };
    updateStock(products);
  }

  useEffect(() => {
    fetchShop(shopId);
  }, [shopId]);

  useEffect(() => {
    const { products = {} } = shop || {};
    setShopProducts(products);
  }, [shop]);

  useEffect(() => {
    const options = without(PRODUCTS, ...Object.keys(shopProducts));
    setProductOptions(options);
  }, [shopProducts]);

  return (
    <div>
      <Row>
        <SelectField
          showSearch
          allowClear
          options={productOptions}
          placeholder="Select Product"
          handleChange={setNewProduct}
        />

        <SelectField
          placeholder="Stock"
          options={['none', 'few', 'many']}
          handleChange={setNewProductStock}
        />

        <Button onClick={handleAdd}>Add</Button>
      </Row>
      <Row>
        <List
          bordered
          dataSource={Object.keys(shopProducts)}
          renderItem={productKey => {
            const stock = shopProducts[productKey];
            console.log(stock)
            return (
              <Item>
                { productKey }
                <SelectField
                  placeholder="Stock"
                  options={['none', 'few', 'many']}
                  value={stock}
                  handleChange={value => handleStockChange({
                    [productKey]: value,
                  })}
                />
              </Item>
            );
          }}
        />
      </Row>
      {loading && (<Spin />)}
    </div>
  );
}