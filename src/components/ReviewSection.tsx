import React, { FC, useState } from "react";
import { Result, Button } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import "../styles/App.css";
import UploadZone from './UploadZone';
import BookingForm from './BookingForm'

const ReviewSection: FC = () => {
    const [file, setFile] = useState(null);

    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" exact >
                        <UploadZone file={file} setFile={setFile} />
                    </Route>
                    <Route path="/Booking" exact >
                        <BookingForm file={file} setFile={setFile} />
                    </Route>
                    <Route path="/" >
                        <Result className="page404" status="404" title="404" subTitle="Sorry, the page you visited does not exist." extra={<Button type="primary" href="/">Back Home</Button>} />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

export default ReviewSection;
