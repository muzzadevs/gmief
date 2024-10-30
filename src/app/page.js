// IndexPage.js

"use client";

import { useState, useEffect } from "react";
import { Center, Box, Select, Flex, Spinner } from "@chakra-ui/react";
import Navbar from "./components/NavBar";
import Iglesias from "./components/Iglesias";
import DownloadExcelButton from "./components/DownloadExcelButton";

const IndexPage = () => {
  const [zonas, setZonas] = useState([]);
  const [selectedZona, setSelectedZona] = useState(null);
  const [subzonas, setSubzonas] = useState([]);
  const [selectedSubzona, setSelectedSubzona] = useState(null);
  const [iglesias, setIglesias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchZonas = async () => {
      setLoading(true); // Inicia el loading
      try {
        const response = await fetch("/api/getAllZonas");
        if (!response.ok) throw new Error("Error en la solicitud de zonas");
        const data = await response.json();
        setZonas(data);
      } catch (error) {
        console.error("Error al obtener zonas:", error);
      } finally {
        setLoading(false); // Finaliza el loading
      }
    };
    fetchZonas();
  }, []);

  const handleZonaChange = async (e) => {
    const zonaId = e.target.value;
    setSelectedZona(zonaId);
    setSelectedSubzona(null);
    setSubzonas([]);
    setIglesias([]);
    setLoading(true); // Inicia el loading para subzonas y iglesias

    try {
      if (zonaId === "TODAS") {
        const responseIglesias = await fetch("/api/getAllIglesias");
        if (!responseIglesias.ok)
          throw new Error("Error en la solicitud de todas las iglesias");
        const dataIglesias = await responseIglesias.json();
        setIglesias(dataIglesias);
      } else {
        const responseSubzonas = await fetch(
          `/api/getAllSubzonasByZona/${zonaId}`
        );
        if (!responseSubzonas.ok)
          throw new Error("Error en la solicitud de subzonas");
        const dataSubzonas = await responseSubzonas.json();
        setSubzonas(dataSubzonas);

        const responseIglesias = await fetch(
          `/api/getAllIglesiasByZona/${zonaId}`
        );
        if (!responseIglesias.ok)
          throw new Error("Error en la solicitud de iglesias por zona");
        const dataIglesias = await responseIglesias.json();
        setIglesias(dataIglesias);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false); // Finaliza el loading
    }
  };

  const handleSubzonaChange = async (e) => {
    const subzonaId = e.target.value;
    setSelectedSubzona(subzonaId);
    setLoading(true); // Inicia el loading para iglesias

    try {
      const response = await fetch(`/api/getAllIglesiasBySubzona/${subzonaId}`);
      if (!response.ok)
        throw new Error("Error en la solicitud de iglesias por subzona");
      const data = await response.json();
      setIglesias(data);
    } catch (error) {
      console.error("Error al obtener iglesias de la subzona:", error);
    } finally {
      setLoading(false); // Finaliza el loading
    }
  };

  return (
    <>
      <Navbar />
      <Center
        minHeight="calc(100vh - 50px)"
        bg="gray.100"
        flexDirection="column"
      >
        {loading ? (
          <Spinner size="xl" color="blue.900" /> // Muestra el spinner mientras loading es true
        ) : (
          <Flex
            m={5}
            alignItems="center"
            justifyContent="center"
            gap={3}
            wrap="nowrap"
          >
            <Box width="300px">
              <Select
                placeholder="Seleccione una zona"
                bg="blue.900"
                color="white"
                onChange={handleZonaChange}
              >
                <option value="TODAS" style={{ color: "black" }}>
                  TODAS
                </option>
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
            {selectedZona && selectedZona !== "TODAS" && (
              <Box width="300px">
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
            {iglesias.length > 0 && (
              <Box>
                <DownloadExcelButton iglesias={iglesias} />
              </Box>
            )}
          </Flex>
        )}

        {/* Renderizar Iglesias, ya sea por zona o subzona */}
        {iglesias.length > 0 && (
          <Box width="100%">
            <Iglesias iglesias={iglesias} />
          </Box>
        )}
      </Center>
    </>
  );
};

export default IndexPage;
