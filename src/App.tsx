import React, { FC, useState } from "react";
import "./App.css";
import { Upload, Input, DatePicker, TimePicker, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import emailjs from 'emailjs-com';
import moment from "moment";

const App: FC = () => {

	const [review, setReview] = useState({name: '', email: '', date: '', time: ''});

	const changeText = (value: string, prop: string) => {
		const obj = {...review};

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

	function sendEmail(e : any) {
		e.preventDefault();
		setReview({name: '', email: '', date: '', time: ''});

		emailjs.sendForm('service_7d7mjyh', 'template_06sj7t4', e.target, 'user_AtVqPPa3dfx6Y9RN4fJe4')
		  .then((result) => {
			  console.log(result.text);
		  }, (error) => {
			  console.log(error.text);
		  });
	}

	const { Dragger } = Upload;

	const props = {
	name: 'file',
	multiple: true,
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	onChange(info: any) {
		const { status } = info.file;
		if (status === 'done') {
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	}
	};

	function disableDate(current : any) {
		return current && current < moment().endOf('day');
	};

	return (
		<React.Fragment>
			<h1 className="title1">Welcome on TrackIt</h1>
			<h2 className="title2">Media2Cloud analysis</h2>
			<div className="menu">
				<h1 className="menuTitle1">Upload your video</h1>
				<div className="upload-place">
					<Dragger accept=".3gp, .avi, .asf, .flv, .mkv, .mp4, .ogg" {...props}>
						<p className="ant-upload-drag-icon">
						<InboxOutlined />
						</p>
						<p className="ant-upload-text">Click or drag file to this area to upload</p>
						<p className="ant-upload-hint">You can upload up to 1 hour of video maximum</p>
					</Dragger>
				</div>
				<div className="line"></div>
				<h1 className="titleReview1">Get Your Review !</h1>
				<p className="paraReview">Book a meeting with our team to review your results</p>
				<form onSubmit={(e) => sendEmail(e)}>
					<div className="name-input">
						<Input value={review.name} onChange={(e) => changeText(e.currentTarget.value, 'name')} placeholder="Name" className="text-input" name="name"/>
					</div>
					<div className="email-input">
						<Input value={review.email} onChange={(e) => changeText(e.currentTarget.value, 'email')} placeholder="Email adress" className="text-input" name="email"/>
					</div>
					<div className="date-picker">
						<DatePicker disabledDate={disableDate} onChange={(date, content) => changeText(content, 'date')} size="large" placeholder="Select Date" name="date"/>
					</div>
					<div className="time-picker">
						<TimePicker onChange={(date, content) => changeText(content, 'time')} format="HH:mm" size="large" placeholder="Select Hour" name="time"/>
					</div>
					<button type="submit" className="bookButton">Book</button>
				</form>
			</div>
		</React.Fragment>
	);
};

export default App;