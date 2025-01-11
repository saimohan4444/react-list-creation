import { fetchLists } from '../../services/api';
import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import ErrorView from '../ErrorView/ErrorView';
import './ListContainer.css';

const ListContainer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetchLists(); // Fetch the data from API
      console.log('API Response:', response); // Log the response to check structure
      setData(response.data.lists || []); // Assuming the response structure has a 'lists' array
    } catch (err) {
      console.error('Error fetching data:', err); // Log error for debugging
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  // Check if data is an array
  if (!Array.isArray(data)) {
    return <ErrorView message="Data format is incorrect" onRetry={fetchData} />;
  }

  // Split the data into list1 and list2 based on list_number
  const list1 = data.filter(item => item.list_number === 1);
  const list2 = data.filter(item => item.list_number === 2);

  // If loading, show the loader
  if (loading) return <Loader />;

  // If there is an error, show the error view
  if (error) return <ErrorView message={error} onRetry={fetchData} />;

  // Render list1 and list2 side by side in a single row
  return (
   
    <div className="list-container">
        <div>
            <h1>List Creation</h1>
            <button>Create a new list</button>
        </div>

      {/* Single Row with two lists */}
      <div className="list-row">
  <div className="list-section">
    <div className="checkbox-container">
      <input type="checkbox" id="checkbox-list1" />
      <h4>List 1</h4>
    </div>
    <div className="card-container">
      {list1.map((item) => (
        <div className="card" key={item.id}>
          <h3 className="card-title">{item.name}</h3>
          <p className="card-description">{item.description}</p>
        </div>
      ))}
    </div>
  </div>

  <div className="list-section">
    <div className="checkbox-container">
      <input type="checkbox" id="checkbox-list2" />
      <h4>List 2</h4>
    </div>
    <div className="card-container">
      {list2.map((item) => (
        <div className="card" key={item.id}>
          <h3 className="card-title">{item.name}</h3>
          <p className="card-description">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
</div>


    </div>
  );
};

export default ListContainer;
