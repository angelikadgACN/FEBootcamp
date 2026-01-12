//THIS FILE WHERE WE CREATE CDS OBJECTS: TABLES
namespace ActivityOne;

entity Books {
    key ID        : UUID;                  // Primary Key - Book ID
    borrowerName  : String(50);            // Borrower's Name
    borrowerID    : String(10);            // Borrower's ID
    bookTitle     : String(100);           // Book Title
    authorName    : String(100);           // Author Name
    readDate      : Date;                  // Date
}
entity Products {
    key ProductID   : UUID;                // Primary Key - Product ID
    ProductName     : String(100);         // Product Name
    SupplierID      : String(100);         // Supplier ID
    CategoryID      : String(100);         // Category ID
    QuantityPerUnit : String(100);         // Quantity per Unit
    UnitPrice       : String(100);         // Unit Price
    UnitsInStock    : Integer;             // Units in Stock
    UnitsOnOrder    : Integer;             // Units on Order
    ReorderLevel    : Integer;             // Reorder Level
    Discontinued    : String(100);         // Discontinued
}

entity Suppliers {
    SupplierID     : UUID;                  // Supplier ID
    CompanyName    : String(100);           // Company Name
    ContactName    : String(100);           // Contact Name
    ContactTitle   : String(100);           // Contact Title
    Address        : String(100);           // Address
    City           : String(100);           // City
    Region         : String(100);           // Region
    PostalCode     : String(100);           // Postal Code
    Country        : String(100);           // Country
    Phone          : String(100);           // Phone
    Fax            : String(100);           // Fax
    HomePage       : String(200);           // Home Page
}

entity Categories {
    CategoryID    : String(100);           // Category ID
    CategoryName  : String(100);           // Category Name
    Description   : String(100);           // Category Description
}

entity Combined {
    ProductID       : UUID;
    ProductName     : String(100);
    SupplierID      : String(100);
    CompanyName     : String(100);
    Address         : String(100);
    City            : String(100);
    Region          : String(100);
    CategoryName    : String(100);
    Description     : String(100);
}