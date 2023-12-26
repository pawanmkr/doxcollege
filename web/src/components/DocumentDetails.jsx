import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDocumentById } from '../services/apiService';
import { FaCartPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const DocumentDetails = () => {
  const { id } = useParams();
  const [documentDetails, setDocumentDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportFormData, setReportFormData] = useState({
    proofs: '',
    email: '',
    description: '',
  });
  const { userId } = useAuth();

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
          console.error(
            'Error fetching document details:',
            error.response ? error.response.data : error.message
          );
          setLoading(false);
          setErrorMessage(
            'An error occurred while fetching document details. Please try again later.'
          );
        }
      }
    };

    fetchDocumentDetails();
  }, [id]);

  const handleReportButtonClick = () => {
    setShowReportForm(true);
  };

  const handleReportFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('Document Reported');
    console.log(reportFormData);
    // try {
      // might require an api for reporting.
    //   await reportDocument(id, reportFormData);

    //   // Notify the user that the report was submitted successfully
    //   alert('Report submitted successfully! Our team will reach out to you soon.');

    //   setReportFormData({
    //     proofs: '',
    //     email: '',
    //     description: '',
    //   });
    //   setShowReportForm(false);
    // } catch (error) {
    //   console.error('Error submitting report:', error);
    //   alert('An error occurred while submitting the report. Please try again later.');
    // }
  };

  return (
    <div>
      <div className="buffer"></div>{/**added for testing only purposes */}
      {loading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {!loading && !errorMessage && (
        <>
          <h2>Document Details for Document ID: {id}</h2>
          <p>Title: {documentDetails.title}</p>
          <p>Description : {documentDetails.description}</p>
          <p>Year: {documentDetails.year}</p>
          <p>
            Price: {documentDetails.price !== 0 ? `${documentDetails.price}Rs` : <strong style={{ color: 'green' }}>Free</strong>}
          </p>
          <button onClick={handleReportButtonClick}>Report</button>
          <button>
              Add to Cart
          </button>
          <br />
          <br />
          {userId == documentDetails.created_by ? (
            <strong style={{ color: 'red' }}>Edit</strong>
          ) : (
            ''
          )}

          {showReportForm && (
            <form onSubmit={handleReportFormSubmit}>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={reportFormData.email}
                  onChange={(e) =>
                    setReportFormData({ ...reportFormData, email: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={reportFormData.description}
                  onChange={(e) =>
                    setReportFormData({ ...reportFormData, description: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Proofs:
                <input
                  type="text"
                  name="proofs"
                  value={reportFormData.proofs}
                  onChange={(e) =>
                    setReportFormData({ ...reportFormData, proofs: e.target.value })
                  }
                />
              </label>
              <button type="submit">Submit Report</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default DocumentDetails;
