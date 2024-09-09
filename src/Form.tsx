import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Descendant } from "slate";
import { useData, useUpdateData } from "./api";
import { RichTextEditor } from "./RichTextEditor";

const initalValue = [{ type: "paragraph", children: [{ text: "" }] }];

export default function Form() {
  const [value, setValue] = useState<Descendant[]>();
  const { mutateAsync: saveData, isPending } = useUpdateData();
  const { data, isSuccess } = useData();

  const onChange = (value: Descendant[]) => {
    setValue(value);
  };

  const onSave = () => {
    saveData(value);
  };

  return (
    <Box p={2}>
      <RichTextEditor
        name="post"
        placeholder="Write post"
        onChange={onChange}
        initialValue={isSuccess ? data || initalValue : undefined}
      />
      <Button mt={2} colorScheme="whatsapp" onClick={onSave}>
        {isPending ? "Saving..." : "Save"}
      </Button>
    </Box>
  );
}
