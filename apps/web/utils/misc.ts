import numeral from "numeral";

export function nFormatter(number: number) {
  return numeral(number).format("0.[00]a").toUpperCase();
}
