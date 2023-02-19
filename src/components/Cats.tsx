import React from 'react';

type CategoriesProps = {
  value: number;
  onChangeCats: (idx: number) => void;
};

//или const Cats: React.FC = ({ value, onChangeCats }: CategoryProps) =>
const Cats: React.FC<CategoriesProps> = ({ value, onChangeCats }) => {
  const cats = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {cats?.map((catsName, i) => (
          <li key={i} onClick={() => onChangeCats(i)} className={value === i ? 'active' : ' '}>
            {catsName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cats;
