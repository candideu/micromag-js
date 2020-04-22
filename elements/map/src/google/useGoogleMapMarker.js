import { useEffect, useState } from 'react';

const eventMapping = {
    onClick: 'click',
    onDoubleClick: 'dblclick',
};

export default function useGoogleMapMarker({ mapsApi, position, map, events, title }) {
    const [marker, setMarker] = useState();
    useEffect(() => {
        const mark = new mapsApi.Marker({
            position,
            map,
            title,
        });
        Object.keys(events).forEach(eventName =>
            mark.addListener(eventMapping[eventName], events[eventName]),
        );
        setMarker(mark);
    }, []);

    return marker;
}