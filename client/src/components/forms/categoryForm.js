import {Button} from "antd";
import React from "react";

const CategoryForm = ({handleSubmit, name, setName}) => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className={'form-control'}
                        value={name}
                        onChange={event => setName(event.target.value)}
                        autoFocus={true}
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
export default CategoryForm;