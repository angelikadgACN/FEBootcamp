const  cdsCompile  = require('@sap/cds/lib/compile/cds-compile');
const { INSERT } = require('@sap/cds/lib/ql/cds-ql');
const  SELECT  = require('@sap/cds/lib/ql/SELECT');

async function FetchCombined() {
    const products   = await SELECT.from('ACTIVITYONE_PRODUCTS');
    const suppliers  = await SELECT.from('ACTIVITYONE_SUPPLIERS');
    const categories = await SELECT.from('ACTIVITYONE_CATEGORIES');
    const txInsert = await cds.transaction();

    const sMap = new Map(suppliers.map(s => [String(s.SupplierID), s]));
    const cMap = new Map(categories.map(c => [String(c.CategoryID), c]));

    const result = products.map(p => {
      const s = sMap.get(String(p.SupplierID)) || {};
      const c = cMap.get(String(p.CategoryID)) || {};
      return {
        ProductID: p.ProductID,
        ProductName: p.ProductName,
        SupplierID: String(p.SupplierID),
        CompanyName: s.CompanyName,
        Address: s.Address,
        City: s.City,
        Region: s.Region,
        CategoryName: c.CategoryName,
        Description: c.Description
      };
    });
    await INSERT.into('ACTIVITYONE_COMBINED').entries(result);
    return result;
    //return `Inserted ${entries.length} caterory(s) from Northwind.`;   
 
};

module.exports = {
    FetchCombined
}