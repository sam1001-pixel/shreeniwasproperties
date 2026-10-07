import * as XLSX from 'xlsx';

export interface InquiryExportItem {
  id?: string;
  user?: string;
  phone?: string;
  email?: string;
  property?: string;
  type?: string;
  status?: string;
  query?: string;
  visitDate?: string;
  visitTimeSlot?: string;
  slotLabel?: string;
  reply?: string;
  createdDate?: string;
  [key: string]: any;
}

/**
 * Cleanly formats and triggers client-side download of an Excel (.xlsx) spreadsheet
 * for inquiries / lead data with professional column headers and widths.
 */
export function exportInquiriesToExcel(inquiries: InquiryExportItem[], filenamePrefix = 'Shreeniwas_Inquiries') {
  if (!inquiries || inquiries.length === 0) {
    throw new Error('No inquiry data available to export.');
  }

  // 1. Transform raw inquiries into clean, professionally labeled row objects
  const rows = inquiries.map((inq, index) => {
    // Format timestamp or date if available
    const visitInfo = inq.visitDate 
      ? `${inq.visitDate} (${inq.slotLabel || inq.visitTimeSlot || 'Standard'})`
      : inq.slotLabel || inq.visitTimeSlot || 'N/A';

    return {
      'S.No': index + 1,
      'Query ID': inq.id || `INQ-${index + 1}`,
      'Client Name': inq.user || 'Website Visitor',
      'Phone Number': inq.phone || 'N/A',
      'Email Address': inq.email || 'N/A',
      'Property / Topic': inq.property || 'General Inquiry',
      'Inquiry Type': inq.type || 'Direct Message',
      'Status': inq.status || 'Pending',
      'Client Query / Request': inq.query || 'No notes',
      'Visit Schedule': visitInfo,
      'Admin Reply / Notes': inq.reply || 'Pending Response',
    };
  });

  // 2. Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // 3. Define sensible column widths for high readability in Microsoft Excel / Apple Numbers
  const columnWidths = [
    { wch: 6 },  // S.No
    { wch: 14 }, // Query ID
    { wch: 24 }, // Client Name
    { wch: 16 }, // Phone Number
    { wch: 28 }, // Email Address
    { wch: 32 }, // Property / Topic
    { wch: 22 }, // Inquiry Type
    { wch: 18 }, // Status
    { wch: 45 }, // Client Query / Request
    { wch: 26 }, // Visit Schedule
    { wch: 35 }, // Admin Reply / Notes
  ];
  worksheet['!cols'] = columnWidths;

  // 4. Create workbook and append sheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Inquiries & Leads');

  // 5. Generate formatted filename with date stamp
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const filename = `${filenamePrefix}_${dateStr}.xlsx`;

  // 6. Write and trigger file download
  XLSX.writeFile(workbook, filename);
}

export interface PropertyVisitRecordItem {
  id?: string;
  clientName: string;
  clientMobile: string;
  propertyOwnerName: string;
  ownerMobile?: string;
  propertyLocation: string;
  visitDate: string;
  visitTime: string;
  coordinatorName: string; // Priyanka, Suman, Tammana, etc.
  visitCharge: string;     // ₹500, ₹1,000, etc.
  paymentStatus: string;   // Paid, Not paid, Partial
  feedback: string;        // ❤️ पसंद आई, 🤔 सोचकर बताएगा, ❌ पसंद नहीं आई
  followUpRemark?: string;
  visitNumber: string;     // 1, 2, 3, 4, 5
  createdAt?: string;
  recordedBy?: string;
  [key: string]: any;
}

/**
 * Exports all 13-point Google Form Property Visit Records into formatted Excel (.xlsx) spreadsheet
 */
