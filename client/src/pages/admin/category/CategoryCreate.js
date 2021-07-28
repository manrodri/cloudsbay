import React, {useState} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector, useDispatch} from "react-redux";
import {createCategory, getCategories, removeCategory} from "../../../functions/categories";
import {MailOutlined} from "@ant-design/icons";
import {Button} from "antd";

const CategoryCreate = () => {

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)

    const {user} = useSelector(state => ({...state}))

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        createCategory({name}, user.token)
            .then((res) => {
                setLoading(false)
                setName('')
                toast.success(`"${res.data.name}" created`);
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
                if (err.response.status === 400) toast.error(err.response.data)
            })
        //
        console.log(name)
    }

    const categoryForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className={'form-control'}
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <br/>
                    <Button
                        onClick={handleSubmit}
                        type="primary"
                        className="mb-1"
                        block
                        shape="round"
                        size="small"
                        disabled={!name || name.length < 1}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <AdminNav/>
                </div>
                <div className="col">
                    <h4>Create category</h4>
                    {categoryForm()}
                </div>
            </div>
        </div>
    );

}
export default CategoryCreate;
