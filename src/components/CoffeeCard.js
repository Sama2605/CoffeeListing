import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const CoffeeItem = ({ coffee, onClick, viewType }) => {
  const { id, name, price, rating, votes, available, popular, image } = coffee;
  const starIcon = votes > 0 ? faStarSolid : faStarRegular;
  const starColor = votes > 0 ? "#F6C768" : "#6f757c";

  return (
    <div
      key={id}
      className={`coffee_item ${viewType === "card" ? "card_views" : ""}`}
      onClick={onClick}
    >
      {popular ? <div className="list_popular">Popular</div> : null}

      <img src={image} alt={name} className="list_picture" loading="lazy" />

      <section className="coffee_details">
        <div className="coffee_name">{name}</div>
        <div className="coffee_price">{price}</div>
      </section>

      <section className="coffee_rating">
        <FontAwesomeIcon
          icon={starIcon}
          style={{
            color: starColor,
            fontSize: "15px",
          }}
        />
        <div className="rating">{rating}</div>
        <div className="votes">
          {votes > 0 ? `(${votes} votes)` : "No ratings"}
        </div>
        {!available && <div className="list_available">Sold out</div>}
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
