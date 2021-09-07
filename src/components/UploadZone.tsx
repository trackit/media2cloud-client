import React from "react";
import "../styles/App.css";
import {  message } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

interface propsUpload {
    file: any;
    setFile: any;
}

const UploadZone = ({file, setFile}: propsUpload) => {

    const oneGigaBytes = 1073741824;

    function displayFileChoosen(file: any) {
        if (file !== null && file !== undefined){
            return <span className="currentFile"><img className="currentFileLogo" src="fileUpload.svg" alt="Upload File Logo" />{file.name}</span>;
        } else {
            return <></>;
        }
    };

    return (
        <>
            <div className="menu">
                <h1 className="menuTitle1">Upload your video</h1>
                <label className="upload-zone">
                    <img src="uploadBtn.svg" alt="Upload logo"/>
                    <input className="upload-place" type="file" onChange={(e: any) => {
                        if(e.target.files[0] !== undefined && e.target.files[0] !== null) {
                            if (e.target.files[0].size > oneGigaBytes)
                                message.warning("You can upload a file of 1 Gb maximum", 4)
                            else {
                                setFile(e.target.files[0]);
                                }
                            }
                        }
                    }/>
                    <span className="textClick">Click or drag file to this area to upload</span>
                    <span className="textComm">You can upload a file of 1 Gb maximum</span>
                </label>
                <div>{displayFileChoosen(file)}</div>
                {file !== null && file !== undefined ?
                    <Link style={{textDecoration: "none"}} to="/Booking">
                        <button className="nextButton">
                            Next
                        </button>
                    </Link>
                    : <> </>
                }
            </div>
        </>
    )
}

export default UploadZone;