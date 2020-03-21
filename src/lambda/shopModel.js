import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
        name: {
          type: String,
          required: [true, 'Name field is required'],
          max: 100
        },
        products: {
          type: Map,
          of: String,
          enum: ['none', 'few', 'many'],
        },
        tags: {
          type: [String]
        },
        address: {
          type: String,
        },
        postcode: {
          type: String,
        },
        geo: {type: [Number], index: '2d'},
        active: {type: [Boolean], default: true},
        openingHours: {
          type: Map,
          of: [String],
        },
      }),
      Shop = mongoose.model('shop', schema)
export default Shop