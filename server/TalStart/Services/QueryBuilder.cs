using System.Text;
using TalStart.IServices;

namespace TalStart.Services;

public class QueryBuilder : IQueryBuilder
{
    public string ExportCsvQuery(string tableName, string filePath)
    {
        return $"COPY \"{tableName}\" to '{filePath}' WITH (FORMAT CSV, HEADER);";
    }

    public string ImportCsvQuery(string tableName, string filePath)
    {
        return
            $"TRUNCATE TABLE \"{tableName}\";\n COPY \"{tableName}\" FROM '{filePath}'  DELIMITER ',' CSV HEADER encoding 'windows-1251';";
    }

    public string DropTableQuery(string tableName)
    {
        return $"DROP TABLE IF EXISTS {tableName};\n";
    }

    public string GetColumnNamesQuery(string tableName)
    {
        return
            $"SELECT column_name FROM information_schema.columns where table_schema = 'public' and table_name = '{tableName}';";
    }

    public string BuildTableQuery(Dictionary<string, string> columnType, string tableName)
    {
        var query = new StringBuilder($"CREATE TABLE IF NOT EXISTS  \"{tableName}\" (\n");

        foreach (var (key, value) in columnType)
        {
            query.Append($"{key} {value},");
        }

        query.Remove(query.Length - 1, 1);
        query.Append(");\n");
        return query.ToString();
    }

    public string RenameTableQuery(string tableName, string newTableName)
    {
        return $"ALTER TABLE {tableName} RENAME TO {newTableName}";
    }

    public string AggregateQuery(string sourceTable, string columnToBeGroupedBy, string operationColumn,
        string operationType, string finalTable)
    {
        return
            $"CREATE TABLE {finalTable} as SELECT {columnToBeGroupedBy}, {operationType}({operationColumn}) From {sourceTable} GROUP BY {columnToBeGroupedBy}";
    }
}