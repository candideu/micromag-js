import React from 'react';
import LayoutGrid from '../components/LayoutGrid';
import LayoutSwitcher from '../components/LayoutSwitcher';
import Screen from '../components/Screen';

const withScreenLayouts = (
    Story,
    {
        story,
        parameters: {
            screenDefinition = null,
            screenOptions: { gridWidth = 100, gridHeight = 200 } = {},
        },
        args,
    },
) => {
    const { layouts = null } = screenDefinition || {};
    if (layouts === null || story === 'Definition') {
        return <Story />;
    }

    if (story === 'Placeholder') {
        return (
            <LayoutGrid layouts={layouts}>
                {(layout) => (
                    <Screen width={gridWidth} height={gridHeight} withBorder>
                        <Story args={{ ...args, layout, renderFormat: 'placeholder' }} />
                    </Screen>
                )}
            </LayoutGrid>
        );
    }

    if (story === 'Preview' || story === 'Edit') {
        return (
            <LayoutSwitcher layouts={layouts}>
                {(layout) => (
                    <Screen>
                        <Story args={{ ...args, layout, renderFormat: story.toLowerCase() }} />
                    </Screen>
                )}
            </LayoutSwitcher>
        );
    }

    return (
        <LayoutSwitcher layouts={layouts}>
            {(layout) => (
                <Screen>
                    <Story args={{ ...args, layout }} />
                </Screen>
            )}
        </LayoutSwitcher>
    );
};

export default withScreenLayouts;
