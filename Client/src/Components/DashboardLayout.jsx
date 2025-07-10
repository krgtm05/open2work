import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  return (
    <div className='container'>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-12'>
          <Navbar />
        </div>
        <div className='col-span-3 '>
          <Sidebar />
        </div>
        <div className='h-screen col-span-9 overflow-y-auto scrollbar-hide will-change-scroll pb-48'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
