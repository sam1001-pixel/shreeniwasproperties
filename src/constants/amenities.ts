export const amenities = [
  { id: "lift", label: "Lift / Elevator", icon: "ArrowUpDown" },
  { id: "swimming_pool", label: "Swimming Pool", icon: "Waves" },
  { id: "gym", label: "Gym / Fitness Center", icon: "Dumbbell" },
  { id: "parking", label: "Car Parking", icon: "Car" },
  { id: "power_backup", label: "Power Backup", icon: "Zap" },
  { id: "security_24x7", label: "24/7 Security", icon: "Shield" },
  { id: "cctv", label: "CCTV Surveillance", icon: "Video" },
  { id: "garden", label: "Garden / Park", icon: "TreePine" },
  { id: "clubhouse", label: "Club House", icon: "Building" },
  { id: "children_play", label: "Children's Play Area", icon: "Baby" },
  { id: "intercom", label: "Intercom", icon: "Phone" },
  { id: "fire_safety", label: "Fire Safety", icon: "Flame" },
  { id: "rainwater_harvesting", label: "Rainwater Harvesting", icon: "Droplets" },
  { id: "solar_panels", label: "Solar Panels", icon: "Sun" },
  { id: "wifi", label: "Wi-Fi Connectivity", icon: "Wifi" },
  { id: "air_conditioning", label: "Air Conditioning", icon: "Thermometer" },
  { id: "gated_community", label: "Gated Community", icon: "Lock" },
  { id: "water_supply", label: "24/7 Water Supply", icon: "GlassWater" },
  { id: "vastu_compliant", label: "Vastu Compliant", icon: "Compass" },
  { id: "servant_room", label: "Servant Room", icon: "DoorOpen" },
] as const;

export const propertyTypes = [
  { id: "apartment", label: "Apartment", icon: "Building2" },
  { id: "villa", label: "Villa", icon: "Castle" },
  { id: "independent_house", label: "Independent House", icon: "Home" },
  { id: "penthouse", label: "Penthouse", icon: "Building" },
  { id: "plot", label: "Plot / Land", icon: "Map" },
  { id: "commercial_office", label: "Office Space", icon: "Briefcase" },
  { id: "retail_shop", label: "Retail Shop", icon: "Store" },
  { id: "warehouse", label: "Warehouse", icon: "Warehouse" },
  { id: "co_working", label: "Co-Working Space", icon: "Users" },
] as const;

export const furnishingTypes = [
  { id: "unfurnished", label: "Unfurnished" },
  { id: "semi_furnished", label: "Semi-Furnished" },
  { id: "fully_furnished", label: "Fully Furnished" },
] as const;

export const facingDirections = [
  "North", "South", "East", "West",
  "North-East", "North-West", "South-East", "South-West"
] as const;
