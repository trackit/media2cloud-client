import React, { useState } from "react";
import "../styles/App.css";
import uploadFile from '../aws/aws_upload';
import { Input, DatePicker, TimePicker, message } from 'antd';
import 'antd/dist/antd.css';
import emailjs from 'emailjs-com';
import moment from "moment";
import { Link } from 'react-router-dom';

interface propsUpload {
    file: any;
    setFile: any;
}

const BookingForm = ({file, setFile}: propsUpload) => {
    const [review, setReview] = useState({ name: '', email: '', date: '', time: '' });

    function disableDate(current: any) {
        return current && current < moment().endOf('day');
    };

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
    };

    async function sendEmail(e: any) {
        e.preventDefault();
        if (review.name === '' || review.email === '') {
            message.warning("You must fill all the fields", 4);
            return;
        }
        if (file !== null && file !== undefined){
            await uploadFile(file, review);
        }
        emailjs.sendForm('service_4f2hs4j', 'template_fu0ys7k', e.target, 'user_jDzpWECnca4Pv0olIIrfW')
        .then((result) => {
            console.log(result.text);
            setReview({ name: '', email: '', date: '', time: ''});
            setFile(null);
            message.success("Your file has been successfully uploaded and you will receive an email with the date and time of the appointment you have booked", 6)
        }, (error) => {
            console.log(error.text);
        });
    }

    return (
        <>
            <div className="menu2">
                <h1 className="titleReview1">Get Your Review!</h1>
                <p className="paraReview">Book a meeting with our team to review your results</p>
                <form onSubmit={(e) => sendEmail(e)}>
                    <div className="name-input">
                        <Input value={review.name} onChange={(e: any) => changeText(e.currentTarget.value, 'name')} placeholder="Name" className="text-input" name="name" />
                    </div>
                    <div className="email-input">
                        <Input value={review.email} onChange={(e: any) => changeText(e.currentTarget.value, 'email')} placeholder="Email adress" className="text-input" name="email" />
                    </div>
                    <div className="date-picker">
                        <DatePicker disabledDate={disableDate} onChange={(date, content) => changeText(content, 'date')} size="large" placeholder="Select Date" name="date" />
                    </div>
                    <div className="time-picker">
                        <TimePicker onChange={(date, content) => changeText(content, 'time')} format="HH:mm" size="large" placeholder="Select Time" name="time" />
                    </div>
                    <button type="submit" className="bookButton">Book</button>
                </form>
                <Link style={{textDecoration: "none"}} to="/">
                    <button className="previousButton">
                        Previous
                    </button>
                </Link>
            </div>
        </>
    )
}

export default BookingForm;