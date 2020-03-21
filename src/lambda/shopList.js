import db from './server' //NEEDED
import Shop from './shopModel'
import shopFormatter from './shopFormatter'
exports.handler = async (event, context) => {
 
  context.callbackWaitsForEmptyEventLoop = false
  const { lat, long, radius } = event.queryStringParameters
  var meters;

  switch(radius) {
    case "1/2mile":
      meters = 804.672
      break;
    case "1mile":
      meters = 1609.34
      break;
    case "5mile":
      meters = 8046.72
      break;  
    default:
      meters= 1609.34
  }

  try {
    const shops = await Shop.find({
      geo: {
      $near: {
          $geometry: {
              type: "Point",
              coordinates: [lat, long ]
          },
          $maxDistance: meters
      }
     }
    }),
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