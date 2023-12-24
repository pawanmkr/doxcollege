import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllDocuments } from '../services/apiService';
import Document from './Document';
import './styles/style.css';
import Upload from './Upload';
import { useContext } from 'react';
import { DocumentContext } from '../context/DocumentContext';

export default function Documents() {
  const { documents, setDocuments } = useContext(DocumentContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getAllDocuments();
        setDocuments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching documents:', error.response.data);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="documents-container">
      <div className="documents">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="document-list-title list">
              <p className='title-item'>Title</p>
              <p className='title-item'>Year</p>
              <p className='title-item'>Price (Rs)</p>
            </div>

            <div className="document-list list">
              {documents.length < 1 ? (
                <h1>No Results Found!</h1>
              ) : (
                documents.map((document) => (
                  <div key={document.id}>
                    <Link to={`/document/${document.id}`}>
                      <Document
                        title={document.title}
                        year={document.year}
                        price={document.price}
                        created_by={document.created_by}
                      />
                    </Link>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
      <Upload />
    </div>
  );
}
