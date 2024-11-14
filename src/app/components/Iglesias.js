import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BiSolidChurch } from "react-icons/bi";

const MotionBox = motion(Box);

const Iglesias = ({ iglesias, onGestionarMinisterios, searchQuery }) => {
  const getIconColor = (subzonaId) => {
    switch (subzonaId) {
      case 1:
        return "#E53E3E"; // Rojo
      case 2:
        return "#38A169"; // Verde
      case 3:
      case 4:
        return "#3182CE"; // Azul
      default:
        return "#A0AEC0"; // Gris
    }
  };

  const filteredIglesias = iglesias.filter((iglesia) =>
    iglesia.nombre.toLowerCase().includes(searchQuery)
  );

  const handleGestionarMinisterios = async (iglesiaId) => {
    try {
      onGestionarMinisterios(iglesiaId);
    } catch (error) {
      console.error("Error al obtener ministerios:", error);
    }
  };

  return (
    <Box p="4" width="100%">
      <Accordion allowToggle>
        {filteredIglesias.map((iglesia, index) => (
          <MotionBox key={iglesia.id} mb="2">
            <AccordionItem bg={"lightgrey"} borderRadius={"5px"}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <HStack spacing="10px">
                      <BiSolidChurch color={getIconColor(iglesia.subzona_id)} />
                      <Text>{iglesia.nombre}</Text>
                    </HStack>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} bg={"#e7e7e7"}>
                <Text>
                  <strong>Dirección:</strong> {iglesia.direccion}
                </Text>
                <Text>
                  <strong>Municipio:</strong> {iglesia.municipio}
                </Text>
                <Text>
                  <strong>Provincia:</strong> {iglesia.provincia}
                </Text>
                <Text>
                  <strong>Código Postal:</strong> {iglesia.cp}
                </Text>
                <Button
                  mt={4}
                  bg="blue.900"
                  color="white"
                  _hover={{ bg: "blue.700" }}
                  onClick={() => handleGestionarMinisterios(iglesia.id)}
                >
                  Gestionar Ministerios
                </Button>
              </AccordionPanel>
            </AccordionItem>
          </MotionBox>
        ))}
      </Accordion>
    </Box>
  );
};

export default Iglesias;
