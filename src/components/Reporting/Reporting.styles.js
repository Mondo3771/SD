import styled from "styled-components";

export const Feedback=styled.article`

    background-color:red;
    height: 60vh;
    width: 30vw;
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
    height: 70vh


`;
export const Summary=styled.article`
display: flex;

background-color: green;
width: 60%;
justify-content: center;
margin-top: 20px;
height: 60vh;
`;

export const Block=styled.section`

    height: 600px;
    background-color: pink;

`
export const Progress=styled.article`
    height: 50vh;
    width: 60vh;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p{
        color: red;
    }
`

export const Bottom=styled.article`

    display: flex;
    flex-direction: row;

`

export const Dater=styled.form`
    display: flex;
    flex-direction: column;
    color: white;

`