export default class AviasalesApiService {
  url = 'https://front-test.dev.aviasales.ru'

  getSearchId = async () => {
    const response = await fetch(`${this.url}/search`)
    if (!response.ok) throw new Error(`Failed to load search id. Status: ${response.status}`)
    const body = await response.json()
    return body
  }

  getTickets = async (searchId) => {
    const response = await fetch(`${this.url}/tickets?searchId=${searchId}`)
    if (!response.ok) {
      throw new Error(response.status)
    }
    const body = await response.json()
    return body
  }
}
