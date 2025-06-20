import {ItemMasterPresenter, ItemMasterView} from "./ItemMasterPresenter.ts";
import {getJewelryMasterPageFromClient} from "../model/queries/ArJewelryMasterDAO.ts";

export class JewelryPresenter extends ItemMasterPresenter {
    protected get view(): ItemMasterView {
        return super.view as ItemMasterView
    }

    async fetchJewelryData(searchString, sortChange: boolean, resetPage: boolean = false) {
        await this.fetchData(getJewelryMasterPageFromClient, searchString, sortChange, resetPage);
    }
}