"use client";

import { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";

const AddMinisterioModal = ({ selectedIglesiaId, onMinisterioAdded }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        alias: "",
        codigo: "",
        aprob: new Date().getFullYear(),
        telefono: "",
        email: "",
        estado_id: 1, // Valor por defecto "Activo"
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAprobChange = (value) => {
        setFormData({ ...formData, aprob: value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/addMinisterio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, iglesia_id: selectedIglesiaId }),
            });

            if (!response.ok) throw new Error("Error al añadir ministerio");

            toast({ title: "Ministerio añadido", status: "success", duration: 3000 });

            await onMinisterioAdded(); // 🔥 Actualiza ministerios en IndexPage.js
            setTimeout(onClose, 500);  // 🔄 Cierra el modal tras actualizar
        } catch (error) {
            toast({ title: "Error", description: error.message, status: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button colorScheme="green" onClick={onOpen}>
                Añadir Ministerio
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Añadir Nuevo Ministerio</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Nombre</FormLabel>
                            <Input name="nombre" value={formData.nombre} onChange={handleChange} />
                        </FormControl>

                        <FormControl isRequired mt={2}>
                            <FormLabel>Apellidos</FormLabel>
                            <Input name="apellidos" value={formData.apellidos} onChange={handleChange} />
                        </FormControl>

                        <FormControl mt={2}>
                            <FormLabel>Alias</FormLabel>
                            <Input name="alias" value={formData.alias} onChange={handleChange} />
                        </FormControl>

                        <FormControl isRequired mt={2}>
                            <FormLabel>Código</FormLabel>
                            <Input
                                name="codigo"
                                value={formData.codigo}
                                onChange={handleChange}
                                maxLength={6} // Restringe la entrada desde el navegador
                            />
                        </FormControl>

                        <FormControl isRequired mt={2}>
                            <FormLabel>Año de Aprobación</FormLabel>
                            <NumberInput min={1960} max={2025} value={formData.aprob} onChange={handleAprobChange}>
                                <NumberInputField name="aprob" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>

                        <FormControl isRequired mt={2}>
                            <FormLabel>Estado</FormLabel>
                            <Select name="estado_id" value={formData.estado_id} onChange={handleChange}>
                                <option value="1">Activo</option>
                                <option value="2">Baja ministerio</option>
                                <option value="3">Baja abandono IEF</option>
                                <option value="4">Fallecimiento</option>
                                <option value="5">Disciplina</option>
                            </Select>
                        </FormControl>

                        <FormControl mt={2}>
                            <FormLabel>Teléfono</FormLabel>
                            <Input name="telefono" value={formData.telefono} onChange={handleChange} />
                        </FormControl>

                        <FormControl mt={2}>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose} isDisabled={loading}>
                            Cancelar
                        </Button>
                        <Button colorScheme="green" onClick={handleSubmit} isLoading={loading}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddMinisterioModal;
