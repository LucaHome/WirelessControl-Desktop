import { Entity } from "../models";

export const clone = <T extends Entity>(entity: T): T => JSON.parse(JSON.stringify(entity));

export const maxId = <T extends Entity>(list: T[]): number => Math.max(...list.map((entity: T) => entity.id));
