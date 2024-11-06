import React, {useEffect} from "react";
import {TablePresenter} from "../../presenter/TablePresenter.ts";
import {ItemMasterState} from "../../presenter/ItemMasterPresenter.ts";

export const useScrollHandler = (containerRef: React.RefObject<HTMLDivElement>, presenter: TablePresenter, state: ItemMasterState) => {
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