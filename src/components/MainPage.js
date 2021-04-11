import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import { history } from "../history";
import { changeCount } from "../utils/changeCount";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { set } from "lodash";

const MainPage = (props) => {
  const [theClass, setTheClass] = useState("starships");
  const [data, setData] = useState([]);
  const [countChange, setCountChange] = useState(false);
  const [number, setNumber] = useState(0);
  const [error, setError] = useState([]);
  useEffect(() => {
    if (theClass === "starships") {
      axios
        .get("http://localhost:5000/api/starships")
        .then((response) => {
          setData(response.data.results);
          setCountChange(false);
          setError(null);
        })
        .catch((err) => {
          setData([]);
          setCountChange(false);
          setError(err.response.data.error);
        });
    } else if (theClass === "vehicles") {
      axios
        .get("http://localhost:5000/api/vehicles")
        .then((response) => {
          setData(response.data.results);
          setCountChange(false);
          setError(null);
        })
        .catch((err) => {
          setData([]);
          setCountChange(false);
          setError(err.response.data.error);
        });
    }
  }, [theClass, countChange]);
  return (
    <div className="card p-5">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="d-flex flex-row d-flex justify-content-around mb-5">
        <select value={theClass} onChange={(e) => setTheClass(e.target.value)}>
          <option value="starships">Starships</option>
          <option value="vehicles">Vehicles</option>
        </select>
      </div>

      <div>
        {console.log(data)}
        {data.length > 0 && !error ? (
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Model</th>
                <th>Manufacturer</th>
                <th>Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => {
                return (
                  <tr key={data.name}>
                    <td>{data.name}</td>
                    <td>{data.model}</td>
                    <td>{data.manufacturer}</td>
                    <td>{data.count}</td>
                    <td>
                      <input
                        className="mb-1"
                        type="number"
                        value={number}
                        min="1"
                        onChange={(e) => {
                          setNumber(e.target.value);
                        }}
                      />
                      <div>
                        <Button
                          className="mr-1"
                          onClick={() => {
                            changeCount(
                              { name: data.name, action: "decrement", number },
                              theClass
                            );
                            console.log(countChange);
                            setCountChange(true);
                          }}
                        >
                          -
                        </Button>
                        <Button
                          className="mr-1"
                          onClick={() => {
                            changeCount(
                              { name: data.name, action: "increment", number },
                              theClass
                            );
                            setCountChange(true);
                          }}
                        >
                          +
                        </Button>
                        <Button
                          onClick={() => {
                            changeCount(
                              { name: data.name, action: "set", number },
                              theClass
                            );
                            setCountChange(true);
                          }}
                        >
                          Set
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <h1>No data to show</h1>
        )}
      </div>
    </div>
  );
};

export default MainPage;
