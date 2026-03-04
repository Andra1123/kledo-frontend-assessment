import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Filter from "./features/filter/Filter";

const router = createHashRouter([
  {
    path: "/",
    element: <Filter />,
    loader: async () => {
      const [resDis, resProv, resReg] = await Promise.all([
        fetch("/Data/districts.json"),
        fetch("/Data/provinces.json"),
        fetch("/Data/regencies.json"),
      ]);

      if (!resProv.ok || !resReg.ok || !resDis.ok) {
        throw new Error("Gagal memuat data wilayah");
      }

      return {
        provinces: await resProv.json(),
        regencies: await resReg.json(),
        districts: await resDis.json(),
      };
    },
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
