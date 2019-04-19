import React from "react";
import styled, { css } from "styled-components";

const style = ({ theme, ...rest }) => css`
    background-color: ${theme.colors.lightest};
    color: ${theme.colors.primary};
    border-color: ${theme.colors.secondary};
    width: 140px;
    height: 50px;
    border-radius: 5px;
    font-size: 18px;
    margin-top: 20px;
    margin-left: 40px;
    margin-right: 25px;

    :hover {
        color: ${theme.colors.lightest};
        background-color: ${theme.colors.primary};
    }`;

    const ButtonBase = styled.button([style]);

    export const Button = ({ onClick, children }) => (
        <ButtonBase onClick={onClick}>{children}</ButtonBase>
    );