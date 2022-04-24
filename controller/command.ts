import { Context } from "koishi";
import moment from "moment";
import { generateRandomNumber } from "../util/random";

function dailyVerifier(lastTime?: number): boolean {
	if (!lastTime) {
		return true;
	}
	const now = moment();
	const last = moment(lastTime);
	return !(
		now.year() === last.year() && now.dayOfYear() === last.dayOfYear()
	);
}

export const name = "command";

export function apply(ctx: Context) {
	ctx.command("time").action(() =>
		moment().format("YYYY.MM.DD HH:mm:ss (Z)")
	);

	ctx.command("签到")
		.userFields(["favorability", "lastSignTime", "point"])
		.action(({ session }) => {
			if (dailyVerifier(session?.user?.lastSignTime)) {
				const gain = generateRandomNumber(8, 11);
				session!.user!.lastSignTime = Date.now();
				session!.user!.point += gain;
				return `签到成功！+${gain}点数`;
			} else {
				return "你今天已经签到过了，请明天再来吧！人(￣ω￣;)";
			}
		});
	ctx.command("喝妹汁")
		.userFields(["favorability", "lastAiekiTime", "hValue"])
		.action(({ session }) => {
			if (dailyVerifier(session?.user?.lastAiekiTime)) {
				// 好感度
				const gainF = generateRandomNumber(2, 6);
				// H值
				const gainH = generateRandomNumber(1, 4);
				session!.user!.lastAiekiTime = Date.now();
				session!.user!.favorability += gainF;
				session!.user!.hValue += gainH;
				session?.send("妹汁真好喝！咕嘟咕嘟");
				session?.send(`H值+${gainH}
好感度+${gainF}`);
				return;
			} else {
				return "今天的妹汁已经喝过了吧！那就等明天再来啦！(。·ˇ_ˇ·。)";
			}
		});
	ctx.command("最喜欢喵喵了")
		.userFields(["favorability", "lastLoveDeclarationTime"])
		.action(({ session }) => {
			if (dailyVerifier(session?.user?.lastLoveDeclarationTime)) {
				let gain = generateRandomNumber(-3, 4);
				if (gain >= 0) {
					gain++;
				}
				session!.user!.lastLoveDeclarationTime = Date.now();
				session!.user!.favorability += gain;
				if (gain >= 0) {
					return `突然间告白什么的......喵喵会害羞啦！(／≧ω＼)+${gain}好感度`;
				} else {
					return `哼！只有随便的人才会随便把喜欢挂在嘴边(╯⊙ ω ⊙╰ )${gain}好感度`;
				}
			} else {
				// 原版好像是直接 throw DoNone()，我照做（
				return;
			}
		});
}
