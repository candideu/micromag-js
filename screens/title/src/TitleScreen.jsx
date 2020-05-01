/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';
import Grid from '@micromag/element-grid';
import Box from '@micromag/element-box';

import { PropTypes as MicromagPropTypes, Placeholders, Empty } from '@micromag/core';
import { getComponentFromName, getRenderFormat } from '@micromag/core/utils';
import { useScreenSize } from '@micromag/core/contexts';

import { schemas as messages } from './messages';

import styles from './styles.module.scss';

const HEADING_SIZES = {
    title: { size: 1 },
    subtitle: { size: 2 },
};

const propTypes = {
    title: MicromagPropTypes.headingElement,
    subtitle: MicromagPropTypes.headingElement,
    description: MicromagPropTypes.textElement,
    groups: PropTypes.arrayOf(PropTypes.array),
    grid: MicromagPropTypes.gridElement,
    box: MicromagPropTypes.boxElement,
    background: MicromagPropTypes.backgroundElement,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    title: null,
    subtitle: null,
    description: null,
    groups: [['title', 'subtitle'], ['description']],
    grid: null,
    box: null,
    background: null,
    textAlign: 'center',
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const TitleScreen = ({
    title,
    subtitle,
    description,
    groups,
    grid,
    box,
    background,
    textAlign,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple, isEditor, isView } = getRenderFormat(renderFormat);

    const options = { title, subtitle, description };
    const items = groups.map(its => (
        <div className={styles.group} key={`group-${its.join('-')}`}>
            {its.map(name => {
                const key = `group-item-${name}`;
                const value = options[name] || null;

                if (isPlaceholder) {
                    const Placeholder = getComponentFromName(name, Placeholders);
                    return <Placeholder className={styles.placeholder} key={key} />;
                }

                if (isEditor && !value) {
                    return (
                        <Empty className={styles.empty}>
                            <FormattedMessage {...messages[name]} />
                        </Empty>
                    );
                }

                if (name === 'description') {
                    return <Text {...value} className={styles[name]} key={key} />;
                }
                const props = HEADING_SIZES[name] || null;
                return <Heading {...props} {...value} className={styles.title} key={key} />;
            })}
        </div>
    ));

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.disabled]: isSimple,
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
                className={styles.background}
            >
                <Frame width={width} height={height} visible={visible}>
                    <div className={styles.inner}>
                        {grid !== null ? (
                            <Grid
                                {...grid}
                                items={items}
                                withSmallSpacing={isSimple}
                                className={styles.grid}
                            />
                        ) : (
                            <Box {...box} className={styles.box}>
                                {items}
                            </Box>
                        )}
                    </div>
                </Frame>
            </Background>
        </div>
    );
};

TitleScreen.propTypes = propTypes;
TitleScreen.defaultProps = defaultProps;

export default React.memo(TitleScreen);
