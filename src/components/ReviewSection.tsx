import React, { FC, useState } from "react";
import "../styles/App.css";
import uploadFile from '../aws/aws_upload';
import { Input, DatePicker, TimePicker } from 'antd';
import 'antd/dist/antd.css';
import emailjs from 'emailjs-com';
import moment from "moment";

const ReviewSection: FC = () => {

    const [review, setReview] = useState({ name: '', email: '', date: '', time: '' });
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
            alert("Les champs doivent etre remplis !");
            return;
        }
        uploadFile(file);
        emailjs.sendForm('service_7d7mjyh', 'template_06sj7t4', e.target, 'user_AtVqPPa3dfx6Y9RN4fJe4')
        .then((result) => {
            setReview({ name: '', email: '', date: '', time: '' });
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }

    function disableDate(current: any) {
        return current && current < moment().endOf('day');
    };

    function displayFileChoosen(file: any) {
        const btn = document.getElementById("upload-btn");

        if (file === null) {
            btn?.classList.remove("chosen")
            return <p></p>;
        };
        if (file.name !== null)
            btn?.classList.add("chosen")
            return <p style={{color: "black"}}>{file.name}</p>;
    }

    return (
        <>
            <h1 className="menuTitle1">Upload your video</h1>
            <label id="upload-btn" className="upload-zone">
            <input id="upload" className="upload-place" type="file" onChange={(e: any) => {setFile(e.target.files[0])}}/>
            <span id="text">Choose a video or a image {displayFileChoosen(file)}</span>
            </label>
            <div className="line"></div>
            <h1 className="titleReview1">Get Your Review !</h1>
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
        </>
    );
}

export default ReviewSection;