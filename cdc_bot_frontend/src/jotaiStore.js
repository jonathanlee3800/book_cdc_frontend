import { atom } from "jotai";

export const userAtom = atom({ username: "none", password: "none" });

export const slotsAtom = atom([]);

export const creditAtom = atom(1);
