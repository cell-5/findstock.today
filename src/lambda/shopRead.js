import Shop from './shopModel'
import db from './server' //NEEDED
import shopFormatter from './shopFormatter'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  try {
    // Parse the ID
    const { id } = event.queryStringParameters;
    const oldShopDataFound = await Shop.findOne({_id: id})
    if(oldShopDataFound == null){
      return {
        statusCode: 404,
        body: JSON.stringify({id: id, error: 'Not Found'})
      }
    }
    const response = {
      msg: "Shop read",
      data: shopFormatter.toUIWithoutProducts(oldShopDataFound)
    }
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch(err) {
    console.log('shop.read', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
};