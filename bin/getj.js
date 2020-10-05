#!/usr/bin/env node
var fetch = require('node-fetch')
var DOMParser = require('dom-parser')
var querySelectorAll = require('query-selector')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
var cheerio = require('cheerio')
var argv = require('minimist')(process.argv.slice(2))

globalThis.defaults = {
  uri: 'https://www.bbc.com/news/av/world-europe-54394128'
}
var uri = argv._[0] || defaults.uri
var match = argv.match
// console.log(argv)

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
        if (
          j.name === 'type' &&
          (j.value === 'application/ld+json' || j.value === 'application/json')
        ) {
          var json = JSON.parse(i.innerHTML)
          if (match) {
            var values = Object.values(json)
            values.forEach(i => {
              if (Array.isArray(i)) {
                i.forEach(j => {
                  if (j?.toString().match(match)) console.log(j)
                })
              } else {
                if (i?.toString().match(match)) console.log(i)
              }
            })
          } else {
            console.log(JSON.stringify(json, null, 2))
          }
        }
      })
    })
  })
  .catch(function (err) {
    // There was an error
    console.error(err)
  })
