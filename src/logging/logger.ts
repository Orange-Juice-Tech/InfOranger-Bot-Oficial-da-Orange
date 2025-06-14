import { Signale } from "signale";

class Logger extends Signale {
  constructor() {
    super();
  }
}

export const logger = new Logger();
