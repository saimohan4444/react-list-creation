import React, { useState, useEffect } from "react";
import { fetchLists } from "../../services/api";
import Loader from "../Loader/Loader";
import ErrorView from "../ErrorView/ErrorView";
import "./ListContainer.css";

const ListContainer = () => {
  const [data, setData] = useState([]);
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [newList, setNewList] = useState([]);
  const [checkedLists, setCheckedLists] = useState([]);
  const [isListCreationView, setIsListCreationView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchLists();
      setData(response.data.lists || []);
      setList1(response.data.lists.filter((item) => item.list_number === 1));
      setList2(response.data.lists.filter((item) => item.list_number === 2));
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (listNumber) => {
    setCheckedLists((prev) =>
      prev.includes(listNumber)
        ? prev.filter((num) => num !== listNumber)
        : [...prev, listNumber]
    );
  };

  const handleCreateNewList = () => {
    if (checkedLists.length !== 2) {
      alert("You should select exactly 2 lists to create a new list");
      return;
    }
    setIsListCreationView(true);
    setNewList([]);
  };

  const handleCancel = () => {
    setIsListCreationView(false);
    setNewList([]);
  };

  const handleUpdate = () => {
    if (checkedLists.includes(1)) {
      setList1([...list1, ...newList]);
    }
    if (checkedLists.includes(2)) {
      setList2([...list2, ...newList]);
    }
    setIsListCreationView(false);
    setNewList([]);
  };

  const moveItem = (sourceList, setSourceList, targetList, setTargetList, id) => {
    const itemToMove = sourceList.find((item) => item.id === id);
    if (itemToMove) {
      setSourceList(sourceList.filter((item) => item.id !== id));
      setTargetList([...targetList, itemToMove]);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorView message={error} onRetry={fetchData} />;

  return (
    <div className="list-container">
       
      {!isListCreationView ? (
        <>
          <div>
            <h1>List Creation</h1>
            <button onClick={handleCreateNewList}>Create a new list</button>
          </div>
          <div className="list-row">
            <div className="list-section">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="checkbox-list1"
                  checked={checkedLists.includes(1)}
                  onChange={() => handleCheckboxChange(1)}
                />
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
                <input
                  type="checkbox"
                  id="checkbox-list2"
                  checked={checkedLists.includes(2)}
                  onChange={() => handleCheckboxChange(2)}
                />
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
        </>
      ) : (
        <div className="list-creation-view">
           <div className="button-row">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleUpdate}>Update</button>
          </div>
          <div className="list-row">
            <div className="list-section">
              <h4>List 1</h4>
              <div className="card-container">
                {list1.map((item) => (
                  <div className="card" key={item.id}>
                    <h3 className="card-title">{item.name}</h3>
                    <p className="card-description">{item.description}</p>
                    <button onClick={() => moveItem(list1, setList1, newList, setNewList, item.id)}>
                      ➡️
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="list-section">
              <h4>New List</h4>
              <div className="card-container">
                {newList.map((item) => (
                  <div className="card" key={item.id}>
                    <h3 className="card-title">{item.name}</h3>
                    <p className="card-description">{item.description}</p>
                    <div className="arrow-container">
                    <button onClick={() => moveItem(newList, setNewList, list1, setList1, item.id)}>
                      ⬅️
                    </button>
                    <button onClick={() => moveItem(newList, setNewList, list2, setList2, item.id)}>
                      ➡️
                    </button>
                    </div>
                   
                  </div>
                ))}
              </div>
            </div>

            <div className="list-section">
              <h4>List 2</h4>
              <div className="card-container">
                {list2.map((item) => (
                  <div className="card" key={item.id}>
                    <h3 className="card-title">{item.name}</h3>
                    <p className="card-description">{item.description}</p>
                    <button onClick={() => moveItem(list2, setList2, newList, setNewList, item.id)}>
                      ⬅️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        
        </div>
      )}
    </div>
  );
};

export default ListContainer;
