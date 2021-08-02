import React, {useEffect, useState} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {
    createProduct,

} from "../../../functions/product";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {Link} from 'react-router-dom'
import CategoryForm from "../../../components/forms/categoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const initialState = {
    title: 'MackBook Pro',
    description: 'This is the best Apple laptop',
    price: "4000",
    categories: [],
    category: "Apple",
    subs: [],
    shipping: "Yes",
    quantity: "50",
    images: [],
    colors: ["Blue", "Black", "Brown", "Silver", "White"],
    brands: ["Apple", "Microsoft", "Samsung", "Lenovo", "Asus"],
    color: 'White',
    brand: 'Apple'

}

const ProductCreate = ({history}) => {

    const [productValues, setProductValues] = useState(initialState)

    const {
        title,
        description,
        price,
        categories,
        category,
        subs,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand
    } = productValues

    const { user } = useSelector((state) => ({...state}))

    const handleSubmit = (e) => {
        e.preventDefault()
        createProduct(productValues, user.token)
            .then(res => {
                console.log(res)
                toast.success("Product created")
                // window.alert(`${res.data.title} created`)
                // setProductValues(initialState)
                history.push('/admin/products')
            })
            .catch(err=> {
                console.log(err)
                // if(err.response.status === 400) toast.error(err.message)
                toast.error(err.response.data.err)
            })
    }
    const handleChange = (e) => {
        setProductValues({...productValues, [e.target.name]: e.target.value})
    }

    const productForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="">Title</label>
                    <input
                        type="text"
                        name={'title'}
                        className={'form-control'}
                        value={title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Description</label>
                    <input
                        type="text"
                        name={'description'}
                        className={'form-control'}
                        value={description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Price</label>
                    <input
                        type="text"
                        name={'price'}
                        className={'form-control'}
                        value={price}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="">Category</label>
                    <input
                        type="text"
                        name={'category'}
                        className={'form-control'}
                        value={category}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Quantity</label>
                    <input
                        type="number"
                        name={'quantity'}
                        className={'form-control'}
                        value={quantity}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Shipping</label>
                    <select
                        name={'shipping'}
                        className={'form-control'}
                        onChange={handleChange}
                    >
                        <option>Please select</option>
                        <option value="Yes" >Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="">Color</label>
                    <select
                        name={'color'}
                        className={'form-control'}
                        onChange={handleChange}
                    >
                        <option>Please select</option>
                        { colors.map(c => {
                            return (
                                <option key={c} value={c}>{c}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="">Brand</label>
                    <select
                        name={'brand'}
                        className={'form-control'}
                        onChange={handleChange}
                    >
                        <option>Please select</option>
                        { brands.map(b => {
                            return (
                                <option key={b} value={b}>{b}</option>
                            )
                        })}
                    </select>
                </div>
                <button className={'btn btn-outline-info'}>Save</button>


            </form>
        )
    }

    return (
        <div className={'container-fluid'}>
            <div className="row">
                <div className="col-2">
                    <AdminNav/>
                </div>

                <div className="col-10">
                    <h4>Product create</h4>
                    {productForm()}
                </div>
            </div>
        </div>
    )
}

export default ProductCreate;