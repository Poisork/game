import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://starnavi-frontend-test-task.herokuapp.com/'
})

export const getInstanceAPI = async (query, method, requestData) => { 
    try {
        const res = await instance[method](`${query}`, requestData)
        return res.data
    } catch (err) {  
        console.error(err)
        return err
    }
} 
