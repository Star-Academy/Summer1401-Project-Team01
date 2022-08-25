using System.Text;
using TalStart.IServices;
using TalStart.IServices.IParserService;

namespace TalStart.Services.ParserService;

public class Parser : IParser

{
    private readonly IQueryBuilder _queryBuilder;

    public Parser(IQueryBuilder queryBuilder)
    {
        _queryBuilder = queryBuilder;
    }
    
    public void ParsePostgresTableToCsv(string tableName, string filePath)
    {
        var query = new StringBuilder(_queryBuilder.ExportCsvQuery(tableName, filePath));
        SqlService.GetInstance().ExecuteNonQueryPostgres(query.ToString());
    }

    public void ParseCsvToPostgresTable(Dictionary<string, string> columnType, string tableName, string filePath)
    {
        var query = new StringBuilder(_queryBuilder.BuildTableQuery(columnType, tableName));
        query.Append(_queryBuilder.ImportCsvQuery(tableName, filePath));
        SqlService.GetInstance().ExecuteNonQueryPostgres(query.ToString());
    }
}