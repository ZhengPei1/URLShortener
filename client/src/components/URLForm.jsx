import { useState } from "react";
import axios from "axios";

function URLForm(){
    const [formValue, setFormValue] = useState();
    const [newURLValue, setNewURL] = useState("No URL has been generated yet");
    const form = (
        <div id = "form-area">
            <h1 id = "title">URL Shortener</h1>
            <input 
            id = "input-form"
            type = "text" 
            value = {formValue} 
            placeholder="Enter Your URL Here"
            onChange = {(e) => handleOnChange(e, setFormValue)}>
                
            </input>

            <button 
            id = "generate-button"
            onClick={() => handleOnClick(formValue, setNewURL)}>
                {"Shorten It!"}
            </button>

            <div id = "new-url">
                {newURLValue}
            </div>

        </div>
    )
    return form;
}

function handleOnChange(e, setFormValue){
    setFormValue(e.target.value);
}

async function handleOnClick(formValue, setNewURL){
    const newURL = await axios.post("http://localhost:5000/shorten", {userURL: formValue})
    setNewURL(newURL.data);
}

export default URLForm;