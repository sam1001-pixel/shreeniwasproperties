import { Building2, Home, Briefcase, Phone, Info, BookOpen, LayoutDashboard, Heart, MessageSquare, UserCircle, Settings, Users, CreditCard, FileText } from "lucide-react";

export const mainNav = [
  { title: "Home", href: "/" },
  { title: "Properties", href: "/properties" },
  { title: "Rentals", href: "/properties?purpose=rent" },
  { title: "Buy", href: "/properties?purpose=sale" },
  { title: "Commercial", href: "/properties?purpose=commercial_lease" },
  { title: "Tariff & Visits", href: "/tariff" },
  { title: "Blog", href: "/blog" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
] as const;

export const dashboardNav = {
  tenant: [
    { title: "Dashboard", href: "/dashboard/portal", icon: "LayoutDashboard" },
    { title: "Saved Properties", href: "/dashboard/portal/saved", icon: "Heart" },
    { title: "My Inquiries", href: "/dashboard/portal/inquiries", icon: "MessageSquare" },
    { title: "Profile", href: "/dashboard/portal/profile", icon: "UserCircle" },
  ],
  landlord: [
    { title: "Dashboard", href: "/dashboard/landlord", icon: "LayoutDashboard" },
    { title: "My Properties", href: "/dashboard/landlord/properties", icon: "Building2" },
    { title: "Add Property", href: "/dashboard/landlord/properties/new", icon: "Home" },
    { title: "Leads", href: "/dashboard/landlord/leads", icon: "MessageSquare" },
    { title: "Payments", href: "/dashboard/landlord/payments", icon: "CreditCard" },
    { title: "Profile", href: "/dashboard/landlord/profile", icon: "UserCircle" },
  ],
  admin: [
    { title: "Dashboard", href: "/dashboard/admin", icon: "LayoutDashboard" },
    { title: "Properties", href: "/dashboard/admin/properties", icon: "Building2" },
    { title: "Users", href: "/dashboard/admin/users", icon: "Users" },
    { title: "Inquiries", href: "/dashboard/admin/inquiries", icon: "MessageSquare" },
    { title: "Payments", href: "/dashboard/admin/payments", icon: "CreditCard" },
    { title: "Blog", href: "/dashboard/admin/blog", icon: "FileText" },
    { title: "Settings", href: "/dashboard/admin/settings", icon: "Settings" },
  ],
} as const;
