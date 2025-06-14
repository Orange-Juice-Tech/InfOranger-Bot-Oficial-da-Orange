import { ButtonInteraction } from "discord.js";

export interface IButtonHandle {
  name: string;
  execute: (interaction: ButtonInteraction) => Promise<void>;
}

export class ButtonHandle implements IButtonHandle {
  name: string;
  execute: (interaction: ButtonInteraction) => Promise<void>;
  constructor(options: IButtonHandle) {
    Object.assign(this, options);
  }
}
