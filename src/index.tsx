import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import "normalize.css";
import xm from './assets/images/xm.jpeg';
import styles from './index.less';

import { getUserCurrentData } from '@src/services/app';



const App = () => {
    useEffect(() => {
        const data = getUserCurrentData();
        console.log(data);
    }, [])
    return <div className={styles.title}> App入口
        <img src={xm} />
    </div>
}
ReactDOM.render(
    <App />,
    document.getElementById('root'),
)
