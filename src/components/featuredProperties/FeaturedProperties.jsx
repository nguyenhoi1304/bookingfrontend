import useFetchApi from "../../use-hook/useFetchApi";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetchApi(
    "https://booking-backend-s33n.onrender.com/api/hotels?limit=4&featured=true"
  );
  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img src={item?.photos[0]} alt="" className="fpImg" />
              <span className="fpName">
                <a href={`./hotels/${item?._id}`}>{item?.name}</a>
              </span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item?.cheapestPrice}
              </span>
              <div className="fpRating">
                <button>{item?.rating}</button>
                <span>Excellent</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
