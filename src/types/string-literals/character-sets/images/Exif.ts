import { EmptyObject } from "inferred-types/types";

export enum ExifCompression {
  Uncompressed = 1,
  CCITT = 2,
  T4Group3Fax = 3,
  T6Group3Fax = 4,
  LZW = 5,
  JpgOldStyle = 6,
  Jpg = 7,
  AdobeDeflate = 8,
  JBigBw = 9,
  JBigColor = 10,
  JpegAlt = 99,
  Kodak262 = 262,
  Next = 32766,
  SonyRawCompressed = 32767,
  PackedRaw = 32769,
  SamsungSrwCompressed = 32770,
  CCIRLEW = 32771,
  SamsungSrwCompressed2 = 32772,
  Packbits = 32773,
  Thunderscan = 32809,
  KodakKdcCompressed = 32867,
  IT8CTPAD = 32895,
  IT8LW = 32896,
  IT8MP = 32897,
  IT8BL = 32898,
  PixarFilm = 32908,
  PixarLog = 32909,
  Deflate = 32946,
  DCS = 32947,
  AperioJpeg2000YCbCr = 33003,
  AperioJpeg2000RGB = 33005,
  JBig = 34661,
  SGILog = 34676,
  SGILog24 = 34677,
  Jpeg2000 = 34712,
  NikonNEFCompressed = 34713,
  JBig2TiffFx = 34715,
  MicrosoftBinaryLevelCodec = 34718,
  MicrosoftProgressiveTransformCodec = 34719,
  MicrosoftVector = 34720,
  ESRCLerc = 34887,
  LossyJpeg = 34892,
  LZMA2 = 34925,
  Zstd = 34926,
  WepP = 34927,
  PNG = 34933,
  JpegXR = 34934,
  KodakDCRCompressed = 65000,
  PentaxPEFCompressed = 65535,
}

export enum ExifLightSource {
  Unknown = 0,
  Daylight,
  Fluorescent,
  Tungsten,
  Flash,
  FineWeather,
  Cloudy,
  Shade,
  DaylightFluorescent,
  DayWhiteFluorescent,
  CoolWhiteFluorescent,
  WhiteFluorescent,
  WarmWhiteFluorescent,
  StandardLightA,
  StandardLightB,
  StandardLightC,
  D55,
  D65,
  D75,
  D50,
  ISOStudioTungsten,
  Other = 255,
}

export enum ExifFlashValues {
  NoFlash = 0x0,
  Fired = 0x1,
  FiredReturnNotDetected = 0x5,
  FiredReturnDetected = 0x7,
  OnDidNotFire = 0x8,
  OnFired = 0x9,
  OnReturnNotDetected = 0xd,
  OnReturnDetected = 0xf,
  OffDidNotFire = 0x10,
  OffDidNotFireReturnNotDetected = 0x14,
  AutoDidNotFire = 0x18,
  AutoFired = 0x19,
  AutoFiredReturnNotDetected = 0x1d,
  AutoFiredReturnDetected = 0x1f,
  NoFlashFunction = 0x20,
  OffNoFlashFunction = 0x30,
  FiredRedEyeReduction = 0x41,
  FiredRedEyeReductionReturnNotDetected = 0x45,
  FiredRedEyeReductionReturnDetected = 0x47,
  OnRedEyeReduction = 0x49,
  OnRedEyeReductionReturnNotDetected = 0x4d,
  OnRedEyeReductionReturnDetected = 0x4f,
  OffRedEyeReduction = 0x50,
  AutoDidNotFireRedEyeReduction = 0x58,
  AutoFiredRedEyeReduction = 0x59,
  AutoFiredRedEyeReductionNotDetected = 0x60,
  AutoFiredRedEyeReductionDetected = 0x5d,
}

export enum ExifPreviewColorSpace {
  Unknown = 0,
  GrayGamma22,
  sRGB,
  AdobeRGB,
  ProPhotoRGB,
}

