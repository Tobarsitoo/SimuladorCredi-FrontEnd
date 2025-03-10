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
    if (monto > 0 && plazo > 0) {
      const resultados = calcularAmortizacion(monto, tasaInteres, plazo, fechaInicio);
      setAmortizationData(resultados);
      console.log("Valores recibidos:",{monto, tasaInteres, plazo, fechaInicio} )
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
    let pagoMensual = 0;

    if (tasaInteresAnual === 0) {
      pagoMensual = montoPrestamo / plazoMeses;
    } else {
      const tasaInteresMensual = tasaInteresAnual / 12 / 100;
      pagoMensual = (montoPrestamo * tasaInteresMensual) /
        (1 - Math.pow(1 + tasaInteresMensual, -plazoMeses));
    }

    let fechaActual = new Date(fechaInicio);

    for (let i = 1; i <= plazoMeses; i++) {
      const interes = tasaInteresAnual === 0 ? 0 : saldo * (tasaInteresAnual / 12 / 100);
      const capital = pagoMensual - interes;
      const nuevoSaldo = saldo - capital;

      console.log(`Pago ${i}: saldo=${saldo}, interes=${interes}, capital=${capital}, pagoMensual=${pagoMensual}`);

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  return (
    <div className="px-5 py-3 font-medium text-gray-500 text-start dark:text-gray-400">
      {amortizationData.length > 0 ? (
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table className="w-full">
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-gray-50 dark:bg-dark-700">
                <TableRow>
                  <TableCell isHeader className="px-4 py-3">Año</TableCell>
                  <TableCell isHeader className="px-4 py-3 text-right">Sdo. Capital Inicial</TableCell>
                  <TableCell isHeader className="px-4 py-3 text-right">Pago Capital</TableCell>
                  <TableCell isHeader className="px-4 py-3 text-right">Interés</TableCell>
                  <TableCell isHeader className="px-4 py-3 text-right">Cuota Mensual</TableCell>
                  <TableCell isHeader className="px-4 py-3 text-right">Días</TableCell>
                  <TableCell isHeader className="px-4 py-3 text-right">Sdo. Capital Final</TableCell>
                  <TableCell isHeader className="px-4 py-3">N° Pago</TableCell>
                  <TableCell isHeader className="px-4 py-3">Fecha Pago</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {amortizationData.map((data, index) => (
                  <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-dark-700">
                    <TableCell className="px-4 py-3">{data.anio}</TableCell>
                    <TableCell className="px-4 py-3 text-right">{formatCurrency(data.sdoCapitalInicial)}</TableCell>
                    <TableCell className="px-4 py-3 text-right">{formatCurrency(data.pagoCapital)}</TableCell>
                    <TableCell className="px-4 py-3 text-right">{formatCurrency(data.pInt)}</TableCell>
                    <TableCell className="px-4 py-3 text-right">{formatCurrency(data.montoPago)}</TableCell>
                    <TableCell className="px-4 py-3 text-right">{data.plazoDias}</TableCell>
                    <TableCell className="px-4 py-3 text-right">{formatCurrency(data.sdoCapitalFinal)}</TableCell>
                    <TableCell className="px-4 py-3">{data.pagoNo}</TableCell>
                    <TableCell className="px-4 py-3">{data.fecha}</TableCell>
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