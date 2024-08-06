import { Box, ButtonGroup, Flex, IconButton, Select } from "@chakra-ui/react";
import { css } from "@emotion/css";
import {
  HEADINGS,
  RichTextAction,
  TEXT_ALIGNMENT_OPTIONS,
  TEXT_FORMAT_OPTIONS,
} from "../constants";
import { Divider } from "./Divider";
import { useSlate } from "slate-react";
import { ElementKey, MarkKey } from "../types";
import { isBlockActive, isMarkActive, toggleBlock, toggleMark } from "../utils";

interface ToolbarProps {}

export default function Toolbar({}: ToolbarProps) {
  const editor = useSlate();

  const getMarkSelectionProps = (id: RichTextAction) => {
    if (isMarkActive(editor, id as MarkKey)) {
      return {
        colorScheme: "blue",
        variant: "solid",
      };
    }
  };

  const getBlockSelectionProps = (id: RichTextAction) => {
    if (isBlockActive(editor, id as ElementKey)) {
      return {
        colorScheme: "blue",
        variant: "solid",
      };
    }
  };

  const onMarkClick = (format: RichTextAction) => {
    toggleMark(editor, format as MarkKey);
  };

  const onBlockClick = (format: RichTextAction) => {
    toggleBlock(editor, format as ElementKey);
  };

  const onHeadingClick = (format: string) => {
    toggleBlock(editor, format as ElementKey);
  };

  return (
    <Flex gap={4}>
      <ButtonGroup
        size="md"
        isAttached
        variant="ghost"
        color="#444"
        className={css({
          "& > button": { borderRadius: 0 },
          alignItems: "center",
        })}
      >
        <Select
          size="md"
          mr={2}
          placeholder="paragraph"
          onChange={(e) => onHeadingClick(e.target.value)}
        >
          {HEADINGS.map((heading) => (
            <option value={heading}>{heading}</option>
          ))}
        </Select>
        {TEXT_FORMAT_OPTIONS.map(({ id, label, icon, fontSize }) => (
          <IconButton
            aria-label={label}
            icon={icon}
            fontSize={fontSize}
            onMouseDown={(e) => {
              e.preventDefault();
              onMarkClick(id);
            }}
            {...getMarkSelectionProps(id)}
          />
        ))}
        <Divider />
        {TEXT_ALIGNMENT_OPTIONS.map(({ id, label, icon }) => (
          <IconButton
            aria-label={label}
            icon={icon}
            onMouseDown={(e) => {
              e.preventDefault();
              onBlockClick(id);
            }}
            {...getBlockSelectionProps(id)}
          />
        ))}
      </ButtonGroup>
    </Flex>
  );
}
