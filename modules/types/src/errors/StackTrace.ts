export type SymbolKind = "function" | "method";

export interface StackFrame {
    type: string;
    fn_name: string;
    method_name: string;
    filename: string;
    line_number: number;
    col_number: number;
    is_native: boolean;
    is_constructor: boolean;
}

export type StackTrace = StackFrame[];
