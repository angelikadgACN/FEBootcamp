//THIS FILE RETRIEVES/ SELECT DATA FROM TABLE
const cds = require('@sap/cds');
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');

async function FetchBooks(id) {
    try {
        
        const data = await SELECT.from('ACTIVITYONE_BOOKS')
        .where({ borrowerID: id })
        .orderBy('borrowerID desc');

        if (!data.length) {
            return 'No books found for borrower';
        }

        return data.map(r => ({
            ID: r.ID,
            borrowerName: r.BORROWERNAME,
            borrowerID: id,
            bookTitle: r.BOOKTITLE,
            authorName: r.AUTHORNAME,
            readDate: r.READDATE
        }));

    } catch (error) {
        return { MESSAGE: error.message };
    }
}

module.exports = {
    FetchBooks
}