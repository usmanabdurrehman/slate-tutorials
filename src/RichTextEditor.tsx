import { Box } from "@chakra-ui/react";
import { css } from "@emotion/css";
import React, { useState } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, RenderLeafProps, Slate, withReact } from "slate-react";

import Toolbar from "./Components/Toolbar";
import { CustomElement, CustomText, EditorType } from "./types";
import { toggleMark } from "./utils";

interface RichTextEditorProps {}

const initalValue = [{ type: "paragraph", children: [{ text: "" }] }];

declare module "slate" {
  interface CustomTypes {
    Editor: EditorType;
    Element: CustomElement;
    Text: CustomText;
  }
}

const RenderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.superscript) {
    children = <sup>{children}</sup>;
  }
  if (leaf.subscript) {
    children = <sub>{children}</sub>;
  }

  return (
    <span
      {...attributes}
      style={{
        ...(leaf.bold && { fontWeight: "bold" }),
        ...(leaf.italic && { fontStyle: "italic" }),
        ...(leaf.underline && { textDecoration: "underline" }),
        ...(leaf.strikethrough && { textDecoration: "line-through" }),
        ...(leaf.code && {
          color: "black",
          padding: 2,
          fontSize: 12,
          fontFamily: "monospace",
          background: "#eee",
        }),
        ...(leaf.highlight && {
          color: "black",
          padding: 2,
          background: "#f3ff63",
          border: "1px solid #c6c202",
        }),
      }}
    >
      {children}
    </span>
  );
};

export const RichTextEditor: React.FC<RichTextEditorProps> = React.memo(
  function RichTextEditor({}) {
    const [editor] = useState(withHistory(withReact(createEditor())));

    const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
      const key = event?.key?.toLowerCase();
      if (key === "b" && event?.ctrlKey) {
        toggleMark(editor, "bold");
      }
      if (key === "i" && event?.ctrlKey) {
        toggleMark(editor, "italic");
      }
      if (key === "u" && event?.ctrlKey) {
        toggleMark(editor, "underline");
      }
      if (key === "z" && event?.ctrlKey) {
        editor.undo();
      }
      if (key === "y" && event?.ctrlKey) {
        editor.redo();
      }
    };

    return (
      <Box>
        <Slate
          editor={editor}
          initialValue={initalValue}
          onChange={(value) => {
            // console.log({ value });
          }}
        >
          <Toolbar />
          <Box border="1px solid black" borderRadius="6px" height="400px">
            <Editable
              name="post"
              placeholder="Write post"
              autoFocus
              className={css({
                padding: 8,
                fontSize: 18,
                height: "100%",
              })}
              renderLeaf={RenderLeaf}
              onKeyDown={onKeyDown}
            />
          </Box>
        </Slate>
      </Box>
    );
  }
);
