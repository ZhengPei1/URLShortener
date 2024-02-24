import axios from "axios";
import { useEffect, useState } from "react";
import {SERVER_URL} from "../assets/auth.json"

function RequestCount(){
    const [element, setElement] = useState(<h1>As I'm using free tier hosting service, 
        it is expected that this page will take a long time to load. The page is still
        loading as long as no error message has been displayed.</h1>);

    useEffect(() =>{
        async function fetchHistory(){
            try{
                const request = await axios.get(SERVER_URL + "/history");

                // received data
                const data = request.data;
                const components = data.map((dt) => dataToComponent(dt));
                const table = (
                    <table id = "request-table">
                        <caption>
                            Most popular Urls
                        </caption>
                        
                        <thead>
                            <tr>
                                <th>Original URL</th>
                                <th>Shortened URL</th>
                                <th># of requests</th>
                            </tr>
                            {components}
                        </thead>
                    </table>)

                setElement(table);
            }catch(err){
                 // error occurred
                 setElement(<h1>Can't access URL history, try refreshing the page</h1> );
            }
        }

        fetchHistory();
    }, [])


    return (
        <div id = "request-area">
                    <hr></hr>
                    {element}
        </div>
    );
}


function dataToComponent(data){
    return (
        <tr>
            <td><textarea readOnly>{data.originalUrl}</textarea></td>
            <td><a href={data.shortUrl} target="_blank">{data.shortUrl}</a></td>
            <td>{data.request}</td>
        </tr>
    )
}


export default RequestCount;