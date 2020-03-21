import Shop from './shopModel'
import db from './server' //NEEDED
import shopFormatter from './shopFormatter'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
    // Parse the ID
    const data = JSON.parse(event.body),
          shop = shopFormatter.toMongo(data)
    console.log(JSON.stringify(shop))
    const oldShopDataFound = await Shop.findOneAndUpdate({_id: shop._id}, shop)
    if(oldShopDataFound == null){
      return {
        statusCode: 404,
        body: JSON.stringify({id: shop._id, error: 'Not Found'})
      }
    }
    const response = {
      msg: "Shop successfully updated",
      data: shopFormatter.toUIWithoutProducts(shop)
    }
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch(err) {
    console.log('shop.update', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}