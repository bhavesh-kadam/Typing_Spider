import React, { useState, useEffect } from "react";
import '..//styles/Navbar.css'
import HistoryIcon from '@mui/icons-material/History';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Bounce, toast } from "react-toastify";

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Cleanup the listener
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth).then((res=>{
                toast.success('Logged out', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            }));
        } catch (error) {
            toast.error('Not able to logout', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }
    };

    return (
        <header className="header">
            <a href="/" className="logo">Typing Spider</a>

            <div className="icon">
                {user ? (
                    <a href="#Logout" onClick={handleLogout}><LogoutIcon /></a>
                ) : (
                    <a href="/Login"><AccountCircleIcon /></a>
                )}
                <a href="/FreqAskQues" ><LiveHelpIcon /></a>
                <a href="/History" ><HistoryIcon /></a>
            </div>

        </header>
    );
};

export default Navbar;