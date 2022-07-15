import { Command, UICommand } from "./Command";

// TODO for new CHAT_INPUT command commands
// import all commands from each file in 
import { Hello } from "./commands/hello";
import { UserInfo } from "./commands/user_data";
import { Miesmuschel } from "./commands/miesmuschel";

// TODO for all new MESSAGE UI commands
import { MessageInfo } from "./commands/ui_message/message_info";

// TODO for new command
// add alls commands to this array
export const Commands: (Command | UICommand)[] = [UserInfo, Hello, Miesmuschel, MessageInfo];