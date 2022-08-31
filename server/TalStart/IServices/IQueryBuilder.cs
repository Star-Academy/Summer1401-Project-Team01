﻿namespace TalStart.IServices;

public interface IQueryBuilder
{
    public string ExportCsvQuery(string tableName, string filePath);

    public string ImportCsvQuery(string tableName, string filePath);
    public string DropTableQuery(string tableName);

    public string BuildTableQuery(Dictionary<string, string> columnType, string tableName);

    public string SelectIntoQuery(string sourceTable, string finalTable);

    public string GetColumnNamesQuery(string tableName);
    public string RenameTableQuery(string tableName, string newTableName);
}