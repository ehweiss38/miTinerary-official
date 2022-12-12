import axios from 'axios'

export default axios.create({
    baseURL:'https://api.unsplash.com/',
    headers:{
        Authorization: 'Client-ID lLCbrEqyNXkSNiAvGh0s-uQxUNZpsXsuSuAcO5xQFB4'
    }
})