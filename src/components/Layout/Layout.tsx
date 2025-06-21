import { Suspense } from "react";
import { Outlet } from "react-router";

import Header from "../Header/Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>

    </div>
  );
}
