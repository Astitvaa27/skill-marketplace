import React, { useEffect, useState } from "react";
import axios from "axios";

function Home({ userName, isAdmin }) {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const BASE_URL = "https://skill-marketplace-n8j5.onrender.com";

  useEffect(() => {
    axios.get(`${BASE_URL}/services`)
      .then(res => setServices(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (id, owner) => {
    if (userName !== owner && !isAdmin) {
      alert("Not allowed");
      return;
    }

    await axios.delete(`${BASE_URL}/services/${id}`);
    setServices(services.filter(s => s._id !== id));
  };

  // ✅ filters
  const filtered = services.filter(s => {
    return (
      s.title.toLowerCase().includes(search.toLowerCase()) &&
      (maxPrice === "" || Number(s.price) <= Number(maxPrice))
    );
  });

  return (
    <div className="container mt-4">

      <h2>🔥 Explore Services</h2>

      <input
        className="form-control my-2"
        placeholder="Search services..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        className="form-control my-2"
        placeholder="Max Price"
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <div className="row mt-3">
        {filtered.map((service) => (
          <div className="col-md-4" key={service._id}>
            <div className="card mt-3">

              <img
                src={service.image || "https://via.placeholder.com/300"}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
                alt=""
              />

              <div className="card-body">
                <h5>{service.title}</h5>
                <p>₹{service.price}</p>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(service._id, service.user)}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;