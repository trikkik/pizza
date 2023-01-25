import React from "react";
import qs from 'qs';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//import axios from 'axios';

import Cats from '../components/Cats.jsx';
import PizzaBlock from '../components/PizzaBlock/index.jsx'
import Sort, { list }  from '../components/Sort.jsx';
import Placeholder from '../components/PizzaBlock/Placeholder';
import Pagination from "../components/pagination/index.jsx";
import { SearchContext } from "../App.js";
import { filterSelector, setCategoryId, setCurrentPage, setSort } from "../redux/slice/filterSlice.js";

import { setFilters } from "../redux/slice/filterSlice.js";
import {fetchItem, selectorPizzaData} from '../redux/slice/pizzaSlice'


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  // const categoryId = useSelector((state) => state.filterSlice.categoryId);
  // const sortId = useSelector((state) => state.filterSlice.sort.sortProp);
  // const currentPage = useSelector((state) => state.filterSlice.currentPage);
  // эти константы перенесены ниже

   const {sort, currentPage, categoryId, searchValue} = useSelector(filterSelector)
  const {items, status} = useSelector(selectorPizzaData); 
  //  const [pizza, setPizza] = React.useState([]);
  //  const [isLoad, setIsLoad] = React.useState(true);   
    

    const onChangeCats = (id) => {
      dispatch(setCategoryId(id));
  };
    const onChangePage = (number) => {
      dispatch(setCurrentPage(number));
    };


//  try {   
//   const res = await axios.get (
//     ``
//   );
//   setPizza(res.data);
//   setIsLoad(false);
//   console.log(212121);
//   } catch (error) {
//     setIsLoad(false);
//     console.log ('error', error);
//   } finally {
//     setIsLoad(false);
//   };
//   window.scrollTo(0, 0);

    const fetchPizza = async () => {
      //setIsLoad(true);

      const order = sort.sortProp.includes('-') ? 'asc' : 'desc';
      const sortBy = sort.sortProp.replace('-', '');
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const searchBy = searchValue ? `&searchBy=${searchValue}` : '';

        
        /* setPizza(res.data); 
        замена на dispatch, потому что храним в rtk*/
       dispatch(fetchItem({
        order,
        sortBy,
        category,
        searchBy,
        currentPage,
       }),
       );
        window.scrollTo(0, 0);
      };
      
    //       window.scrollTo(0, 0);
    //     },[categoryId, sortId, search, currentPage ]);
    // }

  // React.useEffect ( ()=> {
  //   setIsLoad(true)

  //   const order = sortId.includes('-') ? 'asc' : 'desc';
  //   const sortBy = sortId.replace('-', '');
  //   const category = categoryId > 0 ? `category=${categoryId}` : '';
  //   const searchBy = search ? `&searchBy=${search}` : '';

  //   await axios.get(
  //     `https://1637d01c916c1b892ebc56e93.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchBy}`
  //     )
  //     .then((response) => {
  //       setPizza(response.data);
  //       setIsLoad(false);
  //     }) 
  //     .catch((error) => {
  //       setIsLoad(false);
  //       console.log(error, 'axios')
  //     })

  //   window.scrollTo(0, 0);
  // },[categoryId, sortId, search, currentPage ]);


  React.useEffect(() => {
    const qString = qs.stringify({
      sortProperty: sort.sortProp,
      categoryId,
      currentPage,
    });
    navigate(`?${qString}`)
  }, [categoryId, sort.sortProp, currentPage] );

  React.useEffect(() => {
    fetchPizza();
  }, [categoryId, currentPage, searchValue, sort.sortProp]);


  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizza();
    }
    isSearch.current = false;
  }, [])

    const pitca = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)

    const skelet = [...new Array(6)].map((_, index)=> <Placeholder key={index}/>);

    return (
        <div className="container">
          <div className="content__top">
            <Cats value={categoryId} onChangeCats={(id) => onChangeCats(id)}/>
            <Sort value={sort}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          {
            status === 'error' ? (
              <div>
                <h2>Пицц нет</h2>
              </div>
            ) : (
              <div className="content__items">{status === 'loading' ? skelet : pitca}
          </div>
            )
          }
          
          <Pagination currentPage={currentPage} onChangePage={(number) => onChangePage(number)}/>
        </div>
    )
};


export default Home;