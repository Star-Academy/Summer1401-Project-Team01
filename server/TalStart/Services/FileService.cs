using Microsoft.AspNetCore.Mvc;
using TalStart.IServices;
using TalStart.IServices.IParserService;
using TalStart.Services.ParserService;

namespace TalStart.Services;

public class FileService : IFileService
{
    private readonly IParser _parser;


    public FileService(IParser parser)
    {
        _parser = parser;
    }

    public async Task UploadFile(IFormFile file, Dictionary<string, string> columns, string username,
        string datasetName)
    {
        string dir = $"{AppContext.BaseDirectory}../../../resources/{username}"; // If directory does not exist, create it.
        if (!Directory.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }
        //var fileName = $"{datasetName}.{username}";
        var path = $"{System.AppContext.BaseDirectory}../../../resources/{username}/{datasetName}.csv";

        await using var stream = new FileStream(path, FileMode.Create);
        await file.CopyToAsync(stream);
        _parser.ParseCsvToPostgresTable(columns, $"{datasetName}.{username}", path);
    }

    public async Task<FileStreamResult> DownloadFile(string datasetName, string username)
    {
        var tableName = $"{datasetName}.{username}";

        var path = Path.Combine(Directory.GetCurrentDirectory(), $"resources\\{username}", $"{tableName}.csv");

        _parser.ParsePostgresTableToCsv(tableName, path);
        await using var stream = new FileStream(path, FileMode.Open);
        return new FileStreamResult(stream, "text/csv");
    }
}