// import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import api from '../services/api';
// import AuthContext from '../contexts/AuthContext';
// import './BreweryDetail.css'

// const BreweryDetail = () => {
//   const { id } = useParams();
//   const [brewery, setBrewery] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(1);
//   const [description, setDescription] = useState('');
//   const { user } = useContext(AuthContext);  

//   useEffect(() => {
//     const fetchBreweryDetails = async () => {
//       const response = await api.get(`/breweries/${id}`);
//       console.log(response)
//       setBrewery(response.data);
//       setReviews(response.data.reviews)
//       console.log('brewery',brewery)
//     }
//     fetchBreweryDetails();
//   }, [id]);

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     const newReview = { rating, description, userId: user._id,
//       username : user.username

//      }; 
//    console.log(newReview)
//     try {
//     const response = await api.post(`/breweries/${id}/reviews`, newReview);
//     console.log(response.data)
//     setReviews([...reviews, response.data]);

//     setRating(1);
//     setDescription('');
//     }
//     catch (err){
//       console.error('Error submitting review:', err);
//     }
//   };

//   if (!brewery) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>{brewery.name}</h2>
//       <p><strong>type :</strong> {brewery.brewery_type}</p>
//       <p><strong>Address :</strong>  {brewery.address_1}</p>
//       <p><strong>Phone :</strong> {brewery.phone}</p>
//       <p><strong>state :</strong>  {brewery.state}</p>
//       <p><strong>city :</strong>  : {brewery.city}</p>
//       <p>
//         <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
//           {brewery.website_url}
//         </a>
//       </p>
//       <h3>Reviews</h3>
//       <ul>
//         {reviews.map((review) => (
//           <li key={review._id}>
//             <p>{review.username}</p>
//             <strong>rating : {review.rating} - </strong> {review.description}
//           </li>
//         ))}
//       </ul>
//       <form onSubmit={handleReviewSubmit}>
//         <h3>Add Review</h3>
//         <label>Rating:</label>
//         <select className='sel' value={rating} onChange={(e) => setRating(e.target.value)}>
//           {[1, 2, 3, 4, 5].map((rate) => (
//             <option key={rate} value={rate}>
//               {rate}
//             </option>
//           ))}
//         </select>
//         <label>Comment:</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         ></textarea>
//         <button type="submit">Submit Review</button>
//       </form>
//     </div>
//   );
// };

// export default BreweryDetail;


import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../contexts/AuthContext';
import './BreweryDetail.css';

const BreweryDetail = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState('');
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchBreweryDetails = async () => {
      try {
        const response = await api.get(`/breweries/${id}`);
       
        setBrewery(response.data);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error('Error fetching brewery details:', error);
      }
    };
    fetchBreweryDetails();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      rating,
      description,
      userId: user._id,
      username: user.username,
    };
   
    try {
      const response = await api.post(`/breweries/${id}/reviews`, newReview);
      
      setReviews([...reviews, response.data]);
      setRating(1);
      setDescription('');
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  if (!brewery) return <div>Loading...</div>;

  return (
    <div>
      <h2>{brewery.name}</h2>
      <p><strong>type :</strong> {brewery.brewery_type}</p>
      <p><strong>Address :</strong>  {brewery.address_1}</p>
      <p><strong>Phone :</strong> {brewery.phone}</p>
      <p><strong>state :</strong>  {brewery.state}</p>
      <p><strong>city :</strong>  : {brewery.city}</p>
      <p>
        <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
          {brewery.website_url}
        </a>
      </p>
      <h3>Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <p>{review.username}</p>
            <strong>Rating: {review.rating} - </strong> {review.description}
          </li>
        ))}
      </ul>
      <form onSubmit={handleReviewSubmit}>
        <h3>Add Review</h3>
        <label>Rating:</label>
        <select className="sel" value={rating} onChange={(e) => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map((rate) => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>
        <label>Comment:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit Review</button>
        <button onClick={()=>navigate('/breweries')}>Search </button>
      </form>
    </div>
  );
};

export default BreweryDetail;
