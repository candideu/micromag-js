import { useCallback, useState } from 'react';

import { useApi } from '../contexts/ApiContext';

export const useQuizCreate = ({ screenId, onSuccess = null } = {}) => {
    const api = useApi();
    const [creating, setCreating] = useState(false);

    const create = useCallback(
        (data) => {
            if (api === null) {
                return null;
            }
            setCreating(true);
            return api.quiz.create({ screen_id: screenId, ...data }).then((response) => {
                setCreating(false);
                if (onSuccess !== null) {
                    onSuccess(response);
                }
                return response;
            });
        },
        [api, setCreating, onSuccess, screenId],
    );
    return { create, creating };
};

export default useQuizCreate;
