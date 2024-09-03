import axios from "axios";
import { config } from "config";
import { CheckoutData } from "types/types";



export const ventiService = {

  checkOut: async () => {
    const checkoutsData = await axios.get(`${config.VENTI_API_URL}/checkouts`, {
      auth: {
        username: config.VENTI_SECRET_KEY,
        password: ''
      }
    })

    const { data } = checkoutsData

    return data
  },

  checkOutById: async (id: string) => {
    const checkoutsData = await axios.get(`${config.VENTI_API_URL}/checkouts/${id}`, {
      auth: {
        username: config.VENTI_SECRET_KEY,
        password: ''
      }
    })

    const { data, status } = checkoutsData

    if (status === 404) {
      return null
    }

    return data
  },

  createCheckout: async (checkoutData: CheckoutData) => {
    const checkoutsData = await axios.post(`${config.VENTI_API_URL}/checkouts`, checkoutData, {
      auth: {
        username: config.VENTI_SECRET_KEY,
        password: ''
      }
    })

    const { data } = checkoutsData

    return data
  },

  createClient: async (clientData: { name: string, email: string, country: string }) => {

    const { name, email, country } = clientData
    console.log(clientData)
    const clientsData = await axios.post(`${config.VENTI_API_URL}/customers`, { email: email, country: 'cl', first_name: name }, {
      auth: {
        username: config.VENTI_SECRET_KEY,
        password: ''
      }
    })

    const { data, status, statusText } = clientsData

    if (status === 400) {
      return null
    }

    return data
  }
}
