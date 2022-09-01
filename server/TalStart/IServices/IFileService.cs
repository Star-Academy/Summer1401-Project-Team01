namespace TalStart.IServices;

public interface IFileService
{
    Task UploadFile(IFormFile file, Dictionary<string, string> columns, string username, string datasetName);
    void DeleteFile(string datasetName, string username);
    void RenameFile(string finalDirectoryName, string oldName, string newName, string fileFormat);
    string GetPath(string finalFolder, string fileName, string format);
}