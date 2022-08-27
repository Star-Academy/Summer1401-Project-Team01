using System.Text;
using TalStart.IServices;

namespace TalStart.Services;

public class QueryBuilder : IQueryBuilder
{
    public string ExportCsvQuery(string tableName, string filePath)
    {
        return $"COPY {tableName} to '{filePath}' WITH (FORMAT CSV, HEADER);";
    }

    public string ImportCsvQuery(string tableName, string filePath)
    {
        return $"TRUNCATE TABLE {tableName};\n COPY {tableName} FROM {filePath}  DELIMITER ',' CSV HEADER;";
    }

    public string BuildTableQuery(Dictionary<string,string> columnType, string tableName)
    {
        var query = new StringBuilder($"CREATE TABLE [IF NOT EXISTS]  {tableName} (\n");
        
        foreach(var (key, value) in columnType)
        {
            query.Append($"{key} {value},\n");
        }

        query.Append(");\n");
        return query.ToString();
    }
}