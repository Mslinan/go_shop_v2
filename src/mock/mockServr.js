import Mock from 'mockjs'
import data from './data.json'

Mock.mock( '/api/goods', {code: 0, data: data.goods} )
Mock.mock( '/api/rating', {code: 0, data: data.ratings} )
Mock.mock( '/api/info', {code: 0, data: data.info} )

console.log('mockServe...')


