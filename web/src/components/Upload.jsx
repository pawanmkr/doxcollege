import "./styles/style.css";
import { useState } from 'react';
import { uploadDocument } from "../services/apiService";
import { useAuth } from "../context/AuthContext";

const Upload = () => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    price: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage('* Please log in to upload documents.');
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };

    try {
      await uploadDocument(formData, config);
      setMessage('Document uploaded successfully!');

      // Reset the form after successful upload
      setFormData({
        title: '',
        description: '',
        year: '',
        price: '',
      });

    } catch (error) {
      setMessage('Error uploading document. Please try again.');
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      {message && (
        <p className="warning-msg">{message}</p>
      )}
      <label>Title</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} />
      <label>Description</label>
      <input type="text" name="description" value={formData.description} onChange={handleChange} />
      <label>Year</label>
      <input type="text" name="year" value={formData.year} onChange={handleChange} />
      <label>Price</label>
      <input type="text" name="price" value={formData.price} onChange={handleChange} />
      <input type="file" name="files" />
      <button type="submit" className="submit-btn">Upload</button>
    </form>

  );
};

export default Upload;