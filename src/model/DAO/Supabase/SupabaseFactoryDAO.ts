import {FactoryDAO} from "../interface/FactoryDAO.ts";
import {SupabaseBaseDAO} from "./SupabaseBaseDAO.ts";
import {BaseDAO} from "../interface/BaseDAO.ts";
import {ArStoneMasterDAO} from "../interface/ArStoneMasterDAO.ts";
import {ArJewelryMasterDAO} from "../interface/ArJewelryMasterDAO.ts";
import {SupabaseArJewelryMasterDAO} from "./SupabaseArJewelryMasterDAO.ts";
import {SupabaseArStoneMasterDAO} from "./SupabaseArStoneMasterDAO.ts";
import {MaterialTypeDAO} from "../interface/MaterialTypeDAO.ts";
import {SupabaseMaterialTypeDAO} from "./SupabaseMaterialTypeDAO.ts";
import {StCutDAO} from "../interface/StCutDAO.ts";
import {SupabaseStCutDAO} from "./SupabaseStCutDAO.ts";
import {StTypeDAO} from "../interface/StTypeDAO.ts";
import {SupabaseStTypeDAO} from "./SupabaseStTypeDAO.ts";
import {ProductTypesDAO} from "../interface/ProductTypesDAO.ts";
import {SupabaseProductTypeDAO} from "./SupabaseProductTypeDAO.ts";

export class SupabaseFactoryDAO implements FactoryDAO {
    getArJewelryMasterDAO(): ArJewelryMasterDAO {
        return new SupabaseArJewelryMasterDAO();
    }

    getArStoneMasterDAO(): ArStoneMasterDAO {
        return new SupabaseArStoneMasterDAO();
    }

    getBaseDAO(): BaseDAO {
        return new SupabaseBaseDAO();
    }

    // getCTWRangeDAO(): CTWRangeDAO {
    //     return undefined;
    // }

    getMaterialTypeDAO(): MaterialTypeDAO {
        return new SupabaseMaterialTypeDAO;
    }

    getStCutDAO(): StCutDAO {
        return new SupabaseStCutDAO;
    }

    getStTypeDAO(): StTypeDAO {
        return new SupabaseStTypeDAO;
    }

    getProductTypesDAO(): ProductTypesDAO {
        return new SupabaseProductTypeDAO();
    }

}