// components/Navbar.js
import { Flex, Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { FiHelpCircle } from "react-icons/fi";
import HelpModal from "./HelpModal";

const Navbar = ({ onReset }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      bg="#1A365D"
      color="white"
      align="center"
      paddingX="20px"
      height="50px"
    >
      {/* Logo alineado a la izquierda */}
      <Box
        fontWeight="900"
        fontSize="lg"
        ml="20px"
        onClick={onReset}
        style={{ cursor: "pointer" }}
      >
        GMIEF
      </Box>
      <Box fontWeight="300" fontSize="lg" ml="5px">
        Gestor de Ministerios IEF
      </Box>

      {/* Botón de ayuda alineado a la derecha */}
      <Box ml="auto">
        <IconButton
          icon={<FiHelpCircle />}
          variant="ghost"
          color="white"
          onClick={onOpen}
          aria-label="Help"
        />
      </Box>

      {/* Modal de ayuda */}
      <HelpModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Navbar;
