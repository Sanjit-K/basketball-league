/**
 * Helper functions for working with Google Sheets
 */

// Function to extract spreadsheet ID from a Google Sheets URL
export function extractSpreadsheetId(url: string): string | null {
  // Regular expression to match the spreadsheet ID in various Google Sheets URL formats
  const regex = /\/d\/([a-zA-Z0-9-_]+)/
  const match = url.match(regex)

  return match ? match[1] : null
}

// Function to extract sheet ID (gid) from a Google Sheets URL
export function extractSheetId(url: string): string | null {
  // Regular expression to match the gid parameter
  const regex = /[?&]gid=([0-9]+)/
  const match = url.match(regex)

  return match ? match[1] : null
}

// Function to convert a Google Sheets URL to a CSV export URL
export function getSheetsCsvUrl(spreadsheetId: string, sheetId = "0"): string {
  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=${sheetId}`
}

// Function to parse CSV data into an array of objects
export function parseCsv(csvData: string): Record<string, string>[] {
  const rows = csvData.split("\n")
  if (rows.length <= 1) {
    return []
  }

  const headers = rows[0].split(",").map((header) => header.trim())

  return rows
    .slice(1)
    .filter((row) => row.trim() !== "") // Skip empty rows
    .map((row) => {
      const values = row.split(",")
      const rowData: Record<string, string> = {}

      headers.forEach((header, index) => {
        rowData[header] = values[index]?.trim() || ""
      })

      return rowData
    })
}

