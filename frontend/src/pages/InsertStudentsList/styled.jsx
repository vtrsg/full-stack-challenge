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
`;
