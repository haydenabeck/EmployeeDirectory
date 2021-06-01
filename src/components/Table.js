import React, { useState, useEffect } from "react";
import API from "../utils/API.js";

function Table(props) {
  const { products } = props;
  const [sortedField, setSortedField] = React.useState(null);
  const [randomUser, setRandomUser] = useState([]);

  useEffect(() => {
    fillTable();
  }, []);

  const fillTable = async () => {
    const res = await API.getRandomUsers();
    await setRandomUser(res.data.results);

    console.log(...randomUser);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Photo</th>
          <th scope="col">
            <button type="button" onClick={() => setSortedField("first")}>
              First
            </button>
          </th>
          <th scope="col">
            <button type="button" onClick={() => setSortedField("last")}>
              Last
            </button>
          </th>
          <th scope="col">Age</th>
          <th scope="col">Gender</th>
          <th scope="col">Location</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
        </tr>
      </thead>
      <tbody>
        {/* map around this row */}

        {randomUser.map((result) => (
          <tr>
            <th scope="row">
              <img src={result.picture.thumbnail} alt=""></img>
            </th>
            <td>{result.name.first}</td>
            <td>{result.name.last}</td>
            <td>{result.dob.age}</td>
            <td>{result.gender}</td>
            <td>{result.location.state}</td>
            <td>{result.email}</td>
            <td>{result.phone}</td>
          </tr>
        ))}
        {/* end map */}
      </tbody>
    </table>
  );
}

export default Table;
