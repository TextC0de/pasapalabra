import React from 'react';
import Button from '@src/components/Button';
import PropTypes from 'prop-types';
import Spinner from '@src/components/Spinner';
import styled from 'styled-components';

const ButtonLoading = ({
    className,
    children,
    onClick,
    asSubmitInput,
    variant,
    disabled,
    value,
    loading,
    block,
    fullWidth
}) => {
    if (loading) {
        return (
            <Button
                className={className}
                variant={variant}
                block={block}
                fullWidth={fullWidth}
                disabled
            >
                <Spinner />
            </Button>
        );
    }

    if (asSubmitInput) {
        return (
            <Button
                className={className}
                as="input"
                type="submit"
                variant={variant}
                disabled={disabled}
                value={value}
                block={block}
                fullWidth={fullWidth}
            />
        );
    }

    return (
        <Button
            className={className}
            onClick={onClick}
            variant={variant}
            disabled={disabled}
            block={block}
            fullWidth={fullWidth}
        >
            {children}
        </Button>
    );
};

ButtonLoading.propTypes = {
    onClick: (props, propName, componentName) => {
        if (
            props.asSubmitInput &&
            (props[propName] === undefined || typeof props[propName] !== 'function')
        ) {
            throw new Error(
                `Invalid prop '${propName}' supplied to '${componentName}'. Validation failed.`
            );
        }
    },
    className: PropTypes.string.isRequired,
    children: PropTypes.string,
    value: PropTypes.string,
    asSubmitInput: PropTypes.bool,
    variant: PropTypes.string,
    block: PropTypes.bool,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
};

ButtonLoading.defaultProps = {
    onClick: (e) => e.preventDefault(),
    children: '',
    value: '',
    asSubmitInput: false,
    variant: 'primary',
    block: false,
    fullWidth: false
};

export default styled(ButtonLoading)``;
