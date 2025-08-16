import { ParseDate } from "./modules/types/src/datetime/ParseDate";

// Test what ParseDate returns for the failing dates
type Test1 = ParseDate<"2024-01-15">;
type Test2 = ParseDate<"2024-02-28">;
type Test3 = ParseDate<"2023-04-01">;
type Test4 = ParseDate<"2020-12-31">;
type Test5 = ParseDate<"2024-01-15T10:30:00Z">;
type Test6 = ParseDate<"2024-02-28T12:00:00Z">;
type Test7 = ParseDate<"2023-04-01T00:00:00Z">;

// Test what DaysInMonth returns for these
import { DaysInMonth } from "./modules/types/src/datetime/DaysInMonth";

type DaysTest1 = DaysInMonth<"2024-01-15">;
type DaysTest2 = DaysInMonth<"2024-02-28">;
type DaysTest3 = DaysInMonth<"2023-04-01">;
type DaysTest4 = DaysInMonth<"2020-12-31">;
type DaysTest5 = DaysInMonth<"2024-01-15T10:30:00Z">;
type DaysTest6 = DaysInMonth<"2024-02-28T12:00:00Z">;
type DaysTest7 = DaysInMonth<"2023-04-01T00:00:00Z">;

// Force TypeScript to show us the types
const showTypes = {
  parseDate: {} as {
    test1: Test1;
    test2: Test2;
    test3: Test3;
    test4: Test4;
    test5: Test5;
    test6: Test6;
    test7: Test7;
  },
  daysInMonth: {} as {
    test1: DaysTest1;
    test2: DaysTest2;
    test3: DaysTest3;
    test4: DaysTest4;
    test5: DaysTest5;
    test6: DaysTest6;
    test7: DaysTest7;
  }
};