import React from 'react'

import { Col, Divider, Row, Image } from 'antd'; // Import the Image component from the antd library
import DragUpload from 'components/DragUpload'

const Home: React.FC  = () => (
    <>
        <Row>
            <Col span={24}>
                <h1>Upload images for inference</h1>
            </Col>
        </Row>
        <Row className='margin-top'>
            <Col span={12} offset={6}>
                <DragUpload />
            </Col>
        </Row>
        {/* <Divider className="magin-top">Or</Divider> */}
        {/* <Row className='margin-top'>
            <Col span={12} offset={6}>
                <p>Select an existing image</p>
            </Col>
        </Row>
        <Row className='margin-top'>
            <Image
                width={160}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <Image
                width={160}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <Image
                width={160}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <Image
                width={160}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <Image
                width={160}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
        </Row> */}
    </>
)

export default Home;
