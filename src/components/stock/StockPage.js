import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

export default function StockPage(props) {
  const { shopId } = useParams();
  const [shop, setShop] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchShop({ shopId });
  }, [shopId]);

  useEffect(() => {

  }, [shop]);

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

  return (
    <div>
      This is the page to list stock for a specific shop ( passed in URL)
      Also would be good to have human readable permalink to shop.
    </div>
  );
}