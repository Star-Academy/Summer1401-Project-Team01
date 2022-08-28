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
        string dir = $"{AppContext.BaseDirectory}../../../resources/{username}"; // If directory does not exist, create it.
        if (!Directory.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }
        //var fileName = $"{datasetName}.{username}";
        var path = $"{AppContext.BaseDirectory}../../../resources/{username}/{datasetName}.csv";

        using (var stream = new FileStream(path, FileMode.Create))
        {
            file.CopyTo(stream);
        }
        _parser.ParseCsvToPostgresTable(columns, $"{datasetName}.{username}", path);
    }

    public async Task<FileStreamResult> DownloadFile(string datasetName, string username)
    {
        var tableName = $"{datasetName}.{username}";
        
        var path = $"{AppContext.BaseDirectory}../../../resources/{username}/{datasetName}.csv";

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
    
    public void RenameCsvFile(string finalDirectoryName, string oldName, string newName)
    {
        var path = $"{AppContext.BaseDirectory}../../../resources/{finalDirectoryName}/";
        FileSystem.RenameFile(
            Path.Combine(path, $"{oldName}.csv")
            , $"{newName}.csv");
    }
}