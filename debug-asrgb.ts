import type { AsRgb } from "inferred-types/types";

// Test RGBA conversion
type Test1 = AsRgb<{ r: 255, g: 128, b: 64, a: 0.5 }>;
type Test2 = AsRgb<{ r: 100, g: 150, b: 200, a: 1.0 }>;

// Test CSS rgb parsing
type Test3 = AsRgb<"rgb(255, 128, 64)">;
type Test4 = AsRgb<"rgb(255,128,64)">;
type Test5 = AsRgb<"rgb( 255 , 128 , 64 )">;
type Test6 = AsRgb<"rgb(255 128 64)">;

// Test error cases
type Test7 = AsRgb<{ r: 256, g: 128, b: 64 }>;
type Test8 = AsRgb<{ r: -1, g: 128, b: 64 }>;
type Test9 = AsRgb<{ r: 255.5, g: 128, b: 64 }>;

// Test hex shorthand
type Test10 = AsRgb<"#F00">;
type Test11 = AsRgb<"#0F0">;
type Test12 = AsRgb<"#00F">;

// Test CSS boundary values
type Test13 = AsRgb<"rgb(0, 0, 0)">;
type Test14 = AsRgb<"rgb(255, 255, 255)">;
