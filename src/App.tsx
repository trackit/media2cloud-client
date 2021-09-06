import React, { FC } from "react";
import "./styles/App.css";
import 'antd/dist/antd.css';
import ReviewSection from './components/ReviewSection';

const App: FC = () => {

	return (
		<>
			<h1 className="title1">Welcome to TrackIt</h1>
			<h2 className="title2">Media2Cloud Analysis</h2>
			<ReviewSection/>
		</>
	);
};

export default App;