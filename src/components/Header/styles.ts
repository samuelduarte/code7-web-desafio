import styled from 'styled-components';


export const Container = styled.header`

    background: var(--blue);
`
export const Content = styled.div`

    max-width: 1120px;
    margin: 0 auto;

    padding: 2rem 1rem 8rem;  
    display: flex;  
    align-items: center;
    justify-content: space-between;

    span{
        font-size: 1rem;
        color: #FFF;
        padding: 0 2rem;
        height: 3rem;
    }
`