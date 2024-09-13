import {ItemMasterPresenter, ItemMasterView} from "./ItemMasterPresenter.ts";
import {getStoneMasterItemsFromClient} from "../model/queries/ArStoneMasterDAO.ts";

export class StonePresenter extends ItemMasterPresenter {
    protected get view(): ItemMasterView {
        return super.view as ItemMasterView
    }

    async fetchStoneData(searchString, sortChange: boolean, resetPage: boolean = false) {
        await this.fetchData(getStoneMasterItemsFromClient, searchString, sortChange, resetPage);
    }
}
