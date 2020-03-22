import reduce from 'ramda/src/reduce'
import filter from 'ramda/src/filter'
import map from 'ramda/src/map'
import split  from 'ramda/src/split'
import pipe  from 'ramda/src/pipe'
import propOr  from 'ramda/src/propOr'
import partial from 'ramda/src/partial'
import { mongo } from 'mongoose'

const metaTagSeparator = ':::'
const prefix = (prefix, original) => `${prefix}${metaTagSeparator}${original}`
const tagFromCategory = partial(prefix, ['category'])
const tagFromLink = partial(prefix, ['link'])
const filterMetaTags = filter(tag => tag.indexOf(':::') > 0)
const metaTagsToTypeTagPairs = map(split(metaTagSeparator))
const typeTagPairs = reduce((acc,kv)=> {
  var k = kv[0], v = kv[1]
  acc[k] = propOr([],k, acc)
  acc[k].push(v)
  return acc;
})

function toMongo(from){ 
  return {
    _id: from.id,
    name: from.name,
    geo: from.geo,
    address: from.address,
    active: from.active,
    postcode: from.postcode,
    openingHours: from.openingHours,
    products: from.products,
    slug: from.slug,
    tags: [
      ...from.categories.map(tagFromCategory), 
      ...from.links.map(tagFromLink)],
    __v: from.version
  }}

function fromMongoToUI(mongoShopResponse){
  const typeTagsFromTags = pipe(filterMetaTags, metaTagsToTypeTagPairs,typeTagPairs({}))
  var typedTags = typeTagsFromTags(mongoShopResponse.tags)
  return {
    id: mongoShopResponse._id,
    version: mongoShopResponse.__v,
    name: mongoShopResponse.name,
    geo: mongoShopResponse.geo,
    address: mongoShopResponse.address,
    active: mongoShopResponse.active,
    postcode: mongoShopResponse.postcode,
    openingHours: mongoShopResponse.openingHours,
    slug: mongoShopResponse.slug,
    products: mongoShopResponse.products,
    categories: propOr([],'category', typedTags),
    links: propOr([],'link', typedTags),
  }
}

function toUI(mongoShopResponse){
  var response = fromMongoToUI(mongoShopResponse)
  response.products = mongoShopResponse.products
  return response
}

function toUIWithoutProducts(mongoShopResponse){
  var response = fromMongoToUI(mongoShopResponse)
  return response
}
export default { 
  toUI: toUI, 
  toMongo: toMongo, 
  toUIWithoutProducts: toUIWithoutProducts
}
