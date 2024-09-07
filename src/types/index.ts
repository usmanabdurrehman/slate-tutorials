import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export type AlignKey = "left" | "right" | "center" | "justify";

export type CustomElement = {
  type: string;
  children: CustomText[];
  align?: AlignKey;
};
export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  subscript?: boolean;
  superscript?: boolean;
  strikethrough?: boolean;
  highlight?: boolean;
};

export type Editor = BaseEditor & ReactEditor & HistoryEditor;
export type MarkKey = keyof Omit<CustomText, "text">;
export type ElementKey =
  | AlignKey
  | "block-quote"
  | "bulleted-list"
  | "numbered-list"
  | "list-item";
