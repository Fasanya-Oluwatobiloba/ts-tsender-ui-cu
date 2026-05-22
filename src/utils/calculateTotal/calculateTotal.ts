export function calculateTotal(amounts: string): number {
  return amounts
    .split(/[\n,]+/)        // split on newlines or commas
    .map((val) => parseFloat(val.trim()))
    .filter((val) => !isNaN(val))
    .reduce((acc, val) => acc + val, 0)
}
