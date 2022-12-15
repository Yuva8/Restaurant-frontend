import React, { useState, useEffect } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [getclientdata, setclientdata] = useState([]);
  console.log(getclientdata);
  const getdata = async () => {
    const res = await fetch(
      "https://yuvirestaurant-backend.onrender.com/getdata",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setclientdata(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteclient = async (id) => {
    const res2 = await fetch(
      `https://yuvirestaurant-backend.onrender.com/deleteclient/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      // setDLTdata(deletedata);
      getdata();
    }
  };

  return (
    <div>
      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/adddata" className="btn btn-primary mb-2">
              Add data
            </NavLink>
          </div>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th scope="col" className="text-center">
                  area
                </th>
                <th scope="col" className="text-center">
                  climatic condition in °C
                </th>

                <th scope="col" className="text-center">
                  popular cuisines
                </th>
                <th scope="col" className="text-center">
                  land cost /sqft
                </th>
                <th scope="col" className="text-center">
                  total population in lakhs
                </th>

                <th scope="col" className="text-center">
                  ratio of working professional in %
                </th>
                <th scope="col" className="text-center">
                  kids ratio in %
                </th>
                <th className="text-center col-md-3">update and delete</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {getclientdata.map((element, id) => {
                return (
                  <>
                    <tr>
                      <td>{element.area}</td>
                      <td>{element.climatic}</td>
                      <td>{element.popularcuisines}</td>
                      <td>{element.landcost}</td>
                      <td>{element.totalpopulation}</td>
                      <td>{element.working}</td>
                      <td>{element.kids}</td>
                      <td className="d-flex justify-content-between">
                        <NavLink to={`view/${element._id}`}>
                          {" "}
                          <button className="btn btn-secondary">View</button>
                        </NavLink>
                        <NavLink to={`edit/${element._id}`}>
                          {" "}
                          <button className="btn btn-secondary">Edit</button>
                        </NavLink>
                        <button
                          className="btn btn-secondary"
                          onClick={() => deleteclient(element._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
