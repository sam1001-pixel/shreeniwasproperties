import * as XLSX from 'xlsx';

export interface DailyReportInputData {
  inquiries?: any[];
  visitRecords?: any[];
  attendance?: any[];
  users?: any[];
  properties?: any[];
  reportDate?: string;
}

export interface DailyReportResult {
  buffer: Buffer;
  filename: string;
  reportDateStr: string;
  stats: {
    totalInquiries: number;
    todayInquiries: number;
    totalVisits: number;
    todayVisits: number;
    totalAttendance: number;
    todayAttendance: number;
    totalUsers: number;
    totalProperties: number;
    totalVisitRevenue: string;
  };
  whatsappSummary: string;
}

/**
 * Normalizes and checks if a date string is from "today" (IST / local).
 */
function isTodayDate(dateVal?: string): boolean {
  if (!dateVal) return false;
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const todayYMD = `${yyyy}-${mm}-${dd}`;

  if (typeof dateVal === 'string') {
    if (dateVal.includes(todayYMD)) return true;
    if (dateVal.toLowerCase() === 'today') return true;
    
    // Check formatted like DD/MM/YYYY or D Mon YYYY
    try {
      const parsed = new Date(dateVal);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString().startsWith(todayYMD);
      }
    } catch {}
  }
  return false;
}

/**
 * Calculates sum of visit fees.
 */
function calculateTotalRevenue(records: any[]): number {
  let sum = 0;
  for (const r of records) {
    if (r.paymentStatus === 'Paid' || r.paymentStatus === 'Partial') {
      const numStr = (r.visitCharge || '').replace(/[^0-9]/g, '');
      const num = parseInt(numStr, 10);
      if (!isNaN(num)) sum += num;
    }
  }
  return sum;
}

/**
 * Generates a comprehensive, multi-sheet Excel (.xlsx) workbook buffer for the daily owner report.
 */
