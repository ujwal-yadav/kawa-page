import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [temp, setTemp] = useState(null);
  const [isItMe, setIsItMe] = useState(null);
  const load = async () => {
    const res = await axios.get(
      "https://randomuser.me/api/?inc=gender,name,nat,location,picture,email&results=20"
    );
    setData(res.data.results);
  };
  useEffect(() => {
    load();
  }, []);
  const focusToogle = (i) => {
    setIsItMe(i);
    const topdata = data[i];
    setTemp(topdata);
  };

  return (
    <div className="App">
      {temp && (
        <div className="top-container">
          <img src={temp && temp.picture.large} alt="profile picture"></img>
          <div className="content">
            <div>
              <h1 className="name">
                {temp && temp.name.title} {temp && temp.name.first}{" "}
                {temp && temp.name.last}
              </h1>
            </div>
            <div>
              <p className="email">
                <span className="street">
                  {temp && temp.location.street.number + ", "}
                </span>
                {temp && temp.location.street.name + ", "}
                {temp && temp.location.city + ", "}{" "}
                {temp && temp.location.state + ", "}
                <span className="country">
                  {" "}
                  {temp && temp.location.country}
                </span>
                {temp && ", " + temp.location.postcode}
                {temp && ", " + temp.location.timezone.offset + "-"}
                {temp && temp.location.timezone.description}
              </p>
            </div>
            <div>
              <p className="gender">{data && data.gender}</p>
            </div>
          </div>
        </div>
      )}

      <section className="FlexContainer">
        {data &&
          data.map((user, index) => (
            <div
              className={
                isItMe == index
                  ? "inner-container focus"
                  : "inner-container Notfocus"
              }
              key={index}
              onClick={() => focusToogle(index)}
            >
              <div>
                <p className="gender-and-country">
                  {user.gender + " · "} {user.location.country}
                </p>
              </div>
              <div>
                <h1 className="name">
                  {user.name.title} {user.name.first} {user.name.last}
                </h1>
              </div>
              <div>
                <p className="email">{user.email}</p>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default App;
