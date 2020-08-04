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
        resolve(JSON.parse(script[0].text))
      })
      .catch(function (err) {
        // There was an error
        reject('Something went wrong.', err)
      })
  })
}
