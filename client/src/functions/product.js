import axios from "axios";

export const getProducts = async () => await axios.get(`${process.env.REACT_APP_API}/product`);


export const getProductsByCount = async (count) =>
    await axios.get(`${process.env.REACT_APP_API}/product/${count}`);


export const getProduct = async (slug) => await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)

export const removeProduct = async (slug, authToken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers: {
            authToken,
        }
    })
}

export const createProduct = async (product, authToken) => {
     return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: {
            authToken
        }
    })
}

export const updateProduct = async (slug, product, authToken) => {
    return await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
        headers: {
            authToken
        }
    })
}

