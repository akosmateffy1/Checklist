import styled from 'styled-components';

export const ButtonUnique = styled.button`
    text-decoration: none;
    display: inline-block;
    padding: 0.75rem 1.55rem;
    border-radius: 10px;
    color: #ffff;
    text-transform: uppercase;
    font-size: 1rem;
    font-family: 'Poppins';
    font-weight: 700;
    letter-spacing: 0.15rem;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
    z-index: 1;
    border: none;
    background-color: #0d6efd;

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #0d6efd;
        border-radius: 10px;
        z-index: -2;
    }

    &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background-color:rgba(10, 88, 202, 1);
        transition: all 0.3s;
        border-radius: 10px;
        z-index: -1;
    }

    &:hover {
        color: #ffff;
    }

    &:hover:before {
        width: 100%;
    }
`;

export const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    width: 100%; 
`;


export const Title = styled.h3`
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
    font-weight: 800;
`;

export const AllTitle = styled.h3`
    display: flex;
    justify-content: center;
    align-items: center;
    color: green;
`;

export const Image = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto 0;
    height: 450px;
    width: 450px; 
`;

export const CardERR = styled.div`
    background-color: #EEF1FB;
    width: 100%; 
    padding: 10px;
    display: block;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 15px 15px 15px 15px;
`;

export const ChecklistError = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
`;

export const LoadingGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;