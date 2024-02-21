import { useState } from "react";
import axios from "axios";
import {SERVER_URL} from "../assets/auth.json"

function URLForm(){
    const [formValue, setFormValue] = useState();
    const [newURLValue, setNewURL] = useState(false);

    const form = (
        <div id = "form-area">
            <h1 id = "title">URL Shortener</h1>

            <a href = "https://github.com/ZhengPei1/URLShortener" 
                target="_blank"
                id = "github-link">
                <img src = "/github.svg" alt = "github" id = "github-icon"></img>
            </a>
            

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
                {newURLValue? 
                    <a href={newURLValue} target="_blank">{newURLValue}</a>
                    :"No URL has been generated yet"}
                
            </div>

        </div>
    )
    return form;
}

function handleOnChange(e, setFormValue){
    setFormValue(e.target.value);
}

async function handleOnClick(formValue, setNewURL){
    const newURL = await axios.post(SERVER_URL + "/shorten", {userURL: formValue})
    setNewURL(newURL.data);
}

export default URLForm;