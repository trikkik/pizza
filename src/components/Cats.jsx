import React from "react";

function Cats({value, onChangeCats}) {


  const Cats =['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']


    return (
    <div className="categories">
      <ul>
        {Cats?.map((catsName, i) => (
          <li key={i} onClick={()=> onChangeCats(i)} className={value === i ? 'active' : ' '}>{catsName}</li>
        )
        
        )}

      </ul>
    </div>
    )
  }

  export default Cats;