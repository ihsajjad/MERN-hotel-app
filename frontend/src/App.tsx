import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "./layouts/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <div>This is the home page.</div>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <div>This is the Search page.</div>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
