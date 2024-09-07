import { ButtonGroup, Flex, IconButton, Select } from "@chakra-ui/react";
import { css } from "@emotion/css";
import { useSlate } from "slate-react";
import {
  HEADINGS,
  RichTextAction,
  TEXT_BLOCK_OPTIONS,
  TEXT_FORMAT_OPTIONS,
} from "../constants";
import { MarkKey } from "../types";
import { isMarkActive, toggleMark } from "../utils";
import { Divider } from "./Divider";

interface ToolbarProps {}

export default function Toolbar({}: ToolbarProps) {
  const editor = useSlate();

  const onMarkClick = (id: RichTextAction) => {
    toggleMark(editor, id as MarkKey);
  };

  const getMarkSelectionProps = (id: RichTextAction) => {
    if (isMarkActive(editor, id as MarkKey))
      return { colorScheme: "blue", variant: "solid" };
    return {};
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
        <Select size="md" mr={2} placeholder="paragraph" onChange={(e) => {}}>
          {HEADINGS.map((heading) => (
            <option value={heading}>{heading}</option>
          ))}
        </Select>
        {TEXT_FORMAT_OPTIONS.map(({ id, label, icon, fontSize }) => (
          <IconButton
            aria-label={label}
            icon={icon}
            fontSize={fontSize}
            onMouseDown={() => onMarkClick(id)}
            {...getMarkSelectionProps(id)}
          />
        ))}
        <Divider />
        {TEXT_BLOCK_OPTIONS.map(({ id, label, icon }) => (
          <IconButton aria-label={label} icon={icon} />
        ))}
      </ButtonGroup>
    </Flex>
  );
}
