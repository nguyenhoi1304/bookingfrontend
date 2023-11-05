import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import "./Transaction.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCar,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const Transaction = () => {
  const { user } = useParams();
  const [data, setData] = useState();

  const tables = [
    "#",
    "Hotel",
    "Room",
    "Date",
    "Price",
    "Payment Method",
    "Status",
  ];

  useEffect(() => {
    const getTransaction = async () => {
      await axios
        .post(
          "https://booking-backend-s33n.onrender.com/api/transaction/user",
          {
            user: user,
          }
        )
        .then(function (response) {
          console.log(response.data);
          setData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getTransaction();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="header">
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
      </div>
      <section>
        <h1 style={{ textAlign: "center", marginTop: "50px" }}>
          Your Transaction
        </h1>
        <table className="table">
          <tr>
            {tables.map((item) => (
              <th>{item}</th>
            ))}
          </tr>
          {data?.map((item, index) => (
            <tr key={index}>
              <>
                <td>{index + 1}</td>
                <td>{item.hotel.name}</td>
                <td style={{ padding: "0 10px" }}>
                  {item?.room?.map((item) => (
                    <div key={item._id}> [{item.roomNumbers.join(",")}]</div>
                  ))}
                </td>
                <td>
                  {item.dateStart} - {item.dateEnd}
                </td>
                <td>${item.price}</td>
                <td>{item.payment}</td>
                <td
                  className={
                    (item.status === "Checkin" && "Checkin") ||
                    (item.status === "Checkout" && "Checkout") ||
                    (item.status === "Booking" && "Booking")
                  }
                >
                  {item.status}
                </td>
              </>
            </tr>
          ))}
        </table>
      </section>
    </div>
  );
};

export default Transaction;
