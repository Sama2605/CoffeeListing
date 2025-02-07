import React from "react";
import { useEffect, useState } from "react";
import { fetchCoffeeData } from "./apiServic";
import "./CoffeeListing.css";
import CoffeeItem from "./CoffeeItem";
import CoffeeFilter from "./CofeeFilter";

export const CoffeeListing = () => {
  const [coffeeData, setCoffeeData] = useState([]);
  const [originalCoffeeData, setOriginalCoffeeData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchCoffeeData();
        if (data) setCoffeeData(data);
        setOriginalCoffeeData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const handleFilter = (filter) => {
    if (selectedFilter !== filter) {
      setSelectedFilter(filter);
      setCoffeeData(
        filter === "all"
          ? originalCoffeeData
          : originalCoffeeData.filter((coffee) => coffee.available)
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="container">
        <header>
          <h1 className="list_heading">Our Collection</h1>
          <p className="list_description">
            Introducing our Coffee Collection, a selection of unique coffees
            <br />
            from different roast types and origins, expertly roasted in small
            <br />
            batches and shipped fresh weekly.
          </p>
        </header>
        <CoffeeFilter
          selectedFilter={selectedFilter}
          handleFilter={handleFilter}
        />
        <div className="coffee-listing">
          {coffeeData.map((coffee) => (
            <CoffeeItem key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </div>
    </>
  );
};
