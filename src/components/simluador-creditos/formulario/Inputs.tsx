"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import Button from "../../ui/button/Button";
import { useModal } from "../../../hooks/useModal";
import Table from "@/components/tables/BasicTableOne";
import { CalenderIcon, ChevronDownIcon } from "../../../icons";

interface FormData {
  date: string;
  creditLine: string;
  amount: string;
  paymentMethod: string;
  interestRate: string;
  plazo: number;
}

const PAYMENT_OPTIONS = [
  { value: "Mensual", label: "Mensual" },
  { value: "Trimestral", label: "Trimestral" },
  { value: "Semestral", label: "Semestral" },
  { value: "Único, al vencimiento", label: "Único, al vencimiento" },
];

const INTEREST_RATES = [
  { value: "0", label: "0%" },
  { value: "1.8", label: "1.8%" },
];

const calcularPlazoPorDefecto = (paymentMethod: string): number => {
  switch (paymentMethod) {
    case "Mensual": return 12;
    case "Trimestral": return 4;
    case "Semestral": return 2;
    case "Único, al vencimiento": return 1;
    default: return 12; // Valor por defecto
  }
};

export default function DefaultInputs() {

  const [formData, setFormData] = useState<FormData>({
    date: "",
    creditLine: "",
    amount: "",
    paymentMethod: "",
    interestRate: "",
    plazo: 0,
  });

  const [creditLines, setCreditLines] = useState<{ value: string; label: string }[]>([]);

  // Cargar líneas de crédito desde la API
  useEffect(() => {
    async function fetchCreditLines() {
      try {
        const response = await fetch("http://localhost:5000/api/credit/lineas-credito");
        const data = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setCreditLines(data.map((line: any) => ({ value: line.linea, label: `${line.linea} - ${line.nombre}` })));
      } catch (error) {
        console.error("Error al obtener las líneas de crédito:", error);
      }
    }

    fetchCreditLines();
  }, []);

  const [tableData, setTableData] = useState<{
    monto: number;
    tasaInteres: number;
    plazo: number;
    fechaInicio: string;
  } | null>(null);


  const { closeModal } = useModal();

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setTableData({
      monto: Number(formData.amount),
      tasaInteres: Number(formData.interestRate),
      plazo: formData.plazo,
      fechaInicio: formData.date,
    });
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: value,
      plazo: prev.plazo === 0 ? calcularPlazoPorDefecto(value) : prev.plazo // Mantener el valor modificado si existe
    }));
  };

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full items-stretch">
      {/* Sección Simulador */}
      <div className="h-full">
        <ComponentCard
          title="Simulador de créditos"
          className="h-full flex flex-col"
        >
          <form onSubmit={handleSimulate} className="space-y-6 flex-1">
            {/* Campo Fecha */}
            <div>
              <Label htmlFor="date">Fecha de disposición</Label>
              <div className="relative">
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
                <CalenderIcon className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 dark:text-gray-400" />
              </div>
            </div>

            {/* Campo Línea de Crédito */}
            <div>
              <Label htmlFor="creditLine">Línea del Crédito</Label>
              <Select
                name="creditLine"
                options={creditLines}
                value={formData.creditLine}
                onChange={(value: string) => setFormData({ ...formData, creditLine: value })}
                placeholder="Seleccione una línea de crédito"
              />
            </div>

            {/* Campo Monto */}
            <div>
              <Label htmlFor="amount">Monto del Crédito</Label>
              <div className="relative">
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  min="0"
                  step="100"
                  placeholder="Ej: 10,000,000"
                />
                <span className="absolute text-gray-500 right-3 top-1/2 -translate-y-1/2">
                  COP
                </span>
              </div>
            </div>

          {/* Selector Forma de Pago */}
          <div>
              <Label>Forma de Pago</Label>
              <div className="relative">
                <Select
                  name="paymentMethod"
                  options={PAYMENT_OPTIONS}
                  value={formData.paymentMethod}
                  onChange={handlePaymentMethodChange}
                  placeholder="Seleccione una opción"
                  className="dark:bg-dark-900"
                />
                <ChevronDownIcon className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400" />
              </div>
            </div>

            {/* Campo Plazo Editable */}
            <div>
              <Label>Número de Cuotas</Label>
              <Input
                type="number"
                id="plazo"
                name="plazo"
                value={formData.plazo.toString()}
                onChange={(e) => handleChange("plazo", parseInt(e.target.value) || 0)}
                min="1"
                step="1"
                placeholder={`Ej: ${calcularPlazoPorDefecto(formData.paymentMethod)}`}
                // explanation="Puede modificar el número de cuotas sugerido"
              />
            </div>

            {/* Selector Tasa de Interés */}
            <div>
              <Label>Tasa de Interés</Label>
              <div className="relative">
                <Select
                  name="interestRate"
                  options={INTEREST_RATES}
                  value={formData.interestRate}
                  onChange={(value: string) =>
                    handleChange("interestRate", value)
                  }
                  placeholder="Seleccione una opción"
                  className="dark:bg-dark-900"
                />
                <ChevronDownIcon className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400" />
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col-reverse gap-3 mt-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={closeModal}
              >
                Cancelar
              </Button>
              <Button type="submit" size="sm">
                Simular
              </Button>
            </div>
          </form>
          </ComponentCard>
      </div>

      {/* Sección Amortización */}
      <div className="h-full">
        <ComponentCard
          title="Amortización de créditos"
          className="h-full flex flex-col font-medium"
        >
          {tableData && (
            <div className="flex-1 min-h-[400px] overflow-x-auto">
              <Table
                key={`${tableData.monto}-${tableData.plazo}-${tableData.tasaInteres}`}
                monto={tableData.monto}
                tasaInteres={tableData.tasaInteres}
                plazo={tableData.plazo}
                fechaInicio={tableData.fechaInicio}
              />
            </div>
          )}
        </ComponentCard>
      </div>
    </div>
  );
}