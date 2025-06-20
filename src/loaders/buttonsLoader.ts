import { ClientDiscord } from "../client";
import path from "path";
import fs from "fs/promises";
import { ButtonHandle } from "@interfaces/buttonHandle";
import { logger } from "@logging/logger";
import chalk from "chalk";

export class ButtonsLoader {
  constructor(private readonly client: ClientDiscord) {}

  public async registerButtons(): Promise<void> {
    try {
      const buttons = await this.loadButtons();

      for (const button of buttons) {
        this.client.registerButtons(button);
      }

      logger.success({
        prefix: "discord-buttons",
        message: `Sucesso ao carregar ${chalk.blueBright(buttons.length)} botões handler.`,
      });
    } catch (error) {
      console.error("Error ao carregar botões:", error);
    }
  }

  private async loadButtons(): Promise<Array<ButtonHandle>> {
    const buttons: Array<ButtonHandle> = [];
    const buttonDir = path.join(__dirname, "..", "buttonsHandlers");

    await this.readButtonsRecursively(buttonDir, buttons);

    return buttons;
  }

  private async readButtonsRecursively(
    dir: string,
    buttons: Array<ButtonHandle>,
  ): Promise<void> {
    const files = await fs.readdir(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        await this.readButtonsRecursively(fullPath, buttons);
        continue;
      }

      if (!file.name.endsWith(".ts") && !file.name.endsWith(".js")) {
        continue;
      }

      try {
        const imported = await import(fullPath);
        const button: ButtonHandle = imported.default;

        if (button?.name && typeof button.execute === "function") {
          buttons.push(button);
        }
      } catch (error) {
        console.error(
          `Erro ao carregar o arquivo do botão ${fullPath}:`,
          error,
        );
      }
    }
  }
}
