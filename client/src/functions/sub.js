import axios from "axios";

export const getSubcategories = async () =>
    await axios.get(`${process.env.REACT_APP_API}/sub`);

export const getSubCategory = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`)

export const removeSubcategory = async (slug, authToken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
        headers: {
            authToken,
        }
    })
}

export const createSubcategory = async (sub, authToken) => {
     return await axios.post(`${process.env.REACT_APP_API}/sub`, sub, {
        headers: {
            authToken
        }
    })
}

export const editSubcategory = async (slug, sub, authToken) => {
    return await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, sub, {
        headers: {
            authToken
        }
    })
}