import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
// import Navbar from "./components/Navbar";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";

const BASE_URL = 'http://localhost:8000';

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities(){
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      }
      catch {
        alert("Error fetching cities");
      }
      finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, [])

  return (
    <>
      <BrowserRouter>
       {/* <Navbar /> */}
       <Routes>
        <Route path="product" element={<ProductPage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<p>List of cities</p>}/>
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
          <Route path="countries" element={<CityList cities={cities} isLoading={isLoading}/>}/>
          <Route path="form" element={<p>Form</p>}/>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
