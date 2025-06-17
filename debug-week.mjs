import { asDate, getWeekNumber, isThisWeek } from './modules/runtime/dist/index.mjs';

// Mock date from test: Monday, January 15, 2024
const mockDate = new Date(2024, 0, 15);
console.log('Mock date:', mockDate.toISOString());
console.log('Mock date week:', getWeekNumber(mockDate));

// Test date: Wednesday, January 17, 2024
const testDate = "2024-01-17";
console.log('\nTest date string:', testDate);

const convertedDate = asDate(testDate);
console.log('Converted date:', convertedDate.toISOString());
console.log('Converted date week:', getWeekNumber(convertedDate));

console.log('\nCurrent date:', new Date().toISOString());
console.log('Current date week:', getWeekNumber(new Date()));

// Check the dates
console.log('\nDates comparison:');
console.log('Mock date day:', mockDate.getDay(), '(0=Sunday, 1=Monday)');
console.log('Converted date day:', convertedDate.getDay());
