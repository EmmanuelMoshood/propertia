//to use loaded user data
import { useAuth } from "../context/auth";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [adsForSell, setAdsForSell] = useState([]);
  const [adsForRent, setAdsForRent] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get("/ads");
      console.log(data);
      setAdsForSell(data.adsForSell);
      setAdsForRent(data.adsForRent);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-boby">
      <div className="cover-container background-serach">
        <div className="search-content">
          <div className="">
            <h4 className="search-title">Find Properties With Ease</h4>
          </div>
          <form className="d-flex p-5">
            <input
              className="form-control me-sm-2"
              type="search"
              placeholder="Enter   Search"
            />
            <button
              className="btn btn-secondary my-2 my-sm-0"
              type="submit"
              fdprocessedid="5dsuph"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="search-result ">
        <div>
          <pre>{JSON.stringify({ adsForSell, adsForRent }, null, 4)}</pre>
        </div>
      </div>
    </div>
  );
}