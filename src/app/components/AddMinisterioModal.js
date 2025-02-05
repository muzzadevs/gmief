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
    Checkbox,
    CheckboxGroup,
    VStack,
    Menu,
    MenuButton,
    MenuList,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";

const AddMinisterioModal = ({ selectedIglesiaId, onMinisterioAdded }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    // Estado inicial del formulario
    const initialFormState = {
        nombre: "",
        apellidos: "",
        alias: "",
        codigo: "",
        aprob: new Date().getFullYear(),
        telefono: "",
        email: "",
        estado_id: "1", // Estado activo por defecto
        cargo_id: [], // Array para múltiples cargos
    };

    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);

    // Lista de cargos añadida manualmente
    const listaCargos = [
        { id: 1, cargo: "Candidato local" },
        { id: 2, cargo: "Candidato nacional" },
        { id: 3, cargo: "Obrero" },
        { id: 4, cargo: "Pastor en activo" },
        { id: 5, cargo: "Responsable" },
        { id: 6, cargo: "Anciano" },
        { id: 7, cargo: "Presidente" },
        { id: 8, cargo: "Secretario de zona" },
        { id: 9, cargo: "Tesorero de zona" },
        { id: 10, cargo: "Secretario nacional" },
        { id: 11, cargo: "Tesorero nacional" },
        { id: 12, cargo: "Misionero" },
        { id: 13, cargo: "Secretario local" }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCargoChange = (selectedCargos) => {
        setFormData((prev) => ({ ...prev, cargo_id: selectedCargos }));
    };

    const handleAprobChange = (value) => {
        setFormData((prev) => ({ ...prev, aprob: value }));
    };

    // Validar que el email tenga un formato correcto
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async () => {
        // Validar Email antes de enviar
        if (!validateEmail(formData.email)) {
            toast({
                title: "Error",
                description: "Ingrese un correo electrónico válido.",
                status: "error",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("/api/addMinisterio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, iglesia_id: selectedIglesiaId }),
            });

            if (!response.ok) throw new Error("Error al añadir ministerio");

            toast({ title: "Ministerio añadido", status: "success", duration: 3000 });

            await onMinisterioAdded();

            // Resetear formulario y cerrar modal
            setFormData(initialFormState);
            setTimeout(onClose, 500); // Pequeña espera para asegurar la actualización visual
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
                        {/* Campos de entrada */}
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
                            <Input name="codigo" value={formData.codigo} onChange={handleChange} maxLength={6} />
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

                        <FormControl mt={2}>
                            <FormLabel>Teléfono</FormLabel>
                            <Input name="telefono" value={formData.telefono} onChange={handleChange} />
                        </FormControl>

                        <FormControl mt={2} isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="ejemplo@correo.com"
                            />
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

                        {/* Selector Múltiple con Chakra UI usando CheckboxGroup y Menu */}
                        <FormControl isRequired mt={2}>
                            <FormLabel>Cargo</FormLabel>
                            <Menu closeOnSelect={false}>
                                <MenuButton as={Button} colorScheme="blue">
                                    Seleccione Cargos
                                </MenuButton>
                                <MenuList minWidth="240px">
                                    <CheckboxGroup
                                        value={formData.cargo_id}
                                        onChange={handleCargoChange}
                                    >
                                        <VStack align="start" spacing={2} p={2}>
                                            {listaCargos.map((cargo) => (
                                                <Checkbox key={cargo.id} value={cargo.id.toString()}>
                                                    {cargo.cargo}
                                                </Checkbox>
                                            ))}
                                        </VStack>
                                    </CheckboxGroup>
                                </MenuList>
                            </Menu>
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
