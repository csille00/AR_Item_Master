import {SupabaseBaseDAO} from "../Supabase/SupabaseBaseDAO.ts";
import {BaseDAO} from "./BaseDAO.ts";
import {ArStoneMasterDAO} from "./ArStoneMasterDAO.ts";
import {ArJewelryMasterDAO} from "./ArJewelryMasterDAO.ts";
import {MaterialTypeDAO} from "./MaterialTypeDAO.ts";
import {StCutDAO} from "./StCutDAO.ts";
import {StTypeDAO} from "./StTypeDAO.ts";
import {ProductTypesDAO} from "./ProductTypesDAO.ts";

export interface FactoryDAO {
    getBaseDAO(): BaseDAO;
    // getCTWRangeDAO(): CTWRangeDAO;
    getMaterialTypeDAO(): MaterialTypeDAO;
    getStCutDAO(): StCutDAO;
    getStTypeDAO(): StTypeDAO;
    getArStoneMasterDAO(): ArStoneMasterDAO;
    getArJewelryMasterDAO(): ArJewelryMasterDAO;
    getProductTypesDAO(): ProductTypesDAO;
}