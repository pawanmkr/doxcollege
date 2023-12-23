import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { getProfile } from '../services/apiService';
import Document from './Document';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { userId } = useAuth();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getProfile(userId);
        setDocuments(response.data.docs);
      } catch (error) {
        console.error('Error fetching documents:', error.response.data);
      }
    };

    fetchDocuments();
  }, [userId]);

  return (
    <div className="document-list list">
      {userId === null? <p>Login to continue.</p>:"" }
      {documents === null ? (
        <p> <strong>You have uploaded no documents.</strong></p>
      ) : (
        documents.slice().reverse().map((document) => (
          <div key={document.id}>
            <Link to={`/document/${document.id}`}>
              <Document title={document.title} year={document.year} price={document.price} />
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
