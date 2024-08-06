import { Box } from "@chakra-ui/react";
import { css } from "@emotion/css";
import React, { useState } from "react";

import { createEditor, Descendant } from "slate";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import { withHistory } from "slate-history";
import { CustomElement, CustomText, Editor } from "./types";
import { toggleMark } from "./utils";
import Toolbar from "./Components/Toolbar";

interface RichTextEditorProps {
  initialValue: Descendant[] | undefined;
  onChange: (value: Descendant[]) => void;
  placeholder?: string;
  name: string;
}

declare module "slate" {
  interface CustomTypes {
    Editor: Editor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
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
        ...(leaf.code && {
          color: "black",
          padding: 2,
          background: "#eee",
          fontFamily: "monospace",
          fontSize: 12,
        }),
        ...(leaf.italic && { fontStyle: "italic" }),
        ...(leaf.underline && { textDecoration: "underline" }),
        ...(leaf.strikethrough && { textDecoration: "line-through" }),
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

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote
          style={{
            ...style,
            borderLeft: " 2px solid #ddd",
            marginLeft: "0",
            marginRight: "0",
            paddingLeft: "10px",
            color: "#aaa",
            fontStyle: "italic",
          }}
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "h1":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );

    case "h4":
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 style={style} {...attributes}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 style={style} {...attributes}>
          {children}
        </h6>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const RenderLeaf = (props: RenderLeafProps) => <Leaf {...props} />;
const RenderElement = (props: RenderElementProps) => <Element {...props} />;

export const RichTextEditor: React.FC<RichTextEditorProps> = React.memo(
  function RichTextEditor({ initialValue, onChange, placeholder, name }) {
    if (!initialValue) return null;

    const [editor] = useState(() => withReact(withHistory(createEditor())));

    const onRichTextKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (
      event
    ) => {
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
          initialValue={initialValue}
          onChange={(value) => {
            const isAstChange = editor.operations.some(
              (op) => "set_selection" !== op.type
            );
            if (isAstChange) {
              onChange(value);
            }
          }}
        >
          <Toolbar />
          <Box border="1px solid black" borderRadius="6px" height={"400px"}>
            <Editable
              name={name}
              placeholder={placeholder}
              autoFocus
              className={css({ padding: 8, fontSize: 18, height: "100%" })}
              renderLeaf={RenderLeaf}
              renderElement={RenderElement}
              onKeyDown={onRichTextKeyDown}
            />
          </Box>
        </Slate>
      </Box>
    );
  }
);
