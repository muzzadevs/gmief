"use client";

import { useEffect, useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';

const Navbar = () => {
  // Definimos el estado `currentPath` para almacenar la ruta actual
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Asegúrate de que `window` esté disponible en el navegador
    if (typeof window !== "undefined") {
      const path = window.location.pathname; // Obtiene la ruta actual una sola vez
      setCurrentPath(path); // Actualiza el estado una sola vez
    }
  }, []); // Dependencia vacía para ejecutar solo al montar

  return (
    <Flex
      as="nav"
      bg="blue.900"
      color="white"
      align="center"
      justify="space-between"
      paddingX="20px"
      height="50px"
    >
      {/* Logo alineado a la izquierda */}
      <Box fontWeight="bold" fontSize="lg" ml="20px">
        GMIEF
      </Box>

      {/* Mostramos la ruta actual para verificar si el estado funciona */}
      <Box fontSize="sm" mr="20px">
        Ruta actual: {currentPath || "Cargando..."}
      </Box>
    </Flex>
  );
};

export default Navbar;
