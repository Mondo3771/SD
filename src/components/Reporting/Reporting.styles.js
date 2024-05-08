import styled from "styled-components";

export const Feedback=styled.article`

    background-color:red;
    height: inherit;
    color: red;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    margin: 40px;
    margin-bottom: 40px;

`;
export const Main=styled.section`

    background-color:var(--darkest);
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 80vh


`;
export const Summary=styled.article`
display: flex;

background-color: green;
width: 60%;
justify-content: center;

`;

export const Block=styled.section`

    height: 600px;
    background-color: pink;

`