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
