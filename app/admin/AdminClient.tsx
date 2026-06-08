"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Car, Users, Package, BookOpen, BarChart2,
  TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle, ArrowRight,
  Search, Filter, Plus, X, Star, Calendar, CreditCard, ChevronRight,
  Mail, Phone, ShieldCheck, MapPin, Download, Loader2, Sparkles, Trash2, Check, ExternalLink
} from "lucide-react";

// --- CUSTOM INTERACTIVE TOAST ---
interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

// --- DATA SCHEMAS & INITIAL MOCK DATA ---
interface Driver {
  id: string;
  name: string;
  phone: string;
  license: string;
  rating: number;
  status: "Active" | "On Trip" | "Off Duty";
  trips: number;
  avatarGradient: string;
}

interface Vehicle {
  id: string;
  model: string;
  type: "SUV" | "Sedan" | "Tempo" | "Mini Bus";
  plateNumber: string;
  capacity: number;
  ratePerDay: number;
  status: "Available" | "On Trip" | "Maintenance";
  trips: number;
  rating: number;
}

interface TourPackage {
  id: string;
  name: string;
  duration: string;
  price: number;
  bookingsCount: number;
  rating: number;
  description: string;
  tags: string[];
}

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  route: string;
  vehicleId: string;
  driverId: string;
  status: "Pending" | "Confirmed" | "In Progress" | "Completed" | "Cancelled";
  amount: number;
  date: string;
  passengers: number;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookingsCount: number;
  totalSpent: number;
  status: "Active" | "Elite" | "Inactive" | "New";
  lastActive: string;
}

const INITIAL_DRIVERS: Driver[] = [
  { id: "D1", name: "Rajan K.", phone: "+91 98450 12345", license: "DL-43-20180092", rating: 4.8, status: "Active", trips: 142, avatarGradient: "from-[#00D26A] to-emerald-600" },
  { id: "D2", name: "Murugan S.", phone: "+91 94432 87654", license: "DL-43-20150041", rating: 4.9, status: "On Trip", trips: 289, avatarGradient: "from-blue-500 to-indigo-600" },
  { id: "D3", name: "Kumar P.", phone: "+91 98940 54321", license: "DL-43-20200088", rating: 4.7, status: "Active", trips: 96, avatarGradient: "from-violet-500 to-purple-600" },
  { id: "D4", name: "Selvam R.", phone: "+91 97890 11223", license: "DL-43-20170023", rating: 4.6, status: "Active", trips: 178, avatarGradient: "from-amber-500 to-orange-500" },
  { id: "D5", name: "Gopal M.", phone: "+91 96211 44556", license: "DL-43-20220115", rating: 4.5, status: "Off Duty", trips: 34, avatarGradient: "from-rose-500 to-pink-500" },
];

const INITIAL_VEHICLES: Vehicle[] = [
  { id: "V1", model: "Toyota Innova Crysta", type: "SUV", plateNumber: "TN-43-A-7788", capacity: 7, ratePerDay: 4500, status: "Available", trips: 184, rating: 4.9 },
  { id: "V2", model: "Force Tempo Traveller", type: "Tempo", plateNumber: "TN-43-B-1122", capacity: 12, ratePerDay: 7500, status: "On Trip", trips: 312, rating: 4.8 },
  { id: "V3", model: "Maruti Suzuki Ertiga", type: "SUV", plateNumber: "TN-43-A-4455", capacity: 6, ratePerDay: 3500, status: "Available", trips: 92, rating: 4.6 },
  { id: "V4", model: "Hyundai Verna", type: "Sedan", plateNumber: "TN-43-C-3300", capacity: 4, ratePerDay: 2800, status: "Available", trips: 148, rating: 4.7 },
  { id: "V5", model: "Mahindra Scorpio-N", type: "SUV", plateNumber: "TN-43-A-9900", capacity: 7, ratePerDay: 5000, status: "Maintenance", trips: 56, rating: 4.8 },
];

const INITIAL_PACKAGES: TourPackage[] = [
  { id: "P1", name: "Ooty Heritage & Lake Tour", duration: "1 Day", price: 2500, bookingsCount: 143, rating: 4.8, description: "Explore the historic Stone House, Botanical Gardens, Ooty Lake boat ride, and Doddabetta Peak view.", tags: ["Sightseeing", "Nature", "Heritage"] },
  { id: "P2", name: "Coonoor Tea Gardens Trail", duration: "1 Day", price: 2800, bookingsCount: 98, rating: 4.9, description: "Wander through lush tea plantations, visit Sim's Park, Dolphin's Nose point, and ride the Nilgiri Mountain Railway.", tags: ["Tea Tour", "Scenic", "Railway"] },
  { id: "P3", name: "Mudumalai Wildlife Safari", duration: "2 Days, 1 Night", price: 5999, bookingsCount: 64, rating: 4.7, description: "Experience deep jungle jeep safaris, elephant camp feeding, and forest cottage stays in Mudumalai sanctuary.", tags: ["Adventure", "Wildlife", "Forest Stay"] },
  { id: "P4", name: "Avalanche Lake Wilderness Tour", duration: "1 Day", price: 3200, bookingsCount: 77, rating: 4.9, description: "Eco-tourism path inside restricted shola forests, crystal clear Avalanche Lake, and trout hatchery visit.", tags: ["Eco-Tourism", "Lakes", "Off-Road"] },
];

const INITIAL_BOOKINGS: Booking[] = [
  { id: "NE2026089", customerName: "Arjun Sharma", customerEmail: "arjun@gmail.com", customerPhone: "+91 99887 76655", route: "Ooty → Doddabetta", vehicleId: "V1", driverId: "D1", status: "Confirmed", amount: 4500, date: "2026-05-30", passengers: 5 },
  { id: "NE2026088", customerName: "Sarah Mitchell", customerEmail: "sarah.m@yahoo.com", customerPhone: "+44 7911 123456", route: "Coimbatore → Ooty", vehicleId: "V2", driverId: "D2", status: "In Progress", amount: 7500, date: "2026-05-29", passengers: 10 },
  { id: "NE2026087", customerName: "Rajesh V.", customerEmail: "rajeshv@gmail.com", customerPhone: "+91 94441 22334", route: "Mudumalai Wildlife Safari", vehicleId: "V1", driverId: "D3", status: "Completed", amount: 5999, date: "2026-05-28", passengers: 3 },
  { id: "NE2026086", customerName: "Meera Nair", customerEmail: "meera.nair@outlook.com", customerPhone: "+91 91760 99887", route: "Ooty Airport Transfer", vehicleId: "V4", driverId: "D4", status: "Completed", amount: 2800, date: "2026-05-27", passengers: 2 },
  { id: "NE2026085", customerName: "Priya K.", customerEmail: "priya.k@gmail.com", customerPhone: "+91 98401 55667", route: "Avalanche Lake Wilderness Tour", vehicleId: "V3", driverId: "D5", status: "Pending", amount: 3200, date: "2026-06-02", passengers: 4 },
];

const INITIAL_CUSTOMERS: Customer[] = [
  { id: "C1", name: "Arjun Sharma", email: "arjun@gmail.com", phone: "+91 99887 76655", bookingsCount: 4, totalSpent: 16500, status: "Active", lastActive: "2026-05-29" },
  { id: "C2", name: "Sarah Mitchell", email: "sarah.m@yahoo.com", phone: "+44 7911 123456", bookingsCount: 1, totalSpent: 7500, status: "New", lastActive: "2026-05-29" },
  { id: "C3", name: "Rajesh V.", email: "rajeshv@gmail.com", phone: "+91 94441 22334", bookingsCount: 8, totalSpent: 38400, status: "Elite", lastActive: "2026-05-28" },
  { id: "C4", name: "Meera Nair", email: "meera.nair@outlook.com", phone: "+91 91760 99887", bookingsCount: 3, totalSpent: 9200, status: "Active", lastActive: "2026-05-27" },
  { id: "C5", name: "Priya K.", email: "priya.k@gmail.com", phone: "+91 98401 55667", bookingsCount: 2, totalSpent: 6400, status: "Active", lastActive: "2026-05-25" },
];

const statusColors: Record<string, string> = {
  Confirmed: "bg-[#00D26A]/15 text-[#00D26A] border-[#00D26A]/25",
  "In Progress": "bg-blue-500/15 text-blue-400 border-blue-500/25",
  Completed: "bg-white/10 text-white/70 border-white/15",
  Pending: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  Cancelled: "bg-rose-500/15 text-rose-400 border-rose-500/25",
};

