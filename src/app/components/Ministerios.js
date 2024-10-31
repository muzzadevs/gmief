import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Avatar,
  HStack,
  Center,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const Ministerios = ({ ministerios, iglesiaId }) => {
  if (ministerios.length === 0) {
    return (
      <Center>
        <Text fontSize="xl" color="gray.500">
          No hay ministerios en la iglesia {iglesiaId}
        </Text>
      </Center>
    );
  }

  return (
    <Box p="4" width="100%">
      <Accordion allowToggle>
        {ministerios.map((ministerio, index) => {
          const nombreInicial = ministerio.nombre ? ministerio.nombre.charAt(0).toUpperCase() : "";
          const apellidoInicial = ministerio.apellidos ? ministerio.apellidos.charAt(0).toUpperCase() : "";
          const displayName = ministerio.alias || `${capitalize(ministerio.nombre)} ${capitalize(ministerio.apellidos)}`;

          return (
            <MotionBox
              key={ministerio.id}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              mb="2"
            >
              <AccordionItem bg={"lightgrey"} borderRadius={"5px"}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <HStack spacing="10px">
                        <Avatar bg="teal.500" size="sm" name={`${nombreInicial}${apellidoInicial}`} />
                        <Text >{displayName}</Text>
                      </HStack>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} bg={"#e7e7e7"}>
                  <Text>
                    <strong>Nombre y apellido:</strong> {ministerio.nombre+" "+ministerio.apellidos || "N/A"}
                  </Text>
                  <Text>
                    <strong>Código:</strong> {ministerio.codigo || "N/A"}
                  </Text>
                  <Text>
                    <strong>Estado ID:</strong> {ministerio.estado_id || "N/A"}
                  </Text>
                  <Text>
                    <strong>Aprobado:</strong> {ministerio.aprob || "N/A"}
                  </Text>
                  <Text>
                    <strong>Teléfono:</strong> {ministerio.telefono || "N/A"}
                  </Text>
                  <Text>
                    <strong>Email:</strong> {ministerio.email || "N/A"}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </MotionBox>
          );
        })}
      </Accordion>
    </Box>
  );
};

export default Ministerios;
