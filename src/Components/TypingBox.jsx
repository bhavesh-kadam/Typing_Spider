import React, { useEffect, useState, useRef, useMemo, createRef } from "react";
import  generate  from "random-words";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";
import Stats from "./Stats";

const TypingBox = () => {

    const { testSeconds, testWords, testMode } = useTestMode();
    const [words, setWords] = useState(generate(100));

    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [countDown, setCountDown] = useState(testSeconds);
    const [testTime, setTestTime] = useState(testSeconds);


    const emptySpans = () => {
        return Array(words.length)
        .fill(0)
        .map((i) => createRef(null));
    }

    const inputRef = useRef(null);
    const [wordSpanRef, setWordSpanRef] = useState(emptySpans());
    
    const [intervalId, setIntervalId] = useState(null);
    const [testStart, setTestStart] = useState(false);
    const [testEnd, setTestEnd] = useState(false);

    const [correctChars, setCorrectChars] = useState(0);
    const [incorrectChars, setIncorrectChars] = useState(0);
    const [missedChars, setMissedChars] = useState(0);
    const [extraChars, setExtraChars] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);

    const [wordsArray, setWordsArray] = useState( () => {
        return (generate(50));
    });

    
    const [graphData, setGraphData] = useState([]);

    // const wordsSpanRef = useMemo(() => {
    //     return Array(wordsArray.length).fill(0).map(i => createRef(null))
    // }, [wordsArray]);


    const handleUserInput = (e) => {

        if(!testStart){
            startTimer();
            setTestStart(true);
        }

        if(testEnd){
            return;
        }

        const allCurrChars = wordSpanRef[currWordIndex].current.childNodes;

        if(e.keyCode === 32){

            let correctCharsInWord = wordSpanRef[currWordIndex].current.querySelectorAll('.correct');

            if(correctCharsInWord.length === allCurrChars.length){
                setCorrectWords(correctWords + 1);
            }
            
            //logic for space
            if(allCurrChars.length <= currCharIndex){
                allCurrChars[currCharIndex - 1].classList.remove('current-right');
            }
            else{
                //remove cursor from in between the word
                setMissedChars(missedChars + (allCurrChars.length - currCharIndex));
                allCurrChars[currCharIndex].classList.remove('current');
            }

            wordSpanRef[currWordIndex + 1].current.childNodes[0].className = 'current';
            setCurrWordIndex(currWordIndex + 1);
            setCurrCharIndex(0);
            return;
        }

        if (
            wordSpanRef[currWordIndex + 1].current.offsetLeft <
            wordSpanRef[currWordIndex].current.offsetLeft
          ) {
            wordSpanRef[currWordIndex].current.scrollIntoView();
          }

        if(e.keyCode === 8){

            if(currCharIndex !== 0){

                if(allCurrChars.length === currCharIndex){

                    if(allCurrChars[currCharIndex - 1].className.includes('extra')){
                        allCurrChars[currCharIndex - 1].remove();
                        allCurrChars[currCharIndex - 2].className += 'current-right';
                    }
                    else{
                        allCurrChars[currCharIndex - 1].className = 'current';
                    }

                    setCurrCharIndex(currCharIndex - 1);
                    return;
                }

                allCurrChars[currCharIndex].className = '';
                allCurrChars[currCharIndex - 1].className = 'current';
                setCurrCharIndex(currCharIndex - 1);

            }

            return
        }

        if(currCharIndex === allCurrChars.length){
            let newSpan = document.createElement('span');
            newSpan.innerText = e.key;
            newSpan.className = 'incorrect extra current-right';
            allCurrChars[currCharIndex - 1].classList.remove('current-right');
            wordSpanRef[currWordIndex].current.append(newSpan);
            setCurrCharIndex(currCharIndex + 1);
            setExtraChars(extraChars + 1);
            return;
        }

        if(e.key === allCurrChars[currCharIndex].innerText){
            allCurrChars[currCharIndex].className = 'correct';
            setCorrectChars(correctChars + 1);
        }
        else{
            allCurrChars[currCharIndex].className = 'incorrect';
            setIncorrectChars(incorrectChars + 1);
        }

        if(currCharIndex+1 === allCurrChars.length){
            allCurrChars[currCharIndex].className += ' current-right';
        }
        else{
            allCurrChars[currCharIndex + 1].className = 'current';
        }
        
        setCurrCharIndex(currCharIndex + 1);

    }

    const startTimer = () => {
        const intervalId = setInterval(timer, 1000);
        setIntervalId(intervalId);
        function timer(){
            setCountDown((prevCountDown) => {
                setCorrectChars((correctChars) => {
                    setGraphData((graphData) => {
                        return [...graphData, [
                            testSeconds - prevCountDown + 1,
                            correctChars/5 / ((testSeconds - prevCountDown + 1) / 60)
                        ]];
                    })
                return correctChars;
                    
                })

                if(prevCountDown === 1){
                    setTestEnd(true);
                    clearInterval(intervalId);
                    return 0;
                }
                return prevCountDown - 1;
            })
        }

    }

    // const resetTest = () => {
        
    //     setCurrCharIndex(0);
    //     setCurrWordIndex(0);
    //     setTestStart(false);
    //     setTestEnd(false);

    //     clearInterval(intervalId);

    //     setGraphData([]);
    //     setCorrectChars(0);
    //     setCorrectWords(0);
    //     setExtraChars(0);
    //     setIncorrectChars(0);
    //     setMissedChars(0);
    //     focusInput();
    // }

    const calculateWPM = () => {
        return Math.round((correctChars/5)/((testTime)/60));
    }

    const calculateAcc = () => {
        return Math.round((correctWords/currWordIndex)*100);
    }

    const focusInput = () => {
        inputRef.current.focus();
    }

    useEffect(() => {
        // resetTest();
        setCountDown(testSeconds); // reset the countDown
        setTestTime(testSeconds);//reset the testTime
    },[testTime , testSeconds]);

    useEffect(() => {
        focusInput();
        wordSpanRef[0].current.childNodes[0].className = 'current';
    }, [])


    return(
        <div>
            <UpperMenu countDown={countDown} currWordIndex={currWordIndex} />
            {(testEnd) ? (<Stats  
                            wpm = {calculateWPM()}
                            accuracy = {calculateAcc()}
                            correctChars = {correctChars}
                            incorrectChars = {incorrectChars}
                            missedChars = {missedChars}
                            extraChars = {extraChars}
                            graphData = {graphData}/>
                        ) : (<div className="type-box" onClick={focusInput}>
                
                        <div className="words">
                            {
                                words.map((word, index) => (
                                    <span className="word" ref={wordSpanRef[index]}>
                                        {word.split('').map(char => (
                                            <span>{char}</span>
                                        ))}
                                    </span>
                                ))
                            }
                        </div>
                        </div>)}
            <input
                type='text'
                className='hidden-input'
                ref={inputRef}
                onKeyDown={handleUserInput}
            />
        </div>
    )
}

export default TypingBox