import React, {useEffect} from "react";

export const useScrollHandler = (containerRef: React.RefObject<HTMLDivElement>, presenter: TablePresenter, state: TableState) => {
    useEffect(() => {
        const container = containerRef.current;
        const handleScroll = presenter.handleScroll(containerRef);

        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [state.hasMore, containerRef, presenter]);
};