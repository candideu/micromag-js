import { defineMessage } from 'react-intl';

export default {
    id: 'quiz-answer',
    component: 'field-with-form',
    labelPath: 'label.body',
    fields: [
        {
            name: 'label',
            type: 'text-element',
            textOnly: true,
            label: defineMessage({
                defaultMessage: 'Label',
                description: 'Field label',
            }),
        },
        {
            name: 'good',
            type: 'toggle',
            label: defineMessage({
                defaultMessage: 'Good answer',
                description: 'Field label',
            }),
        },
        {
            type: 'fields',
            isList: true,
            fields: [
                {
                    name: 'textStyle',
                    type: 'text-style-form',
                    label: defineMessage({
                        defaultMessage: 'Button text style',
                        description: 'Field label',
                    }),
                },
                {
                    name: 'buttonStyle',
                    type: 'box-style-form',
                    label: defineMessage({
                        defaultMessage: 'Button style',
                        description: 'Field label',
                    })
                },
            ]
        },
    ]
};
