import axios from 'axios'

export const api = {
    async login(formData) {
        try {
            const response = await axios.post(
                'https://api.demo.cargo-speed.pl/demo/api/v1/login/access_token',
                `grant_type=password&username=${formData.username}&password=${formData.password}`
            )
            return response
        } catch (e) {
            return e.response
        }
    },

    async getOrders() {
        const token = sessionStorage['accessToken']
        try {
            const response = await axios.get('https://api.demo.cargo-speed.pl/demo/api/v1/orders/many', {
                headers: { Authorization: `Bearer ${token}` },
            })
            return response
        } catch (e) {
            return e.response
        }
    },

    async getRoute(source, destination) {
        try {
            const response = await axios.get(
                `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248e866aa5d7899451aa8e13709ccea605c&start=${source.lon},${source.lat}&end=${destination.lon},${destination.lat}`
            )
            return response
        } catch (e) {
            return e.response
        }
    },

    async getRoutePoint({ lon, lat }) {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=pl`
            )
            return response
        } catch (e) {
            return e.response
        }
    },
}
