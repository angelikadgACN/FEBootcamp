const  cdsCompile  = require('@sap/cds/lib/compile/cds-compile');
const { INSERT } = require('@sap/cds/lib/ql/cds-ql');
const  SELECT  = require('@sap/cds/lib/ql/SELECT');

async function InsertCategories() {
    const nw = await cds.connect.to('northwind');
    const res = await nw.get('/V3/Northwind/Northwind.svc/Categories?$format=json');
    const raw = res?.d?.results ?? res?.value ?? [];
    const entries = raw.map(r => ({
        CategoryID: String(r.CategoryID),
        CategoryName: String(r.CategoryName),
        Description: String(r.Description)
    }));
    await INSERT.into('ACTIVITYONE_CATEGORIES').entries(entries);
    return `Inserted ${entries.length} caterory(s) from Northwind.`;    
};

module.exports = {
    InsertCategories
}