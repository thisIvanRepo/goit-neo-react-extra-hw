import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const TasksPages = lazy(() => import("./pages/TasksPages/ContactsPages"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));

function App() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/contacts" element={<TasksPages />} />
          </Route>
          <Route path="*" element={<div>not faunt</div>} />
        </Routes>
      </Suspense>
  );
}

export default App;
