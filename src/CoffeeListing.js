import React from "react";
import { useEffect, useState } from "react";
import { fetchCoffeeData } from "./apiServic";
import "./CoffeeListing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

export const CoffeeListing = () => {
  const [coffeeData, setCoffeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(coffeeData);

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
      <div className="container">
        <header>
          <h1 className="list_heading">Our Collection</h1>
          <p className="list_description">
            Introducing our Coffee Collection, a selection of unique coffees{" "}
            <br></br>
            from different roast types and origins, expertly roasted in small
            <br></br>
            batches and shipped fresh weekly.
          </p>
          <section className="list_filters">
            <p className="clickable">All Products</p>
            <p className="clickable">Available Now</p>
          </section>
        </header>
        <div className="coffee-listing">
          {coffeeData.map((coffee) => (
            <div key={coffee.id} className="coffee_item">
              {coffee.popular ? (
                <div className="list_popular">Popular</div>
              ) : null}
              <img
                src={coffee.image}
                alt={coffee.name}
                className="list_picture"
              />
              <section className="coffee_details">
                <div className="coffee_name">{coffee.name}</div>
                <div className="coffee_price">{coffee.price}</div>
              </section>
              <section className="coffee_rating">
                {coffee.votes > 0 ? (
                  <FontAwesomeIcon
                    icon={faStarSolid}
                    style={{ color: "#F6C768", fontSize: "15px" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faStarRegular}
                    style={{ color: "#6f757c", fontSize: "15px" }}
                  />
                )}

                <div className="rating">{coffee.rating}</div>

                <div className="votes">
                  {coffee.votes > 0 ? `(${coffee.votes} votes)` : "No ratings"}
                </div>
                {!coffee.available && (
                  <div className="list_available">Sold out</div>
                )}
              </section>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
