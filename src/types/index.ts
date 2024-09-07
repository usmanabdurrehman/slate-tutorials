import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";

export type EditorType = BaseEditor & ReactEditor & HistoryEditor;
export type CustomText = {
  text: string;
  bold?: boolean;
  underline?: boolean;
  superscript?: boolean;
  subscript?: boolean;
  italic?: boolean;
  code?: boolean;
  highlight?: boolean;
  strikethrough?: boolean;
};
export type CustomElement = { type: string; children: CustomText[] };

export type MarkKey =
  | "bold"
  | "underline"
  | "superscript"
  | "subscript"
  | "italic"
  | "code"
  | "highlight"
  | "strikethrough";
