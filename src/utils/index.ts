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
      match: (n) =>
        !Editor.isEditor(n) && Element.isElement(n) && n[blockType] === format,
    })
  );

  return !!match;
};

export const toggleBlock = (editor: EditorType, format: ElementKey) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<Element>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : (format as AlignKey),
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<Element>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};
