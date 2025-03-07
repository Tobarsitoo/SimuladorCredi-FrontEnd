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
  const options = [
    { value: "Mensual", label: "Mensual" },
    { value: "Trimestar", label: "Trimestal" },
    { value: "Semestral", label: "Semestal" },
    { value: "Único, al vencmiento", label: "Único, al vencmiento" },
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
    <><ComponentCard title="Simluador de créditos" className="font-medium">
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
        {/* <div>
      <Label>Cuenta</Label>
      <Input type="number" />
    </div> */}
        <div>
          <Label>Linea del Credito</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Monto del Credito</Label>
          <Input type="number" />
        </div>
        <div>
          <Label>Forma de Pago</Label>
          <div className="relative">
            <Select
              options={options}
              placeholder="Selecione una opción"
              onChange={handleSelectChange}
              className="dark:bg-dark-900" />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        <div>
          <Label>Taza de Interes</Label>
          <div className="relative">
            <Select
              options={options2}
              placeholder="Selecione una opción"
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
    <ComponentCard title="Simluador de créditos" className="font-medium">
      <Table />
    </ComponentCard></>
  );
}
