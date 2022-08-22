using TalStart.IServices;

namespace TalStart.Services;

public class Downloader : IDownloader
{
    public async Task<IFormFile> DownloadCsv(string query)
    {
        // Execute query
        return null;
    }
}