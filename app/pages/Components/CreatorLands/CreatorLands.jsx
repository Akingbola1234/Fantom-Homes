import React, { useState } from "react"
import { AiOutlineUpload } from "react-icons/ai"
import { AiOutlineInbox } from "react-icons/ai"
import { Modal, Upload, message } from "antd"
import LandsCard from "../LandsCard/LandsCard"

const CreatorLands = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    return (
        <div className="creator-land-container">
            <div className="creator-text-button">
                <div className="creator-text">
                    <h5>My Lands</h5>
                    <span>0 RESULTS</span>
                </div>
                <div className="creator-button">
                    <button onClick={showModal}>
                        <AiOutlineUpload className="upload-icon" /> Upload Lands
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
                <h5 className="creator-modal-text">Upload Lands</h5>
                <span className="creator-modal-span">
                    You can upload your Creative Homes on FantomWorld
                </span>
                <h5 className="collection-attribute-text">Land Attributes</h5>
                <div className="attributes-div">
                    <form className="attribute-form">
                        <div className="label-input">
                            <label for="acre">Acre</label>
                            <input id="acre" />
                        </div>
                        <div className="label-input">
                            <label for="acre">Acre</label>
                            <input id="acre" />
                        </div>
                        <div className="label-input">
                            <label for="acre">Acre</label>
                            <input id="acre" />
                        </div>
                        <div className="label-input">
                            <label for="acre">Acre</label>
                            <input id="acre" />
                        </div>
                        <div className="label-input">
                            <label for="acre">Acre</label>
                            <input id="acre" />
                        </div>
                        <div className="label-input">
                            <label for="acre">Acre</label>
                            <input id="acre" />
                        </div>
                        <textarea
                            rows={"5"}
                            className="attribute-textarea"
                        ></textarea>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default CreatorLands
