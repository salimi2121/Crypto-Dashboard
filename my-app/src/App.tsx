import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./component/Header/Header";
import Sidebar from "./component/Sidbar/Sidbar";
import user1 from "./assets/header/Face1.png";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1281;
      setIsMobile(mobile);
      if (!mobile) setMobileMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#17153A]">
      {/* Header - همیشه در بالای صفحه */}
      <Header
        user={{
          name: "Pixelz Warrios",
          avatarUrl: user1,
        }}
        unreadNotifications={15}
        isMobile={isMobile}
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      {/* ساختار اصلی صفحه */}
      <div className="flex pt-16"> {/* pt-16 برای فاصله از هدر */}
        {/* Sidebar - برای دسکتاپ */}
        <Sidebar
          isMobile={isMobile}
          mobileMenuOpen={mobileMenuOpen}
          closeMobileMenu={closeMobileMenu}
        />

        {/* محتوای اصلی */}
        <main className={`flex-1 transition-all duration-300 ${
          isMobile ? "ml-0" : "ml-64"
        } p-6`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;