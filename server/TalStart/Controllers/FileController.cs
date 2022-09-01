using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using TalStart.IServices;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class FileController : ControllerBase
{
    private IFileService _fileService;

    public FileController(IFileService fileService)
    {
        _fileService = fileService;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public string DownloadFile([FromQuery] string datasetName, [FromQuery] string username)
    {
        try
        {
            var path = _fileService.GetPath(username, datasetName, "csv");
            return JsonSerializer.Serialize($"File:/{path}");
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            throw;
        }
    }
}