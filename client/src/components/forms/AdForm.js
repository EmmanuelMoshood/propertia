import React from "react";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../config";
import CurrencyInput from 'react-currency-input-field';

//function will have 2 props to make it reusable 
export default function AdForm ({action, type}){
    const [ad, setAd] = useState({
        photos: [],
        uploading: false,
        price: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        carpark: "",
        landsize: "",
        type: "",
        title: "",
        description: "",
        loading: false,
      });


    return (
      <>
        <div className="mb-3 form-control">
          <GooglePlacesAutocomplete
            apiKey={GOOGLE_PLACES_KEY}
            apiOptions={{ region: "ca" }}
            selectProps={{
              defaultInputValue: ad?.address,
              placeholder: "Search for address..",
              onChange: ({ value }) => {
                // console.log("address onchange => ", value.description);
                setAd({ ...ad, address: value.description });
              },
            }}
          />
        </div>
        <CurrencyInput className="mb-3 form-control"
          id="price"
          name="price"
          placeholder="Enter price"
          defaultValue={0}
          decimalsLimit={2}
          onValueChange={(value) => setAd({ ...ad, price: value })}
        />
        <input
          type="number"
          min="0"
          className="form-control mb-3"
          placeholder="Enter number of bedrooms"
          value={ad.bedrooms}
          onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
          required
        />

        <input
          type="number"
          min="0"
          className="form-control mb-3"
          placeholder="Enter number of bathrooms"
          value={ad.toilets}
          onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
          required
        />

        <input
          type="number"
          min="0"
          className="form-control mb-3"
          placeholder="Enter  number of car parks"
          value={ad.carpark}
          onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Size of land"
          value={ad.landsize}
          onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter title"
          value={ad.title}
          onChange={(e) => setAd({ ...ad, title: e.target.value })}
          required
        />

        <textarea
          className="form-control mb-3"
          value={ad.description}
          placeholder="Write description"
          onChange={(e) => setAd({ ...ad, description: e.target.value })}
        />

        <button className="btn btn-primary">Submit</button>
        <pre>{JSON.stringify(ad, null, 4)}</pre>
      </>
    );
    
}