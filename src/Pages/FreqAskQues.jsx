import React from "react";
import Navbar from '../Components/Navbar';
import Faq from "react-faq-component";
import '../styles/Faq.css'

const FreqAskQues = () => {

    const data = {
        title: "FAQ (How it works)",
        rows: [
            {
                title: "What is Typing Spider?",
                content: `Typing Spider is a skill enhancement website used to sharpen accuracy and speed in typing. `,
            },
            {
                title: "Is typing 40 WPM good?",
                content: `A typing speed of 40 words per minute (WPM) is considered good for casual use, but it may not be enough for professional purposes. `,
            },
            {
                title: "Is typing 70 words a minute fast?",
                content: `If you want to be very productive, you should aim for a typing speed of 65 to 70 words per minute.`,
            },
            {
                title: "What is the highest Typing Speed ever recorded?",
                content: `The highest typing speed ever recorded was 216 words per minute (wpm), set by Stella Pajunas in 1946. She used an IBM electric typewriter with a QWERTY keyboard. `,
            },
            {
                title: "How can I type faster?",
                content:
                    "To type faster, focus on practicing proper hand placement, learning touch typing, prioritizing accuracy over speed initially, regularly practicing typing exercises, and utilizing online typing tools to familiarize yourself with the keyboard layout and key locations."
            },
            {
                title: "What is the 10 finger rule for typing?",
                content: `Your left fingers are placed on the keys A, S, D and F. Your right fingers are on the keys J, K, L and semicolon. Your thumbs are on the space bar. `,
            },
        ],
    };
    
    const styles = {
        bgColor: '#31363',
        titleTextColor: "white",
        rowTitleTextSize: "19px",
        rowTitleColor: "#76ABAE",
        rowContentColor: 'white',
        rowContentPaddingBottom: '10px',
        arrowColor: "#76ABAE",
    };
    
    const config = {
        // animate: true,
        // arrowIcon: "V",
        // tabFocus: true,
        expandIcon: "+",
        collapseIcon: "-",
    };


    return(
        <>
            <Navbar />
            <div className="faq-style">
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
            </div>
        </>
        
    )
}

export default FreqAskQues;