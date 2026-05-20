import React, { useEffect, useState } from "react";
import Navbar from '../Components/Navbar';
import { auth, db } from "../firebaseConfig";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import DataTable from "../Components/DataTable";
import Login from "./LoginPage";
import '../styles/History.css';

const History = () => {

    const [data, setData] = useState([]); 
    const [dataLoading, setDataLoading] = useState(true);
    const [graphData, setGraphData] = useState([]);
    const [user, loading] = useAuthState(auth);

    const fetchUserData = () => {

        const {uid} = auth.currentUser
        let tempData = [];
        const q = query(collection(db, 'Results'), 
                        where("userId", "==", uid), 
                        orderBy("timestamp", 'desc'));
        
        const unsub = onSnapshot(q, (snapshot) => {
            snapshot.docs.forEach((doc)=>{
                console.log(doc.data());
                tempData.push({...doc.data()});
            });
            setData(tempData);
        }, (error) => {
            console.log("Error fetching data: ",error);
        }
            
        );

        //Clean up the listener when component unmounts
        return () => unsub();
        

    }

    useEffect(() => {
        if(!loading && user){
            fetchUserData();
        }
    },[loading])
    
    if(!loading && !user){
        return (<div className='warning'>
            <span>Kindly login to view user page!</span>
            <a href="/Login" element={<Login/>} >Login here</a>
        </div>) 
    }

    if(loading){
        return <h1>Loading</h1>
    }

    if(!loading && !dataLoading && data.length===0){
        return <div className="warning">
            <span>Take some tests then come back!!</span>
        </div>
    }

    return(
        <>
        <Navbar/>
        <div className="canvas">
            <DataTable data={data} />
        </div>
        </>
        
    )
}

export default History;