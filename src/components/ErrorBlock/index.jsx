import React from "react";
import style from './Error.module.scss';

const ErrorBlock = () => {
    return (
        <div>
            <h1 className={style.root}>
                <span>:(</span>
                <br/>
                Ничего не найдено
            </h1>
        </div>
    );
    };
export default ErrorBlock;