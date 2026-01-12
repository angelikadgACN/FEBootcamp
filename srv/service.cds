//THIS FILE EXPOSES AS AN ACTION CDS
using ActivityOne as my from '../db/schema';

service CatalogService {

  // Expose tables
  entity Books      as projection on my.Books;
  entity Products   as projection on my.Products;
  entity Suppliers  as projection on my.Suppliers;
  entity Categories as projection on my.Categories;
  entity Combined as projection on my.Combined;

  action logBooks(name: String, id: String, title: String, author: String, date: Date) returns String;

  action getBooks(id: String) returns String;

  action insertTBProducts() returns String;

  action insertTBSuppliers() returns String;

  action insertTBCategories() returns String;

  action getCombined() returns String;
  
  function northwind() returns String;
}