"use client";

import { useState, useEffect } from "react";
import {
  Center,
  Box,
  Select,
  Flex,
  Spinner,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { HiUserAdd } from "react-icons/hi"; // Importar el icono
import Navbar from "./components/NavBar";
import Iglesias from "./components/Iglesias";
import Ministerios from "./components/Ministerios";
import DownloadExcelButton from "./components/DownloadExcelButton";
import DownloadPdfButton from "./components/DownloadPdfButton";

const BackgroundAnimation = motion(Box);

const IndexPage = () => {
  const [zonas, setZonas] = useState([]);
  const [selectedZona, setSelectedZona] = useState(null);
  const [subzonas, setSubzonas] = useState([]);
  const [selectedSubzona, setSelectedSubzona] = useState(null);
  const [iglesias, setIglesias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("iglesias");
  const [selectedMinisterios, setSelectedMinisterios] = useState([]);
  const [selectedIglesiaId, setSelectedIglesiaId] = useState(null);

  useEffect(() => {
    const fetchZonas = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/getAllZonas");
        if (!response.ok) throw new Error("Error en la solicitud de zonas");
        const data = await response.json();
        setZonas(data);
      } catch (error) {
        console.error("Error al obtener zonas:", error);
      } finally {
        setLoading(false);
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
    setLoading(true);

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
      setLoading(false);
    }
  };

  const handleSubzonaChange = async (e) => {
    const subzonaId = e.target.value;
    setSelectedSubzona(subzonaId);
    setLoading(true);

    try {
      const response = await fetch(`/api/getAllIglesiasBySubzona/${subzonaId}`);
      if (!response.ok)
        throw new Error("Error en la solicitud de iglesias por subzona");
      const data = await response.json();
      setIglesias(data);
    } catch (error) {
      console.error("Error al obtener iglesias de la subzona:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGestionarMinisterios = async (iglesiaId) => {
    setLoading(true);

    try {
      const response = await fetch(
        `/api/getAllMinisteriosByIglesia/${iglesiaId}`
      );
      if (!response.ok) throw new Error("Error al obtener ministerios");

      const data = await response.json();
      setSelectedMinisterios(Array.isArray(data) ? data : []);
      setSelectedIglesiaId(iglesiaId);
      setView("ministerios");
    } catch (error) {
      console.error("Error al obtener ministerios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToIglesias = () => {
    setView("iglesias");
    setSelectedMinisterios([]);
    setSelectedIglesiaId(null);
  };

  const resetApp = () => {
    setSelectedZona(null);
    setSelectedSubzona(null);
    setIglesias([]);
    setView("iglesias");
    setSelectedMinisterios([]);
    setSelectedIglesiaId(null);
  };

  return (
    <>
      <Navbar onReset={resetApp} />

      {view === "iglesias" ? (
        <>
          {iglesias.length === 0 && (
            <BackgroundAnimation
              initial={{ backgroundPosition: "0% 0%" }}
              animate={{ backgroundPosition: "100% 100%" }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: "url('/fondo.jpeg')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                opacity: 0.2,
                zIndex: -1,
              }}
            />
          )}

          <Center
            minHeight="calc(100vh - 50px)"
            bg={iglesias.length === 0 ? "transparent" : "#f5f5f5"}
            flexDirection="column"
          >
            {loading ? (
              <Spinner m={5} size="xl" color="blue.900" />
            ) : (
              <Flex
                m={5}
                alignItems="center"
                justifyContent="center"
                gap={3}
                wrap="wrap"
                direction={{ base: "column", md: "row" }}
              >
                <Box width={{ base: "100%", md: "300px" }}>
                  <Select
                    placeholder="Seleccione una zona"
                    bg="blue.900"
                    color="white"
                    onChange={handleZonaChange}
                  >
                    <option
                      value="TODAS"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      Todas
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
                  <Box width={{ base: "100%", md: "300px" }}>
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
                  <Box width={{ base: "100%", md: "auto" }}>
                    <DownloadExcelButton iglesias={iglesias} />
                    <DownloadPdfButton iglesias={iglesias} />
                  </Box>
                )}
              </Flex>
            )}

            {iglesias.length > 0 && (
              <Box width="100%">
                <Iglesias
                  iglesias={iglesias}
                  onGestionarMinisterios={handleGestionarMinisterios}
                />
              </Box>
            )}
          </Center>
        </>
      ) : (
        <Box p="4">
          <Flex gap={2} mb={4}>
            <Button
              onClick={handleBackToIglesias}
              bg="blue.900"
              color="white"
              _hover={{ bg: "blue.700" }}
            >
              Volver atrás
            </Button>
            <Tooltip bg="#38A068" color={"white"} label="Añadir Ministerio">
              <Button colorScheme="green">
                <HiUserAdd color="white" />
              </Button>
            </Tooltip>
          </Flex>
          <Ministerios
            ministerios={selectedMinisterios}
            iglesiaId={selectedIglesiaId}
          />
        </Box>
      )}
    </>
  );
};

export default IndexPage;
