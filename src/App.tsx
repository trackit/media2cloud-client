import React, { FC } from "react";
import "./App.css";
import { Upload, Input, DatePicker, TimePicker, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const App: FC = () => {

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
				<div className="name-input">
					<Input placeholder="Name" className="text-input"/>
				</div>
				<div className="email-input">
					<Input placeholder="Email adress" className="text-input"/>
				</div>
				<div className="date-picker">
					<DatePicker size="large" placeholder="Select Date" className="text-input"/>
				</div>
				<div className="time-picker">
					<TimePicker format="HH:mm" size="large" placeholder="Select Hour" className="text-input"/>
				</div>
				<button className="bookButton">Book</button>
			</div>
		</React.Fragment>
	);
};

export default App;