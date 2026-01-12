//THIS FILE EXPOSES CREATED FUNCTIONS AS A SERVICE
const cds = require('@sap/cds');
const { LogBooks } = require('../srv/setter/index');
const { FetchBooks } = require('../srv/getter/index');
const { FetchCombined } = require('../srv/getter/indexcomb');
const { InsertProducts } = require('../srv/setter/indexprod');
const { InsertSuppliers } = require('../srv/setter/indexsupp');
const { InsertCategories } = require('../srv/setter/indexcat');
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');


module.exports = async srv => {
    //Before inserting a Book
    srv.before('CREATE', 'Books', req => {
        console.log(`Inserting Book record`)
    });

    //Log before Updating
    srv.before('UPDATE', 'Books', req => {
        console.log(`Updating Book record for ID: ${req.data.borrowerID}`)
    });

    //Log before Deleting
    srv.before('DELETE', 'Books', req => {
        console.log(`Deleting Book record for ID: ${req.data.borrowerID}`)
    });

    srv.on('logBooks', async (req) => {
        const { name, id, title, author, date } = req.data;
        const result = await LogBooks(name, id, title, author, date);
        return result; //Return a string
    });

    srv.on('getBooks', async (req) => {
        const { id } = req.data;
        const result = await FetchBooks(id);
        return result;
    });

    srv.on('insertTBProducts', async () => {
        const result = await InsertProducts();
        return result;
    });

    srv.on('insertTBSuppliers', async () => {
        const result = await InsertSuppliers();
        return result;
    });

    srv.on('insertTBCategories', async () => {
        const result = await InsertCategories();
        return result;
    });

    srv.on('getCombined', async () => {
        const result = await FetchCombined();
        return result;
    });

    srv.on('northwind', async (req) => {
        try {
            const response = await executeHttpRequest(
                {
                    destinationName: "northwind",
                },
                {
                    method: "GET",
                    url: "/V3/Northwind/Northwind.svc/Products?$format=json",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                },
                {
                    method: "GET",
                    url: "/V3/Northwind/Northwind.svc/Suppliers?$format=json",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                },
                {
                    method: "GET",
                    url: "/V3/Northwind/Northwind.svc/Categories?$format=json",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );
            return response.data;
        } catch (error) {
            return { 'MESSAGE': error.message || error.toString() };
        }
    });
};