using Microsoft.AspNetCore.Mvc;
using TalStart.IServices;
using TalStart.IServices.IParserService;
using TalStart.Services.ParserService;

namespace TalStart.Services;

public class FileService : IFileService
{
    private IQueryBuilder _queryBuilder;
    private IParser _parser;

    public FileService()
    {
        _queryBuilder = new QueryBuilder();
        _parser = new Parser(_queryBuilder);
    }

    public async void UploadFile(IFormFile file, Dictionary<string, string> columns, string username)
    {
        var tableName = $"{file.FileName}.{username}";
        var path = Path.Combine(Directory.GetCurrentDirectory(), $"resources\\{username}", $"{tableName}.csv");

        await using var stream = File.Create(path);
        await file.CopyToAsync(stream);
        _parser.ParseCsvToPostgresTable(columns, tableName, path);
    }

    public async Task<FileStreamResult> DownloadFile(string fileName, string username)
    {
        var tableName = $"{fileName}.{username}";
        var path = Path.Combine(Directory.GetCurrentDirectory(), $"resources\\{username}", $"{tableName}.csv");


        _parser.ParsePostgresTableToCsv(tableName, path);
        await using var stream = new FileStream(path, FileMode.Open);
        return new FileStreamResult(stream, "text/csv");
    }
}