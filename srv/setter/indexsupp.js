const  cdsCompile  = require('@sap/cds/lib/compile/cds-compile');
const { INSERT } = require('@sap/cds/lib/ql/cds-ql');
const  SELECT  = require('@sap/cds/lib/ql/SELECT');

async function InsertSuppliers() {
    const nw = await cds.connect.to('northwind');
    const res = await nw.get('/V3/Northwind/Northwind.svc/Suppliers?$format=json');
    const raw = res?.d?.results ?? res?.value ?? [];
    const entries = raw.map(r => ({
        SupplierID: String(r.SupplierID),
        CompanyName: String(r.CompanyName),
        ContactName: String(r.ContactName),
        ContactTitle: String(r.ContactTitle),
        Address: String(r.Address),
        City: String(r.City),
        Region: String(r.Region),
        PostalCode: String(r.PostalCode),
        Country: String(r.Country),
        Phone: String(r.Phone),
        Fax: r.Fax,
        HomePage: String(r.HomePage)
    }));
    await INSERT.into('ACTIVITYONE_SUPPLIERS').entries(entries);
    return `Inserted ${entries.length} supplier(s) from Northwind.`;    
};

module.exports = {
    InsertSuppliers
}