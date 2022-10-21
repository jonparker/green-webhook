import got from 'got'

export const forwardWebhook = async ({ payload, endpoint, secret }) => {
  try {
    console.log(`Calling ${endpoint}`)

    const forwardResponse = await got.post(endpoint, {
      responseType: 'json',
      headers: {
        'X-Green-Webhook-Signature': secret,
      },
      json: {
        payload,
      },
    })

    return {
      statusCode: 200,
      response: JSON.stringify(forwardResponse.body),
    }
  } catch (e) {
    console.log('error', e)
  }

  return {
    statusCode: 400,
    response: 'Error',
  }
}
