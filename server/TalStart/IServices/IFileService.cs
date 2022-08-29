using Microsoft.AspNetCore.Mvc;

namespace TalStart.IServices;

public interface IFileService
{
    public Task UploadFile(IFormFile file, Dictionary<string, string> columns, string username, string datasetName);
    public string DownloadFile(string datasetName, string username);
    public void DeleteFile(string datasetName, string username);
    public void RenameCsvFile(string finalDirectoryName, string oldName, string newName);
}