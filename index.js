'use strict';

const Wreck = require('wreck')
let wreck

class Billplz {

  constructor(options) {

    this._apiKey = null
    this._apiEndpoint = 'https://www.billplz.com/api/v3/'
    this._sandboxApiEndpoint = 'https://billplz-staging.herokuapp.com/api/v3/'
    this._isSandbox = false

    if (typeof options === 'object') {
      this._apiKey = options.key || this._apiKey
      this._apiEndpoint = options.endpoint || this._apiEndpoint
      this._sandboxApiEndpoint = options.sandboxEndpoint || this._sandboxApiEndpoint
      this._isSandbox = options.sandbox || this._isSandbox
    }
    else {
      this._apiKey = options
    }

    if (this._isSandbox) {
      this._apiEndpoint = this._sandboxApiEndpoint
    }

    wreck =  Wreck.defaults({
      headers: { 'Authorization': 'Basic ' + new Buffer(this._apiKey).toString('base64') }
    });
  }

  request(method, params, callback) {
    wreck.post(this._apiEndpoint + method, {
        payload: params
      }, (err, res, payload) => {
        callback(err, JSON.parse(payload.toString()))
    });
  }

  //create collection
  create_collection(params, callback) {
    return this.request('collections', params, callback)
  }

  //create open collection
  create_collectionOpen(params, callback) {
    return this.request('open_collections', params, callback)
  }

  //create bill
  create_bill(params, callback) {
    return this.request('bills', params, callback)
  }

  //get bill
  get_bill(billId, callback) {
    wreck.get(this._apiEndpoint + 'bills/' + billId, (err, res, payload) => {
      callback(err, JSON.parse(payload.toString()))
    });
  }

  //delete bill
  delete_bill(billId, callback) {
    wreck.delete(this._apiEndpoint + 'bills/' + billId, (err, res, payload) => {
      callback(err, JSON.parse(payload.toString()))
    });
  }

  //payment confirmation
  webhook(postData) {
    //TODO
  }

}