const CoffeeFilter = ({ selectedFilter, handleFilter }) => {
  return (
    <section className="list_filters">
      <button
        className={`filter ${selectedFilter === "all" ? "selected" : ""}`}
        onClick={() => handleFilter("all")}
      >
        All Products
      </button>
      <button
        className={`filter ${selectedFilter === "available" ? "selected" : ""}`}
        onClick={() => handleFilter("available")}
      >
        Available Now
      </button>
    </section>
  );
};

export default CoffeeFilter;
