import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Table } from 'antd';

export default function StockPage(props) {
  const { shopId } = useParams();
  const [shop, setShop] = useState();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    { title: 'Products', dataIndex: 'label' },
    { title: 'Stock', dataIndex: 'value' },
  ];

  useEffect(() => {
    fetchShop({ shopId });
  }, [shopId]);

  useEffect(() => {
    const { products = [] } = shop || {};
    const rows = products.map((product, index) => {
      return { ...product, key: index };
    });
    setDataSource(rows);
  }, [shop]);

  const fetchShop = ({ shopId }) => {
    setLoading(true);
    fetch(`/.netlify/functions/shopRead/?id=${shopId}`)
      .then(response => response.json())
      .then(({ data }) => {
        setShop(data);
      })
      .catch(err => setLoading(false));
  }

  return (
    <div>
      <h2>{shop ? shop.name : 'Not Found'}</h2>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}