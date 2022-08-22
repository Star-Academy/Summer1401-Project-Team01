namespace TalStart.IServices.IParserService;

public interface IParserCsvToPostgresTable
{
    public void ParseCsvToPostgresTable(Dictionary<string, string> columnType, string tableName, string filePath);
}