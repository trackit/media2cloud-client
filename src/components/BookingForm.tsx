import React, { useState } from "react";
import "../styles/BookingForm.css";
import uploadFile from '../aws/aws_upload';
import { Input, DatePicker, TimePicker, message, notification, Modal } from 'antd';
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
    const [isVisible, setVisible] = useState(true);
    const [agreement, setAgreement] = useState(false);

    const handleCancel = () => {
        message.error("You refuse the agreement");
        setVisible(false);
    }

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
    };

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

    function acceptAgreement() {
        setVisible(false)
        setAgreement(true)
        message.success("You accept the agreements !")
    }

    const SubmitButton = () => {
        if (agreement === true) {
            return <> <button type="submit" className="bookButton">book</button> </>
        } else {
            return <></>
        }
    }

    const AcceptAgreement = () => {
            return (
                <>
                    <Modal title="Agreement" visible={isVisible} centered={true} onCancel={handleCancel} onOk={acceptAgreement} cancelText="I refuse" okText="I accept">
                        <p>User asserts that they have the right to grant access of any uploaded media to this TrackIt tool for the sole purpose of demonstrating to User the Amazon Media2Cloud machine learning pipeline by TrackIt.</p>
                    </Modal>
                    <SubmitButton />
                </>
            )
    }

    return (
        <>
            <div className="menu2">
                <div className="formBook">
                    <h1 className="titleReview1">Get Your Review!</h1>
                    <p className="paraReview">Book a meeting with our team to review your results</p>
                    <form onSubmit={(e) => sendEmail(e)}>
                        <div className="formItem1">
                            <p className="labelInput">Full Name :</p>
                            <Input className="formInput" placeholder="Enter your full name" value={review.name} onChange={(e: any) => changeText(e.currentTarget.value, 'name')} name="name" />
                        </div>
                        <div className="formItem2">
                            <p className="labelInput">Email :</p>
                            <Input className="formInput" placeholder="Enter your email" value={review.email} onChange={(e: any) => changeText(e.currentTarget.value, 'email')} name="email" />
                        </div>
                        <div className="formItem3">
                            <p className="labelInput">Date :</p>
                            <DatePicker className="formInput" disabledDate={disableDate} onChange={(date, content) => changeText(content, 'date')} size="large" name="date" />
                        </div>
                        <div className="formItem4">
                            <p className="labelInput">Hour :</p>
                            <TimePicker className="formInput" onChange={(date, content) => changeText(content, 'time')} format="HH:mm" size="large" name="time"/>
                        </div>
                        <AcceptAgreement />
                    </form>
                </div>
                <PreviousButton />
            </div>
        </>
    )
}

export default BookingForm;