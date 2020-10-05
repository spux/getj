#!/usr/bin/env node
var fetch = require('node-fetch')
var DOMParser = require('dom-parser')
var querySelectorAll = require('query-selector')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
var cheerio = require('cheerio')

var uri = process.argv[2] || 'https://www.bbc.com/news/av/world-europe-54394128'

// console.log('fetching', uri)

fetch(uri)
  .then(function (response) {
    // The API call was successful!
    return response.text()
  })
  .then(function (html) {
    var parser = new DOMParser()
    var dom = parser.parseFromString(html)

    var scripts = dom.getElementsByTagName('script')
    scripts.forEach(i => {
      var attributes = i.attributes
      attributes.forEach(j => {
        if (j.name === 'type' && j.value === 'application/ld+json') {
          console.log(JSON.stringify(JSON.parse(i.innerHTML), null, 2))
        }
      })
    })
  })
  .catch(function (err) {
    // There was an error
    console.error(err)
  })
