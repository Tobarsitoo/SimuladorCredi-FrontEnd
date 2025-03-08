import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface AmortizationData {
  anio: number;
  sdoCapitalInicial: number;
  pagoCapital: number;
  pInt: number;
  montoPago: number;
  plazoDias: number;
  sdoCapitalFinal: number;
  pagoNo: number;
  fecha: string;
}

interface Props {
  monto: number;
  tasaInteres: number;
  plazo: number;
  fechaInicio: string;
}

export default function BasicTableOne({ monto, tasaInteres, plazo, fechaInicio }: Props) {
  const [amortizationData, setAmortizationData] = useState<AmortizationData[]>([]);

  useEffect(() => {
    if(monto > 0 && tasaInteres >= 0 && plazo > 0) {
      const resultados = calcularAmortizacion(monto, tasaInteres, plazo, fechaInicio);
      setAmortizationData(resultados);
    }
  }, [monto, tasaInteres, plazo, fechaInicio]);

  const calcularAmortizacion = (
    montoPrestamo: number,
    tasaInteresAnual: number,
    plazoMeses: number,
    fechaInicio: string
  ): AmortizationData[] => {
    const resultados: AmortizationData[] = [];
    let saldo = montoPrestamo;
    const tasaInteresMensual = tasaInteresAnual / 12 / 100; // Convertir porcentaje a decimal
    const pagoMensual =
      (montoPrestamo * tasaInteresMensual) /
      (1 - Math.pow(1 + tasaInteresMensual, -plazoMeses));
      
    let fechaActual = new Date(fechaInicio);

    for (let i = 1; i <= plazoMeses; i++) {
      const interes = saldo * tasaInteresMensual;
      const capital = pagoMensual - interes;
      const nuevoSaldo = saldo - capital;

      resultados.push({
        anio: Math.ceil(i / 12),
        sdoCapitalInicial: saldo,
        pagoCapital: capital,
        pInt: interes,
        montoPago: pagoMensual,
        plazoDias: 30,
        sdoCapitalFinal: nuevoSaldo,
        pagoNo: i,
        fecha: fechaActual.toLocaleDateString("es-ES", {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
      });

      saldo = nuevoSaldo;
      fechaActual = new Date(fechaActual.setMonth(fechaActual.getMonth() + 1));
    }

    return resultados;
  };

  return (
    <div className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
      {amortizationData.length > 0 ? (
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader>Año</TableCell>
                  <TableCell isHeader>Sdo. Capital Inicial</TableCell>
                  <TableCell isHeader>Pago Capital</TableCell>
                  <TableCell isHeader>Interés</TableCell>
                  <TableCell isHeader>Cuota Mensual</TableCell>
                  <TableCell isHeader>Días</TableCell>
                  <TableCell isHeader>Sdo. Capital Final</TableCell>
                  <TableCell isHeader>N° Pago</TableCell>
                  <TableCell isHeader>Fecha Pago</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {amortizationData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.anio}</TableCell>
                    <TableCell>{formatCurrency(data.sdoCapitalInicial)}</TableCell>
                    <TableCell>{formatCurrency(data.pagoCapital)}</TableCell>
                    <TableCell>{formatCurrency(data.pInt)}</TableCell>
                    <TableCell>{formatCurrency(data.montoPago)}</TableCell>
                    <TableCell>{data.plazoDias}</TableCell>
                    <TableCell>{formatCurrency(data.sdoCapitalFinal)}</TableCell>
                    <TableCell>{data.pagoNo}</TableCell>
                    <TableCell>{data.fecha}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-400">
          Complete el formulario del simulador para ver la amortización
        </div>
      )}
    </div>
  );
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}