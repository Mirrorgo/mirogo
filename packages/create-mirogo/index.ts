#!/usr/bin/env zx

import { chalk } from "zx";
import { readdir } from "fs/promises";
import { PromptObject } from "prompts";
import prompts from "prompts";

const log = console.log;

const questions: PromptObject<string>[] = [
  {
    type: "select",
    name: "color",
    message: "Pick a color",
    choices: [
      { title: "yes", value: "yes" },
      { title: "no", value: "no" },
      {
        title: "Red",
        description: "This option has a description.",
        value: "#ff0000",
      },
      { title: "Green", value: "#00ff00" },
      { title: "Yellow", value: "#ffff00", disabled: true },
    ],
  },
];

const result: prompts.Answers<"color"> = await prompts(questions);

const answer = result.color;

if (answer.toLowerCase() === "yes") {
  log(chalk.green("Creating moodboard..."));
  // 这里可以添加创建 moodboard 的逻辑
} else if (answer.toLowerCase() === "no") {
  const componentsDir = "components";
  try {
    const files = await readdir(componentsDir);
    log(chalk.green("Files in components directory:"));
    files.forEach((file) => log(chalk.blue(file)));
  } catch (err) {
    log(chalk.red("Error reading directory:"), err);
  }
} else {
  log(chalk.red("Invalid answer. Please answer 'yes' or 'no'."));
}
