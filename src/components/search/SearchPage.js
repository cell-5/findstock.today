import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import sortBy from 'lodash/sortBy';
import SearchFrom from './SearchForm';
import SearchResults from './SearchResults';
import { TOILET_PAPER } from '../../data/products';


// const layout = {
//   labelCol: { span: 8 },
//   // wrapperCol: { span: 16 },
// };

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
      <SearchFrom
        range={range}
        products={products}
        selectedProducts={selectedProducts}
        setRange={setRange}
        setCoordinates={setCoordinates}
        setSelectedProducts={setSelectedProducts}
      />
      <Link to={`/shop`} activeClassName="active">
        Not looking for stock, create a shop instead?
      </Link>
      <SearchResults
        results={results}
        selectedProducts={selectedProducts}
      />
    </div >
  );
}