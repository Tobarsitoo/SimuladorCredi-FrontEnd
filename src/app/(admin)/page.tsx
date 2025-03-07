import type { Metadata } from "next";
import React from "react";
// import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
// import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
// import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "@/components/ecommerce/StatisticsChart";
// import RecentOrders from "@/components/ecommerce/RecentOrders";
// import DemographicCard from "@/components/ecommerce/DemographicCard";
import DefaultInputs from "@/components/simluador-creditos/formulario/Inputs";

export const metadata: Metadata = {
  title:
    "Créditos COOPSERP",
  description: "Este es el simulador de créditos de COOPSERP",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-7 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <DefaultInputs />
        {/* <EcommerceMetrics />
        <MonthlySalesChart /> */}
      </div>

      {/* <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div> */}

      {/* <div className="col-span-12">
        <StatisticsChart />
      </div> */}

      {/* <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div> */}

      {/* <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div> */}
    </div>
  );
}
