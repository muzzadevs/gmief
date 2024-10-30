import { Flex, Box } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      as="nav"
      bg="blue.900"
      color="white"
      align="center"
      paddingX="20px"
      height="50px"
    >
      {/* Logo alineado a la izquierda */}
      <Box fontWeight="900" fontSize="lg" ml="20px">
        GMIEF
      </Box>
      <Box fontWeight="300" fontSize="lg" ml="5px">
        Gestor de Ministerios IEF
      </Box>
    </Flex>
  );
};

export default Navbar;
