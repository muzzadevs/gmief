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

const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const formatCargos = (cargos) => {
  if (!cargos || cargos.length === 0) return "N/A";
  if (cargos.length === 1) return `${cargos[0]}.`;
  if (cargos.length === 2) return `${cargos[0]} y ${cargos[1]}.`;

  return `${cargos.slice(0, -1).join(", ")} y ${cargos[cargos.length - 1]}.`;
};

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
          const displayName =
            ministerio.alias ||
            `${capitalize(ministerio.nombre)} ${capitalize(
              ministerio.apellidos
            )}`;

          // Formateo de cargos
          const cargos = formatCargos(ministerio.cargos);

          // Prefijo telefónico para España (+34)
          const telefonoLink = ministerio.telefono
            ? `tel:+34${ministerio.telefono}`
            : null;

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
                        <Avatar
                          bg="teal.500"
                          color="white" // Forzar el texto a blanco
                          size="sm"
                          name={`${displayName}`}
                        />
                        <Text>{displayName}</Text>
                      </HStack>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} bg={"#e7e7e7"}>
                  <Text>
                    <strong>Nombre y apellido:</strong>{" "}
                    {ministerio.nombre + " " + ministerio.apellidos || "N/A"}
                  </Text>
                  <Text>
                    <strong>Código:</strong> {ministerio.codigo || "N/A"}
                  </Text>
                  <Text>
                    <strong>Estado:</strong> {ministerio.estado_nombre || "N/A"}
                  </Text>
                  <Text>
                    <strong>Aprobado en el año: </strong>
                    {ministerio.aprob || "N/A"}
                  </Text>
                  <Text>
                    <strong>Teléfono:</strong>{" "}
                    {telefonoLink ? (
                      <a
                        href={telefonoLink}
                        style={{ color: "#1A365D", fontWeight: "bold" }}
                      >
                        {ministerio.telefono}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </Text>
                  <Text>
                    <strong>Email:</strong> {ministerio.email || "N/A"}
                  </Text>
                  <Text>
                    <strong>Cargos:</strong> {cargos}
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
