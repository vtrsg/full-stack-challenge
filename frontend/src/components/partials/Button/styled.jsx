import styled from 'styled-components';

export const ButtonArea = styled.button`
    width: 250px;
    height: 30px;
    border-radius: 10px;
    background: rgba(149, 116, 205, 1);
    border: none;
    color: #ffffff;
    font-weight: 600;
    box-shadow: 0px 1px 4px 0px rgba(187, 195, 206, 0.6);
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 430px) {
        width: 90px;
        font-size: 12px;
    }
`;
