import axios from "axios";
import { useEffect, useState } from "react";
import {baseUrl} from "../assets/baseUrl.json";

function RequestCount(){
    const [element, setElement] = useState(<h1>Loading ...</h1>);

    useEffect(() =>{
        async function fetchHistory(){
            const request = await axios.get(baseUrl + "/history");

            if(request.statusText === "OK"){
                // received data
                const data = request.data;
                setElement(data.map((dt) => dataToComponent(dt)));
            }else{
                // error occurred
                setElement(<h1>Can't access URL history, try refreshing the page</h1> );
            }
        }

        fetchHistory();
    }, [])


    return (
        <div id = "request-area">
            <hr></hr>
            <table id = "request-table">
                <caption>
                    Most popular Urls
                </caption>
                <thead>
                    <tr>
                        <td>Original URL</td>
                        <td>Shortened URL</td>
                        <td># of requests</td>
                    </tr>
                    {element};
                </thead>
            </table>
        </div>);
}


function dataToComponent(data){
    return (
        <tr>
            <td><a href={data.originalUrl} target="_blank">Visit</a></td>
            <td>{data.shortUrl}</td>
            <td>{data.request}</td>
        </tr>
    )
}


export default RequestCount;