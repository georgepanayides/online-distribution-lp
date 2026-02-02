"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, 
  Truck, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Search,
  BarChart3,
  MapPin,
  ArrowUpRight
} from "lucide-react";

// Mock Data
const INVENTORY_ITEMS = [
  { name: "Wireless Headphones X1", stock: 1240, status: "Healthy" },
  { name: "Smart Watch Series 4", stock: 85, status: "Low Stock" },
  { name: "Bluetooth Speaker Mini", stock: 432, status: "Healthy" },
];

const RECENT_ORDERS = [
  { id: "#ORD-7782", dest: "Auckland, NZ", time: "2m ago", status: "Processing" },
  { id: "#ORD-7781", dest: "Wellington, NZ", time: "15m ago", status: "Shipped" },
  { id: "#ORD-7780", dest: "Christchurch, NZ", time: "42m ago", status: "Shipped" },
  { id: "#ORD-7779", dest: "Hamilton, NZ", time: "1h ago", status: "Delivered" },
];

export function ClientPortalDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  // Simulated live feed effect
  const [orders, setOrders] = useState(RECENT_ORDERS);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate a new order coming in every few seconds
      const cities = ["Dunedin, NZ", "Tauranga, NZ", "Napier, NZ", "Queenstown, NZ"];
      const rCity = cities[Math.floor(Math.random() * cities.length)];
      const newOrder = {
        id: `#ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        dest: rCity,
        time: "Just now",
        status: "Processing",
      };

      setOrders((prev) => [newOrder, ...prev.slice(0, 3)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto perspective-1000">
      <motion.div
        initial={{ rotateX: 5, y: 40, opacity: 0 }}
        whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
        className="w-full bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col min-h-[600px]"
      >
        {/* Top Navigation Bar (Mock Browser/App Header) */}
        <div className="h-14 border-b border-gray-100 bg-gray-50 flex items-center px-6 justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <div className="ml-6 flex items-center gap-2 text-xs font-medium text-gray-500 bg-white px-3 py-1.5 rounded-md border border-gray-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                portal.onlinedistribution.com
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="h-8 w-8 rounded-full bg-od-mid-blue/10 flex items-center justify-center text-od-mid-blue">
                <span className="font-bold text-xs">OD</span>
             </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-slate-50 border-r border-gray-100 hidden md:block p-4">
                <div className="space-y-1">
                    {["Overview", "Inventory", "Orders", "Reporting", "Integrations"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                activeTab === item 
                                ? "bg-white text-od-dark-blue shadow-sm border border-gray-100" 
                                : "text-gray-500 hover:text-od-mid-blue hover:bg-gray-100/50"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="mt-8 px-3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">System Health</p>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>API Status</span>
                            <span className="text-green-600 font-bold">Operational</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>Sync Rate</span>
                            <span className="text-od-mid-blue font-bold">99.9%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 bg-[#F8FAFC] p-6 lg:p-8 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-od-dark-blue font-sans">Dashboard</h3>
                        <p className="text-gray-500 text-sm">Real-time overview of your logistics operations.</p>
                    </div>
                    <button className="bg-od-dark-blue text-white px-4 py-2 rounded-md text-sm font-medium shadow-lg shadow-od-dark-blue/20 hover:bg-od-mid-blue transition-colors flex items-center gap-2">
                        <ArrowUpRight size={16} /> Export Report
                    </button>
                </div>

                {/* Widgets Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Widget 1: Live Activity Feed */}
                    <div className="col-span-1 lg:col-span-2 bg-white rounded-xl border border-gray-200/60 shadow-sm p-6 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="font-bold text-gray-700 flex items-center gap-2">
                                <Clock size={18} className="text-od-mid-blue" /> Live Order Stream
                            </h4>
                            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100 font-medium">Live</span>
                        </div>
                        <div className="space-y-0">
                            <AnimatePresence initial={false}>
                                {orders.map((order) => (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, height: 0, y: -20 }}
                                        animate={{ opacity: 1, height: "auto", y: 0 }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-slate-50 px-2 -mx-2 rounded-md"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-full ${order.status === 'Processing' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-od-mid-blue'}`}>
                                                <Package size={16} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">{order.id}</p>
                                                <p className="text-xs text-gray-500">{order.dest}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-400 font-mono">{order.time}</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                                order.status === 'Processing' ? 'bg-amber-100 text-amber-700' :
                                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Widget 2: Quick Inventory Stats */}
                    <div className="col-span-1 bg-white rounded-xl border border-gray-200/60 shadow-sm p-6">
                        <h4 className="font-bold text-gray-700 flex items-center gap-2 mb-6">
                            <BarChart3 size={18} className="text-od-mid-blue" /> Stock Alerts
                        </h4>
                        <div className="space-y-4">
                            {INVENTORY_ITEMS.map((item, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-gray-700">{item.name}</span>
                                        <span className={`text-xs font-bold ${item.status === 'Low Stock' ? 'text-red-500' : 'text-green-600'}`}>
                                            {item.stock} units
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div 
                                            className={`h-full rounded-full ${item.status === 'Low Stock' ? 'bg-red-500' : 'bg-od-mid-blue'}`}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: item.status === 'Low Stock' ? '15%' : '80%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-50">
                            <button className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:text-od-mid-blue transition-colors rounded-md hover:bg-gray-50">
                                View Full Inventory
                            </button>
                        </div>
                    </div>

                     {/* Widget 3: Map / Network View (Abstract) */}
                     <div className="col-span-1 lg:col-span-3 bg-od-dark-blue rounded-xl border border-od-dark-blue shadow-lg p-0 relative overflow-hidden h-40 group">
                         {/* Background Pattern */}
                         <div className="absolute inset-0 opacity-10" 
                              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} 
                         />
                         
                         <div className="relative z-10 p-6 flex items-center justify-between h-full">
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Network Active</h4>
                                <p className="text-od-moon-blue text-sm text-gray-300">Tracking 1,240 active shipments across NZ & AU.</p>
                            </div>
                            <div className="flex -space-x-3">
                                {[1,2,3,4].map((n) => (
                                    <div key={n} className="w-10 h-10 rounded-full border-2 border-od-dark-blue bg-gray-200 flex items-center justify-center text-xs font-bold text-od-dark-blue relative z-10">
                                        <Truck size={16} />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-od-dark-blue bg-od-bright-blue flex items-center justify-center text-xs font-bold text-white relative z-20">
                                    +1k
                                </div>
                            </div>
                         </div>
                         
                         {/* Animated overlay graphic */}
                         <motion.div 
                             className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-od-bright-blue/20 to-transparent"
                             animate={{ x: ["100%", "-100%"] }}
                             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                         />
                     </div>

                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
