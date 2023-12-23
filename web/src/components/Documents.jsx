import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { getAllDocuments } from '../services/apiService';
import Document from './Document';
import './styles/style.css';
import Upload from './Upload';

export default function Documents() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getAllDocuments();
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error.response.data);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="documents-container">
      <div className="documents">
        {documents.length > 0 ? (
          <>
            <div className="document-list-title list">
              <p className='title-item'>Title</p>
              <p className='title-item'>Year</p>
              <p className='title-item'>Price (Rs)</p>
            </div>

            <div className="document-list list">
              {documents.map((document) => (
                <div key={document.id}>
                  {/* Use Link to navigate to the detailed page */}
                  <Link to={`/document/${document.id}`}>
                    <Document
                      title={document.title}
                      year={document.year}
                      price={document.price}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <Upload />
    </div>
  );
}
