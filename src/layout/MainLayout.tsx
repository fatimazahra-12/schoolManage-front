import { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-neutral-sage text-teal-deep">
      <Sidebar open={isSidebarOpen} />
      <div className={`flex flex-col min-h-screen transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Navbar onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />
        <main className="flex-1 px-4 py-8 bg-neutral-sage sm:px-8 lg:px-10">
          {/* Main content area */}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout
