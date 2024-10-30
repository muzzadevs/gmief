// components/DownloadExcelButton.js

"use client";

import { Button, Tooltip } from "@chakra-ui/react";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";

const DownloadExcelButton = ({ iglesias }) => {
  const handleDownload = () => {
    // Filtrar el campo subzona_id de cada iglesia
    const iglesiasData = iglesias.map(({ subzona_id, ...rest }) => rest);

    // Crear un libro de trabajo y agregar los datos de las iglesias
    const worksheet = XLSX.utils.json_to_sheet(iglesiasData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Iglesias");

    // Generar el archivo Excel y descargarlo
    XLSX.writeFile(workbook, "iglesias.xlsx");
  };

  return (
    <Tooltip label="Descargar Excel" bg="#38A068" color="white">
      <Button colorScheme="green" onClick={handleDownload}>
        <SiMicrosoftexcel color="white" />
      </Button>
    </Tooltip>
  );
};

export default DownloadExcelButton;
