import { Route, Routes } from "react-router-dom"
import { NotFoundPage } from "./pages"
import Home from "./pages/Home"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/contact"


function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />


        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
