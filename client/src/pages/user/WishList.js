import React from "react";
import UserNav from "../../components/nav/UserNav";

const WishList = () => {
    return (
        <div className={'container-fluid'}>
            <div className="row">
                <di className="colmd-2">
                    <UserNav/>
                </di>
                <div className="col">
                    user Whislist page
                </div>
            </div>
        </div>
    )
}

export default WishList;