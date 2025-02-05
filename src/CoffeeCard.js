import { useEffect, useState } from "react";
import { fetchCoffeeData } from "./apiService";

export const CoffeeCard = () => {
  const [coffeeData, setCoffeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchCoffeeData();
        if (data) setCoffeeData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {coffeeData.map((coffee) => (
        <div key={coffee.id}>{coffee.name}</div>
      ))}
    </>
  );
};
// useEffect(() => {
//   async function getData() {
//     const data = await fetchCoffeeData();
//     if (data) setCoffeeData(data);
//   }

//   getData();
// }, []);
