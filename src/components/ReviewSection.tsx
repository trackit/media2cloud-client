import React, { FC, useState } from "react";
import "../styles/App.css";
import uploadFile from '../aws/aws_upload';
import { Input, DatePicker, TimePicker, message } from 'antd';
import 'antd/dist/antd.css';
import emailjs from 'emailjs-com';
import moment from "moment";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const ReviewSection: FC = () => {

    const [review, setReview] = useState({ name: '', email: '', date: '', time: '', filename: '' });
    const [file, setFile] = useState(null);

    const changeText = (value: string, prop: string) => {
        const obj = { ...review };

        if (prop === 'name')
            obj.name = value;
        if (prop === 'email')
            obj.email = value;
        if (prop === 'date')
            obj.date = value;
        if (prop === 'time')
            obj.time = value;
        setReview(obj);
    }

    async function sendEmail(e: any) {
        e.preventDefault();
        if (review.name === '' || review.email === '') {
            message.warning("You must fill all the fields", 4);
            return;
        }
        if (file !== null && file !== undefined){
            uploadFile(file, review);
        }
        emailjs.sendForm('service_4f2hs4j', 'template_fu0ys7k', e.target, 'user_jDzpWECnca4Pv0olIIrfW')
        .then((result) => {
            console.log(result.text);
            setReview({ name: '', email: '', date: '', time: '', filename: '' });
            setFile(null);
            message.success("Your file has been successfully uploaded and you will receive an email with the date and time of the appointment you have booked", 6)
        }, (error) => {
            console.log(error.text);
        });
    }

    function disableDate(current: any) {
        return current && current < moment().endOf('day');
    };

    function displayFileChoosen(file: any) {
        if (file !== null && file !== undefined){
            return <span className="currentFile"><img className="currentFileLogo" src="fileUpload.svg" alt="Upload File Logo" />{file.name}</span>;
        } else {
            return <></>;
        }
    }

    const oneGigaBytes = 1073741824

    const BookingForm = () => {
        return (
            <>
                <div className="menu2">
                    <h1 className="titleReview1">Get Your Review!</h1>
                    <p className="paraReview">Book a meeting with our team to review your results</p>
                    <form onSubmit={(e) => sendEmail(e)}>
                        <div className="name-input">
                            <Input value={review.name} onChange={(e) => changeText(e.currentTarget.value, 'name')} placeholder="Name" className="text-input" name="name" />
                        </div>
                        <div className="email-input">
                            <Input value={review.email} onChange={(e) => changeText(e.currentTarget.value, 'email')} placeholder="Email adress" className="text-input" name="email" />
                        </div>
                        <div className="date-picker">
                            <DatePicker disabledDate={disableDate} onChange={(date, content) => changeText(content, 'date')} size="large" placeholder="Select Date" name="date" />
                        </div>
                        <div className="time-picker">
                            <TimePicker onChange={(date, content) => changeText(content, 'time')} format="HH:mm" size="large" placeholder="Select Hour" name="time" />
                        </div>
                        <button type="submit" className="bookButton">Book</button>
                    </form>
                </div>
            </>
        )
    }

    const FormBooking = () => {
        if (file !== null && file !== undefined){
        return (
            <>
                <Link style={{textDecoration: "none"}} to="/Booking">
                    <button className="nextButton">
                        Next
                    </button>
                </Link>
            </>
        )} else {
            return <></>;
        }
    }

    const UploadZone = () => {
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
                                    review.filename = e.target.files[0].name
                                    }
                                }
                            }
                        }/>
                        <span className="textClick">Click or drag file to this area to upload</span>
                        <span className="textComm">You can upload a file of 1 Gb maximum</span>
                    </label>
                    <div>{displayFileChoosen(file)}</div>
                    <FormBooking />
                </div>
            </>
        )
    }

    return (
        <>
            <Router>
                <Route path="/" exact component={UploadZone}/>
                <Route path="/Booking" exact component={BookingForm}/>
            </Router>
        </>
    )
}

export default ReviewSection;
