import db from './server' //NEEDED
import Shop from './shopModel'
import shopFormatter from './shopFormatter'
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
    // Use Shop.Model to find all shops
    const shops = await Shop.find(),
          response = {
            msg: "Shops successfully found",
            data: shops.map(shopFormatter.toUIWithoutProducts)
          }
    
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
    
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}