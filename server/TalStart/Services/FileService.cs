using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic.FileIO;
using TalStart.IServices;
using TalStart.IServices.IParserService;

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
        var fileName = $"{datasetName}.{username}";
        var path = Path.Combine(Directory.GetCurrentDirectory(), $"/resources/{username}", $"{fileName}.csv");

        await using var stream = new FileStream(path, FileMode.Create);
        await file.CopyToAsync(stream);
        _parser.ParseCsvToPostgresTable(columns, fileName, path);
    }

    public async Task<FileStreamResult> DownloadFile(string datasetName, string username)
    {
        var tableName = $"{datasetName}.{username}";

        var path = Path.Combine(Directory.GetCurrentDirectory(), $"resources\\{username}", $"{tableName}.csv");

        _parser.ParsePostgresTableToCsv(tableName, path);
        await using var stream = new FileStream(path, FileMode.Open);
        return new FileStreamResult(stream, "text/csv");
    }

    public void DeleteFile(string datasetName, string username)
    {
        var path = Path.Combine(Directory.GetCurrentDirectory(),
                        $"resources\\{username}", $"{datasetName}.csv");
        FileSystem.DeleteFile(path);
    }
}