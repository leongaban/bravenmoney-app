import type { CoinSummary } from '../types'

const API_BASE_URL = import.meta.env.VITE_COIN_GECKO_BASE_URL
const API_KEY = import.meta.env.VITE_COIN_GECKO_API_KEY

const headers = {
  accept: 'application/json',
  'x-cg-demo-api-key': API_KEY
}

export const getCryptoCoinsList = async (): Promise<CoinSummary[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/coins/list`, {
      method: 'GET',
      headers
    })

    if (!response.ok) {
      throw new Error(`Error fetching the crypto coins list: ${response.statusText}`)
    }

    const data: CoinSummary[] = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching the crypto coins list:', error)
    throw error
  }
}
