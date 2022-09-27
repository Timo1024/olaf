import { Command, UICommand } from "./Command";

// TODO for new CHAT_INPUT command commands
// import all commands from each file in 
import { Hello } from "./commands/hello";
import { UserInfo } from "./commands/user_data";
import { Miesmuschel } from "./commands/miesmuschel";
import { addArchive } from "./commands/archive/addArchive";
import { editArchive } from "./commands/archive/editArchive";
import { viewArchive } from "./commands/archive/viewArchive";
import { viewRandomArchive } from "./commands/archive/viewRandomArchive";
import { deleteArchive } from "./commands/archive/deleteArchive";

// TODO for all new MESSAGE UI commands
import { MessageInfo } from "./commands/ui_message/message_info";

// TODO for new command
// add alls commands to this array
export const Commands: (Command | UICommand)[] = [
    UserInfo, 
    Hello, 
    Miesmuschel, 
    MessageInfo, 
    addArchive, 
    editArchive, 
    viewArchive,
    viewRandomArchive,
    deleteArchive
];