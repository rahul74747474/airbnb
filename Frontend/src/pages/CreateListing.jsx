import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/api/listings/", formData, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#ff385c] text-white p-8">
      <h2 className="text-3xl font-bold mb-6">Create Listing</h2>
      <form onSubmit={handleCreate} className="max-w-xl space-y-5">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 bg-transparent border border-white rounded text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 bg-transparent border border-white rounded text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 bg-transparent border border-white rounded text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-3 bg-transparent border border-white rounded text-white file:text-white file:bg-transparent file:border file:border-white file:rounded"
          required
        />

        {/* Image Preview */}
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="h-32 object-contain border border-white p-2 rounded"
          />
        )}

        <button
          type="submit"
          className="w-full py-3 border border-white rounded text-white bg-transparent hover:bg-white hover:text-[#ff385c] transition-colors duration-300"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}

export default CreateListing;

