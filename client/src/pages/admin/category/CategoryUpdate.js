import React, {useEffect, useState} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector, useDispatch} from "react-redux";
import {getCategory, editCategory, removeCategory} from "../../../functions/categories";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {Button} from "antd";
import CategoryForm from "../../../components/forms/categoryForm";


const CategoryUpdate = ({history, match}) => {

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadCategory()
    }, [])

    const loadCategory = () => {
        const slug = match.params.slug
        getCategory(slug)
            .then(res => setName(res.data.name))
            .catch(err => console.log(err))
    }


    const {user} = useSelector(state => ({...state}))

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        editCategory(match.params.slug, {name}, user.token)
            .then(res => {
                setLoading(false)
                setName("")
                toast.success(`${res.data.name} updated`)
                history.push('/admin/category')
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                toast.error(err.message)
            })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <AdminNav/>
                </div>
                <div className="col">
                    {loading ? <h4 className={'text-danger'}>Loading</h4> : <h4>Update category</h4>}
                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                </div>
            </div>
        </div>
    );

}
export default CategoryUpdate;
