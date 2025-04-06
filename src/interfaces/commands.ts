import { ClientDiscord } from "../client";
import {
  ApplicationCommandData,
  ButtonInteraction,
  Collection,
  CommandInteraction,
  CommandInteractionOptionResolver,
  ModalSubmitInteraction,
  StringSelectMenuInteraction,
} from "discord.js";

export interface CommandProps {
  client: ClientDiscord;
  interaction: CommandInteraction;
  options: CommandInteractionOptionResolver;
}

export type ComponentsButton = Collection<
  string,
  (interaction: ButtonInteraction) => void
>;

export type ComponentsSelect = Collection<
  string,
  (interaction: StringSelectMenuInteraction) => void
>;

export type ComponentsModal = Collection<
  string,
  (interaction: ModalSubmitInteraction) => void
>;

interface CommandComponents {
  buttons?: ComponentsButton;
  selects?: ComponentsSelect;
  modals?: ComponentsModal;
}

export type CommandType = ApplicationCommandData &
  CommandComponents & {
    execute: (props: CommandProps) => void;
  };

export class Command {
  constructor(options: CommandType) {
    options.dmPermission = false;
    Object.assign(this, options);
  }
}
