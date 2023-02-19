import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortSelector } from '../redux/slice/filterSlice';
import { setSort } from '../redux/slice/filterSlice';

type ListItem = {
  name: string;
  sortProp: string;
};

export const list: ListItem[] = [
  { name: 'Популярности(DESC)', sortProp: 'raiting' },
  { name: 'Популярности(ASC)', sortProp: '-raiting' },
  { name: 'Цене(DESC)', sortProp: 'price' },
  { name: 'Цене(ASC)', sortProp: '-price' },
  { name: 'Алфавиту(DESC)', sortProp: 'Alph' },
  { name: 'Алфавиту(ASC)', sortProp: '-Alph' },
];
function Sort() {
  const dispatch = useDispatch();

  const sort = useSelector(sortSelector);
  //const sortId = useSelector((state) => state.filterSlice.sort.sortProp)

  const [lightPopup, setLightPopup] = React.useState(false);

  const sortRef = React.useRef<HTMLDivElement>(null);

  const onClickSelec = (obj: ListItem) => {
    //onChangeSort(i);
    dispatch(setSort(obj));
    setLightPopup(false);
  };

  React.useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[];
      };
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setLightPopup(false);
        console.log('out');
      }
    };
    document.body.addEventListener('click', handleOutside);
    return () => {
      document.body.removeEventListener('click', handleOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setLightPopup(!lightPopup)}>{sort.name}</span>
      </div>
      {lightPopup && (
        <div className="sort__popup">
          <ul>
            {list?.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickSelec(obj)}
                className={sort.sortProp === obj.sortProp ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
