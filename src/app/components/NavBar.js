import { Flex, Box } from "@chakra-ui/react";

const Navbar = () => {
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
    </Flex>
  );
};

export default Navbar;
