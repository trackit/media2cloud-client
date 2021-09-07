import React, { useState } from "react";
import "../styles/BookingForm.css";
import uploadFile from '../aws/aws_upload';
import { Input, DatePicker, TimePicker, message, notification } from 'antd';
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

    const succesNotifications = () => {
        notification['success']({
            message: 'Success',
            description: 'Your file has been successfully uploaded and you will receive an email with the date and time of the appointment you have booked',
            duration: 10,
        });
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
            succesNotifications();
        }, (error) => {
            console.log(error.text);
        });
    }

    const PreviousButton = () => {
        return (
            <>
                <Link style={{textDecoration: "none"}} to="/">
                    <button className="previousButton">
                        Previous
                    </button>
                </Link>
            </>
        )
    }

    return (
        <>
            <div className="menu2">
                <h1 className="titleReview1">Get Your Review!</h1>
                <p className="paraReview">Book a meeting with our team to review your results</p>
                <form className="formBook" onSubmit={(e) => sendEmail(e)}>
                    <div className="formItem">
                        <p className="labelInput">Full Name:</p>
                        <Input className="formInput" value={review.name} onChange={(e: any) => changeText(e.currentTarget.value, 'name')} />
                    </div>
                    <div className="formItem">
                        <p className="labelInput">Email:</p>
                        <Input className="formInput" value={review.email} onChange={(e: any) => changeText(e.currentTarget.value, 'email')} />
                    </div>
                    <div className="formItem">
                        <p className="labelInput">Date:</p>
                        <DatePicker className="formInput" disabledDate={disableDate} onChange={(date, content) => changeText(content, 'date')} size="large" />
                    </div>
                    <div className="formItem">
                        <p className="labelInput">Hour:</p>
                        <TimePicker className="formInput" onChange={(date, content) => changeText(content, 'time')} format="HH:mm" size="large" />
                    </div>
                    <button type="submit" className="bookButton">book</button>
                </form>
                <PreviousButton />
            </div>
        </>
    )
}

export default BookingForm;