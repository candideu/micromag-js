/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Form, Button } from '@micromag/core/components';
import { useUrlGenerator } from '@micromag/core/contexts';
import { useAccountDelete, useAuthLogout } from '@micromag/data';

import { useUser } from '../../contexts/AuthContext';

const validation = Math.floor(Math.random() * 200000);

const propTypes = {
    className: PropTypes.string,
    fields: MicromagPropTypes.formFields,
    onUpdated: PropTypes.func,
};

const defaultProps = {
    fields: [
        {
            name: 'word',
            type: 'text',
            label: (
                <FormattedMessage
                    defaultMessage="Type in the number {rando} to confirm."
                    description="Field label"
                    values={{ rando: validation }}
                />
            ),
        },
    ],
    className: null,
    onUpdated: null,
};

const AccountDeleteForm = ({ fields, className, onUpdated }) => {
    const [open, setOpen] = useState();
    const url = useUrlGenerator();
    const user = useUser();
    const { logout } = useAuthLogout();
    const { deleteAccount } = useAccountDelete();
    const postForm = useCallback(
        (action, data) => {
            const { id = null, word = null } = data;
            if (id && validation.toString(10) === word) {
                deleteAccount(id).then(() => logout());
            }
        },
        [logout, deleteAccount],
    );
    const openForm = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    return open ? (
        <Form
            action={url('account.delete')}
            fields={fields}
            postForm={postForm}
            initialValue={user}
            submitButtonLabel={
                <FormattedMessage defaultMessage="Delete profile" description="Button label" />
            }
            onComplete={onUpdated}
            className={className}
        />
    ) : (
        <Button className="btn btn-warning" onClick={openForm}>
            <FormattedMessage defaultMessage="Delete my profile" description="Button label" />
        </Button>
    );
};

AccountDeleteForm.propTypes = propTypes;
AccountDeleteForm.defaultProps = defaultProps;

export default AccountDeleteForm;
