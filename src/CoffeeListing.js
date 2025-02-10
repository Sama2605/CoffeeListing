import React from "react";
import { useEffect, useState } from "react";
import { fetchCoffeeData } from "./apiServic";
import "./CoffeeListing.css";
import CoffeeCard from "./CoffeeCard";
import CoffeeFilter from "./CofeeFilter";

export const CoffeeListing = () => {
  const [coffeeData, setCoffeeData] = useState([]);
  const [originalCoffeeData, setOriginalCoffeeData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coffeeSelected, setCoffeeSelected] = useState(null);

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

  const handleSelectedCoffe = (coffee) => {
    setCoffeeSelected(coffee);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className={`container ${coffeeSelected ? "blurred" : ""}`}>
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
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              onClick={() => handleSelectedCoffe(coffee)}
            />
          ))}
        </div>
      </div>
      {coffeeSelected && (
        <div className="modal_overlay">
          <div className="card_view">
            <CoffeeCard
              coffee={coffeeSelected}
              viewType="card"
              onClick={() => setCoffeeSelected(null)}
            />
          </div>
        </div>
      )}
    </>
  );
};
