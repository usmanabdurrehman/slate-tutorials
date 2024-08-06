import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Descendant } from "slate";
import { useData, useUpdateData } from "./api";
import { RichTextEditor } from "./RichTextEditor";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

export default function Form() {
  const [value, setValue] = useState<Descendant[]>();
  const { mutateAsync: saveText, isPending } = useUpdateData();
  const { data, isSuccess } = useData();

  useEffect(() => {
    setValue(data || []);
  }, [data]);

  const onSave = () => {
    saveText(JSON.stringify(value));
  };

  return (
    <Box p={2}>
      <RichTextEditor
        placeholder="Enter Post"
        name="post"
        // initialValue={isSuccess ? data || [] : undefined}
        initialValue={initialValue}
        onChange={(newValue) => setValue(newValue)}
      />
      <Button colorScheme="whatsapp" size="md" mt={2} onClick={onSave}>
        {isPending ? "Saving..." : "Save"}
      </Button>
    </Box>
  );
}
