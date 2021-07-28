import axios from "axios";

export const getCategories = async () => await axios.get(`${process.env.REACT_APP_API}/category`);

export const getCategory = async (slug) => await axios.get(`${process.env.REACT_APP_API}/category/${slug}`)

export const removeCategory = async (slug, authToken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
        headers: {
            authToken,
        }
    })
}

export const createCategory = async (category, authToken) => {
     return await axios.post(`${process.env.REACT_APP_API}/category`, category, {
        headers: {
            authToken
        }
    })
}

export const editCategory = async (slug, category, authToken) => {
    await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category, {
        headers: {
            authToken
        }
    })
}