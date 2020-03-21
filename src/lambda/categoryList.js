exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  
  try {
return {
      statusCode: 200,
      body: JSON.stringify({categories: [
        'Grocery', 
        'Supermarket', 
        'Farm', 
        'Pharmacy',
        'Sari-Sari',
        'Cornershop'
      ]})
    }
  } catch (err) {
    console.log('category.list', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}