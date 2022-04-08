import React from "react";
import { Container, Box } from "@mui/material";

const CourseDetail = () => {
  return (
    <Container>
      <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
        <Button>Save</Button>
      </Box>
    </Container>
  );
};

export default CourseDetail;
