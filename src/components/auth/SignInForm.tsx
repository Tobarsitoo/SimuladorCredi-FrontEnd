"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import Link from "next/link";

export default function SignInForm() {
  const [cedula, setCedula] = useState("");
  const [fechaExp, setFechaExp] = useState("");
  const [fechaNa, setFechaNa] = useState("");
  const router = useRouter();

  // Función para formatear la fecha a YYYYMMDD sin guiones
  const formatFecha = (fecha: string): number => {
    return parseInt(fecha.replace(/-/g, ""), 10);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación de campos
    if (!cedula || !fechaExp || !fechaNa) {
      Swal.fire("Error", "Todos los campos son obligatorios.", "error");
      return;
    }

    console.log('Fecha Expedicion:', formatFecha(fechaExp));
    console.log('Fecha Nacimiento:', formatFecha(fechaNa));
    
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cedula,
          fechaExp: formatFecha(fechaExp),
          fechaNa: formatFecha(fechaNa),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error en la autenticación");

      // Guardar token en localStorage
      localStorage.setItem("token", data.token);

      // Mostrar alerta de éxito y redirigir
      Swal.fire({
        title: "¡Bienvenido!",
        text: "Inicio de sesión exitoso",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => router.push("/"));
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md flex items-center">
              Simulador de créditos
              <Image width={80} height={5} src="/images/logo/icono-blancof.png" alt="Logo" className="ml-2" />
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingresa tu información para ingresar al simulador de créditos de Coopserp.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>Cédula <span className="text-error-500">*</span></Label>
                  <Input
                    placeholder="Sin puntos, guiones ni comas (00000000)"
                    type="number"
                    name="cedula"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Fecha Expedición <span className="text-error-500">*</span></Label>
                  <Input
                    type="date"
                    name="fechaExp"
                    value={fechaExp}
                    onChange={(e) => setFechaExp(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Fecha Nacimiento <span className="text-error-500">*</span></Label>
                  <Input
                    type="date"
                    name="fechaNa"
                    value={fechaNa}
                    onChange={(e) => setFechaNa(e.target.value)}
                  />
                </div>
                <div>
                  <Button className="w-full" size="sm" type="submit">Iniciar Sesión</Button>
                </div>
              </div>
            </form>
            <div className="mt-5">
              <p className="text-sm text-gray-700 dark:text-gray-400 text-center">
                ¿Deseas realizar un crédito?{" "}
                <Link href="/signup" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                  Iniciar Sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
