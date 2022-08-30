using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic.FileIO;
using TalStart.IServices;
using TalStart.IServices.IParserService;
using TalStart.Properties;

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
        var dir = Path.Combine(Configurations.PathToResources, $"{username}");
        if (!Directory.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }
        //var fileName = $"{datasetName}.{username}";
        var path = Path.Combine(Configurations.PathToResources, $"{username}/{datasetName}.csv");
        using (var stream = new FileStream(path, FileMode.Create))
        {
            file.CopyTo(stream);
        }
        _parser.ParseCsvToPostgresTable(columns, $"{datasetName}_{username}", path);
    }

    public string DownloadFile(string datasetName, string username)
    {
        var tableName = $"{datasetName}_{username}";

        var path = Path.Combine(Configurations.PathToResources, $"{username}/{datasetName}.csv");
        
        _parser.ParsePostgresTableToCsv(tableName, path);
        using var stream = new FileStream(path, FileMode.Open);
        var res = new FileStreamResult(stream, "text/csv");
        return path;
    }

    public void DeleteFile(string datasetName, string username)
    {
        var path = Path.Combine(Configurations.PathToResources, $"{username}", $"{datasetName}.csv");
        FileSystem.DeleteFile(path);
    }

    public void RenameFile(string finalDirectoryName, string oldName, string newName, string fileFormat)
    {
        var pathToOldFile = Path.Combine(Configurations.PathToResources, $"{finalDirectoryName}", $"{oldName}" + $"{fileFormat}");
        FileSystem.RenameFile(pathToOldFile, $"{newName}" + $"{fileFormat}");
    }
}