"use client";
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
  // Mejorar manejo de estado
  const [formData, setFormData] = useState({
    date: "",
    creditLine: "",
    amount: "",
    paymentMethod: "",
    interestRate: ""
  });

  // Eliminar estados no utilizados (showPassword, isMenuOpen)
  const { isOpen, openModal, closeModal } = useModal();

  // Organizar opciones en constantes
  const PAYMENT_OPTIONS = [
    { value: "Mensual", label: "Mensual" },
    { value: "Trimestral", label: "Trimestral" },
    { value: "Semestral", label: "Semestral" },
    { value: "Único, al vencimiento", label: "Único, al vencimiento" },
  ];

  const INTEREST_RATES = [
    { value: "0", label: "0%" },
    { value: "1.8", label: "1.8%" }
  ];

  // Manejo genérico de cambios en inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Validación básica
    if (!formData.date || !formData.amount) {
      alert("Por favor complete los campos requeridos");
      return;
    }
    
    console.log("Datos del formulario:", formData);
    closeModal();
    // Aquí iría la lógica para generar la amortización
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {/* Sección de Simulador */}
      <div className="col-span-1">
        <ComponentCard title="Simulador de créditos">
          <div className="space-y-6">
            {/* Campo Fecha */}
            <div>
              <Label htmlFor="datePicker">Fecha de disposición</Label>
              <div className="relative">
                <Input
                  type="date"
                  id="datePicker"
                  name="datePicker"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="block w-full pr-10" // Añadimos clases para el calendario
                  placeholder="Seleccione una fecha"
                />
                {/* Icono personalizado que activa el datepicker */}
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  onClick={() => document.getElementById('datePicker')?.showPicker()}
                >
                  <CalenderIcon />
                </button>
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                min="0"
                step="100"
                placeholder="Ej: 10000"
              />
            </div>

            {/* Selector Forma de Pago */}
            <div>
              <Label>Forma de Pago</Label>
              <div className="relative">
                <Select
                  options={PAYMENT_OPTIONS}
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
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
                  options={INTEREST_RATES}
                  name="interestRate"
                  value={formData.interestRate}
                  onChange={handleInputChange}
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

      {/* Sección de Amortización */}
      <div className="col-span-1">
        <ComponentCard 
          title="Amortización de créditos"  // Corregido typo "Amorizacion"
          className="font-medium"
        >
          {/* Pasar datos al componente Table */}
          <Table data={generateAmortizationTable(formData)} /> {/* Deberías implementar esta función */}
        </ComponentCard>
      </div>
    </div>
  );
}

// Función de ejemplo para generar datos de amortización
const generateAmortizationTable = (formData) => {
  // Implementar lógica real basada en los datos del formulario
  return [
    // Datos de ejemplo
    { cuota: 1, monto: 1000, interes: 50, total: 1050 },
    { cuota: 2, monto: 1000, interes: 45, total: 1045 }
  ];
};
// import React, { useState } from "react";
// import ComponentCard from "../../common/ComponentCard";
// import Label from "../Label";
// import Input from "../input/InputField";
// import Select from "../Select";
// import Button from "../../ui/button/Button";
// import { useModal } from "../../../hooks/useModal";
// import Table from "@/components/tables/BasicTableOne";
// import { CalenderIcon, ChevronDownIcon, EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";

// export default function DefaultInputs() {
//   // Data

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const options = [
//     { value: "Mensual", label: "Mensual" },
//     { value: "Trimestral", label: "Trimestral" },
//     { value: "Semestral", label: "Semestral" },
//     { value: "Único, al vencimiento", label: "Único, al vencimiento" },
//   ];
//   const { isOpen, openModal, closeModal } = useModal();
//   const handleSave = () => {
//     // Handle save logic here
//     console.log("Saving changes...");
//     closeModal();
//   };

//   const options2 = [
//     { value: "0", label: "0%" },
//     { value: "1.8", label: "1.8%" }
//   ]

//   const handleSelectChange = (value: string) => {
//     console.log("Selected value:", value);
//   };
//   return (
//     <div className="flex flex-col-reverse grid grid-cols-2 gap-4 w-full">
//       <div className="col-span-1">
//       <ComponentCard title="Simulador de créditos" >
//         <div className="space-y-6">
//           <div>
//             <Label htmlFor="datePicker">Fecha de disposición</Label>
//             <div className="relative">
//               <Input
//                 type="date"
//                 id="datePicker"
//                 name="datePicker"
//                 onChange={(e) => console.log(e.target.value)} />
//               <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
//                 <CalenderIcon />
//               </span>
//             </div>
//           </div>

//           <div>
//             <Label>Línea del Crédito</Label>
//             <Input type="text" />
//           </div>
//           <div>
//             <Label>Monto del Crédito</Label>
//             <Input type="number" />
//           </div>
//           <div>
//             <Label>Forma de Pago</Label>
//             <div className="relative">
//               <Select
//                 options={options}
//                 placeholder="Seleccione una opción"
//                 onChange={handleSelectChange}
//                 className="dark:bg-dark-900" />
//               <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
//                 <ChevronDownIcon />
//               </span>
//             </div>
//           </div>

//           <div>
//             <Label>Tasa de Interés</Label>
//             <div className="relative">
//               <Select
//                 options={options2}
//                 placeholder="Seleccione una opción"
//                 onChange={handleSelectChange}
//                 className="dark:bg-dark-900" />
//               <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
//                 <ChevronDownIcon />
//               </span>
//             </div>
//           </div>
//           <div className="flex flex-col-reverse gap-3 px-2 mt-6 lg:justify-end">
//             <Button size="sm" variant="outline" onClick={closeModal}>
//               Cancelar
//             </Button>
//             <Button size="sm" onClick={handleSave}>
//               Simular
//             </Button>
//           </div>
//         </div>
//         </ComponentCard>
//         </div>
//         <div className="col-span-1">
//           <ComponentCard title="Amorizacion de créditos" className="font-medium">
//             <Table />
//           </ComponentCard>
//         </div>
//       </div>
//   );
// }

