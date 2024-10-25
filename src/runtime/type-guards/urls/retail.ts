import { AmazonUrl, AppleUrl, BestBuyUrl, CostCoUrl, CvsUrl, DellUrl, EbayUrl, EtsyUrl, HandMUrl, HomeDepotUrl, IkeaUrl, KrogerUrl, LowesUrl, MacysUrl, NikeUrl, RetailUrl, TargetUrl, WalgreensUrl, WalmartUrl, WayFairUrl, WholeFoodsUrl, ZaraUrl } from "src/types/string-literals";
import { isString } from "../isString";
import {
  AMAZON_DNS,
  APPLE_DNS,
  BEST_BUY_DNS,
  COSTCO_DNS,
  CVS_DNS,
  DELL_DNS,
  EBAY_DNS,
  ETSY_DNS,
  HM_DNS,
  HOME_DEPOT_DNS,
  KROGER_DNS,
  MACYS_DNS,
  NIKE_DNS,
  TARGET_DNS,
  WALGREENS_DNS,
  WALMART_DNS,
  WAYFAIR_DNS,
  WHOLE_FOODS_DNS,
  ZARA_DNS,
} from "src/constants/index";

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Whole Food Markets**.
 */
export const isWholeFoodsUrl = (val: unknown): val is WholeFoodsUrl => {
  return isString(val) && WHOLE_FOODS_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **CVS** pharmacy.
 */
export const isCvsUrl = (val: unknown): val is CvsUrl => {
  return isString(val) && CVS_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Walgreens** pharmacy.
 */
export const isWalgreensUrl = (val: unknown): val is WalgreensUrl => {
  return isString(val) && WALGREENS_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **CVS** pharmacy.
 */
export const isKrogersUrl = (val: unknown): val is KrogerUrl => {
  return isString(val) && KROGER_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **CVS** pharmacy.
 */
export const isZaraUrl = (val: unknown): val is ZaraUrl => {
  return isString(val) && ZARA_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **H&M** retailer.
 */
export const isHmUrl = (val: unknown): val is HandMUrl => {
  return isString(val) && HM_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Dell** retailer.
 */
export const isDellUrl = (val: unknown): val is DellUrl => {
  return isString(val) && DELL_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Ikea** retailer.
 */
export const isIkeaUrl = (val: unknown): val is IkeaUrl => {
  return isString(val) && KROGER_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Lowes** retailer.
 */
export const isLowesUrl = (val: unknown): val is LowesUrl => {
  return isString(val) && KROGER_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Macy's** retailer.
 */
export const isNikeUrl = (val: unknown): val is NikeUrl => {
  return isString(val) && NIKE_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Macy's** retailer.
 */
export const isWayfairUrl = (val: unknown): val is WayFairUrl => {
  return isString(val) && WAYFAIR_DNS.some(i => val.startsWith(`https://${i}`));
}
/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Macy's** retailer.
 */
export const isBestBuyUrl = (val: unknown): val is BestBuyUrl => {
  return isString(val) && BEST_BUY_DNS.some(i => val.startsWith(`https://${i}`));
}
/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Macy's** retailer.
 */
export const isCostCoUrl = (val: unknown): val is CostCoUrl => {
  return isString(val) && COSTCO_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Macy's** retailer.
 */
export const isEtsyUrl = (val: unknown): val is EtsyUrl => {
  return isString(val) && ETSY_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Macy's** retailer.
 */
export const isTargetUrl = (val: unknown): val is TargetUrl => {
  return isString(val) && TARGET_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Macy's** retailer.
 */
export const isEbayUrl = (val: unknown): val is EbayUrl => {
  return isString(val) && EBAY_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for the **Home Depot** retailer.
 */
export const isHomeDepotUrl = (val: unknown): val is HomeDepotUrl => {
  return isString(val) && HOME_DEPOT_DNS.some(i => val.startsWith(`https://${i}`));
}
/**
 * type guard which validates that the `val` passed in is a valid URL
 * for the **Macy's** retailer.
 */
export const isMacysUrl = (val: unknown): val is MacysUrl => {
  return isString(val) && MACYS_DNS.some(i => val.startsWith(`https://${i}`));
}


/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Apple**.
 */
export const isAppleUrl = (val: unknown): val is AppleUrl => {
  return isString(val) && APPLE_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Walmart**.
 */
export const isWalmartUrl = (val: unknown): val is WalmartUrl => {
  return isString(val) && WALMART_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which validates that the `val` passed in is a valid URL
 * for **Walmart**.
 */
export const isAmazonUrl = (val: unknown): val is AmazonUrl => {
  return isString(val) && AMAZON_DNS.some(i => val.startsWith(`https://${i}`));
}

/**
 * type guard which check if the passed in value is a Url for one
 * of the top retailers in the world
 */
export const isRetailUrl = (val: unknown): val is RetailUrl => {
  return isAmazonUrl(val) || isWalgreensUrl(val) || isAppleUrl(val) || isMacysUrl(val) || isEbayUrl(val) || isHomeDepotUrl(val) || isTargetUrl(val) || isEtsyUrl(val) || isCostCoUrl(val) || isBestBuyUrl(val) || isWayfairUrl(val) || isNikeUrl(val) || isLowesUrl(val) || isIkeaUrl(val) || isDellUrl(val) || isHmUrl(val) || isZaraUrl(val) || isKrogersUrl(val) || isWalgreensUrl(val) || isCvsUrl(val) || isWholeFoodsUrl(val)

}
