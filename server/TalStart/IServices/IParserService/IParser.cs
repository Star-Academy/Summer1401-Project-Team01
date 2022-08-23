namespace TalStart.IServices.IParserService;

public interface IParser
{
    public void ParsePostgresTableToCsv(string tableName, string filePath);
    public void ParseCsvToPostgresTable(Dictionary<string, string> columnType, string tableName, string filePath);
}