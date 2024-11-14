import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy loading the components
const Homepage = lazy(() => import("./Pages/Homepage"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const Product = lazy(() => import("./Pages/Product"));
const Login = lazy(() => import("./Pages/Login"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const Notfound = lazy(() => import("./Pages/Components/Notfound"));
const CityList = lazy(() => import("./Pages/CityList"));
const CountryList = lazy(() => import("./Pages/CountyList"));
const City = lazy(() => import("./Pages/City"));
const Form = lazy(() => import("./Pages/Form"));

// Import the context providers
import CitiesContext from "./context/CitiesContext";
import AuthContext from "./context/AuthContext";

function App() {
  return (
    <CitiesContext>
      <AuthContext>
        <BrowserRouter>
          {/* Use Suspense to wrap lazy-loaded components */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/product" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<Notfound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthContext>
    </CitiesContext>
  );
}

export default App;
