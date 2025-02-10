import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { DASHBOARD_TABS } from "../constants/data.js";
import CreateProductForm from "../components/CreateProductForm.jsx";
import ProductLists from "../components/ProductLists.jsx";
import AnalyticsTab from "../components/AnalyticsTab.jsx";
import { useProductStore } from "../store/useProductStore.js";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("create");

  const { fetchAllProducts, products } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <main className="w-full h-full mx-auto py-12">
      <div className="w-full container px-5 flex flex-col items-center mx-auto">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl sm:text-5xl text-emerald-500 font-bold">
            Admin Dashboard
          </h1>

          <div className="flex items-center justify-center gap-5 mt-10">
            {DASHBOARD_TABS.map((item) => (
              <div
                key={item.id}
                className={`px-5 py-2 rounded-md text-white flex items-center gap-2 cursor-pointer transition-all duration-300   
                            ${
                              activeTab === item.id
                                ? "bg-emerald-600"
                                : "bg-gray-700 hover:bg-gray-600"
                            }`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="size-4 text-gray-300" />
                <p className="hidden sm:block text-gray-300 text-md font-medium">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="w-full h-full mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {activeTab === "create" && <CreateProductForm />}
          {activeTab === "products" && <ProductLists products={products} />}
          {activeTab === "analytics" && <AnalyticsTab />}
        </motion.div>
      </div>
    </main>
  );
};

export default DashboardPage;
