import styled from 'styled-components';

export const PageArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        textarea {
            width: 300px;
            height: 250px;
        }
    }
    .scroll-div {
        max-width: 500px;
        height: 300px;
        overflow: auto;
        border: 1px solid #ccc;
        margin-bottom: 10px;
    }
`;
