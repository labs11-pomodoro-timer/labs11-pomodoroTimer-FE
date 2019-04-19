import React from "react";
import { ThemeProvider } from "styled-components";

export const withCustomTheme = (Component, theme) => props => (
  <ThemeProvider theme={theme}>
    <Component {...props} />
  </ThemeProvider>
);