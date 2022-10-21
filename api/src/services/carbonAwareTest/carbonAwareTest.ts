import { CarbonAwareApi } from 'src/lib/carbon-aware-api/api'

export const carbonAwareTest = async ({
  locations,
}: {
  locations: string[]
}) => {
  try {
    const baseUri = process.env.CARBON_AWARE_API_BASE_URI
    if (!baseUri) {
      throw new Error(
        "Missing 'CARBON_AWARE_API_BASE_URI' environment variable"
      )
    }
    const api = new CarbonAwareApi(baseUri)
    const response = await api.getBestEmissionsDataForLocationsByTime(locations)

    return {
      statusCode: 200,
      response: JSON.stringify(response.body),
    }
  } catch (e) {
    console.log('error', e)
  }

  return {
    statusCode: 400,
    response: 'Error',
  }
}
