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

  /* useEffect(() => {
    try {
      const fetchJson = async () => {
        setIsLoading(true);
        fetch("../data/cities.json")
          .then((response) => {
            return response.json();
          })
          .then((data) => setCities(data));
      };
      fetchJson();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []); */

  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    const fetchJson = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`);
      const data = await response.json();
      setCities(data);
      setIsLoading(false);
    };
    fetchJson();
  }, []);

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
