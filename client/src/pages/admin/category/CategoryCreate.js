import React, {useEffect, useState} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector, useDispatch} from "react-redux";
import {createCategory, getCategories, removeCategory} from "../../../functions/categories";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {Link} from 'react-router-dom'
import CategoryForm from "../../../components/forms/categoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        loadCategories()
    }, [])


    const loadCategories = () =>
        getCategories().then(res => setCategories(res.data)).catch(err => console.log(err))

    const {user} = useSelector(state => ({...state}))

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        createCategory({name}, user.token)
            .then((res) => {
                setLoading(false)
                setName('')
                toast.success(`"${res.data.name}" created`);
                setLoading(true)
                loadCategories()
                    .then(res => {
                        setLoading(false)
                    })
                    .catch(err => {
                        console.log(err)
                        setLoading(false)
                    })
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
                if (err.response.status === 400) toast.error(err.response.data)
            })
        //
        console.log(name)
    }

    const handleRemove = async slug => {
        if (window.confirm("Delete?")) {
            try {
                setLoading(true)
                removeCategory(slug, user.token)
                    .then(res => {
                        setLoading(false)
                        toast.success(`category: ${slug} deleted`)
                        loadCategories().then().catch(err => console.log(err))
                    })
                    .catch(err => console.log(err.response.data))
            } catch (err) {
                console.log(err)
                toast.error(err.message)
            }
        }

    }

    // function for searching that'll filter the categories dynamically
    const searched = (keyword) => c => c.name.toLowerCase().includes(keyword)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <AdminNav/>
                </div>
                <div className="col">
                    {loading ? <h4 className={'text-danger'}>Loading</h4> : <h4>Create category</h4>}
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                    <LocalSearch setKeyword={setKeyword} keyword={keyword}/>
                    {categories.filter(searched(keyword)).map(cat => {
                        return (
                            <div className={'alert alert-second'} key={cat._id}>
                                {cat.name}
                                <span
                                    onClick={() => handleRemove(cat.slug)}
                                    className={'btn btn-sm float-right'}
                                    style={{marginLeft: "1em"}}>
                                    <DeleteOutlined className={'text-danger'}/>
                                </span>
                                <span
                                    className={'btn btn-sm float-right'}
                                    style={{marginLeft: "1em"}}>
                                    <Link to={`/admin/category/${cat.slug}`}>
                                        <EditOutlined className={'text-warning'}/>
                                    </Link>
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );

}
export default CategoryCreate;
