import axios from 'axios'

export const refreshToken = async () => {
    try {
        const response = await axios.post(
            'https://api.demo.cargo-speed.pl/demo/api/v1/login/access_token',
            'grant_type=refresh_token'
        )
    } catch (e) {
    }
}