export default function AdminClient() {
  const [activeSection, setActiveSection] = useState("Overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // --- SIMULATED DATABASE STATE ---
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [packages, setPackages] = useState<TourPackage[]>(INITIAL_PACKAGES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);

  // --- TOAST STATE ---
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // --- MODALS ENGINE ---
  const [activeModal, setActiveModal] = useState<"newBooking" | "addDriver" | "addVehicle" | "addPackage" | "bookingDetails" | "promoEmail" | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [selectedPromoCustomer, setSelectedPromoCustomer] = useState<Customer | null>(null);

  // --- SEARCH & FILTER STATS ---
  const [bookingsSearch, setBookingsSearch] = useState("");
  const [bookingsFilter, setBookingsFilter] = useState("All");

  const [vehiclesSearch, setVehiclesSearch] = useState("");
  const [vehiclesFilter, setVehiclesFilter] = useState("All");

  const [driversSearch, setDriversSearch] = useState("");
  const [driversFilter, setDriversFilter] = useState("All");

  const [packagesSearch, setPackagesSearch] = useState("");

  const [customersSearch, setCustomersSearch] = useState("");

  // --- FORM STATES ---
  // New Booking
  const [formBookingCustomer, setFormBookingCustomer] = useState("");
  const [formBookingEmail, setFormBookingEmail] = useState("");
  const [formBookingPhone, setFormBookingPhone] = useState("");
  const [formBookingRoute, setFormBookingRoute] = useState("");
  const [formBookingVehicle, setFormBookingVehicle] = useState("");
  const [formBookingDriver, setFormBookingDriver] = useState("");
  const [formBookingDate, setFormBookingDate] = useState("");
  const [formBookingPassengers, setFormBookingPassengers] = useState(2);

  // New Driver
  const [formDriverName, setFormDriverName] = useState("");
  const [formDriverPhone, setFormDriverPhone] = useState("");
  const [formDriverLicense, setFormDriverLicense] = useState("");

  // New Vehicle
  const [formVehicleModel, setFormVehicleModel] = useState("");
  const [formVehicleType, setFormVehicleType] = useState<"SUV" | "Sedan" | "Tempo" | "Mini Bus">("SUV");
  const [formVehiclePlate, setFormVehiclePlate] = useState("");
  const [formVehicleCapacity, setFormVehicleCapacity] = useState(7);
  const [formVehicleRate, setFormVehicleRate] = useState(4000);

  // New Package
  const [formPackageName, setFormPackageName] = useState("");
  const [formPackageDuration, setFormPackageDuration] = useState("");
  const [formPackagePrice, setFormPackagePrice] = useState(2000);
  const [formPackageDesc, setFormPackageDesc] = useState("");
  const [formPackageTags, setFormPackageTags] = useState("");

  // --- REPORT EXPORT LOADER ---
  const [exportStep, setExportStep] = useState(0); // 0 = idle, 1 = gathering, 2 = building, 3 = complete

  // --- DERIVED METRICS ---
  const metrics = useMemo(() => {
    const totalRev = bookings
      .filter((b) => b.status === "Completed" || b.status === "Confirmed" || b.status === "In Progress")
      .reduce((sum, b) => sum + b.amount, 0);

    const pendingCount = bookings.filter((b) => b.status === "Pending").length;
    const activeDrv = drivers.filter((d) => d.status !== "Off Duty").length;
    const activeVeh = vehicles.filter((v) => v.status === "On Trip").length;

    return {
      revenue: `₹${(totalRev / 1000).toFixed(1)}k`,
      bookingsThisMonth: bookings.filter((b) => b.status !== "Cancelled").length,
      activeDrivers: `${activeDrv}/${drivers.length}`,
      pendingBookings: pendingCount,
    };
  }, [bookings, drivers, vehicles]);

  // --- CHART LOGIC (MAIN INTERACTIVE REVENUE / BOOKINGS CHART) ---
  const [chartSeries, setChartSeries] = useState<"Revenue" | "Bookings">("Revenue");
  const [hoveredChartIndex, setHoveredChartIndex] = useState<number | null>(null);

  const chartData = useMemo(() => {
    // Generate data based on bookings list
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const baseRevenue = [80000, 110000, 95000, 140000, 185000];
    const baseBookings = [28, 42, 35, 50, 68];

    // Jun values derived dynamically from completed/confirmed bookings in simulated state
    const currentJunRevenue = bookings
      .filter((b) => b.status !== "Cancelled" && b.status !== "Pending")
      .reduce((sum, b) => sum + b.amount, 0);
    const currentJunBookings = bookings.filter((b) => b.status !== "Cancelled").length;

    const finalRevenue = [...baseRevenue, currentJunRevenue];
    const finalBookings = [...baseBookings, currentJunBookings];

    return months.map((month, i) => ({
      label: month,
      Revenue: finalRevenue[i],
      Bookings: finalBookings[i],
    }));
  }, [bookings]);

  // Handle auto-population of rate on manual booking
  useEffect(() => {
    if (formBookingVehicle) {
      const selected = vehicles.find((v) => v.id === formBookingVehicle);
      if (selected) {
        // Set estimated amount (rate/day)
        // Adjust for tour duration if available, else standard rate
      }
    }
  }, [formBookingVehicle, vehicles]);

  // --- WORKFLOW SUBMISSIONS ---
  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formBookingCustomer || !formBookingRoute || !formBookingVehicle || !formBookingDriver) {
      addToast("Please fill all required booking details", "error");
      return;
    }

    const selectedVeh = vehicles.find((v) => v.id === formBookingVehicle);
    const selectedDrv = drivers.find((d) => d.id === formBookingDriver);

    if (!selectedVeh || !selectedDrv) return;

    // Generate automatic booking ID
    const newId = `NE2026${Math.floor(100 + Math.random() * 900)}`;

    const newBooking: Booking = {
      id: newId,
      customerName: formBookingCustomer,
      customerEmail: formBookingEmail || `${formBookingCustomer.toLowerCase().replace(/ /g, "")}@gmail.com`,
      customerPhone: formBookingPhone || "+91 99999 88888",
      route: formBookingRoute,
      vehicleId: formBookingVehicle,
      driverId: formBookingDriver,
      status: "Confirmed",
      amount: selectedVeh.ratePerDay,
      date: formBookingDate || new Date().toISOString().split("T")[0],
      passengers: formBookingPassengers,
    };

    // Update Driver & Vehicle to "On Trip"
    setDrivers((prev) =>
      prev.map((d) => (d.id === formBookingDriver ? { ...d, status: "On Trip", trips: d.trips + 1 } : d))
    );
    setVehicles((prev) =>
      prev.map((v) => (v.id === formBookingVehicle ? { ...v, status: "On Trip", trips: v.trips + 1 } : v))
    );

    // Update Customers (Add new or update booking counts)
    const existingCust = customers.find((c) => c.name.toLowerCase() === formBookingCustomer.toLowerCase());
    if (existingCust) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === existingCust.id
            ? { ...c, bookingsCount: c.bookingsCount + 1, totalSpent: c.totalSpent + selectedVeh.ratePerDay, lastActive: new Date().toISOString().split("T")[0] }
            : c
        )
      );
    } else {
      const newCustId = `C${customers.length + 1}`;
      const newCust: Customer = {
        id: newCustId,
        name: formBookingCustomer,
        email: formBookingEmail || `${formBookingCustomer.toLowerCase().replace(/ /g, "")}@gmail.com`,
        phone: formBookingPhone || "+91 99999 88888",
        bookingsCount: 1,
        totalSpent: selectedVeh.ratePerDay,
        status: "New",
        lastActive: new Date().toISOString().split("T")[0],
      };
      setCustomers((prev) => [...prev, newCust]);
    }

    setBookings((prev) => [newBooking, ...prev]);
    setActiveModal(null);
    addToast(`Manual Booking ${newId} created & driver allocated!`, "success");

    // Clear form
    setFormBookingCustomer("");
    setFormBookingEmail("");
    setFormBookingPhone("");
    setFormBookingRoute("");
    setFormBookingVehicle("");
    setFormBookingDriver("");
    setFormBookingDate("");
    setFormBookingPassengers(2);
  };

  const handleAddDriver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDriverName || !formDriverPhone || !formDriverLicense) {
      addToast("Please input all driver details", "error");
      return;
    }

    const newId = `D${drivers.length + 1}`;
    const gradients = [
      "from-[#00D26A] to-emerald-600",
      "from-blue-500 to-indigo-600",
      "from-violet-500 to-purple-600",
      "from-amber-500 to-orange-500",
      "from-rose-500 to-pink-500",
    ];
    const randomGrad = gradients[Math.floor(Math.random() * gradients.length)];

    const newDriver: Driver = {
      id: newId,
      name: formDriverName,
      phone: formDriverPhone,
      license: formDriverLicense,
      rating: 5.0,
      status: "Active",
      trips: 0,
      avatarGradient: randomGrad,
    };

    setDrivers((prev) => [...prev, newDriver]);
    setActiveModal(null);
    addToast(`Driver ${formDriverName} successfully onboarded!`, "success");

    setFormDriverName("");
    setFormDriverPhone("");
    setFormDriverLicense("");
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formVehicleModel || !formVehiclePlate) {
      addToast("Please fill all required fleet specifications", "error");
      return;
    }

    const newId = `V${vehicles.length + 1}`;
    const newVehicle: Vehicle = {
      id: newId,
      model: formVehicleModel,
      type: formVehicleType,
      plateNumber: formVehiclePlate,
      capacity: formVehicleCapacity,
      ratePerDay: formVehicleRate,
      status: "Available",
      trips: 0,
      rating: 5.0,
    };

    setVehicles((prev) => [...prev, newVehicle]);
    setActiveModal(null);
    addToast(`${formVehicleModel} registered successfully!`, "success");

    setFormVehicleModel("");
    setFormVehiclePlate("");
    setFormVehicleCapacity(7);
    setFormVehicleRate(4000);
  };

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPackageName || !formPackageDuration || !formPackagePrice) {
      addToast("Please complete the tour specifications", "error");
      return;
    }

    const newId = `P${packages.length + 1}`;
    const tagArray = formPackageTags
      ? formPackageTags.split(",").map((t) => t.trim())
      : ["Nature", "Trek"];

    const newPkg: TourPackage = {
      id: newId,
      name: formPackageName,
      duration: formPackageDuration,
      price: Number(formPackagePrice),
      bookingsCount: 0,
      rating: 5.0,
      description: formPackageDesc || "Guided custom tour across the picturesque landscapes of Nilgiris.",
      tags: tagArray,
    };

    setPackages((prev) => [...prev, newPkg]);
    setActiveModal(null);
    addToast(`Tour Package "${formPackageName}" launched!`, "success");

    setFormPackageName("");
    setFormPackageDuration("");
    setFormPackagePrice(2000);
    setFormPackageDesc("");
    setFormPackageTags("");
  };

  const handleBookingAction = (id: string, action: "Confirm" | "Start Trip" | "Complete" | "Cancel") => {
    let nextStatus: Booking["status"] = "Pending";
    let toastMsg = "";

    if (action === "Confirm") {
      nextStatus = "Confirmed";
      toastMsg = `Booking ${id} approved & confirmed.`;
    } else if (action === "Start Trip") {
      nextStatus = "In Progress";
      toastMsg = `Trip ${id} is now ongoing.`;
    } else if (action === "Complete") {
      nextStatus = "Completed";
      toastMsg = `Trip ${id} has successfully finished.`;
    } else if (action === "Cancel") {
      nextStatus = "Cancelled";
      toastMsg = `Booking ${id} has been cancelled.`;
    }

    // Capture booking resources to release on completion / cancellation
    const booking = bookings.find((b) => b.id === id);
    if (!booking) return;

    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: nextStatus } : b))
    );

    // Dynamic driver & vehicle statuses updates
    if (nextStatus === "Completed" || nextStatus === "Cancelled") {
      setDrivers((prev) =>
        prev.map((d) => (d.id === booking.driverId ? { ...d, status: "Active" } : d))
      );
      setVehicles((prev) =>
        prev.map((v) => (v.id === booking.vehicleId ? { ...v, status: "Available" } : v))
      );
    } else if (nextStatus === "In Progress") {
      setDrivers((prev) =>
        prev.map((d) => (d.id === booking.driverId ? { ...d, status: "On Trip" } : d))
      );
      setVehicles((prev) =>
        prev.map((v) => (v.id === booking.vehicleId ? { ...v, status: "On Trip" } : v))
      );
    }

    addToast(toastMsg, action === "Cancel" ? "error" : "success");
  };

  const handleSimulatePromo = (cust: Customer) => {
    setSelectedPromoCustomer(cust);
    setActiveModal("promoEmail");

    // Trigger multi-stage email mockup
    setTimeout(() => {
      setActiveModal(null);
      addToast(`Promotional code "NILGIRIS15" emailed to ${cust.name}!`, "success");
    }, 2800);
  };

  const triggerExport = () => {
    setExportStep(1);
    setTimeout(() => {
      setExportStep(2);
      setTimeout(() => {
        setExportStep(3);
        setTimeout(() => {
          setExportStep(0);
          addToast("Analytical report exported successfully! Check downloads folder.", "success");
        }, 1500);
      }, 1500);
    }, 1500);
  };

  // --- SEARCH / FILTER IMPLEMENTATIONS ---
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(bookingsSearch.toLowerCase()) ||
      b.route.toLowerCase().includes(bookingsSearch.toLowerCase()) ||
      b.id.toLowerCase().includes(bookingsSearch.toLowerCase());
    const matchesFilter = bookingsFilter === "All" || b.status === bookingsFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.model.toLowerCase().includes(vehiclesSearch.toLowerCase()) ||
      v.plateNumber.toLowerCase().includes(vehiclesSearch.toLowerCase());
    const matchesFilter = vehiclesFilter === "All" || v.status === vehiclesFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredDrivers = drivers.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(driversSearch.toLowerCase()) ||
      d.license.toLowerCase().includes(driversSearch.toLowerCase());
    const matchesFilter = driversFilter === "All" || d.status === driversFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredPackages = packages.filter((p) =>
    p.name.toLowerCase().includes(packagesSearch.toLowerCase()) ||
    p.description.toLowerCase().includes(packagesSearch.toLowerCase())
  );

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(customersSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(customersSearch.toLowerCase())
  );

  // Sparkline coordinates helper
  const getSparklinePath = (points: number[]) => {
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;
    const width = 100;
    const height = 30;

    return points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - ((p - min) / range) * (height - 4) - 2;
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  };

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen pt-20 flex bg-[#071410] text-slate-100 overflow-x-hidden selection:bg-brand-500/30 selection:text-white">
      {/* Toast Notification Container */}
      <div className="fixed top-24 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              className={`p-4 rounded-xl glass border shadow-2xl flex items-center gap-3 w-80 pointer-events-auto ${
                t.type === "success"
                  ? "border-[#00D26A]/30 bg-[#00D26A]/10 text-emerald-400"
                  : t.type === "error"
                  ? "border-rose-500/30 bg-rose-500/10 text-rose-400"
                  : "border-blue-500/30 bg-blue-500/10 text-blue-400"
              }`}
            >
              {t.type === "success" ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : t.type === "error" ? (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <Sparkles className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="text-sm font-medium text-white">{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className={`fixed top-20 left-0 bottom-0 z-30 glass-dark border-r border-white/6 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? "w-16" : "w-56"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-white/6">
          {!sidebarCollapsed && (
            <span className="text-xs font-bold text-[#00D26A] uppercase tracking-widest flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D26A]" />
              Console Panel
            </span>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-7 h-7 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all ml-auto"
          >
            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${sidebarCollapsed ? "" : "rotate-180"}`} />
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Overview" },
            { icon: BookOpen, label: "Bookings", badge: bookings.filter((b) => b.status === "Pending").length },
            { icon: Car, label: "Vehicles" },
            { icon: Users, label: "Drivers" },
            { icon: Package, label: "Packages" },
            { icon: Users, label: "Customers" },
            { icon: BarChart2, label: "Analytics" },
          ].map(({ icon: Icon, label, badge }) => (
            <button
              key={label}
              onClick={() => setActiveSection(label)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                activeSection === label
                  ? "bg-[#00D26A]/15 text-[#00D26A] border border-[#00D26A]/20 shadow-[0_0_15px_rgba(0,210,106,0.15)]"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${activeSection === label ? "text-[#00D26A]" : ""}`} />
                {!sidebarCollapsed && <span>{label}</span>}
              </div>
              {!sidebarCollapsed && badge && badge > 0 ? (
                <span className="bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-56"} p-6 md:p-8 max-w-7xl`}>
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/5 pb-6"
        >
          <div>
            <h1 className="font-display text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
              {activeSection}
              <span className="text-xs bg-[#00D26A]/10 border border-[#00D26A]/30 text-[#00D26A] font-mono py-1 px-2.5 rounded-full tracking-normal align-middle">
                v1.2.0
              </span>
            </h1>
            <p className="text-white/40 text-xs mt-1.5">
              Nilgiris Explorers • Managed Administration Hub • Live simulation engine active
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-white/30 hidden md:block">System Status: <span className="text-emerald-400 font-semibold font-mono">ONLINE</span></span>
            <button
              onClick={triggerExport}
              disabled={exportStep > 0}
              className="btn-secondary text-xs px-4 py-2 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {exportStep > 0 ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00D26A]" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              {exportStep === 0 && "Export Sheet"}
              {exportStep === 1 && "Gathering DB..."}
              {exportStep === 2 && "Compiling PDF..."}
              {exportStep === 3 && "Finalizing..."}
            </button>
            <button
              onClick={() => setActiveModal("newBooking")}
              className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> New Booking
            </button>
          </div>
        </motion.div>

        {/* --- 1. OVERVIEW TAB --- */}
        {activeSection === "Overview" && (
          <div className="space-y-8">
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { label: "Total Revenue (Live)", value: metrics.revenue, change: "+18.5%", up: true, points: [4, 6, 5, 8, 9, 12], color: "from-[#00D26A] to-emerald-600" },
                { label: "Bookings Month-to-Date", value: metrics.bookingsThisMonth, change: "+12.2%", up: true, points: [30, 42, 35, 50, 68, bookings.length], color: "from-blue-500 to-indigo-600" },
                { label: "On Duty Drivers", value: metrics.activeDrivers, change: "+4 Onboarded", up: true, points: [2, 3, 3, 4, 4, drivers.filter(d => d.status !== "Off Duty").length], color: "from-violet-500 to-purple-600" },
                { label: "Pending Bookings Alert", value: metrics.pendingBookings, change: metrics.pendingBookings > 4 ? "Action needed" : "Healthy volume", up: metrics.pendingBookings < 4, points: [8, 5, 6, 4, 3, metrics.pendingBookings], color: "from-amber-500 to-orange-500" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-5 relative overflow-hidden group hover:border-[#00D26A]/20 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-white/40 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                      <p className="text-3xl font-extrabold text-white mt-1 font-sans">{stat.value}</p>
                    </div>
                    <span className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                      stat.up ? "bg-[#00D26A]/10 text-[#00D26A]" : "bg-rose-500/10 text-rose-400"
                    }`}>
                      {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {stat.change}
                    </span>
                  </div>

                  {/* SVG Sparkline Sparkline */}
                  <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-white/30">Analytics Track</span>
                    <svg viewBox="0 0 100 30" className="w-24 h-7 filter drop-shadow-[0_2px_4px_rgba(0,210,106,0.15)]">
                      <defs>
                        <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00D26A" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#00D26A" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d={getSparklinePath(stat.points)}
                        fill="none"
                        stroke={stat.up ? "#00D26A" : "#f43f5e"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d={`${getSparklinePath(stat.points)} L 100 30 L 0 30 Z`}
                        fill={`url(#grad-${i})`}
                        stroke="none"
                      />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Custom Interactive SVG Line Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-3xl p-6 relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#00D26A]" />
                    Revenue & Booking Volumetric Analysis
                  </h2>
                  <p className="text-white/40 text-xs">Real-time dynamic trend charting mapping calendar year</p>
                </div>
                <div className="flex rounded-xl bg-white/5 border border-white/10 p-0.5">
                  {(["Revenue", "Bookings"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setChartSeries(t)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
                        chartSeries === t ? "bg-[#00D26A] text-black shadow-md font-bold" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {t === "Revenue" ? "Revenue Trends" : "Booking Count"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Responsive SVG Chart Container */}
              <div className="h-64 relative w-full pt-4">
                <svg
                  viewBox="0 0 700 240"
                  className="w-full h-full overflow-visible"
                  onMouseLeave={() => setHoveredChartIndex(null)}
                >
                  {/* Grid Lines */}
                  {[0, 60, 120, 180, 240].map((y, idx) => (
                    <line
                      key={y}
                      x1="40"
                      y1={y}
                      x2="680"
                      y2={y}
                      stroke="rgba(255, 255, 255, 0.04)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Horizontal Labels */}
                  {chartData.map((d, i) => (
                    <text
                      key={d.label}
                      x={40 + i * 120}
                      y="255"
                      fill="rgba(255, 255, 255, 0.3)"
                      fontSize="10"
                      textAnchor="middle"
                      fontWeight="600"
                    >
                      {d.label}
                    </text>
                  ))}

                  {/* Vertical Axes Labels (Dynamic range) */}
                  {[0, 25, 50, 75, 100].map((pct, idx) => {
                    const maxVal = chartSeries === "Revenue" ? 220000 : 80;
                    const val = Math.round((maxVal * pct) / 100);
                    return (
                      <text
                        key={pct}
                        x="30"
                        y={240 - (pct * 2.4) + 4}
                        fill="rgba(255, 255, 255, 0.25)"
                        fontSize="9"
                        textAnchor="end"
                        fontWeight="600"
                      >
                        {chartSeries === "Revenue" ? `₹${val / 1000}k` : val}
                      </text>
                    );
                  })}

                  {/* Chart Path Drawing */}
                  {(() => {
                    const coords = chartData.map((d, i) => {
                      const maxVal = chartSeries === "Revenue" ? 220000 : 80;
                      const val = chartSeries === "Revenue" ? d.Revenue : d.Bookings;
                      const x = 40 + i * 120;
                      const y = 240 - (val / maxVal) * 220; // mapping formula
                      return { x, y, val };
                    });

                    const pathString = coords
                      .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`)
                      .join(" ");

                    const areaString = `${pathString} L 640 240 L 40 240 Z`;

                    return (
                      <>
                        {/* Shaded Area */}
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00D26A" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#00D26A" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d={areaString} fill="url(#chartGradient)" stroke="none" />

                        {/* Stroke Path */}
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          d={pathString}
                          fill="none"
                          stroke="#00D26A"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Interactive hover lines and dots */}
                        {coords.map((c, i) => (
                          <g key={i}>
                            {/* Hidden wider trigger zones for hover */}
                            <circle
                              cx={c.x}
                              cy={c.y}
                              r="20"
                              fill="transparent"
                              className="cursor-pointer"
                              onMouseEnter={() => setHoveredChartIndex(i)}
                            />

                            {/* Hover Indicator Dot */}
                            {hoveredChartIndex === i && (
                              <>
                                <line
                                  x1={c.x}
                                  y1="0"
                                  x2={c.x}
                                  y2="240"
                                  stroke="rgba(0, 210, 106, 0.25)"
                                  strokeWidth="1.5"
                                  strokeDasharray="4 4"
                                />
                                <circle
                                  cx={c.x}
                                  cy={c.y}
                                  r="7"
                                  fill="#071410"
                                  stroke="#00D26A"
                                  strokeWidth="3"
                                  className="filter drop-shadow-[0_0_8px_rgba(0,210,106,0.8)]"
                                />
                              </>
                            )}

                            {/* Normal dots */}
                            <circle
                              cx={c.x}
                              cy={c.y}
                              r="4.5"
                              fill="#00D26A"
                              stroke="#071410"
                              strokeWidth="1.5"
                            />
                          </g>
                        ))}
                      </>
                    );
                  })()}
                </svg>

                {/* Simulated Floating Tooltip */}
                {hoveredChartIndex !== null && (
                  <div
                    className="absolute z-20 glass border border-[#00D26A]/40 p-3 rounded-xl shadow-2xl pointer-events-none transition-all duration-200"
                    style={{
                      left: `${35 + hoveredChartIndex * 16.5}%`,
                      top: "20px",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">
                      {chartData[hoveredChartIndex].label} 2026
                    </p>
                    <p className="text-sm font-bold text-[#00D26A] mt-0.5">
                      {chartSeries === "Revenue"
                        ? `₹${chartData[hoveredChartIndex].Revenue.toLocaleString()}`
                        : `${chartData[hoveredChartIndex].Bookings} Bookings`}
                    </p>
                    <p className="text-[9px] text-white/50 mt-1 font-mono">Live DB Analytics</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Split panel: Recent Bookings Table & Live Resource Tracker */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Bookings Table Section */}
              <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
                    <div>
                      <h3 className="font-bold text-white flex items-center gap-1.5">
                        <Clock className="w-4.5 h-4.5 text-amber-400" />
                        Dynamic Activity Stream
                      </h3>
                      <p className="text-white/40 text-[11px]">Real-time customer reservation flow</p>
                    </div>
                    <button
                      onClick={() => setActiveSection("Bookings")}
                      className="text-xs text-[#00D26A] hover:text-[#12e88a] transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      View database <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/4 bg-white/2">
                          {["ID", "Customer", "Route", "Driver", "Status", "Total", "Action"].map((h) => (
                            <th key={h} className="text-left px-4 py-3.5 text-[10px] text-white/30 font-bold uppercase tracking-widest whitespace-nowrap">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.slice(0, 4).map((b) => {
                          const drv = drivers.find((d) => d.id === b.driverId);
                          return (
                            <tr key={b.id} className="border-b border-white/3 hover:bg-white/3 transition-colors">
                              <td className="px-4 py-4 text-xs font-mono text-white/40 font-bold">{b.id}</td>
                              <td className="px-4 py-4">
                                <div className="text-sm font-semibold text-white">{b.customerName}</div>
                                <div className="text-[10px] text-white/30">{b.customerPhone}</div>
                              </td>
                              <td className="px-4 py-4 text-xs text-white/70 font-medium whitespace-nowrap">{b.route}</td>
                              <td className="px-4 py-4 text-xs text-white/50">{drv ? drv.name : "Unassigned"}</td>
                              <td className="px-4 py-4">
                                <span className={`tag-badge border text-[10px] ${statusColors[b.status]}`}>
                                  {b.status}
                                </span>
                              </td>
                              <td className="px-4 py-4 text-sm font-bold text-white">₹{b.amount.toLocaleString()}</td>
                              <td className="px-4 py-4">
                                {b.status === "Pending" ? (
                                  <button
                                    onClick={() => handleBookingAction(b.id, "Confirm")}
                                    className="px-2.5 py-1 text-[10px] font-bold rounded-lg border border-[#00D26A]/40 text-[#00D26A] hover:bg-[#00D26A]/10 cursor-pointer transition-all"
                                  >
                                    Approve
                                  </button>
                                ) : b.status === "Confirmed" ? (
                                  <button
                                    onClick={() => handleBookingAction(b.id, "Start Trip")}
                                    className="px-2.5 py-1 text-[10px] font-bold rounded-lg border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 cursor-pointer transition-all whitespace-nowrap"
                                  >
                                    Start Trip
                                  </button>
                                ) : (
                                  <span className="text-[10px] text-white/20 font-medium">-</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Driver Resource Quick Panel */}
              <div className="glass-card rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="border-b border-white/6 pb-3 mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white flex items-center gap-1.5">
                        <Users className="w-4.5 h-4.5 text-[#00D26A]" />
                        Active Drivers
                      </h3>
                      <p className="text-white/40 text-[11px]">Real-time telemetry rosters</p>
                    </div>
                    <button
                      onClick={() => setActiveSection("Drivers")}
                      className="text-xs text-[#00D26A] font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
                    >
                      Manage
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {drivers.slice(0, 4).map((d) => (
                      <div key={d.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-white/3 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${d.avatarGradient} flex items-center justify-center font-bold text-sm text-white`}>
                            {d.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">{d.name}</div>
                            <div className="text-[10px] text-white/30 font-medium flex items-center gap-1">
                              {d.license}
                            </div>
                          </div>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                          d.status === "Active"
                            ? "bg-emerald-500/10 border-emerald-500/25 text-[#00D26A]"
                            : d.status === "On Trip"
                            ? "bg-blue-500/10 border-blue-500/25 text-blue-400"
                            : "bg-rose-500/10 border-rose-500/25 text-rose-400"
                        }`}>
                          {d.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/6 pt-4 mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="bg-white/3 rounded-xl p-2">
                    <div className="text-white/30 text-[10px] font-bold">DRIVER UTILITY</div>
                    <div className="text-white font-extrabold text-lg mt-0.5">84%</div>
                  </div>
                  <div className="bg-[#00D26A]/5 border border-[#00D26A]/10 rounded-xl p-2">
                    <div className="text-[#00D26A]/40 text-[10px] font-bold">FLEET ACTIVE</div>
                    <div className="text-[#00D26A] font-extrabold text-lg mt-0.5">
                      {vehicles.filter(v => v.status === "On Trip").length}/{vehicles.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick action grid */}
            <div>
              <h3 className="font-bold text-white text-sm mb-4 tracking-wider uppercase">Administrative Accelerators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: BookOpen, label: "Manual Reservation", color: "from-[#00D26A] to-emerald-600", desc: "Manually log a custom booking", action: () => setActiveModal("newBooking") },
                  { icon: Users, label: "Onboard Driver", color: "from-blue-500 to-indigo-600", desc: "Register a certified driver", action: () => setActiveModal("addDriver") },
                  { icon: Car, label: "Register Vehicle", color: "from-violet-500 to-purple-600", desc: "Integrate a vehicle to fleet", action: () => setActiveModal("addVehicle") },
                  { icon: Package, label: "Launch Package", color: "from-amber-500 to-orange-500", desc: "Build & launch adventure tours", action: () => setActiveModal("addPackage") },
                ].map(({ icon: Icon, label, color, desc, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className="glass-card rounded-2xl p-4 flex items-center gap-3.5 hover:bg-white/5 transition-all text-left card-hover cursor-pointer"
                  >
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon className="w-5.5 h-5.5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm tracking-tight">{label}</div>
                      <div className="text-white/40 text-[11px] mt-0.5 leading-tight">{desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- 2. BOOKINGS TAB --- */}
        {activeSection === "Bookings" && (
          <div className="space-y-6">
            {/* Filter Toolbar */}
            <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search passenger, route, or booking ID..."
                  value={bookingsSearch}
                  onChange={(e) => setBookingsSearch(e.target.value)}
                  className="input-field pl-10 text-sm"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <span className="text-xs text-white/30 flex items-center gap-1 mr-2 flex-shrink-0">
                  <Filter className="w-3.5 h-3.5" /> Filter status:
                </span>
                {["All", "Pending", "Confirmed", "In Progress", "Completed", "Cancelled"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setBookingsFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                      bookingsFilter === status
                        ? "bg-[#00D26A]/15 border border-[#00D26A]/30 text-[#00D26A]"
                        : "text-white/45 hover:text-white bg-white/3 border border-white/5"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table Panel */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/2">
                      {["ID", "Customer Details", "Tour Route", "Assigned vehicle & driver", "Reserved Date", "Passengers", "Amount", "Workflow Actions"].map((h) => (
                        <th key={h} className="text-left px-5 py-4 text-[10px] text-white/30 font-bold uppercase tracking-widest whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredBookings.length > 0 ? (
                        filteredBookings.map((b) => {
                          const veh = vehicles.find((v) => v.id === b.vehicleId);
                          const drv = drivers.find((d) => d.id === b.driverId);
                          return (
                            <motion.tr
                              key={b.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="border-b border-white/4 hover:bg-white/3 transition-colors"
                            >
                              <td className="px-5 py-4 font-mono text-xs text-white/40 font-bold">{b.id}</td>
                              <td className="px-5 py-4">
                                <div className="text-sm font-bold text-white">{b.customerName}</div>
                                <div className="text-[11px] text-white/30 flex flex-col mt-0.5">
                                  <span>{b.customerEmail}</span>
                                  <span>{b.customerPhone}</span>
                                </div>
                              </td>
                              <td className="px-5 py-4 text-xs font-semibold text-white/80 whitespace-nowrap">
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-[#00D26A]" />
                                  {b.route}
                                </span>
                              </td>
                              <td className="px-5 py-4">
                                <div className="text-xs text-white font-medium">{veh ? veh.model : "Unassigned"}</div>
                                <div className="text-[10px] text-[#00D26A] font-mono mt-0.5">
                                  {drv ? `Driver: ${drv.name}` : "Pending Allocation"}
                                </div>
                              </td>
                              <td className="px-5 py-4 text-xs font-semibold text-white/70 whitespace-nowrap">
                                <span className="flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5 text-white/30" />
                                  {b.date}
                                </span>
                              </td>
                              <td className="px-5 py-4 text-xs text-center text-white/60 font-semibold">{b.passengers}</td>
                              <td className="px-5 py-4 text-sm font-bold text-white">₹{b.amount.toLocaleString()}</td>
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-2">
                                  {b.status === "Pending" && (
                                    <>
                                      <button
                                        onClick={() => handleBookingAction(b.id, "Confirm")}
                                        className="px-2.5 py-1 text-[10px] font-bold rounded-lg border border-[#00D26A]/40 text-[#00D26A] hover:bg-[#00D26A]/10 cursor-pointer transition-all"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        onClick={() => handleBookingAction(b.id, "Cancel")}
                                        className="px-2.5 py-1 text-[10px] font-bold rounded-lg border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 cursor-pointer transition-all"
                                      >
                                        Cancel
                                      </button>
                                    </>
                                  )}
                                  {b.status === "Confirmed" && (
                                    <>
                                      <button
                                        onClick={() => handleBookingAction(b.id, "Start Trip")}
                                        className="px-2.5 py-1 text-[10px] font-bold rounded-lg border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 cursor-pointer transition-all whitespace-nowrap"
                                      >
                                        Start Trip
                                      </button>
                                      <button
                                        onClick={() => handleBookingAction(b.id, "Cancel")}
                                        className="px-2.5 py-1 text-[10px] font-bold rounded-lg border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 cursor-pointer transition-all"
                                      >
                                        Cancel
                                      </button>
                                    </>
                                  )}
                                  {b.status === "In Progress" && (
                                    <button
                                      onClick={() => handleBookingAction(b.id, "Complete")}
                                      className="px-2.5 py-1 text-[10px] font-bold rounded-lg border border-emerald-500/40 text-[#00D26A] hover:bg-emerald-500/10 cursor-pointer transition-all whitespace-nowrap"
                                    >
                                      Complete Trip
                                    </button>
                                  )}
                                  {b.status === "Completed" && (
                                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                                      <Check className="w-3.5 h-3.5" /> Satisfied
                                    </span>
                                  )}
                                  {b.status === "Cancelled" && (
                                    <span className="text-[10px] text-rose-400 font-bold">Cancelled</span>
                                  )}
                                </div>
                              </td>
                            </motion.tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={8} className="py-20 text-center text-white/20 text-sm font-medium">
                            <AlertCircle className="w-12 h-12 text-white/10 mx-auto mb-3" />
                            No matching reservations located.
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- 3. VEHICLES TAB --- */}
        {activeSection === "Vehicles" && (
          <div className="space-y-6">
            {/* Toolbar filter */}
            <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search vehicle model or license plate..."
                  value={vehiclesSearch}
                  onChange={(e) => setVehiclesSearch(e.target.value)}
                  className="input-field pl-10 text-sm"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex rounded-xl bg-white/5 border border-white/10 p-0.5">
                  {["All", "Available", "On Trip", "Maintenance"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setVehiclesFilter(s)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
                        vehiclesFilter === s ? "bg-[#00D26A] text-black font-bold" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setActiveModal("addVehicle")}
                  className="btn-primary text-xs px-3.5 py-1.8 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>

            {/* Grid of Vehicles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((v) => (
                  <motion.div
                    key={v.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card rounded-2xl p-5 relative flex flex-col justify-between border-t-2 border-white/5 hover:border-[#00D26A]/20 transition-all card-hover"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-bold text-white/40 tracking-wider uppercase bg-white/4 px-2 py-0.5 rounded">
                          {v.type}
                        </span>
                        <span className={`tag-badge border text-[10px] font-bold ${
                          v.status === "Available"
                            ? "bg-[#00D26A]/10 border-[#00D26A]/20 text-[#00D26A]"
                            : v.status === "On Trip"
                            ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                            : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                        }`}>
                          {v.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white tracking-tight">{v.model}</h3>
                      <p className="text-white/30 font-mono text-xs font-semibold mt-0.5">{v.plateNumber}</p>

                      <div className="grid grid-cols-3 gap-3 my-5 py-3 border-y border-white/5 text-center">
                        <div>
                          <div className="text-white/30 text-[9px] font-bold">CAPACITY</div>
                          <div className="text-white font-extrabold text-sm mt-0.5">{v.capacity} PAX</div>
                        </div>
                        <div>
                          <div className="text-white/30 text-[9px] font-bold">TOTAL TRIPS</div>
                          <div className="text-white font-extrabold text-sm mt-0.5">{v.trips}</div>
                        </div>
                        <div>
                          <div className="text-[#fbbf24] text-[9px] font-bold">RATING</div>
                          <div className="text-white font-extrabold text-sm mt-0.5 flex items-center justify-center gap-0.5">
                            <Star className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
                            {v.rating}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1">
                      <div>
                        <div className="text-white/30 text-[9px] font-semibold">DAILY RENT</div>
                        <div className="text-[#00D26A] font-extrabold text-md">₹{v.ratePerDay.toLocaleString()}</div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {v.status === "Available" ? (
                          <button
                            onClick={() => {
                              setVehicles(prev => prev.map(item => item.id === v.id ? { ...item, status: "Maintenance" } : item));
                              addToast(`${v.model} sent to maintenance queue.`, "info");
                            }}
                            className="text-[10px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-lg cursor-pointer hover:bg-amber-500/20 transition-all"
                          >
                            Maintenance
                          </button>
                        ) : v.status === "Maintenance" ? (
                          <button
                            onClick={() => {
                              setVehicles(prev => prev.map(item => item.id === v.id ? { ...item, status: "Available" } : item));
                              addToast(`${v.model} restored to active status!`, "success");
                            }}
                            className="text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-[#00D26A] px-2.5 py-1 rounded-lg cursor-pointer hover:bg-emerald-500/20 transition-all"
                          >
                            Set Available
                          </button>
                        ) : (
                          <span className="text-[10px] text-white/30 font-semibold italic">On active service</span>
                        )}
                        <button
                          onClick={() => {
                            setVehicles(prev => prev.filter(item => item.id !== v.id));
                            addToast(`${v.model} decommissioned from fleet.`, "error");
                          }}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-rose-500/25 hover:bg-rose-500/10 text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-white/20">
                  <AlertCircle className="w-12 h-12 text-white/10 mx-auto mb-3" />
                  No vehicles in this filter category.
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- 4. DRIVERS TAB --- */}
        {activeSection === "Drivers" && (
          <div className="space-y-6">
            {/* Filter toolbar */}
            <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search driver name or license..."
                  value={driversSearch}
                  onChange={(e) => setDriversSearch(e.target.value)}
                  className="input-field pl-10 text-sm"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex rounded-xl bg-white/5 border border-white/10 p-0.5">
                  {["All", "Active", "On Trip", "Off Duty"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setDriversFilter(s)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
                        driversFilter === s ? "bg-[#00D26A] text-black font-bold" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setActiveModal("addDriver")}
                  className="btn-primary text-xs px-3.5 py-1.8 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Onboard
                </button>
              </div>
            </div>

            {/* Drivers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrivers.length > 0 ? (
                filteredDrivers.map((d) => (
                  <motion.div
                    key={d.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card rounded-2xl p-5 relative border-t-2 border-white/5 hover:border-[#00D26A]/20 transition-all card-hover flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${d.avatarGradient} flex items-center justify-center font-bold text-lg text-white shadow-xl flex-shrink-0 filter drop-shadow-md`}>
                        {d.name.split(" ").map((n) => n[0]).join("")}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <h3 className="text-base font-extrabold text-white truncate tracking-tight">{d.name}</h3>
                          <span className={`text-[9px] font-bold px-1.8 py-0.4 border rounded-full ${
                            d.status === "Active"
                              ? "bg-emerald-500/10 border-emerald-500/25 text-[#00D26A]"
                              : d.status === "On Trip"
                              ? "bg-blue-500/10 border-blue-500/25 text-blue-400"
                              : "bg-rose-500/10 border-rose-500/25 text-rose-400"
                          }`}>
                            {d.status}
                          </span>
                        </div>

                        <p className="text-white/40 text-[11px] font-medium font-mono mt-0.5">{d.license}</p>

                        <div className="flex items-center gap-1 text-[#fbbf24] mt-2">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3 h-3 ${s <= Math.round(d.rating) ? "fill-[#fbbf24]" : "text-white/10"}`}
                              />
                            ))}
                          </div>
                          <span className="text-white text-xs font-extrabold ml-1">{d.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="my-4 py-3 border-y border-white/5 flex justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-white/50">
                        <Phone className="w-3.5 h-3.5 text-[#00D26A]" />
                        <span>{d.phone}</span>
                      </div>
                      <div className="font-semibold text-white/80">
                        Total Trips: <span className="text-white font-extrabold">{d.trips}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-white/30 font-bold uppercase">Duty Registry</span>
                      <div className="flex items-center gap-2">
                        {d.status === "Active" ? (
                          <button
                            onClick={() => {
                              setDrivers(prev => prev.map(drv => drv.id === d.id ? { ...drv, status: "Off Duty" } : drv));
                              addToast(`${d.name} is now OFF DUTY.`, "info");
                            }}
                            className="px-2.5 py-1 text-[10px] font-bold border border-rose-500/25 text-rose-400 rounded-lg hover:bg-rose-500/10 transition-all cursor-pointer"
                          >
                            Mark Off Duty
                          </button>
                        ) : d.status === "Off Duty" ? (
                          <button
                            onClick={() => {
                              setDrivers(prev => prev.map(drv => drv.id === d.id ? { ...drv, status: "Active" } : drv));
                              addToast(`${d.name} is now ACTIVE and waiting.`, "success");
                            }}
                            className="px-2.5 py-1 text-[10px] font-bold border border-[#00D26A]/25 text-[#00D26A] rounded-lg hover:bg-[#00D26A]/10 transition-all cursor-pointer"
                          >
                            Mark Active
                          </button>
                        ) : (
                          <span className="text-[10px] text-white/20 italic font-semibold">Allocated on active trip</span>
                        )}
                        <button
                          onClick={() => {
                            setDrivers(prev => prev.filter(drv => drv.id !== d.id));
                            addToast(`${d.name} has been removed from registry.`, "error");
                          }}
                          className="w-7 h-7 flex items-center justify-center rounded-lg border border-rose-500/25 text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-white/20">
                  <AlertCircle className="w-12 h-12 text-white/10 mx-auto mb-3" />
                  No drivers located under this criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- 5. PACKAGES TAB --- */}
        {activeSection === "Packages" && (
          <div className="space-y-6">
            {/* Header panel */}
            <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search tour catalogs, inclusions..."
                  value={packagesSearch}
                  onChange={(e) => setPackagesSearch(e.target.value)}
                  className="input-field pl-10 text-sm"
                />
              </div>
              <button
                onClick={() => setActiveModal("addPackage")}
                className="btn-primary text-xs px-4 py-2 cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Create Tour Package
              </button>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPackages.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  className="glass-card rounded-2xl p-6 relative border-t border-white/10 flex flex-col justify-between hover:border-[#00D26A]/20 transition-all card-hover"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white font-display tracking-tight">{p.name}</h3>
                        <span className="text-[10px] text-white/30 font-bold uppercase mt-1 inline-block">Duration: {p.duration}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-[#00D26A] text-xl font-extrabold font-sans">₹{p.price.toLocaleString()}</div>
                        <span className="text-[9px] text-white/30 font-bold uppercase">ESTIMATED RATE</span>
                      </div>
                    </div>

                    <p className="text-white/50 text-xs leading-relaxed mb-5 font-medium">{p.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {p.tags.map((t) => (
                        <span key={t} className="text-[9px] font-bold bg-white/4 border border-white/6 text-white/60 px-2 py-0.8 rounded-lg uppercase tracking-wide">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-white/45 font-bold uppercase text-[10px]">DB Traction:</span>
                      <span className="text-white font-extrabold">{p.bookingsCount} booked</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-white font-extrabold flex items-center gap-0.5 text-[#fbbf24]">
                        <Star className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
                        {p.rating}
                      </span>
                      <button
                        onClick={() => {
                          setPackages(prev => prev.filter(item => item.id !== p.id));
                          addToast(`"${p.name}" catalog deleted.`, "error");
                        }}
                        className="text-rose-400 hover:text-rose-300 font-bold cursor-pointer transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* --- 6. CUSTOMERS TAB --- */}
        {activeSection === "Customers" && (
          <div className="space-y-6">
            {/* Customer filter header */}
            <div className="glass-card rounded-2xl p-4">
              <div className="relative max-w-sm">
                <Search className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search customer base by name, email..."
                  value={customersSearch}
                  onChange={(e) => setCustomersSearch(e.target.value)}
                  className="input-field pl-10 text-sm"
                />
              </div>
            </div>

            {/* Customers table */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/2">
                      {["ID", "Customer Name", "Contact Details", "Completed Bookings", "Lifetime spent", "Account tier", "Last Active", "Promotional Campaigns"].map((h) => (
                        <th key={h} className="text-left px-5 py-4 text-[10px] text-white/30 font-bold uppercase tracking-widest whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((c) => (
                        <tr key={c.id} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                          <td className="px-5 py-4 font-mono text-xs text-white/40 font-bold">{c.id}</td>
                          <td className="px-5 py-4 font-bold text-white text-sm whitespace-nowrap">{c.name}</td>
                          <td className="px-5 py-4 text-xs">
                            <div className="text-white/80 font-medium">{c.email}</div>
                            <div className="text-white/40 mt-0.5">{c.phone}</div>
                          </td>
                          <td className="px-5 py-4 text-center text-xs font-bold text-white">{c.bookingsCount}</td>
                          <td className="px-5 py-4 text-sm font-extrabold text-[#00D26A]">₹{c.totalSpent.toLocaleString()}</td>
                          <td className="px-5 py-4">
                            <span className={`tag-badge border text-[9px] font-extrabold ${
                              c.status === "Elite"
                                ? "bg-amber-500/10 border-amber-500/20 text-[#fbbf24] shadow-[0_0_8px_rgba(251,191,36,0.15)]"
                                : c.status === "Active"
                                ? "bg-emerald-500/10 border-[#00D26A]/20 text-[#00D26A]"
                                : "bg-white/5 border-white/10 text-white/40"
                            }`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-xs text-white/60 font-semibold font-mono">{c.lastActive}</td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() => handleSimulatePromo(c)}
                              className="px-2.5 py-1 text-[10px] font-bold border border-white/10 text-white/60 bg-white/3 rounded-lg hover:bg-white/8 hover:text-white cursor-pointer transition-all flex items-center gap-1"
                            >
                              <Mail className="w-3.5 h-3.5" /> Email Coupon
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-20 text-center text-white/20">
                          <AlertCircle className="w-12 h-12 text-white/10 mx-auto mb-3" />
                          No customers found matching queries.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- 7. ANALYTICS TAB --- */}
        {activeSection === "Analytics" && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card rounded-2xl p-5 border-t-2 border-[#00D26A]/20">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Average Booking Value (Live)</p>
                <h3 className="text-3xl font-extrabold text-white mt-1">
                  ₹{Math.round(
                    bookings.filter(b => b.status !== "Cancelled").reduce((sum, b) => sum + b.amount, 0) /
                    (bookings.filter(b => b.status !== "Cancelled").length || 1)
                  ).toLocaleString()}
                </h3>
                <p className="text-[#00D26A] text-xs font-semibold mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Optimal margin threshold met
                </p>
              </div>

              <div className="glass-card rounded-2xl p-5 border-t-2 border-blue-500/20">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Driver Utilization Index</p>
                <h3 className="text-3xl font-extrabold text-white mt-1">86.4%</h3>
                <p className="text-blue-400 text-xs font-semibold mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Strong active shift coverage
                </p>
              </div>

              <div className="glass-card rounded-2xl p-5 border-t-2 border-violet-500/20 relative overflow-hidden flex justify-between items-center">
                <div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Net Promoter Score (NPS)</p>
                  <h3 className="text-3xl font-extrabold text-white mt-1">79</h3>
                  <p className="text-violet-400 text-xs font-semibold mt-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Outstanding client ratings
                  </p>
                </div>
                {/* SVG Visual radial NPS gauge */}
                <svg viewBox="0 0 50 50" className="w-14 h-14">
                  <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                  <circle cx="25" cy="25" r="20" fill="none" stroke="#00A855" strokeWidth="4.5" strokeDasharray="125" strokeDashoffset="26" strokeLinecap="round" className="filter drop-shadow-[0_0_4px_rgba(124,58,237,0.4)]" />
                  <text x="25" y="29" fill="white" fontSize="11" fontWeight="800" textAnchor="middle">79</text>
                </svg>
              </div>
            </div>

            {/* Custom SVG Graphical Deck */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Vehicle Revenue Breakdown (Dynamic Column Chart) */}
              <div className="glass-card rounded-3xl p-6">
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <Car className="w-5 h-5 text-[#00D26A]" />
                  Fleet Segment Revenue Generation
                </h3>
                <p className="text-white/40 text-xs mb-6">Total calculated billing volume divided by vehicle types</p>

                <div className="h-56 flex items-end justify-between px-4 pt-4 border-b border-white/5 relative">
                  {(() => {
                    const vehicleRevenue = {
                      SUV: bookings.filter(b => b.status !== "Cancelled" && vehicles.find(v => v.id === b.vehicleId)?.type === "SUV").reduce((s, b) => s + b.amount, 0),
                      Tempo: bookings.filter(b => b.status !== "Cancelled" && vehicles.find(v => v.id === b.vehicleId)?.type === "Tempo").reduce((s, b) => s + b.amount, 0),
                      Sedan: bookings.filter(b => b.status !== "Cancelled" && vehicles.find(v => v.id === b.vehicleId)?.type === "Sedan").reduce((s, b) => s + b.amount, 0),
                      "Mini Bus": 0,
                    };

                    const maxRev = Math.max(...Object.values(vehicleRevenue)) || 10000;

                    return Object.entries(vehicleRevenue).map(([type, rev]) => {
                      const heightPercent = Math.max(5, (rev / maxRev) * 100);
                      return (
                        <div key={type} className="flex flex-col items-center gap-3 w-16 group">
                          {/* Floating Value */}
                          <span className="text-[10px] font-bold text-[#00D26A] opacity-0 group-hover:opacity-100 transition-opacity bg-[#071410] border border-[#00D26A]/30 px-1.5 py-0.5 rounded absolute -translate-y-6">
                            ₹{rev.toLocaleString()}
                          </span>
                          {/* Visual Column */}
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${heightPercent}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="w-8 rounded-t-lg bg-gradient-to-t from-emerald-600 to-[#00D26A] relative cursor-pointer filter hover:brightness-110 transition-all flex items-end justify-center shadow-[0_0_12px_rgba(0,210,106,0.1)]"
                          />
                          {/* Label */}
                          <span className="text-[10px] text-white/45 font-bold uppercase tracking-wider mt-1">{type}</span>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Package Traction Index (Horizontal Bar Chart) */}
              <div className="glass-card rounded-3xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-400" />
                    Curated Tour Performance
                  </h3>
                  <p className="text-white/40 text-xs mb-6">Total dynamic bookings tracked against tour packages catalog</p>

                  <div className="space-y-4">
                    {packages.map((p) => {
                      // Dynamically count active bookings in simulated DB matching this package name/route
                      const count = p.bookingsCount + bookings.filter(b => b.route.toLowerCase().includes(p.name.split(" ")[0].toLowerCase())).length;
                      const maxCount = 180;
                      const widthPct = Math.min(100, Math.max(10, (count / maxCount) * 100));

                      return (
                        <div key={p.id} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-bold text-white/80">
                            <span className="truncate pr-4">{p.name}</span>
                            <span className="text-blue-400 font-extrabold flex-shrink-0">{count} Sales</span>
                          </div>
                          <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${widthPct}%` }}
                              transition={{ duration: 1, delay: 0.1 }}
                              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.2)]"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-xs">
                  <span className="text-white/30 font-medium">Simulation metric indexing operational</span>
                  <button
                    onClick={triggerExport}
                    className="text-[#00D26A] font-extrabold hover:underline cursor-pointer"
                  >
                    Compile detailed PDF report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- DYNAMIC GLOBAL GLASS MODALS --- */}
        <AnimatePresence>
          {activeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
            >
              {/* Close backdrop click */}
              <div className="absolute inset-0" onClick={() => setActiveModal(null)} />

              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                className="glass border border-white/12 rounded-3xl p-6 md:p-8 w-full max-w-xl relative z-10 shadow-2xl flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/6 mb-6">
                  <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
                    <Sparkles className="w-5.5 h-5.5 text-[#00D26A]" />
                    {activeModal === "newBooking" && "Manual Booking Dispatch"}
                    {activeModal === "addDriver" && "Driver Onboarding Register"}
                    {activeModal === "addVehicle" && "Fleet Registration Register"}
                    {activeModal === "addPackage" && "Tour Catalogue Designer"}
                    {activeModal === "promoEmail" && "Dispatching Email Promo..."}
                  </h3>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* MODAL CONTENT SWITCHER */}
                {activeModal === "newBooking" && (
                  <form onSubmit={handleCreateBooking} className="space-y-4">
                    <div>
                      <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Customer Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formBookingCustomer}
                        onChange={(e) => setFormBookingCustomer(e.target.value)}
                        className="input-field text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Email</label>
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={formBookingEmail}
                          onChange={(e) => setFormBookingEmail(e.target.value)}
                          className="input-field text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Phone</label>
                        <input
                          type="text"
                          placeholder="+91 XXXXX XXXXX"
                          value={formBookingPhone}
                          onChange={(e) => setFormBookingPhone(e.target.value)}
                          className="input-field text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Route & Destination</label>
                        <select
                          required
                          value={formBookingRoute}
                          onChange={(e) => setFormBookingRoute(e.target.value)}
                          className="input-field text-sm bg-[#0B1D17]"
                        >
                          <option value="">Select Target Destination</option>
                          <option value="Ooty Sights & Botanical Gardens">Ooty Sights & Botanical Gardens</option>
                          <option value="Coonoor Tea Gardens Trail">Coonoor Tea Gardens Trail</option>
                          <option value="Mudumalai Wild Safari">Mudumalai Wild Safari</option>
                          <option value="Avalanche Lake Off-road Trek">Avalanche Lake Off-road Trek</option>
                          <option value="Ooty Airport Transfer (CBE)">Ooty Airport Transfer (CBE)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Target Date</label>
                        <input
                          type="date"
                          value={formBookingDate}
                          onChange={(e) => setFormBookingDate(e.target.value)}
                          className="input-field text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Select Fleet Vehicle</label>
                        <select
                          required
                          value={formBookingVehicle}
                          onChange={(e) => setFormBookingVehicle(e.target.value)}
                          className="input-field text-sm bg-[#0B1D17]"
                        >
                          <option value="">Select Available Fleet</option>
                          {vehicles.filter(v => v.status === "Available").map(v => (
                            <option key={v.id} value={v.id}>{v.model} ({v.type} - ₹{v.ratePerDay})</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Select Active Driver</label>
                        <select
                          required
                          value={formBookingDriver}
                          onChange={(e) => setFormBookingDriver(e.target.value)}
                          className="input-field text-sm bg-[#0B1D17]"
                        >
                          <option value="">Select Available Drivers</option>
                          {drivers.filter(d => d.status === "Active").map(d => (
                            <option key={d.id} value={d.id}>{d.name} ({d.rating}★)</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="border-t border-white/6 pt-4 mt-6 flex justify-between items-center">
                      <div className="text-xs">
                        <span className="text-white/40">Auto Estimated Charge:</span>
                        <div className="text-[#00D26A] font-extrabold text-xl">
                          {formBookingVehicle ? `₹${vehicles.find(v => v.id === formBookingVehicle)?.ratePerDay.toLocaleString()}` : "Select vehicle"}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveModal(null)}
                          className="px-4 py-2 border border-white/10 hover:bg-white/5 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn-primary text-xs px-5 py-2 flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" /> Book Itinerary
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {activeModal === "addDriver" && (
                  <form onSubmit={handleAddDriver} className="space-y-4">
                    <div>
                      <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Driver Name"
                        value={formDriverName}
                        onChange={(e) => setFormDriverName(e.target.value)}
                        className="input-field text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Contact Number</label>
                      <input
                        type="text"
                        required
                        placeholder="+91 9XXXX XXXXX"
                        value={formDriverPhone}
                        onChange={(e) => setFormDriverPhone(e.target.value)}
                        className="input-field text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">License Registry ID</label>
                      <input
                        type="text"
                        required
                        placeholder="DL-43-XXXXXXXX"
                        value={formDriverLicense}
                        onChange={(e) => setFormDriverLicense(e.target.value)}
                        className="input-field text-sm"
                      />
                    </div>

                    <div className="border-t border-white/6 pt-4 mt-6 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 border border-white/10 hover:bg-white/5 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-primary text-xs px-5 py-2 flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Register Driver
                      </button>
                    </div>
                  </form>
                )}

                {activeModal === "addVehicle" && (
                  <form onSubmit={handleAddVehicle} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Model Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Toyota Fortuner"
                          value={formVehicleModel}
                          onChange={(e) => setFormVehicleModel(e.target.value)}
                          className="input-field text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">License Plate No</label>
                        <input
                          type="text"
                          required
                          placeholder="TN-43-XX-XXXX"
                          value={formVehiclePlate}
                          onChange={(e) => setFormVehiclePlate(e.target.value)}
                          className="input-field text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Type</label>
                        <select
                          value={formVehicleType}
                          onChange={(e) => setFormVehicleType(e.target.value as any)}
                          className="input-field text-sm bg-[#0B1D17]"
                        >
                          <option value="SUV">SUV</option>
                          <option value="Sedan">Sedan</option>
                          <option value="Tempo">Tempo</option>
                          <option value="Mini Bus">Mini Bus</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Capacity (PAX)</label>
                        <input
                          type="number"
                          required
                          value={formVehicleCapacity}
                          onChange={(e) => setFormVehicleCapacity(Number(e.target.value))}
                          className="input-field text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Daily Rent (₹)</label>
                        <input
                          type="number"
                          required
                          value={formVehicleRate}
                          onChange={(e) => setFormVehicleRate(Number(e.target.value))}
                          className="input-field text-sm"
                        />
                      </div>
                    </div>

                    <div className="border-t border-white/6 pt-4 mt-6 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 border border-white/10 hover:bg-white/5 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-primary text-xs px-5 py-2 flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Launch Vehicle
                      </button>
                    </div>
                  </form>
                )}

                {activeModal === "addPackage" && (
                  <form onSubmit={handleAddPackage} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Tour Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Coonoor Tea Gardens Trail"
                          value={formPackageName}
                          onChange={(e) => setFormPackageName(e.target.value)}
                          className="input-field text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Duration</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 1 Day / 2 Days, 1 Night"
                          value={formPackageDuration}
                          onChange={(e) => setFormPackageDuration(e.target.value)}
                          className="input-field text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Estimated Charge (₹)</label>
                        <input
                          type="number"
                          required
                          value={formPackagePrice}
                          onChange={(e) => setFormPackagePrice(Number(e.target.value))}
                          className="input-field text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Tags (Comma-separated)</label>
                        <input
                          type="text"
                          placeholder="Adventure, Wildlife, Scenic"
                          value={formPackageTags}
                          onChange={(e) => setFormPackageTags(e.target.value)}
                          className="input-field text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-white/40 text-xs font-bold uppercase tracking-wider block mb-1">Itinerary Summary & Description</label>
                      <textarea
                        rows={3}
                        placeholder="Brief summary of sights and travel details..."
                        value={formPackageDesc}
                        onChange={(e) => setFormPackageDesc(e.target.value)}
                        className="input-field text-sm"
                      />
                    </div>

                    <div className="border-t border-white/6 pt-4 mt-6 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="px-4 py-2 border border-white/10 hover:bg-white/5 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-primary text-xs px-5 py-2 flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" /> Deploy Package
                      </button>
                    </div>
                  </form>
                )}

                {activeModal === "promoEmail" && selectedPromoCustomer && (
                  <div className="text-center py-8 space-y-4">
                    <Loader2 className="w-12 h-12 text-[#00D26A] animate-spin mx-auto filter drop-shadow-[0_0_10px_rgba(0,210,106,0.5)]" />
                    <div>
                      <p className="text-white font-extrabold text-lg">Synthesizing Promo Codes...</p>
                      <p className="text-white/40 text-xs mt-1">Connecting to SMTP nodes for {selectedPromoCustomer.name}</p>
                    </div>
                    <div className="bg-white/4 p-4 rounded-xl border border-white/6 inline-block text-left text-xs text-white/70 max-w-xs space-y-1 font-mono">
                      <p>Recipient: {selectedPromoCustomer.email}</p>
                      <p>Subject: Exclusive Nilgiris Escapes Code</p>
                      <p>Attachment: coupon_15pct.pdf</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
