import React from "react";
import '../styles/Footer.css';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const Footer = () => {

    return(
        <>

            <button className="btn" tabIndex="-1">
                <a href="/" >
                    <RestartAltIcon fontSize="large" />
                </a>
            </button>
        
        </>
    )
}

export default Footer;