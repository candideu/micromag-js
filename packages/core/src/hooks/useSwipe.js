import { useRef, useEffect, useCallback } from 'react';
import { useSprings } from 'react-spring';
import clamp from 'lodash/clamp';
import { useDrag } from 'react-use-gesture';

export const useSwipe = ({
    width = null,
    height = null,
    items = [],
    display = 'flex',
    threshold = 3,
    disabled = false,
    onIndexChange = null,
}) => {
    const index = useRef(0);
    const currentWidth = width || window.innerWidth;
    // const currentHeight = height || window.innerCurrentHeight;
    const count = items.length;

    const getItem = useCallback((item, x = 0, y = 0, hidden = false, idx = 0) => {
        return {
            x,
            y,
            display: hidden ? 'none' : display,
            visibility: hidden ? 'hidden' : 'visible',
            item,
            zIndex: idx,
        };
    }, []);

    const getItems = useCallback(
        ({ down = 0, mx = 0 } = {}) => {
            return items.map((item, i) => {
                const x = disabled ? 0 : (i - index.current) * currentWidth + (down ? mx : 0);
                const hidden = !disabled && (i < index.current - 1 || i > index.current + 1);
                return getItem(item, x, 0, hidden);
            });
        },
        [disabled, items, index, currentWidth],
    );

    // Initial state
    const [itemsWithProps, set] = useSprings(items.length, i => ({
        x: disabled ? 0 : i * currentWidth,
        display: !disabled && i >= 2 ? 'none' : display,
        visibility: !disabled && i >= 2 ? 'hidden' : 'visible',
        item: items[i],
        zIndex: i,
    }));

    const bind = useDrag(
        ({ down, movement: [mx], direction: [xDir, yDir], distance, delta: [xDelta], cancel }) => {
            if (disabled) {
                return;
            }

            // Block first and last moves
            if (down && index.current === items.length - 1 && xDir < 0) {
                cancel();
            }

            if (down && index.current === 0 && xDir > 0) {
                cancel();
            }

            if (
                down && // Cursor down
                Math.abs(yDir) < 0.95 && // Avoid swipes up and down
                (distance > currentWidth / threshold || // Pure distance
                    (Math.abs(xDelta) > 12 && distance > currentWidth / 12)) // Speedy flick, 12 spped and 1/12 of the screen size
            ) {
                cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, count - 1)));
                if (onIndexChange !== null) {
                    onIndexChange(index.current);
                }
            }

            set(getItems({ down, mx }));
        },
    );

    const reset = useCallback(() => {
        set(getItems());
    }, [disabled, items, index, currentWidth]);

    const setIndex = useCallback(
        idx => {
            if (onIndexChange !== null) {
                onIndexChange(idx);
            }
            index.current = idx;
            reset();
        },
        [reset],
    );

    // Reset on resize or others
    useEffect(() => {
        set(getItems());
    }, [width, height, set, disabled]);

    return {
        items: itemsWithProps,
        bind,
        indexRef: index,
        setIndex,
    };
};

export default useSwipe;