import React, { FC, useState } from "react";
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UploadZone from './UploadZone';
import BookingForm from './BookingForm'

const ReviewSection: FC = () => {
    const [file, setFile] = useState(null);

    return (
        <>
            <Router>
                <Route path="/" exact >
                    <UploadZone file={file} setFile={setFile} />
                </Route>
                <Route path="/Booking" exact >
                    <BookingForm file={file} setFile={setFile} />
                </Route>
            </Router>
        </>
    )
}

export default ReviewSection;
