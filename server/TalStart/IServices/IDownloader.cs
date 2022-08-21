namespace TalStart.IServices;

public interface IDownloader
{
    public Task<IFormFile> DownloadCsv(string query);
}