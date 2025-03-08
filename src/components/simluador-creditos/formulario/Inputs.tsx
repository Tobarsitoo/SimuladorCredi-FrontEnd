"use client";
import React, { useState } from "react";
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

export default function DefaultInputs() {
  const [formData, setFormData] = useState<FormData>({
    date: "",
    creditLine: "",
    amount: "",
    paymentMethod: "",
    interestRate: "",
    plazo: 0
  });

  const { closeModal } = useModal();

  const PAYMENT_OPTIONS = [
    { value: "Mensual", label: "Mensual" },
    { value: "Trimestral", label: "Trimestral" },
    { value: "Semestral", label: "Semestral" },
    { value: "Único, al vencimiento", label: "Único, al vencimiento" },
  ];

  const INTEREST_RATES = [
    { value: "0", label: "0%" },
    { value: "1.8", label: "1.8%" } // Valor decimal correcto
  ];

  const handleSave = () => {
    if (!formData.date || !formData.amount || !formData.paymentMethod) {
      alert("Por favor complete todos los campos requeridos");
      return;
    }
    console.log("Datos para simulación:", formData);
    closeModal();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full items-stretch">
      {/* Sección Simulador */}
      <div className="h-full">
        <ComponentCard title="Simulador de créditos" className="h-full flex flex-col">
          <div className="space-y-6 flex-1">
            {/* Campo Fecha */}
            <div>
              <Label htmlFor="date">Fecha de disposición</Label>
                <div className="relative">
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
                <CalenderIcon className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 dark:text-gray-400" />
                </div>
            </div>

            {/* Campo Línea de Crédito */}
            <div>
              <Label htmlFor="creditLine">Línea del Crédito</Label>
              <Input
                type="text"
                id="creditLine"
                name="creditLine"
                value={formData.creditLine}
                onChange={(e) => setFormData(prev => ({ ...prev, creditLine: e.target.value }))}
                placeholder="Ej: Crédito personal"
              />
            </div>

            {/* Campo Monto */}
            <div>
              <Label htmlFor="amount">Monto del Crédito</Label>
              <Input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                min="0"
                step="any" // Permitir cualquier valor
                placeholder="Ej: 10000000" // Formato correcto sin comas
              />
            </div>

            {/* Selector Forma de Pago */}
            <div>
              <Label>Forma de Pago</Label>
              <div className="relative">
                <Select
                  name="paymentMethod"
                  options={PAYMENT_OPTIONS}
                  value={formData.paymentMethod}
                  onChange={(value: string) => {
                    const calcularPlazo = (paymentMethod: string): number => {
                      switch (paymentMethod) {
                        case "Mensual": return 12;
                        case "Trimestral": return 4;
                        case "Semestral": return 2;
                        case "Único, al vencimiento": return 1;
                        default: return 0;
                      }
                    };
                    setFormData(prev => ({
                      ...prev,
                      paymentMethod: value,
                      plazo: calcularPlazo(value)
                    }));
                  }}
                  placeholder="Seleccione una opción"
                  className="dark:bg-dark-900"
                />
                <ChevronDownIcon className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400" />
              </div>
            </div>

            {/* Selector Tasa de Interés */}
            <div>
              <Label>Tasa de Interés</Label>
              <div className="relative">
                <Select
                  name="interestRate"
                  options={INTEREST_RATES}
                  value={formData.interestRate}
                  onChange={(value: string) => setFormData(prev => ({ ...prev, interestRate: value }))}
                  placeholder="Seleccione una opción"
                  className="dark:bg-dark-900"
                />
                <ChevronDownIcon className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400" />
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col-reverse gap-3 mt-6 sm:flex-row sm:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSave}>
                Simular
              </Button>
            </div>
          </div>
        </ComponentCard>
      </div>

      {/* Sección Amortización */}
      <div className="h-full">
        <ComponentCard title="Amortización de créditos" className="h-full flex flex-col font-medium">
          <Table 
            monto={Number(formData.amount)} 
            tasaInteres={Number(formData.interestRate)}
            plazo={formData.plazo}
            fechaInicio={formData.date}
          />
        </ComponentCard>
      </div>
    </div>
  );
}