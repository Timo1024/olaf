import { Command } from "./Command";
import { Hello } from "./commands/hello";
import { UserInfo } from "./commands/user_data";

export const Commands: Command[] = [UserInfo, Hello];