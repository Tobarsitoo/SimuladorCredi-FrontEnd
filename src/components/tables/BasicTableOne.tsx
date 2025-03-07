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

export default function BasicTableOne() {
  const [amortizationData, setAmortizationData] = useState<AmortizationData[]>([]);

  useEffect(() => {
    // Parámetros del préstamo (debes obtenerlos de alguna manera)
    const montoPrestamo = 20000000;
    const tasaInteresAnual = 0.12; // 12% anual
    const plazoMeses = 14;

    const resultados = calcularAmortizacion(montoPrestamo, tasaInteresAnual, plazoMeses);
    setAmortizationData(resultados);
  }, []);

  const calcularAmortizacion = (
    montoPrestamo: number,
    tasaInteresAnual: number,
    plazoMeses: number
  ): AmortizationData[] => {
    const resultados: AmortizationData[] = [];
    let saldo = montoPrestamo;
    const tasaInteresMensual = tasaInteresAnual / 12;
    const pagoMensual =
      (montoPrestamo * tasaInteresMensual) /
      (1 - Math.pow(1 + tasaInteresMensual, -plazoMeses));
    let fechaActual = new Date("2025-08-02"); // Fecha inicial

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
        fecha: fechaActual.toLocaleDateString("es-ES"),
      });

      saldo = nuevoSaldo;
      fechaActual.setMonth(fechaActual.getMonth() + 1);
    }

    return resultados;
  };

  return (
    <div className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader>Año</TableCell>
                <TableCell isHeader>Sdo. Capital</TableCell>
                <TableCell isHeader>Pago Capital</TableCell>
                <TableCell isHeader>P. Int.</TableCell>
                <TableCell isHeader>Monto de Pago</TableCell>
                <TableCell isHeader>Plazo en días</TableCell>
                <TableCell isHeader>Sdo. Capital</TableCell>
                <TableCell isHeader>Pago No</TableCell>
                <TableCell isHeader>Fecha</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {amortizationData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.anio}</TableCell>
                  <TableCell>{data.sdoCapitalInicial.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</TableCell>
                  <TableCell>{data.pagoCapital.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</TableCell>
                  <TableCell>{data.pInt.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</TableCell>
                  <TableCell>{data.montoPago.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</TableCell>
                  <TableCell>{data.plazoDias}</TableCell>
                  <TableCell>{data.sdoCapitalFinal.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</TableCell>
                  <TableCell>{data.pagoNo}</TableCell>
                  <TableCell>{data.fecha}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
