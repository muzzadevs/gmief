"use client";

import { useState, useEffect } from "react";
import { Center, Box, Select, Flex } from "@chakra-ui/react";
import Navbar from "./components/NavBar";
import Iglesias from "./components/Iglesias";

const IndexPage = () => {
  const [zonas, setZonas] = useState([]);
  const [selectedZona, setSelectedZona] = useState(null);
  const [subzonas, setSubzonas] = useState([]);
  const [selectedSubzona, setSelectedSubzona] = useState(null);

  useEffect(() => {
    const fetchZonas = async () => {
      try {
        const response = await fetch("/api/getAllZonas");
        if (!response.ok) throw new Error("Error en la solicitud de zonas");
        const data = await response.json();
        setZonas(data);
      } catch (error) {
        console.error("Error al obtener zonas:", error);
      }
    };
    fetchZonas();
  }, []);

  const handleZonaChange = async (e) => {
    const zonaId = e.target.value;
    setSelectedZona(zonaId);
    setSelectedSubzona(null);

    try {
      const response = await fetch(`/api/getAllSubzonasByZona/${zonaId}`);
      if (!response.ok) throw new Error("Error en la solicitud de subzonas");
      const data = await response.json();
      setSubzonas(data);
    } catch (error) {
      console.error("Error al obtener subzonas:", error);
    }
  };

  const handleSubzonaChange = (e) => {
    const subzonaId = e.target.value;
    setSelectedSubzona(subzonaId);
  };

  return (
    <>
      <Navbar />
      <Center
        minHeight="calc(100vh - 50px)"
        bg="gray.100"
        flexDirection="column"
      >
        <Flex>
          <Box width="300px" mb={4} mr={4}>
            <Select
              placeholder="Seleccione una zona"
              bg="blue.900"
              color="white"
              onChange={handleZonaChange}
            >
              {zonas.map((zona) => (
                <option
                  key={zona.id}
                  value={zona.id}
                  style={{ color: "black" }}
                >
                  {zona.codigo} - {zona.nombre}
                </option>
              ))}
            </Select>
          </Box>

          {selectedZona && (
            <Box width="300px" mb={4}>
              <Select
                placeholder="Seleccione una subzona"
                bg="blue.900"
                color="white"
                onChange={handleSubzonaChange}
              >
                {subzonas.map((subzona) => (
                  <option
                    key={subzona.id}
                    value={subzona.id}
                    style={{ color: "black" }}
                  >
                    {subzona.nombre}
                  </option>
                ))}
              </Select>
            </Box>
          )}
        </Flex>

        {selectedSubzona && (
          <Box width="100%">
            <Iglesias subzonaId={selectedSubzona} />
          </Box>
        )}
      </Center>
    </>
  );
};

export default IndexPage;
