import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://637d01c916c1b892ebc56e93.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Error in server');
        navigate('/');
      }
    }

    fetchPizza();
  }, [id]);

  if (!pizza) {
    return <>Loading...</>;
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt="Pizza_image" />
      <h2>{pizza.title}</h2>
      <p>{pizza.price} P</p>
    </div>
  );
};

export default FullPizza;
