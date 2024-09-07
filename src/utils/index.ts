import { Editor, Element, Transforms } from "slate";
import { LIST_TYPES, TEXT_ALIGN_TYPES } from "../constants";
import { AlignKey, Editor as EditorType, ElementKey, MarkKey } from "../types";

export const isMarkActive = (editor: EditorType, format: MarkKey) => {
  return !!Editor.marks(editor)?.[format];
};

export const toggleMark = (editor: EditorType, format: MarkKey) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) editor.removeMark(format);
  else editor.addMark(format, true); // second param not documented. Just pass
};

export const isBlockActive = (
  editor: EditorType,
  format: ElementKey,
  blockType: "type" | "align" = "type"
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (node) =>
        !Editor.isEditor(node) &&
        Element.isElement(node) &&
        node[blockType] === format,
    })
  );

  return !!match;
};

const isAlignFormat = (format: ElementKey) => TEXT_ALIGN_TYPES.includes(format);
const isListFormat = (format: ElementKey) => LIST_TYPES.includes(format);

export const toggleBlock = (editor: EditorType, format: ElementKey) => {
  const isAlign = isAlignFormat(format);
  const isList = isListFormat(format);
  const isActive = isBlockActive(editor, format, isAlign ? "align" : "type");

  let newProperties: Partial<Element> = {};
  let align: AlignKey | undefined;
  let type: string | undefined;

  if (isAlignFormat(format)) {
    align = isActive ? undefined : (format as AlignKey);
  } else {
    type = isActive ? "paragraph" : format;
  }

  Transforms.unwrapNodes(editor, {
    match: (node) =>
      !Editor.isEditor(node) &&
      Element.isElement(node) &&
      isListFormat(node.type as ElementKey) &&
      !isAlignFormat(format),
    split: true,
  });

  if (isList && !isActive) {
    type = "list-item";
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }

  if (align) newProperties["align"] = align;
  if (type) newProperties["type"] = type;

  Transforms.setNodes<Element>(editor, newProperties);
};
