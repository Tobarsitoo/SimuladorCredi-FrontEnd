"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import Button from "../../ui/button/Button";
import { useModal } from "../../../hooks/useModal";
import Table from "@/components/tables/BasicTableOne";
import { CalenderIcon, ChevronDownIcon, EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";

export default function DefaultInputs() {
  // Data
  const [showPassword, setShowPassword] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const options = [
    { value: "Mensual", label: "Mensual" },
    { value: "Trimestral", label: "Trimestral" },
    { value: "Semestral", label: "Semestral" },
    { value: "Único, al vencimiento", label: "Único, al vencimiento" },
  ];
  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };

  const options2 = [
    { value: "0", label: "0%" },
    { value: "1.8", label: "1.8%" }
  ]

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="col-span-1">
      <ComponentCard title="Simulador de créditos" >
        <div className="space-y-6">
          <div>
            <Label htmlFor="datePicker">Fecha de disposición</Label>
            <div className="relative">
              <Input
                type="date"
                id="datePicker"
                name="datePicker"
                onChange={(e) => console.log(e.target.value)} />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <CalenderIcon />
              </span>
            </div>
          </div>

          <div>
            <Label>Línea del Crédito</Label>
            <Input type="text" />
          </div>
          <div>
            <Label>Monto del Crédito</Label>
            <Input type="number" />
          </div>
          <div>
            <Label>Forma de Pago</Label>
            <div className="relative">
              <Select
                options={options}
                placeholder="Seleccione una opción"
                onChange={handleSelectChange}
                className="dark:bg-dark-900" />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
          </div>

          <div>
            <Label>Tasa de Interés</Label>
            <div className="relative">
              <Select
                options={options2}
                placeholder="Seleccione una opción"
                onChange={handleSelectChange}
                className="dark:bg-dark-900" />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
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
        <div className="col-span-1">
          <ComponentCard title="Amorizacion de créditos" className="font-medium">
            <Table />
          </ComponentCard>
        </div>
      </div>
  );
}

