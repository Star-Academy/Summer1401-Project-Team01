using System.Text;
using DataGate.IServices;
using DataGate.IServices.IParserService;

namespace DataGate.Services.ParserService;

public class Parser : IParser

{
    private readonly IQueryBuilder _queryBuilder;
    private ISqlService _sqlService;

    public Parser(IQueryBuilder queryBuilder, ISqlService sqlService)
    {
        _queryBuilder = queryBuilder;
        _sqlService = sqlService;
    }

    public void ParsePostgresTableToCsv(string tableName, string filePath)
    {
        var query = new StringBuilder(_queryBuilder.ExportCsvQuery(tableName, filePath));
        _sqlService.ExecuteNonQueryPostgres(query.ToString());
    }

    public void ParseCsvToPostgresTable(Dictionary<string, string> columnType, string tableName, string filePath)
    {
        var query = new StringBuilder(_queryBuilder.BuildTableQuery(columnType, tableName));
        query.Append(_queryBuilder.ImportCsvQuery(tableName, filePath));
        _sqlService.ExecuteNonQueryPostgres(query.ToString());
    }
}