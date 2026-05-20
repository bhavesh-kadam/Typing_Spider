import React from "react";
import '../styles/DataTable.css';

const DataTable = ({data}) => {
    return(
        <div> 
            <table className="table">
                <tr>
                    <th>
                        <td className="table-cell">
                            WPM
                        </td >
                        <td className="table-cell">
                            Accuracy
                        </td>
                        <td className="table-cell">
                            Characters
                        </td>
                        <td className="table-cell">
                            Date
                        </td>
                    </th>
                </tr>

                <tr className="table-scroll">
                    {
                        data.map((i)=>(
                            <tr>
                                <td className="table-body">
                                    {i.wpm}
                                </td>
                                <td className="table-body">
                                    {i.accuracy}
                                </td>
                                <td className="table-body">
                                    {i.characters} 
                                </td>
                                <td className="table-date">
                                    {i.timestamp.toDate().toLocaleString() }
                                </td>
                             </tr>
                        ))
                    }
                </tr>
            </table>
    
            
        </div>
    )
}

export default DataTable