import './globals.css';
import { ChakraProviderWrapper } from './ChakraProvider';

export const metadata = {
  title: 'GMIEF',
  description: 'Aplicación para gestionar ministerios de GMIEF',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ChakraProviderWrapper>
          {children}
        </ChakraProviderWrapper>
      </body>
    </html>
  );
}
