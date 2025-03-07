"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Image from "next/image";
import Link from "next/link";

export default function SignInForm() {
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md flex items-center">
              Simulador de créditos
              <Image
                width={80}
                height={5}
                src="/images/logo/icono-blancof.png"
                alt="Logo"
                className="ml-2"
              />
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingresa tu información para ingresar al simulador de créditos de Coopserp.
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-6">
                <div>
                  <Label>Cédula <span className="text-error-500">*</span></Label>
                  <Input placeholder="Sin puntos, guiones ni comas (00000000)" type="number" />
                </div>
                <div>
                  <Label>Fecha Expedición <span className="text-error-500">*</span></Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Fecha Nacimiento <span className="text-error-500">*</span></Label>
                  <Input type="date" />
                </div>
                <div>
                  <Link href="/" className="block mb-4">
                    <Button className="w-full" size="sm">Iniciar Sesión</Button>
                  </Link>
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
