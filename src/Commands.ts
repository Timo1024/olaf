import { Command } from "./Command";

// TODO for new command
// import all commands from each file in 
import { Hello } from "./commands/hello";
import { UserInfo } from "./commands/user_data";
import { Miesmuschel } from "./commands/miesmuschel";

// TODO for new command
// add alls commands to this array
export const Commands: Command[] = [UserInfo, Hello, Miesmuschel];