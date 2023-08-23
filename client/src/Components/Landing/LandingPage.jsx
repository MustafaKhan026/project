import React from 'react'
import { Navbar, Welcome, Footer, Services,Benifits,GetStarted,Contact } from "./index"
const LandingPage = () => {
  return (
    <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    <Services />
    <Benifits/>
    <GetStarted/>
    <Contact/>
    <Footer />
  </div>
  )
}

export default LandingPage
