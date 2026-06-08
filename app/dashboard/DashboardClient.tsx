"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Car, Calendar, Star, CreditCard, User, MapPin, Clock, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

const tabs = ["Upcoming Trips", "History", "Saved Packages", "Profile", "Payments"];

// Toggle this to false to see the empty state
const hasUpcomingTrips = false;

const upcomingTrips = hasUpcomingTrips ? [
  {
    id: "NE2026001",
    destination: "Avalanche Lake & Pykara",
    date: "June 5, 2026",
    time: "7:00 AM",
    vehicle: "Innova Crysta",
    driver: "Rajan Kumar",
    status: "Confirmed",
    amount: 3200,
  },
] : [];

const tripHistory = [
  { id: "NE2025089", destination: "Ooty Sightseeing", date: "Mar 12, 2025", amount: 2000, rating: 5 },
  { id: "NE2025056", destination: "Coonoor & Sim's Park", date: "Feb 3, 2025", amount: 2400, rating: 5 },
  { id: "NE2025023", destination: "Coimbatore Airport Transfer", date: "Jan 18, 2025", amount: 1200, rating: 4 },
  { id: "NE2024198", destination: "Mudumalai Wildlife Safari", date: "Dec 28, 2024", amount: 4800, rating: 5 },
];

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState("Upcoming Trips");

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-default">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00D26A] to-[#0B9FD4] flex items-center justify-center text-white font-bold text-xl">
            PK
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Welcome back, Priya!</h1>
            <p className="text-white/50 text-sm">Member since January 2025 · Premium Traveler</p>
          </div>
          <div className="ml-auto hidden sm:flex items-center gap-2 glass-card px-4 py-2 rounded-xl">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-white font-semibold text-sm">4 Trips Completed</span>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Car, label: "Total Trips", value: "4", color: "from-[#00D26A] to-[#00A855]" },
            { icon: Calendar, label: "Upcoming", value: "1", color: "from-blue-500 to-indigo-600" },
            { icon: Star, label: "Avg Rating", value: "4.8★", color: "from-amber-500 to-orange-500" },
            { icon: CreditCard, label: "Total Spent", value: "₹10,200", color: "from-violet-500 to-purple-600" },
          ].map(({ icon: Icon, label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-xl p-4"
            >
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                <Icon className="w-4.5 h-4.5 text-white w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-white">{value}</div>
              <div className="text-white/40 text-xs">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 flex-wrap mb-6 glass-card rounded-xl p-1.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-fit px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-[#00D26A] text-[#0a0e1a]"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "Upcoming Trips" && (
            <div className="space-y-4">
              {upcomingTrips.length > 0 ? (
                <>
                  {upcomingTrips.map((trip) => (
                    <div key={trip.id} className="glass-card rounded-2xl p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#00D26A]/20 flex items-center justify-center flex-shrink-0">
                            <Car className="w-6 h-6 text-[#00D26A]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900 text-white">{trip.destination}</h3>
                              <span className="flex items-center gap-1 text-xs bg-[#00D26A]/15 text-[#00D26A] border border-[#00D26A]/25 px-2 py-0.5 rounded-full">
                                <CheckCircle className="w-3 h-3" /> {trip.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-500 text-white/50">
                              <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {trip.date}</div>
                              <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {trip.time}</div>
                              <div className="flex items-center gap-1"><Car className="w-3.5 h-3.5" /> {trip.vehicle}</div>
                              <div className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {trip.driver}</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-900 text-white">₹{trip.amount.toLocaleString()}</div>
                          <div className="text-xs text-white/40 text-white/30 mb-2">Booking #{trip.id}</div>
                          <button className="btn-secondary text-xs py-2 px-4">
                            View Details <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center py-20 glass-card rounded-2xl flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-100 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <MapPin className="w-10 h-10 text-gray-300 text-white/20" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 text-white mb-2">No Upcoming Trips</h3>
                  <p className="text-gray-500 text-white/50 mb-8 max-w-sm mx-auto">
                    Looks like you haven't booked any trips yet. Discover the beauty of the Nilgiris with our premium packages.
                  </p>
                  <Link href="/#booking" className="btn-primary">
                    Explore Packages <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === "History" && (
            <div className="glass-card rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/6">
                    <th className="text-left px-5 py-4 text-xs text-white/40 font-semibold uppercase tracking-wider">Booking ID</th>
                    <th className="text-left px-5 py-4 text-xs text-white/40 font-semibold uppercase tracking-wider">Destination</th>
                    <th className="text-left px-5 py-4 text-xs text-white/40 font-semibold uppercase tracking-wider hidden sm:table-cell">Date</th>
                    <th className="text-left px-5 py-4 text-xs text-white/40 font-semibold uppercase tracking-wider">Rating</th>
                    <th className="text-right px-5 py-4 text-xs text-white/40 font-semibold uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {tripHistory.map((t, i) => (
                    <tr key={t.id} className={`border-b border-white/4 hover:bg-white/3 transition-colors ${i % 2 === 0 ? "" : "bg-white/1"}`}>
                      <td className="px-5 py-4 text-xs text-white/40 font-mono">{t.id}</td>
                      <td className="px-5 py-4 text-sm text-white font-medium">{t.destination}</td>
                      <td className="px-5 py-4 text-sm text-white/50 hidden sm:table-cell">{t.date}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-0.5">
                          {[...Array(t.rating)].map((_, si) => (
                            <Star key={si} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right text-sm font-semibold text-white">₹{t.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Profile" && (
            <div className="glass-card rounded-2xl p-6 max-w-lg">
              <h3 className="text-lg font-bold text-white mb-5">Profile Information</h3>
              <div className="space-y-4">
                {[
                  { id: "profile-name", label: "Full Name", value: "Priya Krishnamurthy", type: "text" },
                  { id: "profile-email", label: "Email", value: "priya.k@email.com", type: "email" },
                  { id: "profile-phone", label: "Phone", value: "+91 95852 19509", type: "tel" },
                  { id: "profile-city", label: "City", value: "Chennai", type: "text" },
                ].map((field) => (
                  <div key={field.id}>
                    <label className="text-xs text-white/40 font-medium uppercase tracking-wider mb-1.5 block">{field.label}</label>
                    <input id={field.id} type={field.type} defaultValue={field.value} className="input-field" />
                  </div>
                ))}
                <button className="btn-primary w-full justify-center mt-2">Save Changes</button>
              </div>
            </div>
          )}

          {(activeTab === "Saved Packages" || activeTab === "Payments") && (
            <div className="text-center py-20 glass-card rounded-2xl">
              <AlertCircle className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40 text-lg font-medium">Coming Soon</p>
              <p className="text-white/25 text-sm mt-1">This feature is being built for you</p>
            </div>
          )}
        </motion.div>
        </div>
      </div>
    </div>
  );
}
