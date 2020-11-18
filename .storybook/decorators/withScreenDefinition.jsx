import React from 'react';
import LayoutGrid from '../components/LayoutGrid';
import LayoutSwitcher from '../components/LayoutSwitcher';
import Screen from '../components/Screen';

const withScreenDefinition = (
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
    if (screenDefinition === null || story === 'Definition') {
        return <Story />;
    }

    const { layouts = null } = screenDefinition || {};

    if (story === 'Placeholder') {
        return (
            <LayoutGrid layouts={layouts}>
                {(layout) => (
                    <Screen
                        definition={screenDefinition}
                        width={gridWidth}
                        height={gridHeight}
                        withBorder
                        renderContext="placeholder"
                    >
                        <Story args={{ ...args, layout }} />
                    </Screen>
                )}
            </LayoutGrid>
        );
    }

    if (story === 'Preview' || story === 'Edit') {
        return (
            <LayoutSwitcher layouts={layouts}>
                {(layout) => (
                    <Screen
                        definition={screenDefinition}
                        renderContext={story.toLowerCase()}
                        withScroll
                    >
                        <Story args={{ ...args, layout }} />
                    </Screen>
                )}
            </LayoutSwitcher>
        );
    }

    return layouts !== null ? (
        <LayoutSwitcher layouts={layouts}>
            {(layout) => (
                <Screen definition={screenDefinition} withScroll>
                    <Story args={{ ...args, layout }} />
                </Screen>
            )}
        </LayoutSwitcher>
    ) : (
        <Screen definition={screenDefinition} withScroll>
            <Story />
        </Screen>
    );
};

export default withScreenDefinition;