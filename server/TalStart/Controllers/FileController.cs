using Microsoft.AspNetCore.Mvc;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]")]
public class FileController
{
    [HttpPost("/file")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UploadFile(IFormFile file)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpGet("/file")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> DownloadFile([FromQuery] string fileName)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }
    
    
}