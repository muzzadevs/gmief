"use client";

import { Button, Tooltip } from "@chakra-ui/react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { GrDocumentPdf } from "react-icons/gr";
import "@fontsource/poppins"; // Importa la fuente Poppins para el proyecto

const DownloadPdfButton = ({ iglesias }) => {
  const handleDownload = async () => {
    // Crear un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();

    // Embedding standard fonts
    const poppinsFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const poppinsBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let page = pdfDoc.addPage([600, 800]);
    const { height } = page.getSize();
    const marginBottom = 50;
    let yPosition = height - 50;

    iglesias.forEach((iglesia, index) => {
      // Verificar si hay suficiente espacio en la página para la iglesia actual
      if (yPosition < marginBottom + 100) {
        // si no hay suficiente espacio, crear nueva página
        page = pdfDoc.addPage([600, 800]);
        yPosition = height - 50;
      }

      // Título en negrita (nombre de la iglesia)
      page.drawText(iglesia.nombre, {
        x: 50,
        y: yPosition,
        size: 16,
        font: poppinsBoldFont,
        color: rgb(0.102, 0.212, 0.365),
      });

      yPosition -= 25; // Añadir un poco más de espacio después del título

      // Dibujar los otros campos de la iglesia con más espacio entre el nombre del campo y el valor
      Object.keys(iglesia).forEach((key) => {
        if (key !== "nombre" && key !== "subzona_id") {
          page.drawText(`${key}:`, {
            x: 50,
            y: yPosition,
            size: 12,
            font: poppinsBoldFont,
            color: rgb(0, 0, 0),
          });
          page.drawText(`  ${iglesia[key]}`, {
            x: 130, // Ajuste aquí para mayor espacio entre el nombre del campo y el valor
            y: yPosition,
            size: 12,
            font: poppinsFont,
            color: rgb(0, 0, 0),
          });
          yPosition -= 18; // Incrementar el espacio entre líneas
        }
      });

      // Espacio adicional entre iglesias
      yPosition -= 30;
    });

    // Guardar el PDF en un blob y descargarlo
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "iglesias.pdf";
    link.click();
  };

  return (
    <Tooltip label="Descargar PDF" bg="red.600" color="white">
      <Button ml={2} colorScheme="red" onClick={handleDownload}>
        <GrDocumentPdf color="white" />
      </Button>
    </Tooltip>
  );
};

export default DownloadPdfButton;
