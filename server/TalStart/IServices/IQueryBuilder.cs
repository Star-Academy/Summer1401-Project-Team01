namespace TalStart.IServices;

public interface IQueryBuilder
{
    public string ExportCsvQuery(string tableName, string filePath);

    public string ImportCsvQuery(string tableName, string filePath);

    public string BuildTableQuery(Dictionary<string, string> columnType, string tableName);
}