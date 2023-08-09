import * as jwt from 'jsonwebtoken';

export interface Identifiable {
  id: number;
}

export default class JwtToken {
  private secret: string = process.env.JWT_SECRET ?? 'secret';

  public sign(payload: Identifiable): string {
    return jwt.sign(payload, this.secret);
  }

  public verify(token: string): Identifiable | undefined {
    try {
      return jwt.verify(token, this.secret) as Identifiable;
    } catch (error) {
      return undefined;
    }
  }
}
