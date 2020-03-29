var API_KEY = 'KEY'
var DOMAIN = 'cell5.co.uk';
var mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });


const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'harry@cell5.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!'
};



exports.handler = async (event, context) => {
    // context.callbackWaitsForEmptyEventLoop = false
    // return { statusCode: 200}

    console.log(event)
    try {

        // Parse the ID
        await mailgun.messages().send(data, function (error, body) {
            console.log("WHATS HERE", body);

        });

    } catch (err) {
        console.log('stock.list', err) // output to netlify function log
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: err.message })
        }
    }
}