import Shop from './shopModel'
import db from './server' //NEEDED
import shopFormatter from './shopFormatter'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
    // Parse the ID
    const {id} = JSON.parse(event.body)
    const oldShop = await Shop.findOne({_id: id})
    if(oldShop == null){
      return {
        statusCode: 404,
        body: JSON.stringify({id: id, error: 'Not Found'})
      }
    }
    const response = {
      msg: "Got Stock",
      data: { id: id, products: oldShop.products}
    }
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch(err) {
    console.log('stock.list', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}