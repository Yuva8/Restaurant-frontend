import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Adddata = () => {
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

  const addinpdata = async (e) => {
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

    const res = await fetch(
      "https://yuvirestaurant-backend.onrender.com/adddata",
      {
        method: "POST",
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

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");
    } else {
      alert("data added");
      navigate("/");
      console.log("data added");
    }
  };
  return (
    <div className="container">
      <NavLink to="/">home</NavLink>
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

          <button type="submit" onClick={addinpdata} class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Adddata;
