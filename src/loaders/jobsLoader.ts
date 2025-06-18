import path from "path";
import fs from "fs/promises";
import cron from "node-cron";
import { ClientDiscord } from "../client";
import { jobInterface } from "@interfaces/jobs";
import { logger } from "@logging/logger";
import chalk from "chalk";
import isDev from "@shared/utils/isDev";

export class JobsLoader {
  constructor(private readonly client: ClientDiscord) {}

  public async registerJobs(): Promise<void> {
    try {
      const jobs = await this.loadJobs();

      for (const job of jobs) {
        cron.schedule(
          job.cron,
          async () => {
            logger.info({
              prefix: "discord-jobs",
              message: `Executando job: ${job.description}`,
            });
            await job.execute();
          },
          {
            timezone: "America/Sao_Paulo",
          },
        );
      }

      logger.success({
        prefix: "discord-jobs",
        message: `Carregado com sucesso ${chalk.blueBright(jobs.length)} jobs.`,
      });
    } catch (error) {
      logger.error({
        prefix: "discord-jobs",
        message: `Erro ao carregar jobs: ${error.message}`,
      });
    }
  }

  private async loadJobs(): Promise<jobInterface[]> {
    const jobs: jobInterface[] = [];
    const jobsDir = path.join(__dirname, "..", "jobs");

    await this.readJobsRecursively(jobsDir, jobs);

    return jobs;
  }

  private async readJobsRecursively(
    dir: string,
    jobs: jobInterface[],
  ): Promise<void> {
    const files = await fs.readdir(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);

      if (file.isDirectory()) {
        if (!isDev() && file.name === "dev") {
          continue;
        }
        await this.readJobsRecursively(fullPath, jobs);
        continue;
      }

      if (!file.name.endsWith(".ts") && !file.name.endsWith(".js")) {
        continue;
      }

      try {
        const imported = await import(fullPath);
        const JobClass = imported.default;

        if (typeof JobClass === "function") {
          const jobInstance: jobInterface = new JobClass(this.client);

          if (jobInstance?.cron && typeof jobInstance.execute === "function") {
            jobs.push(jobInstance);
          }
        }
      } catch (error) {
        logger.error({
          prefix: "discord-jobs",
          message: `Erro ao carregar o arquivo de job ${fullPath}: ${error}`,
        });
      }
    }
  }
}
