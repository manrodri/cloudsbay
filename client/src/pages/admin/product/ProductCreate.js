import React, {useEffect, useState} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {
    createProduct,

} from "../../../functions/product";

import {
    getCategorySubs,
    getCategories
} from "../../../functions/categories";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

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
    const [loading, setLoading ] = useState(false)
    const [subsOptions, setSubsOptions] = useState([])
    const [showSub, setShowSub] = useState(false)

    useEffect(()=> {
        loadCategories()
    }, [])

    const loadCategories = () => {
        setLoading(true)
        getCategories()
            .then((res)=> {
                setLoading(false)
                setProductValues({ ...productValues, categories: res.data})
            })
            .catch(err => {
                setLoading(false)
                console.log('Error getting categories --->', err)
                if(err.response.status === 400) toast.error(err.response.data)
            })
    }



    const { user } = useSelector((state) => ({...state}))

    const handleSubmit = (e) => {
        e.preventDefault()
        createProduct(productValues, user.token)
            .then(res => {
                // console.log(res)
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

    const handleCategoryChange = (e) => {
        e.preventDefault()
        // console.log('Clicked category', e.target.value)
        setProductValues({...productValues, category: e.target.value, subs: []})
        setLoading(true)
        setShowSub(true)
        getCategorySubs(e.target.value)
            .then(res => {
                // console.log('SUB OPTIONS ON CATEGORY CLICK ==> ', res.data)
                setLoading(false)
                setSubsOptions(res.data)
            })
            .catch(err=> {
                setLoading(false)
                console.log(err)
                if(err.response.status === 400) toast.error(err.response.data)
            })
    }

    const productForm = () => {
        return (
            <ProductCreateForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                values={productValues}
                setValues={setProductValues}
                handleCategorgyChange={handleCategoryChange}
                subOptions={subsOptions}
                showSub={showSub}
            />
        )
    }

    return (
        <div className={'container-fluid'}>
            <div className="row">
                <div className="col-2">
                    <AdminNav/>
                </div>

                <div className="col-10">
                    {loading ? <LoadingOutlined className={'h3'}/> : <h4>Product create</h4>}
                    <div className={'p-3'}>
                        <FileUpload
                            values={productValues}
                            setValues={setProductValues}
                            setLoading={setLoading}
                        />
                    </div>
                    {productForm()}
                </div>
            </div>
        </div>
    )
}

export default ProductCreate;