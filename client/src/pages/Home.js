import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Home({ userName, isAdmin }) {
  const [services, setServices] = useState([]);

  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState("");

  // FETCH SERVICES
  useEffect(() => {
    axios
      .get("http://localhost:5000/services")
      .then((res) => setServices(res.data))
      .catch(() => toast.error("Error loading"));
  }, []);

  // DELETE
  const handleDelete = async (id, owner) => {
    if (userName !== owner && !isAdmin) {
      toast.error("Not allowed ❌");
      return;
    }

    await axios.delete(`http://localhost:5000/services/${id}`);

    setServices(services.filter((s) => s._id !== id));
    toast.success("Deleted 🗑️");
  };

  // START EDIT
  const startEdit = (service) => {
    if (userName !== service.user && !isAdmin) {
      toast.error("Not allowed ❌");
      return;
    }

    setEditId(service._id);
    setEditTitle(service.title);
    setEditPrice(service.price);
    setEditImage(service.image);
  };

  // UPDATE
  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/services/${editId}`, {
      title: editTitle,
      price: editPrice,
      image: editImage,
    });

    const updated = services.map((s) =>
      s._id === editId
        ? { ...s, title: editTitle, price: editPrice, image: editImage }
        : s
    );

    setServices(updated);
    setEditId(null);
    toast.success("Updated ✏️");
  };

  // FILTER
  const filtered = services.filter((s) => {
    const matchSearch = s.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchPrice = maxPrice ? Number(s.price) <= maxPrice : true;

    return matchSearch && matchPrice;
  });

  return (
    <div className="container mt-4">
      <h2>🔥 Explore Services</h2>

      {/* SEARCH */}
      <input
        className="form-control my-3"
        placeholder="Search services..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* PRICE FILTER */}
      <input
        type="number"
        className="form-control mb-3"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <div className="row">
        {filtered.map((service) => (
          <div className="col-md-4" key={service._id}>
            <div className="card shadow mt-3">

              <img
                src={service.image || "https://via.placeholder.com/300"}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
                alt=""
              />

              <div className="card-body">

                {editId === service._id ? (
                  <>
                    <input
                      className="form-control my-2"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />

                    <input
                      className="form-control my-2"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                    />

                    <input
                      className="form-control my-2"
                      value={editImage}
                      onChange={(e) => setEditImage(e.target.value)}
                    />

                    <button
                      className="btn btn-success"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h5>{service.title}</h5>
                    <p className="text-success">₹{service.price}</p>

                    <button
                      className="btn btn-warning me-2"
                      onClick={() => startEdit(service)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleDelete(service._id, service.user)
                      }
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;