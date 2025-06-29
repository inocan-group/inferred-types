export const BLOOD_MARKERS_LOOKUP = [
    { abbrev: "Hb", name: "hemoglobin", measurements: ["g/dL", "mmol/L"] },
    { abbrev: "WBC", name: "white blood cell count", measurements: ["cells/µL"] },
    { abbrev: "RBC", name: "red blood cell count", measurements: ["million cells/µL", "trillion cells/L"] },
    { abbrev: "PLT", name: "platelet count", measurements: ["thousand/µL", "million/L"] },
    { abbrev: "Hct", name: "hematocrit", measurements: ["%"] },
    { abbrev: "MCV", name: "mean corpuscular volume", measurements: ["fL"] },
    { abbrev: "MCH", name: "mean corpuscular hemoglobin", measurements: ["pg/cell"] },
    { abbrev: "MCHC", name: "mean corpuscular hemoglobin concentration", measurements: ["g/dL"] },
    { abbrev: "RDW", name: "red cell distribution width", measurements: ["%"] },
    { abbrev: "Glucose", name: "blood glucose", measurements: ["mg/dL", "mmol/L"] },
    { abbrev: "ALT", name: "alanine aminotransferase", measurements: ["U/L"] },
    { abbrev: "AST", name: "aspartate aminotransferase", measurements: ["U/L"] },
    { abbrev: "LDL", name: "low-density lipoprotein", measurements: ["mg/dL", "mmol/L"] },
    { abbrev: "HDL", name: "high-density lipoprotein", measurements: ["mg/dL", "mmol/L"] },
    { abbrev: "Triglycerides", name: "triglycerides", measurements: ["mg/dL", "mmol/L"] },
    { abbrev: "CRP", name: "C-reactive protein", measurements: ["mg/L"] },
    { abbrev: "TSH", name: "thyroid-stimulating hormone", measurements: ["mIU/L"] },
    { abbrev: "BUN", name: "blood urea nitrogen", measurements: ["mg/dL", "mmol/L"] },
    { abbrev: "Creatinine", name: "creatinine", measurements: ["mg/dL", "µmol/L"] },
    { abbrev: "Bilirubin", name: "bilirubin", measurements: ["mg/dL", "µmol/L"] },
] as const;
