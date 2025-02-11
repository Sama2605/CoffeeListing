import React from "react";
import { useEffect, useState } from "react";
import { fetchCoffeeData } from "../apiServic";
import "../CoffeeListing.css";
import CoffeeCard from "../components/CoffeeCard";
import Header from "../components/Header";
import CoffeeFilter from "../components/CofeeFilter";

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

  const handleFilterChange = (filter) => {
    if (selectedFilter !== filter) {
      setSelectedFilter(filter);
      setCoffeeData(
        filter === "all"
          ? originalCoffeeData
          : originalCoffeeData.filter((coffee) => coffee.available)
      );
    }
  };

  const handleSelectCoffe = (coffee) => {
    setCoffeeSelected(coffee);
  };

  const handleCloseModal = () => setCoffeeSelected(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className={`container ${coffeeSelected ? "blurred" : ""}`}>
        <Header />

        <CoffeeFilter
          selectedFilter={selectedFilter}
          handleFilterChange={handleFilterChange}
        />

        <div className="coffee-listing">
          {coffeeData.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              onClick={() => handleSelectCoffe(coffee)}
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
              onClick={() => handleCloseModal(null)}
            />
          </div>
        </div>
      )}
    </>
  );
};
