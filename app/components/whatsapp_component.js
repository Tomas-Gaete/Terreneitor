import { sql } from '@vercel/postgres';

//WITH name_query AS(
//  SELECT id
//  FROM user_info
//  WHERE firstname = 'Tomás')
//  SELECT cellphone FROM resident
//  WHERE user_id = (SELECT id FROM name_query);
export async function send_message() {
    var botId = '337115706152549';
    var phoneNbr = '56950989946';
    var bearerToken = 'EAASfq36BeLUBO5J3CXytZBiLvjhHGXzBMwUmgEg4rx9sfOFlarqJXd2Mkwa7C6RCCQPBDBYbUnd3oZBHn96VzCyKiRL7PrdfyR7pmNgUoA5r4HZBmCfdcEEbCHyUclegC5mh9BadJdcEn4e0oEtCFWa08VWnlEWoZAapo0N3YSY0qpGZCxSDh0S2QOiTd1iaCemTlmTPQgjhf837dYCkZD';
    var url = 'https://graph.facebook.com/v15.0/' + botId + '/messages';
    var data = {
      messaging_product: 'whatsapp',
      to: phoneNbr,
      type: 'template',
      template: {
        name:'confirmacion',
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