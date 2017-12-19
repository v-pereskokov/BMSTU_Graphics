export default class Vector {
  static add(lhs, rhs) {
    return [Vector.__add(lhs[0], rhs[0]), Vector.__add(lhs[1], rhs[1])];
  }

  static minus(lhs, rhs) {
    return [Vector.__minus(lhs[0], rhs[0]), Vector.__minus(lhs[1], rhs[1])];
  }

  static scale(vector, n) {
    return [n * vector[0], n * vector[1]];
  }

  static rotate(vector, degrees) {
    const radians = degrees * Math.PI / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    return [Vector.__minus(cos * vector[0], sin * vector[1]),
      Vector.__add(sin * vector[0], cos * vector[1])];
  }

  static __add(lhs, rhs) {
    return lhs + rhs;
  }

  static __minus(lhs, rhs) {
    return lhs - rhs;
  }
}
