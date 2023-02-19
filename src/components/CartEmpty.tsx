import React from 'react';
import { Link } from 'react-router-dom';

const CartEmpty: React.FC = () => {
  return (
    <div>
      <h2>
        Корзина пустая <span>😔</span>
      </h2>
      <p>
        Вероятнее всего, вы не заказывали ещё пиццу. <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <Link to="/">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
