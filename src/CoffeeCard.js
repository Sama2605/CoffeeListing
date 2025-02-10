import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const CoffeeItem = ({ coffee, onClick, viewType }) => {
  return (
    <div
      key={coffee.id}
      className={`coffee_item ${viewType === "card" ? "card_views" : ""}`}
      onClick={onClick}
    >
      {coffee.popular ? <div className="list_popular">Popular</div> : null}

      <img src={coffee.image} alt={coffee.name} className="list_picture" />

      <section className="coffee_details">
        <div className="coffee_name">{coffee.name}</div>
        <div className="coffee_price">{coffee.price}</div>
      </section>

      <section className="coffee_rating">
        <FontAwesomeIcon
          icon={coffee.votes > 0 ? faStarSolid : faStarRegular}
          style={{
            color: coffee.votes > 0 ? "#F6C768" : "#6f757c",
            fontSize: "15px",
          }}
        />
        <div className="rating">{coffee.rating}</div>
        <div className="votes">
          {coffee.votes > 0 ? `(${coffee.votes} votes)` : "No ratings"}
        </div>
        {!coffee.available && <div className="list_available">Sold out</div>}
      </section>

      {viewType === "card" && (
        <button className="card_button" onClick={() => onClick(null)}>
          Close
        </button>
      )}
    </div>
  );
};

export default CoffeeItem;
