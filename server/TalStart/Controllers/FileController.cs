using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class FileController : ControllerBase
{
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public string DownloadFile([FromQuery] string datasetName, [FromQuery] string username)
    {
        try
        {
            var path = $"{AppContext.BaseDirectory}../../../resources/{username}/{datasetName}.csv";
            return JsonSerializer.Serialize($"File:/{path}");
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            throw;
        }
    }
}