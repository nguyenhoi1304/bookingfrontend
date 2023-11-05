import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import useFetchApi from "../../use-hook/useFetchApi";
import { Link, useParams } from "react-router-dom";

const Hotel = () => {
  const { hotelId } = useParams();

  const { data } = useFetchApi(
    `http://localhost:5000/api/hotels/find/${hotelId}`
  );

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data?.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data?.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – ${data?.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data?.cheapestPrice} at this property and get a
            free airport taxi
          </span>
          <div className="hotelImages">
            {data?.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img src={photo} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data?.title}</h1>
              <p className="hotelDesc">{data?.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${data?.cheapestPrice * 9}</b> (9 nights)
              </h2>

              <Link to={`/hotels/rooms/${data?._id}`}>
                <button>Reserve or Book Now!</button>
              </Link>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
