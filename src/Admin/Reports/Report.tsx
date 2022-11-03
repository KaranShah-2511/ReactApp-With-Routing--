import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Post from './Tabs/Post';

function Report() {
    return (
        <div>
            <Tabs
                defaultActiveKey="post"
                id="justify-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="post" title="Post">
                    <Post />
                </Tab>
                <Tab eventKey="account" title="Account">
                    Account
                </Tab>

            </Tabs>
        </div>
    )
}

export default Report
