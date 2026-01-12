const  cdsCompile  = require('@sap/cds/lib/compile/cds-compile');
const { INSERT } = require('@sap/cds/lib/ql/cds-ql');
const  SELECT  = require('@sap/cds/lib/ql/SELECT');

async function InsertProducts() {
    const nw = await cds.connect.to('northwind');
    const res = await nw.get('/V3/Northwind/Northwind.svc/Products?$format=json');
    const raw = res?.d?.results ?? res?.value ?? [];
    const entries = raw.map(r => ({
        ProductID: String(r.ProductID),
        ProductName: r.ProductName,
        SupplierID: String(r.SupplierID),
        CategoryID: String(r.CategoryID),
        QuantityPerUnit: r.QuantityPerUnit,
        UnitPrice: String(r.UnitPrice),
        UnitsInStock: r.UnitsInStock,
        UnitsOnOrder: r.UnitsOnOrder,
        ReorderLevel: r.ReorderLevel,
        Discontinued: String(r.Discontinued)
    }));
    await INSERT.into('ACTIVITYONE_PRODUCTS').entries(entries);
    return `Inserted ${entries.length} product(s) from Northwind.`;    
};

module.exports = {
    InsertProducts
}