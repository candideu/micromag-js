/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Box from '@micromag/element-box';
import Grid from '@micromag/element-grid';
import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import TextComponent from '@micromag/element-text';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    text: MicromagPropTypes.textElement,
    background: MicromagPropTypes.backgroundElement,
    box: MicromagPropTypes.boxElement,
    grid: MicromagPropTypes.gridElement,
    textAlign: MicromagPropTypes.textAlign,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    text: null,
    background: null,
    box: null,
    grid: null,
    textAlign: 'center',
    renderFormat: 'view',
    className: null,
};

const TextScreen = ({ text, background, box, grid, textAlign, renderFormat, className }) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple } = getRenderFormat(renderFormat);

    const item = isPlaceholder ? (
        <Placeholders.Text className={styles.placeholder} />
    ) : (
        <TextComponent {...text} className={styles.text} />
    );

    return (
        <Background {...background} width={width} height={height}>
            <Frame width={width} height={height}>
                <div
                    className={classNames([
                        styles.container,
                        {
                            [styles.disabled]: isSimple,
                            [styles[textAlign]]: textAlign !== null,
                            [className]: className !== null,
                        },
                    ])}
                >
                    {grid !== null ? (
                        <Grid {...grid} items={[item]} className={styles.box} />
                    ) : (
                        <Box {...box} withSmallSpacing={isSimple} className={styles.box}>
                            {item}
                        </Box>
                    )}
                </div>
            </Frame>
        </Background>
    );
};

TextScreen.propTypes = propTypes;
TextScreen.defaultProps = defaultProps;

export default TextScreen;