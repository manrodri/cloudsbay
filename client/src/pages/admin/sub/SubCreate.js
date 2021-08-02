import React, {useEffect, useState} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {
    createSubcategory,
    getSubcategories,
    removeSubcategory,

} from "../../../functions/sub";
import {getCategories} from "../../../functions/categories";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {Link} from 'react-router-dom'
import CategoryForm from "../../../components/forms/categoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [keyword, setKeyword] = useState('')
    const [subcategories, setSubcategories] = useState([])

    const {user} = useSelector(state => ({...state}))

    useEffect(() => {
        loadCategories()
        loadSubCategories()
    }, [])


    const loadSubCategories = () => {
        getSubcategories().then(res => setSubcategories(res.data))
    }

    const loadCategories = () => {
        getCategories()
            .then((res) => {
                setCategories(res.data)
            })
    }

    // function for searching that'll filter the categories dynamically
    const searched = (keyword) => c => c.name.toLowerCase().includes(keyword)


  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSubcategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        createSubcategory({name, parent: category}, user.token)
            .then((res) => {
                setLoading(false)
                setName('')
                toast.success(`subcategory created`);
                loadSubCategories()

            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                if (err.response.status === 400) toast.error(err.response.data);
            })
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <AdminNav/>
                </div>
                <div className="col">
                    {loading ? <h4 className={'text-danger'}>Loading</h4> : <h4>Create Subcategory</h4>}

                    <div className="form-gruop">
                        <label>Parent category</label>
                        <select
                            name={'category'}
                            className={'form-control'}
                            onChange={e => setCategory(e.target.value)}>
                            <option selected>Please select</option>
                            {categories.length > 0 && categories.map((cat) => {
                                return (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>)
                            })}
                        </select>
                    </div>

                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                    />

                    <LocalSearch setKeyword={setKeyword} keyword={keyword}/>



                    {subcategories.filter(searched(keyword)).map(sub => {
                        return (
                            <div className={'alert alert-second'} key={sub._id}>
                                {sub.name}
                                <span
                                    onClick={() => handleRemove(sub.slug)}
                                    className={'btn btn-sm float-right'}
                                    style={{marginLeft: "1em"}}>
                                    <DeleteOutlined className={'text-danger'}/>
                                </span>
                                <span
                                    className={'btn btn-sm float-right'}
                                    style={{marginLeft: "1em"}}>
                                    <Link to={`/admin/subcategory/${sub.slug}`}>
                                        <EditOutlined className={'text-warning'}/>
                                    </Link>
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SubCreate