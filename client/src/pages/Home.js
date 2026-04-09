import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [services, setServices] = useState([]);

  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState("");

  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 🔥 IMPORTANT FIX
  const userName = localStorage.getItem("userName");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // DEBUG (you can remove later)
  console.log("USER:", userName);
  console.log("ADMIN:", isAdmin);

  // FETCH
  useEffect(() => {
    axios.get("https://skill-marketplace-n8j5.onrender.com/services")
      .then(res => setServices(res.data));
  }, []);

  // DELETE
  const handleDelete = (index) => {
    axios.delete(`https://skill-marketplace-n8j5.onrender.com/services/${index}`)
      .then(() => {
        setServices(services.filter((_, i) => i !== index));
        toast.success("Deleted 🗑️");
      });
  };

  // EDIT START
  const startEdit = (service, index) => {
    setEditIndex(index);
    setEditTitle(service.title);
    setEditPrice(service.price);
    setEditImage(service.image || "");
  };

  // IMAGE EDIT
  const handleEditImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");

      const MAX_WIDTH = 300;
      const MAX_HEIGHT = 200;

      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        height = height * (MAX_WIDTH / width);
        width = MAX_WIDTH;
      }

      if (height > MAX_HEIGHT) {
        width = width * (MAX_HEIGHT / height);
        height = MAX_HEIGHT;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const compressedImage = canvas.toDataURL("image/jpeg", 0.7);
      setEditImage(compressedImage);
    };

    reader.readAsDataURL(file);
  };

  // UPDATE
  const handleUpdate = () => {
    axios.put(`https://skill-marketplace-n8j5.onrender.com/services/${editIndex}`, {
      title: editTitle,
      price: editPrice,
      image: editImage,
      user: userName
    }).then(() => {
      const updated = [...services];
      updated[editIndex] = {
        title: editTitle,
        price: editPrice,
        image: editImage,
        user: userName
      };

      setServices(updated);
      setEditIndex(null);
      toast.success("Updated ✏️");
    });
  };

  return (
    <div className="container mt-4">
      <h2>Explore Services 🔥</h2>

      {/* SEARCH */}
      <input
        className="form-control my-2"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER */}
      <input
        className="form-control my-2"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <div className="row">
        {services
          .filter(s =>
            s.title.toLowerCase().includes(search.toLowerCase())
          )
          .filter(s =>
            maxPrice === "" || s.price <= Number(maxPrice)
          )
          .map((service, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="card mt-4 shadow-lg"
                style={{
                  border:
                    service.user === userName
                      ? "2px solid green"
                      : ""
                }}
              >
                <img
                  src={service.image || "https://picsum.photos/300/200"}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  alt=""
                />

                <div className="card-body">

                  {editIndex === index ? (
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
                        type="file"
                        className="form-control my-2"
                        onChange={handleEditImage}
                      />

                      {editImage && (
                        <img
                          src={editImage}
                          alt=""
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover"
                          }}
                        />
                      )}

                      <button
                        className="btn btn-success mt-2"
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <h5>{service.title}</h5>
                      <p>₹{service.price}</p>

                      <p className="text-muted">
                        Seller: {service.user || "Unknown"}

                        {isAdmin && (
                          <span className="badge bg-danger ms-2">
                            Admin
                          </span>
                        )}
                      </p>

                      {/* 🔥 FINAL FIX */}
                      {(service.user === userName || isAdmin) && (
                        <div className="d-flex justify-content-between">
                          <button
                            className="btn btn-warning"
                            onClick={() => startEdit(service, index)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
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