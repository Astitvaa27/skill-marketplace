import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function AddService({ services, setServices, userName }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: ""
  });

  // 📸 Convert image to base64
  const handleImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    // 🚫 LOGIN CHECK
    if (!userName) {
      toast.error("Please login first ❌");
      return;
    }

    if (!form.title || !form.price) {
      toast.error("Fill all fields ❌");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/services",
        {
          ...form,
          user: userName // 👤 attach user
        }
      );

      toast.success(res.data.message);

      // 🔥 UPDATE UI
      setServices([...services, { ...form, user: userName }]);

      // 🔄 RESET FORM
      setForm({
        title: "",
        price: "",
        image: ""
      });
    } catch (err) {
      toast.error("Error adding service ❌");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Service</h2>

      <input
        className="form-control my-2"
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        className="form-control my-2"
        placeholder="Price"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      {/* 📸 IMAGE UPLOAD */}
      <input
        type="file"
        className="form-control my-2"
        onChange={handleImage}
      />

      <button className="btn btn-success" onClick={handleSubmit}>
        Add Service
      </button>
    </div>
  );
}

export default AddService;