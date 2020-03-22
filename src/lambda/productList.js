import { PRODUCTS } from '../data/products';

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ products: PRODUCTS }),
    };
  } catch (err) {
    console.log('product.list', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
};