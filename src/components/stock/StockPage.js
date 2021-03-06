import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Table, Spin, Typography} from 'antd';
import ReportShop from '../shop/ReportShop';

export default function StockPage(props) {
  const { shopId } = useParams();
  const [shop, setShop] = useState();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [openHours, setOpenHours] = useState([]);
  const columns = [
    { title: 'Products', dataIndex: 'label' },
    { title: 'Stock', dataIndex: 'value' },
  ];

  const openHoursColumns = [
    { title: 'Day', dataIndex: 'label' },
    { title: 'Hours Open', dataIndex: 'value' },
  ];

  useEffect(() => {
    fetchShop({ shopId });
  }, [shopId]);

  useEffect(() => {
    const { products = {}, openingHours = {} } = shop || {};
    // const rows = Object.keys(products).map((key, index) => {
    //   return { label: key, value: products[key], key: index };
    // });
    setDataSource(rows(products));
    setOpenHours(rows(openingHours));
    setLoading(false);
  }, [shop]);

  const rows = (obj) => {
    return Object.keys(obj).map((key, index) => {
      if(Array.isArray(obj[key])){
        return { label: key, value: obj[key][0] + ' to ' + obj[key][1], key: index };
      }
      return { label: key, value: obj[key], key: index };
    })
  };

  const fetchShop = ({ shopId }) => {
    setLoading(true);
    fetch(`/.netlify/functions/shopRead/?id=${shopId}`)
      .then(response => response.json())
      .then(({ data }) => {
        setShop(data);
        console.log(data);
      })
      .catch(err => setLoading(false));
  }

  if (loading) {
    return <Spin />;
  }

  return (
    <>
      <Typography.Title level={2}>{shop ? `${shop.name}: Inventory` : 'Not Found'}</Typography.Title>
      <a href={shop ? shop.links[0] : '/'}>Go to shop website</a>
      <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Table dataSource={dataSource} columns={columns} />
        <Table dataSource={openHours} columns={openHoursColumns} />
      </div>
      <Link to={`/stock/${shopId}/edit`}>Edit Inventory</Link>
      <ReportShop shopId={shopId}/>
    </>
  );
}