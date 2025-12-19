import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsSidebarOpen(false)
    }
  }, [])

  return (
    <div className="app-shell min-h-screen bg-neutral-sage text-teal-deep">
      <Sidebar open={isSidebarOpen} />
      {isSidebarOpen && <div className="fixed inset-0 z-30 bg-black/20 md:hidden" onClick={() => setIsSidebarOpen(false)} />}
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <Navbar onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="app-main flex-1 px-4 py-8 bg-neutral-sage sm:px-8 lg:px-10">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
