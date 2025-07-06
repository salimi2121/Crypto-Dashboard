import Header from "./component/Header/Header"
import user1 from "./assets/header/Face1.png"
import Saidbar from "./component/Sidbar/Sidbar"
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <div className="relative p-6 space-y-4 bg-[#17153A] ">
        <Header
        user={{
          name: "Pixelz Warrios",
          avatarUrl: user1,
        }}
        unreadNotifications={15}
      />
      <Saidbar />
         <main className="flex-1 overflow-auto ml-64 p-6 pt-0 ">
        <Outlet />
      </main>
       
      </div>
    </>
  )
}

export default App
