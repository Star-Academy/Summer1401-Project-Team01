namespace TalStart.IServices.IParserService;

public interface IParser
{
    void ParsePostgresTableToCsv(string tableName, string filePath);
    void ParseCsvToPostgresTable(Dictionary<string, string> columnType, string tableName, string filePath);
}