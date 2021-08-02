import React, {useEffect, useState} from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {getCategories} from "../../../functions/categories";
import CategoryForm from "../../../components/forms/categoryForm";
import {editSubcategory, getSubCategory} from "../../../functions/sub";


const SubcategoryUpdate = ({history, match}) => {

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [parent, setParent] = useState("")

    const loadSubcategory = () => {
        const slug = match.params.slug
        getSubCategory(slug)
            .then(res => {
                setName(res.data.name)
                setParent(res.data.parent)
            })
            .catch(err => console.log(err))
    }

    const loadCategories = () => {
        getCategories()
            .then((res) => {
                setCategories(res.data)
            })
            .catch(err => {
                console.log(err)
                if (err.response.state === 400) toast.error(err.message)
            })
    }


    useEffect(() => {
        loadSubcategory()
        loadCategories()
    }, [])


    const {user} = useSelector(state => ({...state}))

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        editSubcategory(match.params.slug, {name, parent}, user.token)
            .then(res => {
                setLoading(false)
                setName("")
                toast.success(`${res.data.name} updated`)
                history.push('/admin/subcategory')
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
          <AdminNav />
        </div>
        <div className="col-9">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update sub category</h4>
          )}

          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
    );

}
export default SubcategoryUpdate;
