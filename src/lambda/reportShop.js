
var mailgun = require('mailgun-js')({ apiKey:  process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

exports.handler = async (event, context) => {
    const body = event.body
    try {
        const email = {
            from: `admin <me@${process.env.MAILGUN_RECIPIENT}}>`,
            to: process.env.MAILGUN_RECIPIENT,
            subject: 'Hello',
            text: `ShopID:  ${body.shopId}
            Reason: ${body.reason}`};

        await mailgun.messages().send(email);
        return {
            statusCode: 200
        }

    } catch (err) {
        console.log('Error emailing report of shop', err) 
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: err.message })
        }
    }
}