[![npm version](https://badge.fury.io/js/getj.svg)](https://badge.fury.io/js/getj)

# getj

## `getj(uri: string): Promise<Object>`

The `getj` function is an asynchronous function that retrieves JSON-LD or JSON data from a given URI.

### Parameters

- `uri` (string): The URI from which to fetch the JSON-LD or JSON data.

### Returns

- A Promise that resolves to the JSON-LD or JSON object found in the fetched document.

### Usage

```javascript
import getj from 'getj'

getj('https://example.com')
  .then(json => {
    console.log(json)
  })
  .catch(error => {
    console.error('Error:', error)
  })
```

### Demo

[Try the demo](./test.html)

### Description

The `getj` function takes a URI as input and performs the following steps:

1. Fetches the document at the given URI.
2. Parses the fetched document into a DOM structure.
3. Searches for a `<script>` element with a `type` attribute of "application/ld+json" or "application/json".
4. If found, parses the content of the `<script>` element into a JSON object.
5. If a fragment identifier is present in the input URI, searches for a nested object with a matching ID or '@id' property within the JSON object.
6. Returns the matching nested object if found, or the entire JSON object if no fragment identifier is present or no matching object is found.
