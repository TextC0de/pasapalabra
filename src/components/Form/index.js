import styled from 'styled-components';
import Button from '@src/components/Button';
import ButtonLoading from '@src/components/ButtonLoading';

const Form = styled.form`
    label {
        display: block;

        &:not(:last-child) {
            margin-top: 0.5rem;
        }
    }

    ${ButtonLoading}, ${Button} {
        margin-top: 1rem;
    }
`;

export default Form;
