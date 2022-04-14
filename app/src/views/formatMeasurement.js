import { ranges } from "./ranges.js";

export default function formatMeasurement(value, range, nrOfDigits) {
  const value_mult = value * ranges[range].multiplier;
  var value_string = value_mult.toPrecision(6);
  value_string = value_string.replace("-", "");
  var before_decimal = value_string.split(".")[0];
  var after_decimal = value_string.split(".")[1];
  // Remove leading zeros from before_decimal
  before_decimal = before_decimal.replace(/^0+/, "");
  // Remove trailing zeros from after_decimal
  after_decimal = after_decimal.replace(/0+$/, "");

  // Add leading zeros to before_decimal
  before_decimal = before_decimal.padStart(
    ranges[range].digitsBeforeDecimal,
    "0"
  );

  // Add trailing zeros to after_decimal
  after_decimal = after_decimal.padEnd(
    nrOfDigits - ranges[range].digitsBeforeDecimal + 1,
    "0"
  );

  const sign = value < 0 ? "-" : "+";
  return `${sign}${before_decimal}.${after_decimal}`;
}
