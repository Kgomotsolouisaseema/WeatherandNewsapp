import { useState } from "react";
// import { AsyncPaginate } from "react-select-async-paginate";
import { AsyncPaginate } from "react-select-async-paginate";
import { tryGeoOptions, Try_GEO } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  // const loadOptions = async (inputValue) => {
  //   return fetch(
  //     `${Try_GEO}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
  //     tryGeoOptions
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       return {
  //         options: response.data.map((city) => {
  //           return {
  //             value: `${city.latitude} ${city.longitude}`,
  //             label: `${city.name} ${city.countryCode}`,
  //           };
  //         }),
  //       };
  //     })
  //     .catch((err) => console.error(err));
  // };

  const loadOptions = async (inputValue) => {        //async func with inputValue as prop . funct will be used as prop in serach comp
    try{                                            // starts a try blovk where ascny operations will take place and erro handling sections 
      const response  = await fetch (
        `${Try_GEO}/cities?minPopulation=1000000&namePrefix=${inputValue}`,  //uses fetch func to make an API request to specified URL , STRING LITERAL 
        tryGeoOptions
      );
      if(!response.ok){                              //CHECKS IF RESPONS STATUS IS NOT OK (not a success status code like 200) throws custom error
        throw new Error('API request failed');       //throw new Error (') line , throws custom erro msg saying api call failed
      }
      const responseData = await response.json();    //if response is OK ,this async parses the response body as JSON .the parsed data is stored in responseData variable. 

      if(responseData.data){
        const options = responseData.data.map((city) => ({      //checks if responseData  object has a 'data property.attempts to ensure that api response has expected structure  
          value : `${city.latitude} ${city.longitude}`,         //if 'data' property exists , mapa over 'data' array in reposne and creat array of options . 
          label : `${city.name} ${city.countryCode}`,
        }));
        return{options};                                        //returns an object containing the 'options' array created before . object will used as response of loadOptions func.
      }else{
        throw new Error('API response missing "data" property');     //if 'data' property isnt found in API response. throw new error
      }
    } catch(error){                                                 //catches any other errors 
      console.error(error);
      return {options: [] };
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
