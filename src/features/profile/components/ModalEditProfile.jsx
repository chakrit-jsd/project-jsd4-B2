import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Select } from '../../../components/shared/Input';
import { yupResolver } from '@hookform/resolvers/yup'
import schema from "../../../utils/validators/validateCreateActivity"
import Modal from 'react-bootstrap/Modal';
import Dropzone from 'react-dropzone';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import FormEditProfile from './FormEditProfile';


const ModalEditProfile = ({ show, handleClose }) => {


  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Profile Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormEditProfile />
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleClose}>
          Close
        </button>
        <button onClick={handleClose}>
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  )
}


export default ModalEditProfile
