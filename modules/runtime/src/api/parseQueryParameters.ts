/**
 * Parses a URL query parameter string into a key/value pair object.
 *
 * This function handles various edge cases, including:
 * - Leading `?` character
 * - URL-encoded characters
 * - Multiple values for the same key (only the first occurrence is considered)
 * - Empty query strings
 *
 * @example
 * ```ts
 * const query = "?name=John&age=30&city=New%20York&encoded=%26%3D";
 * const params = parseQueryParams(query);
 * // params = { name: "John", age: "30", city: "New York", encoded: "&=" }
 * ```
 *
 * @param query - The query parameter string to parse. It may or may not start with a `?`.
 * @returns An object where each key is a query parameter name and each value is the corresponding value.
 */
export function parseQueryParams(query: string): Record<string, string> {
  // Remove the leading '?' if present
  const trimmedQuery = query.startsWith("?") ? query.slice(1) : query;

  // Initialize an empty object to hold the key/value pairs
  const params: Record<string, string> = {};

  // If the trimmed query is empty, return the empty params object
  if (!trimmedQuery) {
    return params;
  }

  // Split the query string by '&' to get individual key=value pairs
  const pairs = trimmedQuery.split("&");

  // Iterate over each pair
  for (const pair of pairs) {
    // Skip empty pairs (e.g., trailing '&' or '&&')
    if (!pair)
      continue;

    // Split the pair by '=' to separate key and value
    const [rawKey, rawValue] = pair.split("=");

    // Decode URI components to handle URL-encoded characters
    const key = decodeURIComponent(rawKey || "").trim();
    const value = decodeURIComponent(rawValue || "").trim();

    // If the key is empty after decoding, skip this pair
    if (!key)
      continue;

    // If the key already exists, we can choose to overwrite or skip
    // Here, we choose to overwrite with the first occurrence
    if (!(key in params)) {
      params[key] = value;
    }
    // Alternatively, to handle multiple values per key, you could modify the type and logic
    // For example, use Record<string, string | string[]>
  }

  return params;
}
