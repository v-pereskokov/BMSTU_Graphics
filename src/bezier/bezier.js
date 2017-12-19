import Vector from '../vector/vector';

export default class Bezier {
  constructor(params, rotate = null) {
    params.start = {
      angle: 0,
      length: 0.3,
      ...params.start
    };

    params.end = {
      angle: 0,
      length: 0.3,
      ...params.end
    };

    this.rotate = rotate;
    this.p1 = [params.start.x, params.start.y];
    this.p4 = [params.end.x, params.end.y];

    const v14 = Vector.minus(this.p4, this.p1);
    const v41 = Vector.scale(v14, -1);

    let v12 = Vector.scale(v14, params.start.length);
    let v43 = Vector.scale(v41, params.end.length);

    v12 = Vector.rotate(v12, params.start.angle);
    v43 = Vector.rotate(v43, params.end.angle);

    this.p2 = Vector.add(this.p1, v12);
    this.p3 = Vector.add(this.p4, v43);
  }

  update(param) {
    const f1 = Bezier.f1(param);
    const f2 = Bezier.f2(param);
    const f3 = Bezier.f3(param);
    const f4 = Bezier.f4(param);
    const pack = {};

    let x = 0;
    let y = 0;

    if (this.rotate) {
      pack.prevX = x;
      pack.prevY = y;
    }

    x = this.p1[0] * f1 + this.p2[0] * f2 + this.p3[0] * f3 + this.p4[0] * f4 + .5;
    y = this.p1[1] * f1 + this.p2[1] * f2 + this.p3[1] * f3 + this.p4[1] * f4 + .5;

    pack.x = x;
    pack.y = y;

    pack.left = `${pack.x}px`;
    pack.top = `${pack.y}px`;

    return pack;
  }

  static f1(param) {
    return (param * param * param);
  }

  static f2(param) {
    return (3 * param * param * (1 - param));
  }

  static f3(param) {
    return (3 * param * (1 - param) * (1 - param));
  }

  static f4(param) {
    return ((1 - param) * (1 - param) * (1 - param));
  }
}
