import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, UploadProps } from 'antd';

const { Dragger } = Upload;

const DragUpload: React.FC = () => {
    const draggerProps: UploadProps = {
        name: 'file',
        multiple: false,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            alert(info.fileList.length > 1 ? 'Only one file can be uploaded' : 'File uploaded successfully');
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Dragger
            name={draggerProps.name}
            multiple={draggerProps.multiple}
            action={draggerProps.action}
            onChange={draggerProps.onChange}
            onDrop={draggerProps.onDrop}
            style={{ marginBottom: 50 }}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
            </p>
        </Dragger>
    )
}

export default DragUpload;