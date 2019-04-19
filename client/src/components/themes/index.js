// import React from "react";
// import ReactDOM from "react-dom";
// import { ThemeProvider } from "styled-components";
// import { Button } from "./button.style";
// import { Layout } from "./background.style";
// import { withCustomTheme } from "./with-custom-theme";

// const theme = {
//     colors: {
//         lightest: "#272D2D",
//         primary: "#DDE0BD",
//         secondary: "#272D2D"
//     }
// };

// const premiumButton1 = {
//     colors: {
//         lightest: "#000000",
//         primary: "azure",
//         secondary: "#000000"
//     }
// };

// const MyPremiumButton1 = withCustomTheme(Button, premiumButton1);

// const App = () => (
//     <div>
//         <MyPremiumButton1></MyPremiumButton1>
//     </div>
// );

// render (
//     <ThemeProvider theme={theme}>
//         <App />
//     </ThemeProvider>,
//     document.getElementById("root")
// );