import {
  AMAZON_DNS,
  APPLE_DNS,
  BEST_BUY_DNS,
  CHEWY_DNS,
  COSTCO_DNS,
  CVS_DNS,
  DELL_DNS,
  EBAY_DNS,
  ETSY_DNS,
  HM_DNS,
  HOME_DEPOT_DNS,
  IKEA_DNS,
  KROGER_DNS,
  LOWES_DNS,
  MACYS_DNS,
  NIKE_DNS,
  TARGET_DNS,
  WALGREENS_DNS,
  WALMART_DNS,
  WAYFAIR_DNS,
  WHOLE_FOODS_DNS,
  ZARA_DNS
} from "@inferred-types/constants";
import { UrlsFrom } from "./Url";

export type AmazonUrl = UrlsFrom<typeof AMAZON_DNS>
export type WalmartUrl = UrlsFrom<typeof WALMART_DNS>;
export type AppleUrl = UrlsFrom<typeof APPLE_DNS>;
export type HomeDepotUrl = UrlsFrom<typeof HOME_DEPOT_DNS>;
export type EbayUrl = UrlsFrom<typeof EBAY_DNS>;
export type TargetUrl = UrlsFrom<typeof TARGET_DNS>;
export type EtsyUrl = UrlsFrom<typeof ETSY_DNS>;
export type CostCoUrl = UrlsFrom<typeof COSTCO_DNS>;
export type BestBuyUrl = UrlsFrom<typeof BEST_BUY_DNS>;

export type MacysUrl = UrlsFrom<typeof MACYS_DNS>;
export type CostcoUrl = UrlsFrom<typeof COSTCO_DNS>;
export type ChewyUrl = UrlsFrom<typeof CHEWY_DNS>;
export type WayFairUrl = UrlsFrom<typeof WAYFAIR_DNS>;
export type NikeUrl = UrlsFrom<typeof NIKE_DNS>;
export type LowesUrl = UrlsFrom<typeof LOWES_DNS>;
export type IkeaUrl = UrlsFrom<typeof IKEA_DNS>;
export type DellUrl = UrlsFrom<typeof DELL_DNS>;
export type HandMUrl = UrlsFrom<typeof HM_DNS>;
export type ZaraUrl = UrlsFrom<typeof ZARA_DNS>;
export type KrogerUrl = UrlsFrom<typeof KROGER_DNS>;
export type WalgreensUrl = UrlsFrom<typeof WALGREENS_DNS>;
export type CvsUrl = UrlsFrom<typeof CVS_DNS>;
export type WholeFoodsUrl = UrlsFrom<typeof WHOLE_FOODS_DNS>;

/**
 * represents URL patterns of many of the top worldwide retailers
 */
export type RetailUrl =
| AmazonUrl | WalmartUrl | AppleUrl | HomeDepotUrl | EbayUrl | TargetUrl
| EtsyUrl | CostCoUrl | BestBuyUrl | MacysUrl | ChewyUrl
| WayFairUrl | NikeUrl | LowesUrl | IkeaUrl | DellUrl
| HandMUrl | ZaraUrl | KrogerUrl | WalgreensUrl | CvsUrl | WholeFoodsUrl;
