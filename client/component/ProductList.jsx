import axios from "axios";
import { useEffect, useState } from "react";

function Productlist() {
  const [searchText, setSearchText] = useState("");
  const [places, setPlaces] = useState([]);
  console.log(searchText);
  const getProductList = async () => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${searchText}`
    );
    console.log(result);
    setPlaces(result.data.data);
  };

  useEffect(() => {
    getProductList();
  }, [searchText]);

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <h1 className="header">เที่ยวไหนดี</h1>
      <div className="input">
        <input
          className="text"
          type="text"
          value={searchText}
          onChange={handleSearchText}
          placeholder="ค้นหาที่เที่ยว"
        />
      </div>
      <div className="places-list">
        {places.map((place) => (
          <div className="place-item" key={place.id}>
            <img src={place.photos[0]} />
            <h2>{place.title}</h2>
            <p>{place.description.substring(0, 100)}...</p>
            <a href={place.url}>อ่านต่อ</a>
            <div className="tags">
              {place.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productlist;
