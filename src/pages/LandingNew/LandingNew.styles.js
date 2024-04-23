import styled from "styled-components";

export const Header=styled.header`
    background-color: purple;
    width: 100%;
    height: 7vh;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .heading,.description{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 4vh;
    }


    p {
    cursor: pointer;
    margin: 0;
    padding: 0;
    }
    p:hover{
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        text-shadow: white;
    }
    
`;

export const DropDown= styled.section`

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    animation: leftN 0.2s ease-in-out forwards;

    @keyframes leftN {
    0% {
        transform: translateY(60%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
    }

        background-color: red;
        width: 100%;
        margin: 0;
        
    p {
    margin: 0;
    padding: 0;
    transition: color 0.3s ease-in-out;
    }

    p:hover{
        background-color:white;
    }


`;

export const Element=styled.article`

    display: flex;
    flex-direction: column;

`;