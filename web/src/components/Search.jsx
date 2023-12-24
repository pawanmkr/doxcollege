import { useState } from "react";
import { searchDocument } from "../services/apiService";
import { useContext } from "react";
import { DocumentContext } from "../context/DocumentContext";

const Search = () => {
  const [query, setQuery] = useState("");
  const { setDocuments } = useContext(DocumentContext);

  return (
    <>
      <div className="search-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Search for any document..."
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              const { data } = await searchDocument(query);
              console.log(data)
              setDocuments(data);
            }
          }}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
    </>
  );
}

export default Search;



// import { useState } from 'react';
// import { getDocumentById } from '../services/apiService';
// import Card from './Card';

// const Search = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [document, setDocuments] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');


//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await getDocumentById(inputValue);
//       setDocuments(response.data);
//       setLoading(false);
//       setErrorMessage('');
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         setDocuments({});
//         setLoading(false);
//         setErrorMessage('Document not found on the DB. Please try a different ID.');
//       } else {
//         console.error('Error fetching documents:', error.response ? error.response.data : error.message);
//         setLoading(false);
//         setErrorMessage('An error occurred while fetching documents. Please try again later.');
//       }
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleInputChange}
//           placeholder="Please type the ID:"
//           className='searchinput'
//         />
//         <button type="submit">Submit</button>
//       </form>

//       <div>
//         {loading ? (
//           <p>Enter the ID in the search box.</p>
//         ) : (

//           <div>
//             {loading ? (
//               <p>Enter the ID in the search box.</p>
//             ) : (
//               <div>
//                 {errorMessage ? (
//                   <p>{errorMessage}</p>
//                 ) : (
//                   <div>
//                     <ul className="heading">
//                       <li><strong>Title</strong></li>
//                       <li><strong>Description</strong></li>
//                       <li><strong>Year</strong></li>
//                       <li><strong>Price</strong></li>
//                       <li><strong>Buy</strong></li>
//                     </ul>
//                     <li key={document.id}>
//                       <Card
//                         title={document.title}
//                         category={document.description}
//                         year={document.year}
//                         price={document.price}
//                       />
//                     </li>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//         )}
//       </div>
//     </div>
//   );
// }

// export default Search;