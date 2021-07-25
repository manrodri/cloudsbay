import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count, setCount ] = useState(5);
    let history = useHistory();

    useEffect(()=> {
        const interval = setInterval(()=> {
            //
            setCount((currentCount) => --currentCount)
        }, 1000)
    //    redirect when count is 0
        count === 0 && history.push('/')
        // clean up
        return () => clearInterval(interval)
    },[count])

    return (
        <React.Fragment>
            <div className={'container p-5 text-center'}>
                <p>Redirecting you in {count} seconds</p>
            </div>
        </React.Fragment>
    )
}

export default LoadingToRedirect;