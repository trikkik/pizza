import React from "react";
import debounce from 'lodash.debounce';
import { SearchContext } from "../../App";
import styles from './Search.module.sass';


const Search = () => {
    const [value, setValue] = React.useState('');
    const {search, setSearch} = React.useContext(SearchContext);
    const inputRef = React.useRef();

    // const testDeb = React.useCallback(
    //     debounce(() => {
    //         console.log('hello')
    //     },250),
    //     [],
    // );
    const onClickClear = () => {
        setSearch('');
        setValue('');
        inputRef.current.focus();
    };
    const upSetValue = React.useCallback(
        debounce((str)=> {
            setSearch(str);
            console.log(str)
        }, 1000),
        [],
    ); 
    const onChangeInput = (event) => {
        setValue(event.target.value);
        upSetValue(event.target.value);
    }

    return (
        <div className={styles.root}>
            <svg className={styles.icon}
                fill="none" height="24" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                width="24" 
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/>
            </svg>
            <input 
                ref={inputRef} 
                value={value} 
                onChange={onChangeInput } 
                className={styles.input} 
                placeholder="Поиск пицц..."
            />
            
            {value && (
                <svg onClick={onClickClear} className={styles.close_icon} height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/><path d="M0 0h48v48h-48z" fill="none"/>
                </svg>
            )}
        </div>
    )
}

export default Search;