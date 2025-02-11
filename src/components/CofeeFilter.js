const CoffeeFilter = ({ selectedFilter, handleFilterChange }) => {
  const filters = [
    { label: "All Products", value: "all" },
    { label: "Available Now", value: "available" },
  ];
  return (
    <section className="list_filters">
      <section className="list_filters">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            className={`filter ${selectedFilter === value ? "selected" : ""}`}
            onClick={() => handleFilterChange(value)}
          >
            {label}
          </button>
        ))}
      </section>
    </section>
  );
};

export default CoffeeFilter;
