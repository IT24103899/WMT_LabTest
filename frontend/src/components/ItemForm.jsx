import { useState } from "react";

const generateSerialNumber = () => {
  return `ITEM-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
};

function ItemForm({ initialValues, onSubmit, submitText }) {
  const [formData, setFormData] = useState(
    initialValues || {
      name: "",
      category: "",
      price: "",
      description: "",
      imageUrl: "",
      availabilityStatus: "In Stock",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!formData.name?.trim()) {
      alert("Item name is required");
      return;
    }
    if (!formData.category?.trim()) {
      alert("Category is required");
      return;
    }
    if (!formData.description?.trim()) {
      alert("Description is required");
      return;
    }
    
    const price = Number(formData.price);
    if (isNaN(price) || price <= 0) {
      alert("Price must be a valid number greater than 0");
      return;
    }
    
    console.log("Form validation passed, submitting:", {
      name: formData.name,
      category: formData.category,
      price,
      description: formData.description,
      imageUrl: formData.imageUrl,
      availabilityStatus: formData.availabilityStatus,
    });
    
    const submitData = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      price,
      description: formData.description.trim(),
      imageUrl: formData.imageUrl.trim(),
      availabilityStatus: formData.availabilityStatus,
      serialNumber: generateSerialNumber(),
    };
    
    onSubmit(submitData);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{submitText}</h2>

      <label>Item Name</label>
      <input name="name" value={formData.name} onChange={handleChange} required />

      <label>Category</label>
      <input name="category" value={formData.category} onChange={handleChange} required />

      <label>Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        min="0.01"
        step="0.01"
        required
      />

      <label>Description</label>
      <textarea
        name="description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Image URL</label>
      <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

      <label>Availability Status</label>
      <select
        name="availabilityStatus"
        value={formData.availabilityStatus}
        onChange={handleChange}
        required
      >
        <option value="In Stock">In Stock</option>
        <option value="Out of Stock">Out of Stock</option>
        <option value="Discontinued">Discontinued</option>
      </select>

      <button className="btn primary" type="submit">{submitText}</button>
    </form>
  );
}

export default ItemForm;