import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Descendant } from "slate";
import { useData, useUpdateData } from "./api";
import { RichTextEditor } from "./RichTextEditor";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default function Form() {
  const [value, setValue] = useState<Descendant[]>();
  const { mutateAsync: saveText, isPending } = useUpdateData();
  const { data, isSuccess } = useData();

  const onSave = () => {
    saveText(value || data);
  };

  return (
    <Box p={2}>
      <RichTextEditor
        placeholder="Enter Post"
        name="post"
        initialValue={isSuccess ? data || initialValue : undefined}
        onChange={(newValue) => setValue(newValue)}
      />
      <Button colorScheme="whatsapp" size="md" mt={2} onClick={onSave}>
        {isPending ? "Saving..." : "Save"}
      </Button>
    </Box>
  );
}
