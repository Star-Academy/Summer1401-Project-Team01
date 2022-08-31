using System.Text;
using TalStart.IServices;
using TalStart.Models.ProcessType.Options;

namespace TalStart.Services;

public class PostgresQueryBuilder : IQueryBuilder
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

    public string SelectIntoQuery(string sourceTable, string finalTable)
    {
        return $"SELECT * INTO \"{finalTable}\" FROM \"{sourceTable}\"";
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

    public string SortQuery(string sourceTable, string finalTable, string operationColumn,bool isAscending)
    {
        var query =  $"SELECT * INTO \"{finalTable}\" FROM \"{sourceTable}\"";
        query += $" ORDER BY \"{operationColumn}\" ";
        query += isAscending ? "ASC" : "DESC";
        return query;
    }

    public string FilterQuery(string sourceTable, string finalTable, FilterOptions filterOptions)
    {
        var query = $"SELECT *\n";
        query += $"  INTO \"{finalTable}\" FROM \"{sourceTable}\" \n";
        query += $" WHERE\n";
        query += filterOptions + ";";
        return query;
    }

    public string SelectQuery(string sourceTable, string finalTable, List<string> columns)
    {
        var query = $"SELECT ";
        foreach (var column in columns)
        {
            query += $"\"{column}\"" +',';
        }
        query = query.Substring(0,query.Length - 1);
        query += $"  INTO \"{finalTable}\" FROM \"{sourceTable}\"";

        return query;
    }

    public string JoinQuery(string sourceTable, string finalTable, string type, string middleDatasetName,
        string leftVal, string rightVal)
    {
        var query = $"SELECT *\n";
        query += $"  INTO \"{finalTable}\" FROM \"{sourceTable}\" \n";
        query += $" {type} JOIN \"{middleDatasetName}\"\n";
        query +=
            $"ON \"{sourceTable}\".{leftVal} = \"{middleDatasetName}\".{rightVal}";
        query += ";";
        return query;
    }

    public string CopyTableIntoTable(string sourceTable, string finalTable)
    {
        return $"SELECT * INTO \"{finalTable}\" FROM \"{sourceTable}\"";
    }

    public string FieldRemoverQuery(string sourceTable, List<string> columns)
    {
        var query = $"ALTER TABLE \"{sourceTable}\" \n";
        query = columns.Aggregate(query, (current, column) => current + $"DROP COLUMN {column},\n");
        query = query[..^1] + ";";
        return query;
    }
}