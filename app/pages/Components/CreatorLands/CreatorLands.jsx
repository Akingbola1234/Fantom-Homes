import React, { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { AiOutlineInbox } from "react-icons/ai";
import { Modal, Upload, message } from "antd";
import LandsCard from "../LandsCard/LandsCard";

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (status === "error") {
      message.error(`${info.files.name} file upload failed`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.file);
  },
};
const CreatorLands = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="creator-land-container">
      <div className="creator-text-button">
        <div className="creator-text">
          <h5>My Homes</h5>
          <span>0 RESULTS</span>
        </div>
        <div className="creator-button">
          <button onClick={showModal}>
            <AiOutlineUpload className="upload-icon" /> Upload Homes
          </button>
        </div>
      </div>
      <LandsCard />
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered={true}
      >
        <h5 className="creator-modal-text">Upload Homes</h5>
        <span className="creator-modal-span">
          You can upload your Creative Homes on FantomWorld
        </span>
        <h5 className="collection-attribute-text">Land Attributes</h5>
        <div className="attributes-div">
          <input />
          <input />
          <input />
          <input />
          <input />
          <input />
        </div>
        <Dragger {...props} className="drag-drop">
          <p className="ant-upload-drag-icon">
            <AiOutlineInbox />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Modal>
    </div>
  );
};

export default CreatorLands;
