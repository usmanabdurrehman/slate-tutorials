import {
  Code,
  Highlighter,
  Justify,
  JustifyLeft,
  JustifyRight,
  ListOl,
  ListUl,
  Quote,
  Subscript,
  Superscript,
  TextCenter,
  TypeBold,
  TypeItalic,
  TypeStrikethrough,
  TypeUnderline,
} from "react-bootstrap-icons";

export enum RichTextAction {
  Bold = "bold",
  Italics = "italic",
  Underline = "underline",
  Strikethrough = "strikethrough",
  Superscript = "superscript",
  Subscript = "subscript",
  Highlight = "highlight",
  Code = "code",
  LeftAlign = "left",
  CenterAlign = "center",
  RightAlign = "right",
  JustifyAlign = "justify",
  Divider = "divider",
  BlockQuote = "block-quote",
  NumberedList = "numbered-list",
  BulletedList = "bulleted-list",
  Undo = "undo",
  Redo = "redo",
}

export const TEXT_FORMAT_OPTIONS = [
  { id: RichTextAction.Bold, icon: <TypeBold />, label: "Bold" },
  { id: RichTextAction.Italics, icon: <TypeItalic />, label: "Italics" },
  { id: RichTextAction.Underline, icon: <TypeUnderline />, label: "Underline" },
  {
    id: RichTextAction.Highlight,
    icon: <Highlighter />,
    label: "Highlight",
    fontSize: 10,
  },
  {
    id: RichTextAction.Strikethrough,
    icon: <TypeStrikethrough />,
    label: "Strikethrough",
  },
  {
    id: RichTextAction.Superscript,
    icon: <Superscript />,
    label: "Superscript",
  },
  {
    id: RichTextAction.Subscript,
    icon: <Subscript />,
    label: "Subscript",
  },
  {
    id: RichTextAction.Code,
    icon: <Code />,
    label: "Code",
  },
];

export const TEXT_ALIGNMENT_OPTIONS = [
  {
    id: RichTextAction.LeftAlign,
    icon: <JustifyLeft />,
    label: "Align Left",
  },
  {
    id: RichTextAction.CenterAlign,
    icon: <TextCenter />,
    label: "Align Center",
  },
  {
    id: RichTextAction.RightAlign,
    icon: <JustifyRight />,
    label: "Align Right",
  },
  {
    id: RichTextAction.JustifyAlign,
    icon: <Justify />,
    label: "Align Justify",
  },
  {
    id: RichTextAction.BlockQuote,
    icon: <Quote />,
    label: "Block Quote",
  },
  {
    id: RichTextAction.BulletedList,
    icon: <ListUl />,
    label: "Bulleted List",
  },
  {
    id: RichTextAction.NumberedList,
    icon: <ListOl />,
    label: "Numbered List",
  },
];

export const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

export const LIST_TYPES = ["numbered-list", "bulleted-list"];
export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
