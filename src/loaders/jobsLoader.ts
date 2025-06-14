import path from "path";
import fs from "fs/promises";
import cron from "node-cron";
import { ClientDiscord } from "../client";
import { jobInterface } from "@interfaces/jobs";
import { logger } from "@logging/logger";
import chalk from "chalk";

export class JobsLoader {
  constructor(private readonly client: ClientDiscord) {}

  public async registerJobs(): Promise<void> {
    try {
      const jobs = await this.loadJobs();

      for (const job of jobs) {
        cron.schedule(job.cron, async () => {
          console.log(`Executing job: ${job.description}`);
          await job.execute();
        });
      }

      logger.success({
        prefix: "discord-jobs",
        message: `Successfully loaded ${chalk.blueBright(jobs.length)} jobs.`,
      });
    } catch (error) {
      logger.error({
        prefix: "discord-jobs",
        message: `Error loading jobs: ${error.message}`,
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
        console.error(`Error loading job file ${fullPath}:`, error);
      }
    }
  }
}
