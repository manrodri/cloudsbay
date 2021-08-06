import React from "react";
import {Select} from 'antd';

const {Option} = Select;


const ProductCreateForm = ({
                               handleSubmit,
                               handleChange,
                               handleCategorgyChange,
                               setValue,
                               values,
                               setValues,
                               subOptions,
                               showSub,
                           }) => {
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
    } = values

    const loadSubs = () => {
        return (
            <div className="form-group">
                <label>Subcategories</label>
                <Select
                    className={'form-control'}
                    mode={"multiple"}
                    style={{width: '100%'}}
                    placeholder={"Please select"}
                    value={subs}
                    onChange={value => {
                        setValues({...values, subs: value})
                        // console.log(value)
                        // console.log(subs)
                    }}
                >
                    {subOptions.map((sub) => {
                        return (
                            <Option key={sub._id} value={sub._id}>
                                {sub.name}
                            </Option>)
                    })}
                </Select>
            </div>
        )
    }

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
                    <option value="Yes">Yes</option>
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
                    {colors.map(c => {
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
                    {brands.map(b => {
                        return (
                            <option key={b} value={b}>{b}</option>
                        )
                    })}
                </select>
            </div>

            <div className="form-gruop">
                <label>Category</label>
                <select
                    name={'category'}
                    className={'form-control'}
                    onChange={handleCategorgyChange}>
                    <option selected>Please select</option>
                    {categories.length > 0 && categories.map((cat) => {
                        return (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>)
                    })}
                </select>
            </div>

            {showSub && subOptions.length > 0 ? loadSubs() : null}
            <br/>

            <button className={'btn btn-outline-info'}>Save</button>


        </form>
    )
}

export default ProductCreateForm;