export function generateDailyExcelReport(data: DailyReportInputData): DailyReportResult {
  const inquiries = Array.isArray(data.inquiries) ? data.inquiries : [];
  const visitRecords = Array.isArray(data.visitRecords) ? data.visitRecords : [];
  const attendance = Array.isArray(data.attendance) ? data.attendance : [];
  const users = Array.isArray(data.users) ? data.users : [];
  const properties = Array.isArray(data.properties) ? data.properties : [];

  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const timeFormatted = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  const dateISO = now.toISOString().split('T')[0];

  // Calculate daily stats
  const todayInqs = inquiries.filter(i => isTodayDate(i.date || i.visitDate || i.createdAt));
  const todayVisits = visitRecords.filter(v => isTodayDate(v.visitDate || v.createdAt));
  const todayAttendance = attendance.filter(a => isTodayDate(a.date));
  const totalRevenueNum = calculateTotalRevenue(visitRecords);
  const totalRevenueFormatted = `₹${totalRevenueNum.toLocaleString('en-IN')}`;

  const stats = {
    totalInquiries: inquiries.length,
    todayInquiries: todayInqs.length,
    totalVisits: visitRecords.length,
    todayVisits: todayVisits.length,
    totalAttendance: attendance.length,
    todayAttendance: todayAttendance.length,
    totalUsers: users.length,
    totalProperties: properties.length,
    totalVisitRevenue: totalRevenueFormatted
  };

  const workbook = XLSX.utils.book_new();

  // ----------------------------------------------------
  // Sheet 1: Executive Daily Summary & KPIs
  // ----------------------------------------------------
  const summaryRows = [
    { 'Metric / KPI': 'Organization Name', 'Value / Status': 'Shreeniwas Properties & Rentals' },
    { 'Metric / KPI': 'Report Title', 'Value / Status': 'Daily Business Intelligence & Leads Digest' },
    { 'Metric / KPI': 'Report Date', 'Value / Status': dateFormatted },
    { 'Metric / KPI': 'Generation Timestamp', 'Value / Status': `${dateFormatted} at ${timeFormatted} (IST)` },
    { 'Metric / KPI': '----------------------------------------', 'Value / Status': '----------------------------------------' },
    { 'Metric / KPI': "Today's New Inquiries & Leads", 'Value / Status': stats.todayInquiries },
    { 'Metric / KPI': 'Total Inquiries (Cumulative)', 'Value / Status': stats.totalInquiries },
    { 'Metric / KPI': "Today's Scheduled VIP Site Visits", 'Value / Status': stats.todayVisits },
    { 'Metric / KPI': 'Total Property Site Visits Logged', 'Value / Status': stats.totalVisits },
    { 'Metric / KPI': 'Total Visit Charges Collected', 'Value / Status': stats.totalVisitRevenue },
    { 'Metric / KPI': "Today's Active Staff Clock-Ins", 'Value / Status': stats.todayAttendance },
    { 'Metric / KPI': 'Total Active Properties Listed', 'Value / Status': stats.totalProperties },
    { 'Metric / KPI': 'Total Registered Seekers & Owners', 'Value / Status': stats.totalUsers },
    { 'Metric / KPI': '----------------------------------------', 'Value / Status': '----------------------------------------' },
    { 'Metric / KPI': 'Head Office', 'Value / Status': 'Vaishali Nagar, Jaipur & Ratanada, Jodhpur, Rajasthan' },
    { 'Metric / KPI': 'Owner Helpline / WhatsApp', 'Value / Status': '+91 6376117833' },
    { 'Metric / KPI': 'System Generated By', 'Value / Status': 'Shreeniwas Super Admin Automated Engine' }
  ];

  const summarySheet = XLSX.utils.json_to_sheet(summaryRows);
  summarySheet['!cols'] = [{ wch: 38 }, { wch: 45 }];
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Executive Summary');

  // ----------------------------------------------------
  // Sheet 2: Inquiries & Leads
  // ----------------------------------------------------
  const inqRows = inquiries.map((inq, idx) => ({
    'S.No': idx + 1,
    'Query ID': inq.id || `INQ-${idx + 1}`,
    'Date Logged': inq.date || inq.createdAt || 'Recent',
    'Client Name': inq.user || inq.name || 'Website Visitor',
    'Phone Number': inq.phone || 'N/A',
    'Email Address': inq.email || 'N/A',
    'Property / Topic': inq.property || inq.propertyTitle || 'General Inquiry',
    'Inquiry Type': inq.type || 'Direct Message',
    'Lead Status': inq.status || 'Pending',
    'Client Query / Request': inq.query || inq.message || 'No description',
    'Scheduled Visit Slot': inq.visitDate ? `${inq.visitDate} (${inq.slotLabel || inq.visitTimeSlot || 'Standard'})` : 'N/A',
    'Admin Reply / Action Notes': inq.reply || 'Pending Response'
  }));

  const inqSheet = XLSX.utils.json_to_sheet(
    inqRows.length > 0 ? inqRows : [{ 'Message': 'No inquiries logged yet.' }]
  );
  inqSheet['!cols'] = [
    { wch: 6 }, { wch: 16 }, { wch: 14 }, { wch: 22 }, { wch: 16 },
    { wch: 26 }, { wch: 32 }, { wch: 20 }, { wch: 16 }, { wch: 45 },
    { wch: 24 }, { wch: 35 }
  ];
  XLSX.utils.book_append_sheet(workbook, inqSheet, 'Inquiries & Leads');

  // ----------------------------------------------------
  // Sheet 3: 13-Point Property Visit Records
  // ----------------------------------------------------
  const visitRows = visitRecords.map((rec, idx) => ({
    'S.No': idx + 1,
    'Record ID': rec.id || `VR-${idx + 1}`,
    '1. Client Name': rec.clientName || 'N/A',
    '2. Client Mobile': rec.clientMobile || 'N/A',
    '3. Property Owner Name': rec.propertyOwnerName || 'N/A',
    '4. Owner Mobile': rec.ownerMobile || 'N/A',
    '5. Property Location': rec.propertyLocation || 'N/A',
    '6. Visit Date': rec.visitDate || 'N/A',
    '7. Visit Time': rec.visitTime || 'N/A',
    '8. Visit Coordinator (किसने करवाई)': rec.coordinatorName || 'N/A',
    '9. Visit Charge (शुल्क)': rec.visitCharge || '₹0',
    '10. Payment Status': rec.paymentStatus || 'N/A',
    '11. Property Feedback (कैसी लगी)': rec.feedback || 'N/A',
    '12. Follow-Up Remarks': rec.followUpRemark || 'No Remarks',
    '13. Visit Number': rec.visitNumber || '1',
    'Recorded By': rec.recordedBy || 'Super Admin',
    'Created At': rec.createdAt || 'N/A'
  }));

  const visitSheet = XLSX.utils.json_to_sheet(
    visitRows.length > 0 ? visitRows : [{ 'Message': 'No visit records logged yet.' }]
  );
  visitSheet['!cols'] = [
    { wch: 6 }, { wch: 14 }, { wch: 22 }, { wch: 16 }, { wch: 22 },
    { wch: 16 }, { wch: 32 }, { wch: 14 }, { wch: 14 }, { wch: 24 },
    { wch: 18 }, { wch: 16 }, { wch: 22 }, { wch: 35 }, { wch: 14 },
    { wch: 18 }, { wch: 22 }
  ];
  XLSX.utils.book_append_sheet(workbook, visitSheet, 'Property Visit Records');

  // ----------------------------------------------------
  // Sheet 4: Staff Attendance Log
  // ----------------------------------------------------
  const attendanceRows = attendance.map((att, idx) => ({
    'S.No': idx + 1,
    'Attendance ID': att.id || `ATT-${idx + 1}`,
    'Staff Name': att.staffName || 'Staff Member',
    'Designation / Role': att.role || 'Coordinator',
    'Date': att.date || 'Today',
    'Clock In': att.clockIn || '--:--',
    'Clock Out': att.clockOut || '--:--',
    'Total Hours': att.hours || '0 hrs',
    'Status': att.status || 'Present'
  }));

  const attendanceSheet = XLSX.utils.json_to_sheet(
    attendanceRows.length > 0 ? attendanceRows : [{ 'Message': 'No attendance logged yet.' }]
  );
  attendanceSheet['!cols'] = [
    { wch: 6 }, { wch: 18 }, { wch: 24 }, { wch: 22 }, { wch: 14 },
    { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 20 }
  ];
  XLSX.utils.book_append_sheet(workbook, attendanceSheet, 'Staff Attendance');

  // ----------------------------------------------------
  // Sheet 5: Registered Users & Landlords
  // ----------------------------------------------------
  const userRows = users.map((u, idx) => ({
    'S.No': idx + 1,
    'Full Name': u.name || 'User',
    'Email Address': u.email || 'N/A',
    'Phone Number': u.phone || 'N/A',
    'Role': u.role || 'Property Seeker',
    'City': u.preferredCity || u.city || 'Jaipur',
    'Registration Date': u.registeredAt ? new Date(u.registeredAt).toLocaleDateString('en-IN') : 'N/A'
  }));

  const userSheet = XLSX.utils.json_to_sheet(
    userRows.length > 0 ? userRows : [{ 'Message': 'No users registered yet.' }]
  );
  userSheet['!cols'] = [
    { wch: 6 }, { wch: 24 }, { wch: 30 }, { wch: 16 }, { wch: 20 },
    { wch: 16 }, { wch: 18 }
  ];
  XLSX.utils.book_append_sheet(workbook, userSheet, 'Registered Accounts');

  // Generate buffer
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  const filename = `Shreeniwas_Daily_Business_Report_${dateISO}.xlsx`;

  // WhatsApp formatted executive briefing
  const whatsappSummary = [
    `📊 *SHREENIWAS PROPERTIES - DAILY BUSINESS REPORT*`,
    `📅 *Date:* ${dateFormatted} (${timeFormatted})`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `📌 *Today's Highlights:*`,
    `• New Inquiries Today: *${stats.todayInquiries}* (Total: ${stats.totalInquiries})`,
    `• VIP Site Visits Today: *${stats.todayVisits}* (Total: ${stats.totalVisits})`,
    `• Total Visit Revenue: *${stats.totalVisitRevenue}*`,
    `• Staff Clock-Ins Today: *${stats.todayAttendance}*`,
    `• Active Properties: *${stats.totalProperties}*`,
    `• Registered Users: *${stats.totalUsers}*`,
    `━━━━━━━━━━━━━━━━━━━━━`,
    `📁 Full 5-Sheet Excel Workbook generated: *${filename}*`,
    `🌐 View Admin Console: https://shreeniwasproperties-pi.vercel.app/admin`
  ].join('\n');

  return {
    buffer,
    filename,
    reportDateStr: dateFormatted,
    stats,
    whatsappSummary
  };
}