export function exportVisitRecordsToExcel(records: PropertyVisitRecordItem[], filenamePrefix = 'Shreeniwas_Property_Visit_Records') {
  if (!records || records.length === 0) {
    throw new Error('No visit records available to export.');
  }

  const rows = records.map((rec, index) => {
    return {
      'S.No': index + 1,
      'Record ID': rec.id || `VR-${index + 1}`,
      '1. Client Name': rec.clientName || 'N/A',
      '2. Client Mobile': rec.clientMobile || 'N/A',
      '3. Property Owner Name': rec.propertyOwnerName || 'N/A',
      '4. Owner Mobile Number': rec.ownerMobile || 'N/A',
      '5. Property / Location': rec.propertyLocation || 'N/A',
      '6. Visit Date': rec.visitDate || 'N/A',
      '7. Visit Time': rec.visitTime || 'N/A',
      '8. Visit Coordinator (किसने करवाई)': rec.coordinatorName || 'N/A',
      '9. Visit Charge': rec.visitCharge || 'N/A',
      '10. Payment Status': rec.paymentStatus || 'N/A',
      '11. Property Feedback (कैसी लगी)': rec.feedback || 'N/A',
      '12. Follow-up / Remarks': rec.followUpRemark || 'No Remarks',
      '13. Visit Number': rec.visitNumber || '1',
      'Recorded By': rec.recordedBy || 'Admin Desk',
      'Created At': rec.createdAt || new Date().toLocaleString()
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const columnWidths = [
    { wch: 6 },  // S.No
    { wch: 14 }, // Record ID
    { wch: 22 }, // Client Name
    { wch: 16 }, // Client Mobile
    { wch: 22 }, // Owner Name
    { wch: 16 }, // Owner Mobile
    { wch: 30 }, // Property / Location
    { wch: 14 }, // Visit Date
    { wch: 14 }, // Visit Time
    { wch: 24 }, // Coordinator Name
    { wch: 14 }, // Visit Charge
    { wch: 16 }, // Payment Status
    { wch: 22 }, // Feedback
    { wch: 35 }, // Remarks
    { wch: 14 }, // Visit Number
    { wch: 18 }, // Recorded By
    { wch: 22 }, // Created At
  ];
  worksheet['!cols'] = columnWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Property Visit Records');

  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const filename = `${filenamePrefix}_${dateStr}.xlsx`;

  XLSX.writeFile(workbook, filename);
}

export interface AttendanceExportItem {
  id?: string;
  staffName: string;
  role?: string;
  clockIn: string;
  clockOut: string;
  status: string;
  hours?: string;
  date?: string;
  [key: string]: any;
}

/**
 * Exports staff attendance and shift records into formatted Excel (.xlsx) spreadsheet
 */
export function exportAttendanceToExcel(attendance: AttendanceExportItem[], filenamePrefix = 'Shreeniwas_Staff_Attendance') {
  if (!attendance || attendance.length === 0) {
    throw new Error('No attendance records available to export.');
  }

  const rows = attendance.map((att, index) => {
    return {
      'S.No': index + 1,
      'Log ID': att.id || `ATT-${index + 1}`,
      'Staff Name': att.staffName || 'Staff Member',
      'Designated Role': att.role || 'Staff Admin',
      'Shift Clock-In': att.clockIn || 'N/A',
      'Shift Clock-Out': att.clockOut || 'N/A',
      'Attendance Status': att.status || 'Present',
      'Total Shift Hours': att.hours || 'N/A',
      'Date': att.date || new Date().toISOString().split('T')[0]
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const columnWidths = [
    { wch: 6 },  // S.No
    { wch: 14 }, // Log ID
    { wch: 24 }, // Staff Name
    { wch: 20 }, // Designated Role
    { wch: 18 }, // Shift Clock-In
    { wch: 18 }, // Shift Clock-Out
    { wch: 20 }, // Attendance Status
    { wch: 18 }, // Total Shift Hours
    { wch: 16 }, // Date
  ];
  worksheet['!cols'] = columnWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Staff Shift Attendance');

  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const filename = `${filenamePrefix}_${dateStr}.xlsx`;

  XLSX.writeFile(workbook, filename);
}

