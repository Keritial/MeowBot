import { Context } from "koishi";

declare module "koishi" {
	interface User {
		nickname: string;
		favorability: number;
		lastSignTime: number;
		lastLoveDeclarationTime: number;
		lastAiekiTime: number;
		hValue: number;
		point: number;
	}
}

export enum ItemCategory {
	ITEM,
	VALUE,
}

export interface Item {
	id: string;
	name?: string;
	type: string;
	category?: ItemCategory;
}

export const ITEMS: Item[] = [
	// 称呼
	{
		id: "nickname",
		type: "string",
		category: ItemCategory.VALUE,
	},
	// 好感度
	{
		id: "favorability",
		name: "好感度",
		type: "integer",
		category: ItemCategory.VALUE,
	},
	// 上一次签到时间，Unix 时间戳 精确到毫秒 Date.now()
	{
		id: "lastSignTime",
		type: "integer",
		category: ItemCategory.VALUE,
	},
	{
		id: "lastLoveDeclarationTime",
		type: "integer",
		category: ItemCategory.VALUE,
	},
	{
		id: "lastAiekiTime",
		type: "integer",
		category: ItemCategory.VALUE,
	},
	{
		id: "hValue",
		type: "integer",
		category: ItemCategory.VALUE,
	},
	{
		id: "point",
		type: "integer",
		category: ItemCategory.VALUE,
	},
];

function toKoishiModel(items: Item[]) {
	let output: { [x: string]: string } = {};
	for (let i of items) {
		output[i.id] = i.type;
	}
	return output;
}

export const name = "dataModel";
export function apply(ctx: Context) {
	ctx.model.extend("user", toKoishiModel(ITEMS));
}
