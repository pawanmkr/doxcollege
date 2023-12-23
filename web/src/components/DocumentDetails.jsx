import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDocumentById } from '../services/apiService';
import { FaCartPlus } from "react-icons/fa";

const DocumentDetails = () => {
  const { id } = useParams();
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
        if (error.response && error.response.status === 404) {
          setDocumentDetails({});
          setLoading(false);
          setErrorMessage('Document not found on the DB. Please try a different ID.');
        } else {
          console.error('Error fetching document details:', error.response ? error.response.data : error.message);
          setLoading(false);
          setErrorMessage('An error occurred while fetching document details. Please try again later.');
        }
      }
    };

    fetchDocumentDetails();
  }, [id]); 

  return (
    <div>
      {loading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {!loading && !errorMessage && (
        <>
          <h2>Document Details for Document ID: {id}</h2>
          <p>Title: {documentDetails.title}</p>
          <p>Description : {documentDetails.description}</p>
          <p>Year: {documentDetails.year}</p>
          <p>Price: {documentDetails.price}Rs</p>
          <button><FaCartPlus/></button>
        </>
      )}
    </div>
  );
};

export default DocumentDetails;
