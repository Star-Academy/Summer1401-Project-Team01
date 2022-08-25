using Microsoft.AspNetCore.Mvc;
using TalStart.IServices;
using TalStart.IServices.IParserService;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class FileController : ControllerBase
{
    // dependency injection 
    private readonly IFileService _fileService;

    public FileController(IFileService fileService)
    {
        _fileService = fileService;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> UploadFile([FromHeader] IFormFile file, Dictionary<string, string> columns,
        string username)

    {
        try
        {
            await _fileService.UploadFile(file, columns, username);
            return new OkResult();
        }
        catch (Exception e)
        {
            return new BadRequestResult();
        }
    }

    [HttpPost("download")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DownloadFile(string fileName, string username)
    {
        try
        {
            return await _fileService.DownloadFile(fileName, username);
        }
        catch (Exception e)
        {
            return new BadRequestResult();
        }
    }
}