export enum ExifEmbedPolicy {
  AllowCopying = 0,
  EmbedIfUsed,
  NeverEmbed,
  NoRestrictions,
}

export enum ExifSubjectDistance {
  Unknown = 0,
  Macro,
  Close,
  Distant,
}

export enum ExifSharpness {
  Normal = 0,
  Soft,
  Hard,
}

export enum ExifSceneCaptureType {
  Standard = 0,
  Landscape,
  Portrait,
  Night,
  Other,
}

export enum ExifGainControl {
  None = 0,
  LowGainUp,
  HighGainUp,
  LowGainDown,
  HighGainDown,
}

export enum ExifContrast {
  Normal = 0,
  Low,
  High,
}

export enum ExifSaturation {
  Normal = 0,
  Low,
  High,
}

/**
 * Extraneous info in an EXIF metadata payload. Detailed info
 * can be found on all fields here: [EXIF Tags](https://exiftool.org/TagNames/EXIF.html)
 */
export type ExifExtraneous<T extends object = EmptyObject> = {
  /** [ `0x0001` ] */
  InteropIndex: string;
  // InteropVersion:

  /** called NewSubfileType by TIFF specification.
   * [More](https://exiftool.org/TagNames/EXIF.html).
   */
  SubfileType: number;
} & T;

/**
 * Date and Time info found in EXIF payload. Detailed info
 * can be found on all fields here: [EXIF Tags](https://exiftool.org/TagNames/EXIF.html)
 */
export type ExifDateTimeInfo<T extends object = EmptyObject> = {
  ModifyDate: string;
  OffsetTime: string;
  /** The date created; formal EXIF property is `DateTimeDigitized` */
  CreateDate: string;
  /** Formal EXIF property for created date */
  DateTimeDigitized: string;
  /**
   * 1 or 2 values:
   *
   * 1. The time zone offset of DateTimeOriginal from GMT in hours,
   * 2. If present, the time zone offset of ModifyDate
   */
  TimeZoneOffset: number | [number, number];
  OffsetTimeDigitized: string;
  /** fractional seconds for ModifyDate */
  SubSecTime: string;
  /** fractional seconds for DateTimeOriginal */
  SubSecTimeOriginal: string;
  /** fractional seconds for CreateDate */
  SubSecTimeDigitized: string;
} & T;

/**
 * Information regarding attribution found in EXIF payload. Detailed info
 * can be found on all fields here: [EXIF Tags](https://exiftool.org/TagNames/EXIF.html)
 */
export type ExifAttributionInfo<T extends object = EmptyObject> = {
  Copyright: string;
  /** becomes a list-type tag when the MWG module is loaded */
  Artist: string;
  /** called `CameraOwnerName` by the EXIF spec */
  OwnerName: string;
  CameraOwnerName: string;
  /** called `BodySerialNumber` by the EXIF spec */
  SerialNumber: string;
  BodySerialNumber: string;
  LensSerialNumber: string;
  HostComputer: string;
} & T;

