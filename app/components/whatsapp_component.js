
export function send_message() {
    var botId = '337115706152549';
    var phoneNbr = '56950989946';
    var bearerToken = 'EAASfq36BeLUBO5FGv9ZCOVtIj4ZATsPQYZAFHMc7HGR5kWNbpyq3CzQ88ZC8OAo1YKJdrzUFrAt9naMIyFWlnb4eAOFhZAJ0mpoafJtHJ336pi8TRrXMnk9FZBGK2IkdjZAUItOm8ab7MmKdJmY6tjA1hZCD5URGB0a3yLkeJtG7EhJseuVddRknarRQ2WlSTEYGjQMnWj8DmEEmEEWVnL8ZD';
    var url = 'https://graph.facebook.com/v15.0/' + botId + '/messages';
    var data = {
      messaging_product: 'whatsapp',
      to: phoneNbr,
      type: 'template',
      template: {
        name:'hello_world',
        language:{ code: 'en_US' }
      }
    };
    var postReq = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + bearerToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      json: true
    };
    fetch(url, postReq)
      .then(data => {
        return data.json()
      })
      .then(res => {
        console.log(res)
      })
      .catch(error => console.log(error));
  }