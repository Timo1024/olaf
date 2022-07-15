import { Command, UICommand } from "./Command";

// TODO for new CHAT_INPUT command commands
// import all commands from each file in 
import { Hello } from "./commands/hello";
import { UserInfo } from "./commands/user_data";
import { Miesmuschel } from "./commands/miesmuschel";

// TODO for all new MESSAGE UI commands
import { Test } from "./commands/ui_message/test";

// TODO for new command
// add alls commands to this array
export const Commands: Command[] = [UserInfo, Hello, Miesmuschel];
export const UICommands : UICommand[] = [Test]