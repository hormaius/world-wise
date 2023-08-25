import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useState, useEffect } from "react";
import CountriesList from "./components/CountryList";
/* import data from "../data/cities.json"; */

/* const BASE_URL = "https://localhost:8000"; */

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /* const fetchJson = () => {
    fetch("../data/cities.json")
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((e) => {
        console.log(e.message);
      });
  }; */
  useEffect(() => {
    const fetchJson = async () => {
      setIsLoading(true);
      const response = await fetch("../data/cities.json");
      const data = await response.json();
      setCities(data);
      setIsLoading(false);
    };
    const fetched = fetchJson();
    console.log(`fetched: ${fetched}`);
  }, []);
  console.log(`cities:`, cities);

  // useEffect(() => fetchJson(), []);
  /* useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        console.log("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []); */

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="countries"
            element={<CountriesList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
