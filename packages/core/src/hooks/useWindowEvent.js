import EventsManager from '../lib/EventsManager';
import { createUseEvent } from '../utils';

const eventsManager = typeof window !== 'undefined' ? new EventsManager(window) : null;
const useWindowEvent = createUseEvent(eventsManager);

export default useWindowEvent;
