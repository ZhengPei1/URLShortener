import { useEffect } from "react";

function RequestCount(){
    
    useEffect

    const requestCount = (
            <table id = "request-count">
                <caption>
                    Most popular Urls
                </caption>
                <thead>
                    <tr>
                        <td>Original URL</td>
                        <td>Shortened URL</td>
                        <td># of requests</td>
                    </tr>
                </thead>
            </table>
    )

    return requestCount;
}


export default RequestCount;