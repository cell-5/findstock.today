exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
return {
      statusCode: 200,
      body: JSON.stringify({products: [
        'Toilet Paper/Roll', 
        'Soap', 
        'Wet wipes', 
        'Disinfectant',
        'Paracetamol',
        'Lemons',
        'Milk',
        'Bread',
        'Rice',
        'Pasta',
      ]})
    }
  } catch (err) {
    console.log('product.list', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}