import React from "react";
import {  message } from 'antd';
import { Link } from 'react-router-dom';
import "../styles/UploadZone.css";
import "../styles/App.css";
import 'antd/dist/antd.css';

interface propsUpload {
    file: any;
    setFile: any;
}

const UploadZone = ({file, setFile}: propsUpload) => {

    const oneGigaBytes = 1073741824;
    const authorizedFile = ".webm, .mkv, .flv, .vob, .ogv, .ogg, .drc, .gif, .mng, .avi, .mov, .wmv, .rm, .viv, .amv, .mp4, .m4p, .m4v, .svi, .3gp, .3g2, .f4v, .f4p, .f4a, .f4b, .img, .png, .svg, .jpg, .jpeg, .bmp"

    function displayFileChoosen(file: any) {
        if (file !== null && file !== undefined){
            return <span className="currentFile"><img className="currentFileLogo" src="fileUpload.svg" alt="Upload File Logo" />{file.name}</span>;
        } else {
            return <></>;
        }
    };

    const NextButton = () => {
        return (
            <>
                {file !== null && file !== undefined ?
                    <Link style={{textDecoration: "none"}} to="/Booking">
                        <button className="nextButton">
                            Next
                        </button>
                    </Link>
                    : <> </>
                }
            </>
        )
    }

    return (
        <>
            <h1 className="title1">Welcome to TrackIt</h1>
			<h2 className="title2">Media2Cloud Analysis</h2>
            <div className="menu">
                <h1 className="menuTitle1">Upload your media</h1>
                <label className="upload-zone">
                    <img src="uploadBtn.svg" alt="Upload logo"/>
                    <input accept={authorizedFile} className="upload-place" type="file" onChange={(e: any) => {
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
                <NextButton />
            </div>
        </>
    )
}

export default UploadZone;