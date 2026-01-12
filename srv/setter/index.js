//THIS FILE IS TO INSERT DATA INTO TABLES
const  cdsCompile  = require('@sap/cds/lib/compile/cds-compile');
const { INSERT } = require('@sap/cds/lib/ql/cds-ql');
const  SELECT  = require('@sap/cds/lib/ql/SELECT');
const { v4: uuidv4 } = require('uuid');

async function LogBooks(name, id, title, author, date) {
    const txInsert = await cds.transaction();

    //Check duplicates
    const duplicate = await txInsert.run(
        SELECT.one.from('ACTIVITYONE_BOOKS').where(
            { borrowerName: name,
              bookTitle: title,
              readDate: date  })
    )

    if (duplicate) {
        return 'Duplicate found!'
    }

    await txInsert.begin();
    await txInsert.run(INSERT.into('ACTIVITYONE_BOOKS').entries({
        ID: uuidv4(),
        borrowerName: name,
        borrowerID: id,
        bookTitle: title,
        authorName: author,
        readDate: date
    }))
    await txInsert.commit();
    
    return 'Successfully Inserted';

};

module.exports = {
    LogBooks
}