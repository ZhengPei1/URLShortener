import { useState } from "react";
import axios from "axios";

function URLForm(){
    const [formValue, setFormValue] = useState();
    const [newURLValue, setNewURL] = useState("No URL has been generated yet");
    const form = (
        <div>
            <h1 id = "title">URL Shortener</h1>
            <input type = "text" 
            value = {formValue} 
            placeholder="Enter Your URL Here"
            onChange = {(e) => handleOnChange(e, setFormValue)}>
                
            </input>

            <button onClick={() => handleOnClick(formValue, setNewURL)} name="Shorten It!"></button>

            <div id = "newURL">
                {newURLValue}
            </div>

        </div>
    )
    return form;
}

function handleOnChange(e, setFormValue){
    console.log(e.target.value);
    setFormValue(e.target.value);
}

async function handleOnClick(formValue, setNewURL){
    const newURL = await axios.post("http://localhost:5000/shorten", {userURL: formValue})
    setNewURL(newURL);
}

export default URLForm;