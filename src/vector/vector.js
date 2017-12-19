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
    const c = Math.cos(radians);
    const s = Math.sin(radians);

    return [Vector.__minus(c * vector[0], s * vector[1]), Vector.__add(s * vector[0], c * vector[1])];
  }

  static __add(lhs, rhs) {
    return lhs + rhs;
  }

  static __minus(lhs, rhs) {
    return lhs - rhs;
  }
}
