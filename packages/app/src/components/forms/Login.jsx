/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';

import { useAuth } from '../../contexts/AuthContext';

import styles from '../../styles/forms/login.module.scss';

const messages = defineMessages({
    emailLabel: {
        id: 'forms.login.email_label',
        defaultMessage: 'Email',
    },
    passwordLabel: {
        id: 'forms.login.password_label',
        defaultMessage: 'Password',
    },
    submit: {
        id: 'forms.login.submit',
        defaultMessage: 'Log in',
    },
});

const propTypes = {
    fields: MicromagPropTypes.formFields,
    className: PropTypes.string,
    onLoggedIn: PropTypes.func,
};

const defaultProps = {
    fields: [
        {
            name: 'email',
            type: 'email',
            label: messages.emailLabel,
        },
        {
            name: 'password',
            type: 'password',
            label: messages.passwordLabel,
        },
    ],
    className: null,
    onLoggedIn: null,
};

const LoginForm = ({ fields, className, onLoggedIn }) => {
    const url = useUrlGenerator();
    const { login } = useAuth();
    const postForm = useCallback((action, { email, password }) => login(email, password), [login]);
    return (
        <Form
            action={url('auth.login')}
            postForm={postForm}
            fields={fields}
            onComplete={onLoggedIn}
            submitButtonLabel={messages.submit}
            className={classNames([
                styles.login,
                {
                    [className]: className !== null,
                },
            ])}
        />
    );
};

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
