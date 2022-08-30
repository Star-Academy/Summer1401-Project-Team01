using Microsoft.AspNetCore.Mvc;
using TalStart.IServices;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class FileController : ControllerBase
{
    private readonly IFileService _fileService;

    public FileController(IFileService fileService)
    {
        _fileService = fileService;
    }

    [HttpPost("download")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DownloadFile([FromQuery] string datasetName,[FromQuery] string username)
    {
        try
        {
            return new OkObjectResult(_fileService.DownloadFile(datasetName, username));
        }
        catch (Exception)
        {
            return new BadRequestResult();
        }
    }
}