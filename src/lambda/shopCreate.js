import mongoose from 'mongoose'
import db from './server' //NEEDED
import { mongo } from 'mongoose'
import Shop from './shopModel'
import shopFormatter from './shopFormatter'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  try {
    const payload =  JSON.parse(event.body)
    payload.version = 0
    payload.id = mongoose.Types.ObjectId()
    const result = shopFormatter.toMongo(payload)
    const mongoCreatedShop = await Shop.create(result)
    if(mongoCreatedShop == null){
      return {
        statusCode: 500,
        body: JSON.stringify({id: payload.id, error: 'Not Saved'})
      }
    }
    const response = {
      msg: "Shop successfully created",
      data: shopFormatter.toUIWithoutProducts(mongoCreatedShop)
    }
    return {
      statusCode: 201,
      body: JSON.stringify(response)
    }
  } catch (err) {
    console.log('shop.create', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}