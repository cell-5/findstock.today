import Shop from './shopModel'
import db from './server' //NEEDED
import shopFormatter from './shopFormatter'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
    // Parse the ID
    const {products, id} = JSON.parse(event.body)
    const oldShop = await Shop.findOne({_id: id})
    if(oldShop == null){
      return {
        statusCode: 404,
        body: JSON.stringify({id: id, error: 'Not Found'})
      }
    }
    oldShop.products = products
    const oldShopDataFound = await Shop.findOneAndUpdate({_id: id}, oldShop)
    if(oldShopDataFound == null){
      return {
        statusCode: 404,
        body: JSON.stringify({id: id, error: 'Not Updated'})
      }
    }
    const response = {
      msg: "Shop successfully updated",
      data: { id: id, products: products}
    }
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch(err) {
    console.log('stock.update', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}