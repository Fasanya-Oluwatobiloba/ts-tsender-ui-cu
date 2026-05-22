import { describe, it, expect } from "vitest"
import { calculateTotal } from "./calculateTotal"

describe("calculateTotal", () => {

  it("adds newline separated values", () => {
    expect(calculateTotal("100\n100\n100\n100")).toBe(400)
  })

  it("adds comma separated values", () => {
    expect(calculateTotal("100, 200, 300")).toBe(600)
  })

  it("adds mixed comma and newline separated values", () => {
    expect(calculateTotal("200, 200\n100")).toBe(500)
  })

  it("handles extra spaces around values", () => {
    expect(calculateTotal("  100  ,  200  ")).toBe(300)
  })

  it("ignores empty entries", () => {
    expect(calculateTotal("100,\n200")).toBe(300)
  })

  it("ignores non-number entries", () => {
    expect(calculateTotal("abc, 100, 200")).toBe(300)
  })

  it("handles a single value", () => {
    expect(calculateTotal("500")).toBe(500)
  })

  it("returns 0 for an empty string", () => {
    expect(calculateTotal("")).toBe(0)
  })

  it("handles decimal values", () => {
    expect(calculateTotal("1.5\n2.5\n1.0")).toBe(5)
  })

})