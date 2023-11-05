import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import "./Booking.css";
import useFetchApi from "../../use-hook/useFetchApi";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";

const Booking = () => {
  const userActive = localStorage.getItem("USER__ARRAY");

  const navigatiton = useNavigate();

  const [payment, setPayment] = useState("");
  const [status, setStatus] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [card, setCard] = useState("");
  const [room, setRoom] = useState();

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  //Lấy options
  const { options } = useContext(SearchContext);

  console.log(options);
  // lấy ra số phòng người dùng muốn ở
  const manyRoom = options.room;

  const { hotelId } = useParams();

  //Data trả về là chính hotel đã chọn đó với phòng đã chọn
  const { data, loading, error, resetFetchApi } = useFetchApi(
    `https://booking-backend-s33n.onrender.com/api/hotels/find/${hotelId}`
  );

  const hotels = data;

  const dateStart = format(dates[0]?.startDate, "MM/dd/yyyy");
  const dateEnd = format(dates[0]?.endDate, "MM/dd/yyyy");

  // Lấy ra danh sách các  phòng còn trống của hotel
  useEffect(() => {
    axios
      .get(
        `https://booking-backend-s33n.onrender.com/api/hotels/room?hotelId=${hotelId}&dateStart=${dateStart}&dateEnd=${dateEnd}&manyRoom=${manyRoom}`
      )
      .then(function (response) {
        console.log(response.data);
        setRoom(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [dateStart, dateEnd, hotelId]);

  const dateBookingStart = dateStart.split("/");
  const dateBookingEnd = dateEnd.split("/");

  // Tính số ngày được chọn
  const totaldateBooking = dateBookingEnd[1] - dateBookingStart[1] + 1;

  // giá phòng
  const priceRooms = room?.map((item) => {
    return item.price;
  });

  const prices = priceRooms?.map((item) => item * +totaldateBooking);

  const totalBill = prices?.reduce((cur, pre) => {
    return cur + pre;
  });
  const roomId = room?.map((item) => {
    return item._id;
  });

  const handleClick = () => {
    axios
      .post("https://booking-backend-s33n.onrender.com/api/transaction", {
        user: userActive,
        hotel: hotelId,
        room: roomId,
        dateStart: dateStart,
        dateEnd: dateEnd,
        price: totalBill,
        payment: payment,
        status: status,
      })
      .then(function (response) {
        navigatiton(`/transaction/${userActive}`);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="reserve">
      <Navbar />
      {/* Name ,desc Hotel */}
      <section className="headers">
        <div className="left_Item">
          <h1>{hotels?.name}</h1>
          <p>{hotels?.desc}</p>
        </div>
        <div>
          <h1>${hotels?.cheapestPrice}</h1>
        </div>
      </section>
      {/* Reserve Dates */}
      <section>
        <section className="dateLeft">
          <p>
            Dates <FontAwesomeIcon icon={faCalendarDays} />
          </p>
          <div className="headerSearchText">
            {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
              dates[0].endDate,
              "MM/dd/yyyy"
            )}`}
            <DateRange
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              className="date"
              minDate={new Date()}
              onChange={(item) => setDates([item.selection])}
            />
          </div>
        </section>
        {/* Reserve Info */}

        <section className="date_right">
          <p style={{ fontSize: "1.4rem", fontWeight: "700" }}>Reserve Info</p>
          <section>
            <p>
              <label>Your Full Name:</label>
            </p>
            <input
              value={fullname}
              placeholder="Full Name"
              onChange={(e) => setFullname(e.target.value)}
            ></input>
          </section>
          <section>
            <p>
              <label>Your Email:</label>
            </p>
            <input
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </section>
          <section>
            <p>
              <label>Your Phone Number:</label>
            </p>
            <input
              value={phone}
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </section>
          <section>
            <p>
              <label>Your Identity Card Number:</label>
            </p>
            <input
              value={card}
              placeholder="Card Number"
              onChange={(e) => setCard(e.target.value)}
            ></input>
          </section>
        </section>
      </section>
      {/* SelectRoom */}
      <section className="Container">
        <span>Select your rooms:</span>
        {room?.map((item) => (
          <div
            className="Item"
            key={item?._id}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="ItemInfo">
              <div className="Title">
                {item?.title}
                <FontAwesomeIcon icon={faBed} />
              </div>

              <div className="Desc">{item?.desc}</div>
              <div className="rMax">
                Max people:{" "}
                <b>
                  {item?.maxPeople} <FontAwesomeIcon icon={faPerson} />
                </b>
              </div>
              <div className="Price">${item?.price}</div>
            </div>
            <div className="SelectRooms">
              {item?.roomNumbers?.map((roomNumber, index) => (
                <div className="room" key={index}>
                  <b style={{ marginRight: "5px" }}>Room</b>
                  <label>{roomNumber}</label>
                  <input type="checkbox" value={roomNumber} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "80px" }}>
            <h2 style={{ marginTop: "20px" }}>Total Bill: ${totalBill}</h2>
            <select
              style={{
                marginTop: "10px",
                height: "45px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                padding: "0 5px",
                width: "300px",
                marginRight: "20px",
              }}
              onChange={(e) => setPayment(e.target.value)}
            >
              <option value="SelectPaymentMethod">Select Payment Method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
            </select>
            <select
              style={{
                marginTop: "10px",
                height: "45px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                padding: "0 5px",
                width: "300px",
              }}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="SelectStatus">Select Payment Method</option>
              <option default="Booking" value="Booking">
                Booking
              </option>
              <option value="Checkin">Check In</option>
              <option value="Checkout">Check out</option>
            </select>
          </div>
        </div>
        <button onClick={handleClick} className="Button">
          Reserve Now!
        </button>
      </section>
    </div>
  );
};

export default Booking;
