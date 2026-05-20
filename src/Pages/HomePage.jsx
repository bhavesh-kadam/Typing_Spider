import React from 'react';
import TypingBox from '../Components/TypingBox';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '../styles/HomePage.css';


const HomePage = () => {
    return(
        
        <div className="canvas">
        <Navbar />
        <TypingBox />
        <Footer />
        </div>
    
    )
}

export default HomePage;