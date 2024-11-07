// components/HelpModal.js
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

const HelpModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:muzzadevs@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(formData.message)}`;
    window.location.href = mailtoLink; // Abre el cliente de correo predeterminado
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="#F5F5F5">
        <ModalHeader color="#1A365D">
          Enviar mensaje al administrador
        </ModalHeader>
        <ModalCloseButton color="#1A365D" />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel color="#1A365D">Asunto</FormLabel>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Asunto del mensaje"
              bg="white"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel color="#1A365D">Mensaje</FormLabel>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje"
              bg="white"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit} bg="#1A365D">
            Enviar
          </Button>
          <Button onClick={onClose} ml={3} variant="ghost">
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HelpModal;
