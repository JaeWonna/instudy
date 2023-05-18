import { useState } from "react";
import {Button} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import GroupAssignCreateModal from "./GroupAssignCreateModal";

const GroupAssignCreate = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="row">
            <div className="col-md-12 col-lg-6"></div>

            <div className="d-flex justify-content-end align-items-end">

                <div className="rounded-icon">
                    <Button style={null} onClick={handleOpenModal}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </Button>
                    <GroupAssignCreateModal
                        open={modalOpen} onClose={handleCloseModal} />
                </div>

            </div>
        </div>
    );
}

export default GroupAssignCreate;