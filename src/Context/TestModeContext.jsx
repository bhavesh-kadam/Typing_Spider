import { createContext, useContext, useState } from "react";

const TestModeContext = createContext();

export const TestModeContextProvider = ({children}) => {

    const [testMode, setTestMode] = useState('time');
    const [testSeconds, setTestSeconds] = useState(30);
    const [testWords, setTestWords] = useState(10);

    const [testTime, setTestTime] = useState(30);

    const values = {
        testTime,
        setTestTime,

        testSeconds,
        setTestSeconds,

        testWords,
        setTestWords,

        testMode,
        setTestMode

    }

    return(<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>)
}

export const useTestMode = () => useContext(TestModeContext);