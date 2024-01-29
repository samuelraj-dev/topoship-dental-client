import { RecoilRoot } from 'recoil';
import { Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";


import { appRoutes } from "./data"
import "./styles.css";

export default function Dashboard() {
  return (
    <RecoilRoot>
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <main className="main">
          <Routes>
            {
              appRoutes.map((route, key)=> {
                // console.log(`Adding route: ${route.path}`);
                return (
                  <Route path={route.path} element={route.component} key={key} />
                )
            })
            }

          </Routes>
        </main>
      </div>
      <Toaster />
    </div>
    </RecoilRoot>
  )
}