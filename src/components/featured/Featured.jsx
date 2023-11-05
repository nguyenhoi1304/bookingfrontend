import useFetchApi from "../../use-hook/useFetchApi";
import hanoiImg from "../../imgCity/Ha Noi.jpg";
import hcmImg from "../../imgCity/HCM.jpg";
import danangImg from "../../imgCity/Da Nang.jpg";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetchApi(
    "http://localhost:5000/api/hotels/countByCitys"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img src={hanoiImg} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Ha Noi</h1>
              <h2>{data[0]?.countHaNoi} Properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img src={hcmImg} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Ho Chi Minh</h1>
              <h2>{data[1]?.countHoChiMinh} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img src={danangImg} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Da Nang</h1>
              <h2>{data[2]?.countDaNang} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