export type ExifCameraInfo<T extends object = EmptyObject> = {
  Make: string;
  Model: string;
  UniqueCameraModel: string;
  LocalizedCameraModel: string;
  LensMake: string;
  LensModel: string;
  /**
   * 4 rational values giving focal and aperture ranges,
   * called `LensSpecification` by the EXIF spec.
   */
  LensInfo: [number, number, number, number];
  LensSpecification: [number, number, number, number];

  /** used by some obscure software */
  OriginalFileName: string;
  OriginalRawFileName: string;
  ReelName: string;

  Orientation: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  ImageWidth: number;
  ExifImageWidth: number;
  ImageHeight: number;
  ExifImageHeight: number;
  BitsPerSample: number;

  /**
   * Details on compression values can be found here:
   * [Compression Values](https://exiftool.org/TagNames/EXIF.html#Compression).
   *
   * You may reference as a number or leverage the exposed `ExifCompression`
   * enumeration for more contextual info.
   */
  Compression: number;

  /**
   * - `1` - No dithering or half-toning
   * - `2` - Ordered dither or halftone
   * - `3` - Randomized dither
   */
  Thresholding: 1 | 2 | 3;

  /**
   * - `1` - Normal
   * - `2` - Reversed
   */
  FillOrder: 1 | 2;

  /**
   * - `0` - WhiteIsZero
   * - `1` - BlackIsZero
   * - `2` - RGB
   * - `3` - RGB Palette
   * - `4` - Transparency Mask
   *
   * For full list reference [docs](https://exiftool.org/TagNames/EXIF.html)
   */
  PhotometricInterpretation: number;

  SceneCaptureType: ExifSceneCaptureType;
  GainControl: ExifGainControl;
  Contrast: ExifContrast | string;
  Saturation: ExifSaturation;
  Sharpness: ExifSharpness | string;

  /**
   * Applies to **EXIF:ISO** tag:
   *
   *   - `0` - Unknown
   *   - `1` - Standard Output Sensitivity
   *   - `2` - Recommended Exposure Index
   *   - `3` - ISO Speed
   *   - `4` - Standard Output Sensitivity and Recommended Exposure Index
   *   - `5` - Standard Output Sensitivity and ISO Speed
   *   - `6` - Recommended Exposure Index and ISO Speed
   *   - `7` - Standard Output Sensitivity, Recommended Exposure Index and ISO Speed
   */
  SensitivityType: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  StandardOutputSensitivity: number;
  RecommendedExposureIndex: number;
  /**
   * called `ISOSpeedRatings` by EXIF 2.2, then `PhotographicSensitivity` by the EXIF 2.3 spec.
   */
  ISO: number;
  ISOSpeed: number;
  Exposure: string;
  ExposureIndex: number;
  Shadows: string;
  Brightness: string;
  Smoothness: string;
  MoireFilter: string;

  /**
   * - `0` - Unknown
   * - `1` - Average
   * - `2` - Center-weighted average
   * - `3` - Spot
   * - `4` - Multi-spot
   * - `5` - Multi-segment
   * - `6` - Partial
   * - `255` - Other
   */
  MeteringMode: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 255;

  /**
   * - `0` - Auto
   * - `1` - Manual
   * - `2` - Auto bracket
   */
  ExposureMode: 0 | 1 | 2;

  /**
   * Only values `0` and `1` are to the EXIF spec but Apple IOS devices use all
   *
   * - `0` - Normal
   * - `1` - Custom
   * - `2` - HDR (no original saved)
   * - `3` - HDR (original saved)
   * - `4` - Original (for HDR)
   * - `6` - Panorama
   * - `7` - Portrait HDR
   * - `8` - Portrait
   */
  CustomRendered: 0 | 1 | 2 | 3 | 4 | 6 | 7 | 8;

  LightSource: ExifLightSource;
  Flash: ExifFlashValues;
  FlashEnergy: number;

  SubjectDistance: number;
  SubjectDistanceRange: ExifSubjectDistance;
  SubjectLocation: [number, number];
  DepthNear: number;
  DepthFar: number;
  DepthMeasureType: 0 | 1 | 2;

  DigitalZoomRatio: number;
  FocalLengthIn35mmFormat: number;
  FocalLength: number;

  /**
   * - `0x1` - sRGB
   * - `0x2` - Adobe RGB
   * - `0xfffd` - Wide Gamut RGB
   * - `0xfffe` - ICC Profile
   * - `0xffff` - Uncalibrated
   *
   * Note: the value of `0x2` is not standard EXIF. Instead, an Adobe RGB image
   * is indicated by "Uncalibrated" with an InteropIndex of "R03". The values
   * 0xfffd and 0xfffe are also non-standard, and are used by some Sony cameras.
   */
  Colorspace: 0x1 | 0x2 | 0xfffd | 0xfffe | 0xffff;
  Gamma: number;
  /**
   * The actual `PixelFormat` values are 16-byte GUID's but the leading 15 bytes,
   * '6fddc324-4e03-4bfe-b1853-d77768dc9', have been removed below to avoid
   * unnecessary clutter:
   *
   * - `0x5` = Black & White
   * - `0x8` = 8-bit Gray
   * - `0x9` = 16-bit BGR555
   * - `0xa` = 16-bit BGR565
   * - `0xb` = 16-bit Gray
   * - `0xc` = 24-bit BGR
   * - `0xd` = 24-bit RGB
   * - `0xe` = 32-bit BGR
   * - `0xf` = 32-bit BGRA
   * - `0x10` = 32-bit PBGRA
   * - `0x11` = 32-bit Gray Float
   * - `0x12` = 48-bit RGB Fixed Point
   * - `0x13` = 32-bit BGR101010
   * - `0x15` = 48-bit RGB
   * - `0x16` = 64-bit RGBA
   * - `0x17` = 64-bit PRGBA
   * - `0x18` = 96-bit RGB Fixed Point
   * - `0x19` = 128-bit RGBA Float
   * - `0x1a` = 128-bit PRGBA Float
   * - `0x1b` = 128-bit RGB Float
   * - `0x1c` = 32-bit CMYK
   * - `0x1d` = 64-bit RGBA Fixed Point
   * - `0x1e` = 128-bit RGBA Fixed Point
   * - `0x1f` = 64-bit CMYK
   * - `0x20` = 24-bit 3 Channels
   * - `0x21` = 32-bit 4 Channels
   * - `0x22` = 40-bit 5 Channels
   * - `0x23` = 48-bit 6 Channels
   * - `0x24` = 56-bit 7 Channels
   * - `0x25` = 64-bit 8 Channels
   * - `0x26` = 48-bit 3 Channels
   * - `0x27` = 64-bit 4 Channels
   * - `0x28` = 80-bit 5 Channels
   * - `0x29` = 96-bit 6 Channels
   * - `0x2a` = 112-bit 7 Channels
   * - `0x2b` = 128-bit 8 Channels
   * - `0x2c` = 40-bit CMYK Alpha
   * - `0x2d` = 80-bit CMYK Alpha
   * - `0x2e` = 32-bit 3 Channels Alpha
   * - `0x2f` = 40-bit 4 Channels Alpha
   * - `0x30` = 48-bit 5 Channels Alpha
   * - `0x31` = 56-bit 6 Channels Alpha
   * - `0x32` = 64-bit 7 Channels Alpha
   * - `0x33` = 72-bit 8 Channels Alpha
   * - `0x34` = 64-bit 3 Channels Alpha
   * - `0x35` = 80-bit 4 Channels Alpha
   * - `0x36` = 96-bit 5 Channels Alpha
   * - `0x37` = 112-bit 6 Channels Alpha
   * - `0x38` = 128-bit 7 Channels Alpha
   * - `0x39` = 144-bit 8 Channels Alpha
   * - `0x3a` = 64-bit RGBA Half
   * - `0x3b` = 48-bit RGB Half
   * - `0x3d` = 32-bit RGBE
   * - `0x3e` = 16-bit Gray Half
   * - `0x3f` = 32-bit Gray Fixed Point
   *
   * > NOTE: tags 0xbc** are used in Windows HD Photo (HDP and WDP) images
   `*/
  PixelFormat: number;

  /**
   * - `0` - Horizontal (normal)
   * - `1` - Mirror vertical
   * - `2` - Mirror horizontal
   * - `3` - Rotate 180
   * - `4` - Rotate 90 CW
   * - `5` - Mirror horizontal and rotate 90 CW
   * - `6` - Mirror horizontal and rotate 270 CW
   * - `7` - Rotate 270 CW
   */
  Transformation: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

  Whitebalance: number;

  BrightnessValue: number;
  /** Used but EXIF standard is `ExposureBiasValue` */
  ExposureCompensation: number;
  /** EXIF standard for Exposure bias */
  ExposureBiasValue: number;

  /** displayed in seconds, but stored as an APEX value */
  ShutterSpeedValue: number;
  /** displayed as an F number, but stored as an APEX value */
  ApertureValue: number;
  /** displayed as an F number, but stored as an APEX value */
  MaxApertureValue: number;

  EnhanceParams: string;

  /**
   *
   */
  FileSource: 1 | 2 | 3 | "\x03\x00\x00\x00";

  /**
   * Ambient temperature in degrees C, called `Temperature` by the EXIF spec
   */
  AmbientTemperature: number;
  /** Ambient temperature in degrees C */
  Temperature: number;
  Humidity: number;
  Pressure: number;
  WaterDepth: number;
  Acceleration: number;
  CameraElevationAngle: number;
} & T;

