import styled from "styled-components";


export const Container = styled.div`
    margin-top: 4rem;

    table{
        width: 80%;
        margin: 0 auto;
        margin-bottom: 5rem;
        border-spacing: 0 0.5rem;

        th{
            color: var(--text-body);
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5rem;
        }

        td{
            padding: 1rem 2rem;
            border: 0;
            background: var(--shape);
            color: var(--text-body);
            border-radius: 0.25rem;

            &:first-child{
                color: var(--text-title);
            }

            &.deposit{
                color: var(--green);
            }

            &.withdraw{
                color: var(--red);
            }
        }
    }
`;

export const ContainerSelect = styled.div`
  
    max-width: 1500px;
    margin: 0 auto;

    padding: 1rem 1rem 2rem;  
    display: flex;  
    align-items: center;
    justify-content: space-between;

    select{
        font-size: 1rem;
        border:0;
        
        padding: 0 2rem;
        margin: 1rem;
        width: 10rem;
        height: 3rem;
    }

    button{
        font-size: 1rem;
        color: #FFF;
        background: var(--blue-light);
        border:0;
        padding: 0 2rem;
        border-radius: 0.25rem;
        height: 3rem;


        transition: filter 0.2s;

        &:hover{
            filter: brightness(0.9);
        }
        
    }

`;

export const ButtonAction = styled.span`
    color: #fff;
    padding: 0.50rem;
    width: 3rem;
    background: #fff;
    text-align: center;
    font-size: 1.5rem;
    color: var(--blue);
    cursor: pointer;
`;

export const ButtonSearch = styled.span`
   color: #fff;
    padding: 0.50rem;
    width: 3rem;
    text-align: center;
    font-size: 1.5rem;
    width: 100%;
    color: var(--blue);
    cursor: pointer;
`;

export const ButtonClearFilter = styled.span`
   color: #fff;
    padding: 0.50rem;
    width: 3rem;
    text-align: center;
    font-size: 1.5rem;
    width: 100%;
    color: var(--red);
    cursor: pointer;
`;



 export const ContainerModal = styled.form`

    h2{
        color: var(--text-title);
        font-size: 1.5rem;
        margin-bottom: 2.5rem;
        
    }

    input{
        width: 100%;
        padding: 0.5rem;
        height: 4rem;
        border-radius: 0.25rem;
        background: #e7e9ee;
        border: 1px solid #d7d7d7;

        font-weight: 400;
        font-size: 1rem;

        &::placeholder{
            color: var(--text-body);
        }
        & + input{
            margin-top: 1rem;
        }
    }

    select{
        display: flex;
        color: var(--text-title);
        font-size: 1rem;
        border:0;
        padding: 0 1rem;
        margin: 1rem;
        width: 90%;
        border: 1px solid #d7d7d7;
        height: 4rem;
    }

    button[type="submit"]{
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        background: var(--blue-light);
        color: #FFF;
        border-radius: 0.25rem;
        border: 0;
        font-size: 1rem;
        margin-top: 1.5rem;
        font-weight: 600;

        transition: filter 0.2s;

        &:hover{
            filter: brightness(0.9);
        }   
    }

`;