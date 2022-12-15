import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { NavLink, useParams, useNavigate } from "react-router-dom";
const Details = () => {
  const navigate = useNavigate();
  const [getclientdata, setclientdata] = useState([]);
  console.log(getclientdata);

  const { id } = useParams("");
  console.log(id);
  const getdata = async () => {
    const res = await fetch(
      `https://yuvirestaurant-backend.onrender.com/getclient/${id}`,
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
      navigate("/");
    }
  };
  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome Yuvaraj</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${getclientdata._id}`}>
              <button class="btn btn-secondary mx-2 ">Edit</button>
            </NavLink>
            <button
              class="btn btn-secondary "
              onClick={() => deleteclient(getclientdata._id)}
            >
              Delete
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src="/profile.png" style={{ width: 50 }} alt="profile" />
              <h4 className="mt-3">
                Area: <span>{getclientdata.area}</span>
              </h4>
              <h4 className="mt-3">
                Climate: <span>{getclientdata.climatic}</span>
              </h4>
              <h4 className="mt-3">
                Popularcuisines: <span>{getclientdata.popularcuisines}</span>
              </h4>
              <h4 className="mt-3">
                Landcost: <span>{getclientdata.landcost}</span>
              </h4>
            </div>
            <div className="right_view  col-lg-6 col-md-6 col-12">
              <h4 className="mt-5">
                Total Population: <span>{getclientdata.totalpopulation}</span>
              </h4>
              <h4 className="mt-3">
                Working Professional ratio: <span>{getclientdata.working}</span>
              </h4>
              <h4 className="mt-3">
                Kids ratio: <span>{getclientdata.kids}</span>
              </h4>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