export type ExifPhotoContext<T extends object = EmptyObject> = {
  ImageDescription: string;
  DocumentName: string;
  UserComment: string;

  Annotations: string;
  XPSubject: number;
  XPKeywords: number;
  XPAuthor: number;
  XPComments: number;

  Rating: number;
  RatingPercent: number;
} & T;

/**
 * Typing for GPS properties that are part of EXIF spec.
 * Details can be found: [here](https://exiftool.org/TagNames/GPS.html).
 */
export type ExifGps = {
  GPSVersionID: number;
  GPSLatitudeRef: "N" | "S";
  GPSLatitude: number;
  GPSLongitudeRef: "E" | "W";
  GPSLongitude: number;
  /**
   * - `0` is above sea level
   * - `1` is below sea level
   */
  GPSAltitudeRef: 0 | 1;
  GPSAltitude: number;
  /**
   * UTC time of GPS fix. When writing, date is stripped off if present,
   * and time is adjusted to UTC if it includes a timezone
   */
  GPSTimeStamp: string;
  GPSSatellites: string;
  GPSStatus: "A" | "V";
  GPSMeasureMode: "2" | "3";
  /**
   * - `K` - km/h
   * - `M` - mph
   * - `N` = knots
   */
  GPSSpeedRef: "K" | "M" | "N";
  GPSSpeed: number;
  GPSTrack: number;
  GPSImgDirectionRef: "M" | "T";
  GPSImgDirection: number;
  GPSMapDatum: string;
  GPSDestLatitudeRef: "N" | "S";
  GPSDestLatitude: number;
  GPSDestLongitudeRef: "N" | "S";
  GPSDestLongitude: number;
  GPSDestBearingRef: "M" | "T";
  GPSDestBearing: number;
  /**
   * - `K` - Kilometers
   * - `M` - Miles
   * - `N` = Nautical Miles
   */
  GPSDestDistanceRef: "K" | "M" | "N";
  GPSDestDistance: number;
  GPSProcessingMethod: "GPS" | "CELLID" | "WLAN" | "MANUAL";
  GPSAreaInformation: string;
  /**
   * When writing, time is stripped off if present, after adjusting
   * date/time to UTC if time includes a timezone. Format is `YYYY:mm:dd`.
   */
  GPSDateStamp: `${number}:${number}:${number}`;
  /**
   * `0` - no correction
   * `1` - differential corrected
   */
  GPSDifferential: 0 | 1;
  GPSHPositioningError: number;
};
/**
 * EXIF metadata payload fields.
 * Detailed info can be found here:
 * [EXIF Tags](https://exiftool.org/TagNames/EXIF.html).
 */
export type Exif<T extends object = EmptyObject> = Partial<
  ExifAttributionInfo &
    ExifCameraInfo &
    ExifDateTimeInfo &
    ExifGps &
    ExifExtraneous &
    ExifPhotoContext
> &
  T;
