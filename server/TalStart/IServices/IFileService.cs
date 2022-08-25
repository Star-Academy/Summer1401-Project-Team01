using Microsoft.AspNetCore.Mvc;

namespace TalStart.IServices;

public interface IFileService
{


    public void UploadFile(IFormFile file, Dictionary<string, string> columns, string username);
    public Task<FileStreamResult> DownloadFile(string fileName, string username);
}