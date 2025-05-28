export class NumberUtil {
  static RoundNumber(input: number, len = 2): number {
    if (!input) {
      return input;
    }
    return parseFloat(input.toFixed(len));

    // return Math.round( input * 100 + Number.EPSILON ) / 100
  }

  static ConvertToNumberOrNull(input: object, defaultValue: number | null = null) {
    if (input === undefined || input === null) {
      return defaultValue;
    }

    if (typeof input === 'number') {
      return input;
    }

    if (typeof input === 'string' && !isNaN(Number(input))) {
      return Number(input);
    }

    return defaultValue;
  }

  static RoundOff(input: number, rounding = 0.25): number {
    if (!input) {
      return input;
    }
    return Math.round(input / rounding) * rounding;
  }
}
