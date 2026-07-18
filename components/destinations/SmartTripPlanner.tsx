"use client";

import { useState, useMemo } from "react";
import { Calculator, Users, Clock, Car, Coffee, Camera, ChevronDown, ChevronUp, MapPin, Package, Backpack, Send, FileDown, Copy } from "lucide-react";
import { pickupLocations, accommodationPricing, foodPricing, destinationActivities } from "@/lib/data/planner";
import { tripIntelligence } from "@/lib/data/intelligence";
import { tourPackages } from "@/lib/data";
import { vehiclePricing } from "@/lib/data/pricing";
import { trackEvent, trackWhatsAppClick } from "@/lib/analytics";

interface SmartTripPlannerProps {
  destination: any;
}

export default function SmartTripPlanner({ destination }: SmartTripPlannerProps) {
  // Inputs
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [tripType, setTripType] = useState<keyof typeof tripIntelligence>("couple");
  const [pickupLocation, setPickupLocation] = useState("coimbatore");
  const [vehicle, setVehicle] = useState("sedan");
  const [accommodation, setAccommodation] = useState("standard");
  const [food, setFood] = useState("standard");
  const [customFood, setCustomFood] = useState(0);
  const [shopping, setShopping] = useState(0);
  const [misc, setMisc] = useState(0);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  
  // UI State
  const [expandedSection, setExpandedSection] = useState<string | null>("inputs");

  // Destination specific activities
  const currentActivities = destinationActivities[destination.slug as keyof typeof destinationActivities] || [];

  const toggleActivity = (actId: string) => {
    setSelectedActivities(prev => 
      prev.includes(actId) ? prev.filter(id => id !== actId) : [...prev, actId]
    );
  };

  // Memoized Calculations
  const calculations = useMemo(() => {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    const durationDays = (!isNaN(sDate.getTime()) && !isNaN(eDate.getTime()) && eDate > sDate) 
      ? Math.max(1, Math.ceil((eDate.getTime() - sDate.getTime()) / (1000 * 60 * 60 * 24)))
      : 3; // default to 3 days if dates not selected

    const pax = adults + children;
    const rooms = Math.ceil(pax / 3); // Max 3 per room

    // Transportation
    const selectedPickup = pickupLocations.find(p => p.id === pickupLocation);
    const distanceKm = (selectedPickup?.baseDistanceKm || 0) * 2; // round trip to destination
    const internalKm = durationDays * 50; // estimate 50km local sightseeing per day
    const totalKm = distanceKm + internalKm;
    
    const vPricing = vehiclePricing[vehicle as keyof typeof vehiclePricing];
    const transportCost = (totalKm * vPricing.baseRatePerKm) + (durationDays * vPricing.driverBata) + vPricing.hillCharge;

    // Accommodation
    const accCostPerNight = accommodationPricing[accommodation as keyof typeof accommodationPricing]?.pricePerNight || 0;
    const accommodationCost = accCostPerNight * rooms * durationDays;

    // Food
    const dailyFoodPerPax = food === "custom" ? customFood : foodPricing[food as keyof typeof foodPricing]?.pricePerPersonPerDay || 0;
    const foodCost = dailyFoodPerPax * pax * durationDays;

    // Activities
    const activityCost = selectedActivities.reduce((acc, actId) => {
      const act = currentActivities.find(a => a.id === actId);
      return acc + (act ? act.price * pax : 0);
    }, 0);

    const total = transportCost + accommodationCost + foodCost + activityCost + shopping + misc;

    return {
      durationDays,
      pax,
      transportCost,
      accommodationCost,
      foodCost,
      activityCost,
      total,
      percentages: {
        transport: Math.round((transportCost / total) * 100) || 0,
        accommodation: Math.round((accommodationCost / total) * 100) || 0,
        food: Math.round((foodCost / total) * 100) || 0,
        activities: Math.round((activityCost / total) * 100) || 0,
      }
    };
  }, [startDate, endDate, adults, children, pickupLocation, vehicle, accommodation, food, customFood, shopping, misc, selectedActivities, currentActivities]);

  const intel = tripIntelligence[tripType];

  const handleWhatsApp = () => {
    trackWhatsAppClick("trip_planner", { destination: destination.slug, total: calculations.total });
    const text = `Hello! I planned a trip using your Smart Planner.
Destination: ${destination.name}
Dates: ${startDate} to ${endDate} (${calculations.durationDays} days)
Travellers: ${adults} Adults, ${children} Children
Trip Type: ${intel.name}
Pickup: ${pickupLocations.find(p => p.id === pickupLocation)?.name}
Vehicle: ${vehiclePricing[vehicle as keyof typeof vehiclePricing]?.name}
Accommodation: ${accommodationPricing[accommodation as keyof typeof accommodationPricing]?.name}

*Estimated Budget:*
Transport: ₹${calculations.transportCost}
Stay: ₹${calculations.accommodationCost}
Food: ₹${calculations.foodCost}
Activities: ₹${calculations.activityCost}
Grand Total: ₹${calculations.total}

Please help me formalize this booking!`;
    window.open(`https://wa.me/919585219509?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handlePrint = () => {
    trackEvent("print_trip_plan");
    window.print();
  };

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const SectionHeader = ({ id, icon: Icon, title }: { id: string, icon: any, title: string }) => (
    <button 
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors border-b border-white/10"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-emerald-400" />
        <span className="font-bold text-white text-lg">{title}</span>
      </div>
      {expandedSection === id ? <ChevronUp className="w-5 h-5 text-white/50" /> : <ChevronDown className="w-5 h-5 text-white/50" />}
    </button>
  );

  return (
    <div className="glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col mb-8">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-emerald-900/40 to-transparent border-b border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Calculator className="w-6 h-6 text-emerald-400" /> Smart Trip Planner
          </h2>
          <p className="text-sm text-white/60 mt-1">Estimate your budget and get AI recommendations</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-white/50 uppercase tracking-wider mb-1">Estimated Total</div>
          <div className="text-2xl font-bold text-emerald-400">₹{calculations.total.toLocaleString()}</div>
        </div>
      </div>

      {/* Inputs Section */}
      <SectionHeader id="inputs" icon={Car} title="Customize Your Trip" />
      {expandedSection === "inputs" && (
        <div className="p-6 space-y-6 bg-black/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">Trip Type</label>
              <select className="input-field w-full text-sm bg-white/5 border-white/10 text-white h-10" value={tripType} onChange={(e) => setTripType(e.target.value as any)}>
                {Object.entries(tripIntelligence).map(([k, v]) => (
                  <option key={k} value={k} className="bg-gray-900">{v.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">Pickup Location</label>
              <select className="input-field w-full text-sm bg-white/5 border-white/10 text-white h-10" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
                {pickupLocations.map(p => (
                  <option key={p.id} value={p.id} className="bg-gray-900">{p.name} ({p.type})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">Start Date</label>
              <input type="date" className="input-field w-full text-sm bg-white/5 border-white/10 text-white h-10" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">End Date</label>
              <input type="date" className="input-field w-full text-sm bg-white/5 border-white/10 text-white h-10" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">Adults</label>
              <input type="number" min="1" className="input-field w-full text-sm bg-white/5 border-white/10 text-white h-10" value={adults} onChange={e => setAdults(parseInt(e.target.value) || 1)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">Children</label>
              <input type="number" min="0" className="input-field w-full text-sm bg-white/5 border-white/10 text-white h-10" value={children} onChange={e => setChildren(parseInt(e.target.value) || 0)} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">Vehicle</label>
              <select className="input-field w-full text-sm bg-white/5 border-white/10 text-white h-10" value={vehicle} onChange={e => setVehicle(e.target.value)}>
                {Object.entries(vehiclePricing).map(([k, v]) => (
                  <option key={k} value={k} className="bg-gray-900">{v.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">Accommodation</label>
              <select className="input-field w-full text-sm bg-white/5 border-white/10 text-white h-10" value={accommodation} onChange={e => setAccommodation(e.target.value)}>
                {Object.entries(accommodationPricing).map(([k, v]) => (
                  <option key={k} value={k} className="bg-gray-900">{v.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">Food Budget</label>
              <select className="input-field w-full text-sm bg-white/5 border-white/10 text-white h-10" value={food} onChange={e => setFood(e.target.value)}>
                {Object.entries(foodPricing).map(([k, v]) => (
                  <option key={k} value={k} className="bg-gray-900">{v.name}</option>
                ))}
              </select>
            </div>
          </div>

          {currentActivities.length > 0 && (
            <div>
              <label className="block text-xs font-medium text-white/60 mb-3">Include Activities</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentActivities.map(act => (
                  <label key={act.id} className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                    <input type="checkbox" checked={selectedActivities.includes(act.id)} onChange={() => toggleActivity(act.id)} className="rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500" />
                    {act.name} <span className="text-white/40 ml-auto">₹{act.price}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-xs font-medium text-white/60 mb-2">Shopping Budget</label>
              <input type="number" min="0" className="input-field w-full text-sm bg-white/5 border-white/10 text-white h-10" value={shopping} onChange={e => setShopping(parseInt(e.target.value) || 0)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/60 mb-2">Misc Buffer</label>
              <input type="number" min="0" className="input-field w-full text-sm bg-white/5 border-white/10 text-white h-10" value={misc} onChange={e => setMisc(parseInt(e.target.value) || 0)} />
            </div>
          </div>
        </div>
      )}

      {/* Budget Breakdown Section */}
      <SectionHeader id="budget" icon={Calculator} title="Detailed Breakdown" />
      {expandedSection === "budget" && (
        <div className="p-6 bg-black/20">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-white/60 flex items-center gap-2"><Car className="w-4 h-4"/> Transportation</span>
              <span className="text-white font-medium">₹{calculations.transportCost.toLocaleString()} <span className="text-xs text-white/30 ml-2">({calculations.percentages.transport}%)</span></span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-white/60 flex items-center gap-2"><Coffee className="w-4 h-4"/> Accommodation</span>
              <span className="text-white font-medium">₹{calculations.accommodationCost.toLocaleString()} <span className="text-xs text-white/30 ml-2">({calculations.percentages.accommodation}%)</span></span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-white/60 flex items-center gap-2"><Coffee className="w-4 h-4"/> Food</span>
              <span className="text-white font-medium">₹{calculations.foodCost.toLocaleString()} <span className="text-xs text-white/30 ml-2">({calculations.percentages.food}%)</span></span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-white/60 flex items-center gap-2"><Camera className="w-4 h-4"/> Activities</span>
              <span className="text-white font-medium">₹{calculations.activityCost.toLocaleString()} <span className="text-xs text-white/30 ml-2">({calculations.percentages.activities}%)</span></span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-white/60">Shopping & Misc</span>
              <span className="text-white font-medium">₹{(shopping + misc).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-emerald-400 font-bold">Total Est. Budget</span>
              <span className="text-emerald-400 font-bold text-xl">₹{calculations.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Smart Intelligence Section */}
      <SectionHeader id="intelligence" icon={Users} title="Smart Insights & Itinerary" />
      {expandedSection === "intelligence" && (
        <div className="p-6 bg-black/20 space-y-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><Package className="w-4 h-4" /> Recommended Package</h4>
            <p className="text-sm text-white/70 mb-3">Based on your ₹{calculations.total.toLocaleString()} budget and {calculations.durationDays} days trip, we suggest booking a pre-planned package to save on overhead costs.</p>
            {tourPackages[0] && (
              <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                <span className="text-sm text-white font-medium">{tourPackages[0].name}</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Recommended</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-400" /> Travel Insight</h4>
              <p className="text-sm text-white/70">{intel.insights}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Backpack className="w-4 h-4 text-emerald-400" /> Packing List</h4>
              <ul className="text-sm text-white/70 space-y-1">
                {intel.packingList.map((item, i) => <li key={i}>• {item}</li>)}
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-emerald-400" /> Generated Itinerary Focus</h4>
            <ul className="text-sm text-white/70 space-y-2">
              <li className="flex gap-3"><span className="text-emerald-400 font-bold">Morning:</span> Head to top view points before mist rolls in.</li>
              <li className="flex gap-3"><span className="text-emerald-400 font-bold">Afternoon:</span> Engage in {intel.recommendations[0]}.</li>
              <li className="flex gap-3"><span className="text-emerald-400 font-bold">Evening:</span> Relax with {intel.recommendations[2]}.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="p-4 bg-white/5 border-t border-white/10 flex flex-wrap gap-3 justify-end items-center">
        <button onClick={handlePrint} className="btn-secondary px-4 py-2 text-xs flex items-center gap-2 rounded-lg bg-black/20 hover:bg-black/40 border border-white/10">
          <FileDown className="w-4 h-4" /> Print / PDF
        </button>
        <button onClick={() => { navigator.clipboard.writeText(`Total Estimate: ₹${calculations.total}`); alert("Copied summary!"); }} className="btn-secondary px-4 py-2 text-xs flex items-center gap-2 rounded-lg bg-black/20 hover:bg-black/40 border border-white/10">
          <Copy className="w-4 h-4" /> Copy
        </button>
        <button onClick={handleWhatsApp} className="btn-primary px-6 py-2 text-sm flex items-center gap-2 rounded-lg">
          <Send className="w-4 h-4" /> Send My Trip Plan
        </button>
      </div>

    </div>
  );
}
