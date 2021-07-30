import React, { FC, useState } from "react";
import "./App.css";
import { Upload, Input, DatePicker, TimePicker, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

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

	const submitBack = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setReview({name: '', email: '', date: '', time: ''});
		console.log(review);
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
				<form onSubmit={(e) => submitBack(e)}>
					<div className="name-input">
						<Input value={review.name} onChange={(e) => changeText(e.currentTarget.value, 'name')} placeholder="Name" className="text-input"/>
					</div>
					<div className="email-input">
						<Input value={review.email} onChange={(e) => changeText(e.currentTarget.value, 'email')} placeholder="Email adress" className="text-input"/>
					</div>
					<div className="date-picker">
						<DatePicker onChange={(date, content) => changeText(content, 'date')} size="large" placeholder="Select Date" className="text-input"/>
					</div>
					<div className="time-picker">
						<TimePicker onChange={(date, content) => changeText(content, 'time')} format="HH:mm" size="large" placeholder="Select Hour" className="text-input"/>
					</div>
					<button type="submit" className="bookButton">Book</button>
				</form>
			</div>
		</React.Fragment>
	);
};

export default App;