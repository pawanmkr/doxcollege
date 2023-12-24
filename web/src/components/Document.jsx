import './styles/style.css';
import { useAuth } from '../context/AuthContext';

const Document = ({ id, title, year, price, created_by }) => {
  const { userId } = useAuth();

  return (
    <div className="document">
      <p>
        {title}
        { created_by == userId ? <strong style={{ color: "red" }}>Edit</strong> : ""}
      </p>
      <p>{year}</p>
      <p>{price}</p>
    </div>
  );
};

export default Document;
