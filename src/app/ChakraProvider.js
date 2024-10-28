"use client";

import { ChakraProvider } from '@chakra-ui/react';

export function ChakraProviderWrapper({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
