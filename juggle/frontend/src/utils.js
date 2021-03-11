const sendEntryRequest = (formElement, method) => {
  let formInputs = Array.from(formElement.getElementsByTagName('input'))
  let data = Object.fromEntries(formInputs.map(entry => [entry.name, entry.value]))
  let url = 'api/entries'
  let params = { method: method }
  if (['DELETE', 'PUT'].includes(method)) { // Add Entry ID to URL
    url += '/' + data.id
  }
  if (['POST', 'PUT'].includes(method)) { // Add JSON body
    params.body = JSON.stringify(data)
    params.headers = { 'Content-Type': 'application/json' }
  }
  fetch(url, params).then(response => {
    return response.json()
  }).then(data => {
    console.log('data:', data);
  })
}

const helpers = {
  sendEntryRequest: sendEntryRequest,
}
export default helpers