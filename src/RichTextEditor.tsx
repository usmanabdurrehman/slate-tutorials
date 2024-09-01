import { Box } from "@chakra-ui/react";
import React from "react";

import Toolbar from "./Components/Toolbar";

interface RichTextEditorProps {}

const initalValue = [];

export const RichTextEditor: React.FC<RichTextEditorProps> = React.memo(
  function RichTextEditor({}) {
    return (
      <Box>
        <Toolbar />
      </Box>
    );
  }
);
