import { Context, segment } from "koishi";

export const name = "command/mcCmdHelper";

interface mcCmd {
	command: string;
}

export function apply(ctx: Context) {
	const logger = ctx.logger(name);

	ctx.command("mc <command:string> [args:text]").action(
		({ session }, command, args) => {
			return `Trying to query command /${command} with argument(s) ${args}
Image test: ${segment("image", {
				url: "file:///D:\\Users\\Keritial\\Pictures\\Keritial.jpg",
			})}`;
		}
	);
}
