import { ButtonGroup, Flex, IconButton, Select } from "@chakra-ui/react";
import { css } from "@emotion/css";
import {
  HEADINGS,
  TEXT_BLOCK_OPTIONS,
  TEXT_FORMAT_OPTIONS,
} from "../constants";
import { Divider } from "./Divider";

interface ToolbarProps {}

export default function Toolbar({}: ToolbarProps) {
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
          <IconButton aria-label={label} icon={icon} fontSize={fontSize} />
        ))}
        <Divider />
        {TEXT_BLOCK_OPTIONS.map(({ id, label, icon }) => (
          <IconButton aria-label={label} icon={icon} />
        ))}
      </ButtonGroup>
    </Flex>
  );
}
