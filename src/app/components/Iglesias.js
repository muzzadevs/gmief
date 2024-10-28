"use client";

import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BiSolidChurch } from "react-icons/bi";

const MotionBox = motion(Box);

const Iglesias = ({ subzonaId }) => {
  const [iglesias, setIglesias] = useState([]);

  useEffect(() => {
    if (subzonaId) {
      const fetchIglesias = async () => {
        try {
          const response = await fetch(`/api/getAllIglesiasBySubzona/${subzonaId}`);
          if (!response.ok) throw new Error('Error al obtener iglesias');
          const data = await response.json();
          setIglesias(data);
        } catch (error) {
          console.error('Error al obtener iglesias:', error);
        }
      };
      fetchIglesias();
    }
  }, [subzonaId]);

  return (
    <Box p="4" width="100%">
      <Accordion allowToggle>
        {iglesias.map((iglesia, index) => (
          <MotionBox
            key={iglesia.id}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            mb="2"
          >
            <AccordionItem bg={'lightgrey'} borderRadius={"5px"}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <HStack spacing="10px">
                      <BiSolidChurch />
                      <Text>{iglesia.nombre}</Text>
                    </HStack>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} bg={"#e7e7e7"}>
                <Text><strong>Dirección:</strong> {iglesia.direccion}</Text>
                <Text><strong>Municipio:</strong> {iglesia.municipio}</Text>
                <Text><strong>Provincia:</strong> {iglesia.provincia}</Text>
                <Text><strong>Código Postal:</strong> {iglesia.cp}</Text>
                <Button mt={4} bg="blue.900" color="white" _hover={{ bg: "blue.700" }}>
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
