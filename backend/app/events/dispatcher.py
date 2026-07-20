from collections import defaultdict
from collections.abc import Callable


class EventDispatcher:
    """
    Internal event bus for application events.
    """

    def __init__(self):
        self._handlers = defaultdict(list)

    def subscribe(
        self,
        event_type: str,
        handler: Callable,
    ) -> None:
        self._handlers[event_type].append(handler)

    def publish(
        self,
        event,
    ) -> None:

        event_type = event.event_type

        for handler in self._handlers.get(
            event_type,
            [],
        ):
            handler(event)