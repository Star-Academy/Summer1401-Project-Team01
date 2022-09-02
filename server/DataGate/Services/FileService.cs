using Microsoft.VisualBasic.FileIO;
using DataGate.IServices;
using DataGate.IServices.IParserService;
using DataGate.Properties;

namespace DataGate.Services;

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
        var dir = GetDirectory(username);
        if (!Directory.Exists(dir))
        {
            Directory.CreateDirectory(dir);
        }

        var path = GetPath(username, datasetName, "csv");
        await using (var stream = new FileStream(path, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        _parser.ParseCsvToPostgresTable(columns, $"{datasetName}_{username}", path);
    }

    public void DeleteFile(string datasetName, string username)
    {
        var path = GetPath(username, datasetName, "csv");
        FileSystem.DeleteFile(path);
    }

    public void RenameFile(string username, string oldName, string newName, string fileFormat)
    {
        var pathToOldFile = GetPath(username, oldName, fileFormat);
        FileSystem.RenameFile(pathToOldFile, $"{newName}" + $"{fileFormat}");
    }

    public string GetPath(string finalFolder, string fileName, string format)
    {
        return Path.Combine(Configurations.PathToResources, finalFolder, $"{fileName}.{format}");
    }

    public string GetDirectory(string username)
    {
        return Path.Combine(Configurations.PathToResources, username);
    }
}