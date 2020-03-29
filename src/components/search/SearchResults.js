import React from 'react';
import { Link } from 'react-router-dom';
import { List, Popover } from 'antd';

export default function SearchResults({ results, selectedProducts }) {
  function renderResults(shop) {
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
  }

  return (
    <>
      <List
        header="Items you selected are available on the following stores"
        bordered
        dataSource={results}
        renderItem={renderResults}
      />
    </>
  );
}