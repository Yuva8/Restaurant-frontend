import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  // const [getclientdata, setclientdata] = useState([]);
  // console.log(getclientdata);
  const navigate = useNavigate();
  const [inpval, setINP] = useState({
    area: "",
    climatic: "",
    popularcuisines: "",
    landcost: "",
    totalpopulation: "",
    working: "",
    kids: "",
  });
  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

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
      setINP(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);
  const updateclient = async (e) => {
    e.preventDefault();

    const {
      area,
      climatic,
      popularcuisines,
      landcost,
      totalpopulation,
      working,
      kids,
    } = inpval;

    const res2 = await fetch(
      `https://yuvirestaurant-backend.onrender.com/updateclient/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          area,
          climatic,
          popularcuisines,
          landcost,
          totalpopulation,
          working,
          kids,
        }),
      }
    );

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      navigate("/");
      // setUPdata(data2);
      alert("Successfully data update");
    }
  };
  return (
    <div className="container">
      <span style={{ marginLeft: "100px", fontWeight: "bold" }}>Edit Form</span>
      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Area
            </label>
            <input
              type="text"
              value={inpval.area}
              onChange={setdata}
              name="area"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              climatic condition
            </label>
            <input
              type="text"
              value={inpval.climatic}
              onChange={setdata}
              name="climatic"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              popular cuisines
            </label>
            <input
              type="text"
              value={inpval.popularcuisines}
              onChange={setdata}
              name="popularcuisines"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Landcost
            </label>
            <input
              type="number"
              value={inpval.landcost}
              onChange={setdata}
              name="landcost"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Total Population
            </label>
            <input
              type="number"
              value={inpval.totalpopulation}
              onChange={setdata}
              name="totalpopulation"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Working Professional ratio
            </label>
            <input
              type="number"
              value={inpval.working}
              onChange={setdata}
              name="working"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Kids ratio
            </label>
            <input
              type="number"
              value={inpval.kids}
              onChange={setdata}
              name="kids"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" onClick={updateclient} class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
