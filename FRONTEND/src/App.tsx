import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AddCar, HomePage, Layout, UpdateCars } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/add-car" element={<AddCar />} />
          <Route path="/batch-update" element={<UpdateCars />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
