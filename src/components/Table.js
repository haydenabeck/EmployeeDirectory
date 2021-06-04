import React, { useState, useEffect } from "react";
import API from "../utils/API.js";

function Table() {
  const [randomUser, setRandomUser] = useState([]);

  useEffect(() => {
    fillTable();
  }, []);

  const fillTable = async () => {
    const res = await API.getRandomUsers();
    await setRandomUser(res.data.results);

    console.log(...randomUser);
  };

  const sortAlphabetically = (e) => {
    function compare(a, b) {
      if (a.name.first < b.name.first) {
        return -1;
      }
      if (a.name.first > b.name.first) {
        return 1;
      }
      return 0;
    }

    var sortedUser = randomUser.sort(compare);

    setRandomUser([...sortedUser]);
  };

  const filterAge = (e) => {
    var peopleFifty = [];
    for (let index = 0; index < randomUser.length; index++) {
      const element = randomUser[index];

      if (randomUser[index].dob.age > 50) {
        peopleFifty.push(randomUser[index]);
      }
    }

    // var sortedUser = randomUser.sort(compare);

    setRandomUser([...peopleFifty]);
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Photo</th>
          <th scope="col">
            <button onClick={sortAlphabetically}>First</button>
          </th>
          <th scope="col">Last</th>
          <th scope="col">
            <button onClick={filterAge}>Age</button>
          </th>
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
            <td>{result.name.last}</td>
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
