import { Injectable } from '@angular/core';
import { EMOJIS_LIST } from './data/emojis-list';
import { LogConfigItem } from './models/log-config-item';
import { ModuleEmojiConfig } from './models/module-emoji-config';

/**
 * FTPS Logger Service. Log clean and colorful messages to the console, with level and module-specific control.
 */
@Injectable({
  providedIn: 'root',
})
export class FtpsLoggerService {
  private configurations: LogConfigItem[] = [];
  private levels = [
    '🔵   INFO',
    '🟢   SUCCESS',
    '🟡   WARNING',
    '🔴   ERROR',
    '🐞   DEBUG',
  ];
  private randomEmojisSeed = EMOJIS_LIST;
  private moduleEmojiSetups: ModuleEmojiConfig[] = [];
  private availableEmojiPool: string[] = [];
  constructor() {}

  public saveConfigs(configs: LogConfigItem[]) {
    for (const config of configs) {
      this.saveConfig(config);
    }
  }

  public saveConfig(config: LogConfigItem) {
    const existingConfig = this.configurations.find(
      (c) => c.module === config.module
    );
    if (this.isNullOrUndefined(existingConfig)) {
      this.configurations.push(config);
    } else {
      // added check for Angular Strict Mode
      if (existingConfig) {
        existingConfig.level = config.level;
      }
    }
  }

  public logInfo(module: string, title: string, ...messages: any[]) {
    this.doLog(module, title, 'log', 0, ...messages);
  }

  public logSuccess(module: string, title: string, ...messages: any[]) {
    this.doLog(module, title, 'log', 1, ...messages);
  }

  public logWarning(module: string, title: string, ...messages: any[]) {
    this.doLog(module, title, 'warn', 2, ...messages);
  }

  public logError(module: string, title: string, ...messages: any[]) {
    this.doLog(module, title, 'error', 3, ...messages);
  }

  public logDebug(module: string, title: string, ...messages: any[]) {
    this.doLog(module, title, 'log', 4, ...messages);
  }

  private canLog(module: string, idx: number) {
    const thisConfig = this.configurations.find((c) => c.module === module);
    if (this.isNullOrUndefined(thisConfig)) {
      const globalConfig = this.configurations.find(
        (c) => c.module === 'GLOBAL'
      );
      if (this.isNullOrUndefined(globalConfig)) {
        return false;
      }
      return globalConfig && globalConfig.level[idx] === '1';
    }
    const thisBit = thisConfig ? thisConfig.level[idx] : '0';
    return thisBit === '1';
  }

  private doLog(
    module: string,
    title: string,
    action: string,
    level: number,
    ...messages: any[]
  ): void {
    if (!this.canLog(module, level)) {
      return;
    }

    const randomEmoji = this.getRandomEmoji(module);
    const padLength = 35;
    const emojiPad = 5;

    // console.groupCollapsed(
    //   `${this.levels[level].padEnd(12, ' ')}`,
    //   randomEmoji.padStart(emojiPad, ' '),
    //   `[${module}]`.padEnd(padLength, ' '),
    //   title
    // );
    console.log(
      `${this.levels[level].padEnd(12, ' ')}`,
      randomEmoji.padStart(emojiPad, ' '),
      `[${module}]`.padEnd(padLength, ' '),
      title
    );
    for (const msg of messages) {
      if (Array.isArray(msg)) {
        console.table(msg);
      } else {
        switch (action) {
          case 'log':
            console.log(msg);
            break;
          case 'warn':
            console.warn(msg);
            break;
          case 'error':
            console.error(msg);
            break;
          default:
            console.log(msg);
            break;
        }
      }
    }
    // console.groupEnd();
  }

  private getRandomEmoji(module: string): string {
    const existingRandEmojiSetup = this.moduleEmojiSetups.find(
      (rp) => rp.module === module
    );
    if (!this.availableEmojiPool.length) {
      this.availableEmojiPool = [...this.randomEmojisSeed];
    }
    let randomEmoji = '😺';
    if (!existingRandEmojiSetup) {
      const randomIdx = this.getRandomInt(
        0,
        this.availableEmojiPool.length - 1
      );
      randomEmoji = this.availableEmojiPool.splice(randomIdx, 1)[0] ?? '👾';
      this.moduleEmojiSetups.push({
        module: module,
        emoji: randomEmoji,
      });
    } else {
      randomEmoji = existingRandEmojiSetup.emoji;
    }
    return randomEmoji;
  }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive).
   * The value is no lower than min (or the next integer greater than min
   * if min isn't an integer) and no greater than max (or the next integer
   * lower than max if max isn't an integer).
   * Using Math.round() will give you a non-uniform distribution!
   */
  private getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private isNullOrUndefined(input: any): boolean {
    return input === null || typeof input === 'undefined';
  }
}
