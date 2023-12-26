import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocumentById, editDocument, deleteDocument } from '../services/apiService';
import { useAuth } from "../context/AuthContext";

const EditDocument = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [documentDetails, setDocumentDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDocumentDetails = async () => {
      try {
        const response = await getDocumentById(id);
        setDocumentDetails(response.data);
        setLoading(false);
        setErrorMessage('');
      } catch (error) {
        console.error('Error fetching document details:', error.response ? error.response.data : error.message);
        setLoading(false);
        setErrorMessage('An error occurred while fetching document details. Please try again later.');
      }
    };

    fetchDocumentDetails();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await editDocument(id, token, {
        title: documentDetails.title,
        description: documentDetails.description,
        price: documentDetails.price,
        year: documentDetails.year,
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating document:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDocument(id, token);

      navigate('/');
      } catch (error) {
      console.error('Error deleting document:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
        <div className="buffer"></div>
      {loading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {!loading && !errorMessage && (
        <>
          <h2>Edit Document ID: {id}</h2>
          <form>
            <label>Title:</label>
            <input
              type="text"
              value={documentDetails.title}
              onChange={(e) => setDocumentDetails({ ...documentDetails, title: e.target.value })}
            />
            <label>Description:</label>
            <input
              type="text"
              value={documentDetails.description}
              onChange={(e) => setDocumentDetails({ ...documentDetails, description: e.target.value })}
            />
            <label>Price:</label>
            <input
              type="text"
              value={documentDetails.price}
              onChange={(e) => setDocumentDetails({ ...documentDetails, price: e.target.value })}
            />
            <label>Year:</label>
            <input
              type="text"
              value={documentDetails.year}
              onChange={(e) => setDocumentDetails({ ...documentDetails, year: e.target.value })}
            />
            <button type="button" onClick={handleUpdate}>
              Update
            </button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditDocument;
