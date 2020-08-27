export default function getj (uri) {
  return new Promise((resolve, reject) => {
    fetch(uri)
      .then(function (response) {
        // The API call was successful!
        return response.text()
      })
      .then(function (html) {
        // This is the HTML from our response as a text string
        var parser = new DOMParser()
        var doc = parser.parseFromString(html, 'text/html')
        var script = doc.querySelectorAll(
          '[type="application/ld+json"], [type="application/json"]'
        )
        var json = JSON.parse(script[0].text)
        var fragid = uri.split('#').pop()
        var found = findById('#' + fragid, json)
        if (fragid && found) {
          json = found
        }
        resolve(json)
      })
      .catch(function (err) {
        // There was an error
        reject('Something went wrong.', err)
      })
  })
}

function findById (subject, arr) {
  return arr.find(a => {
    if (a.children && a.children.length > 0) {
      return a['@id'] === subject ? true : findById(a.children, subject)
    } else {
      return a['@id'] === subject
    }
  })
}
