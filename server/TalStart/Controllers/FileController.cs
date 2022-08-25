using Microsoft.AspNetCore.Mvc;
using TalStart.IServices.IParserService;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class FileController : ControllerBase
{
    // dependency injection 
    private readonly IParser _parser;

    public FileController(IParser parser)
    {
        _parser = parser;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> UploadFile(IFormFile file, Dictionary<string, string> columns, string username)

    {
        var fileName = $"{file.FileName}.{username}";
        var path = Path.Combine(Directory.GetCurrentDirectory(), $"/resources/{username}", fileName);

        await using var stream = new FileStream(path, FileMode.Create);
        await file.CopyToAsync(stream);
        try
        {
            _parser.ParseCsvToPostgresTable(columns, fileName, path);
            return new OkResult();
        }
        catch (Exception e)
        {
            return new BadRequestResult();
        }
    }

    public async Task<IActionResult> DownloadFile(string fileName, string username)
    {
        var tableName = $"{fileName}.{username}";
        var path = Path.Combine(Directory.GetCurrentDirectory(), $"/resources/{username}", fileName);

        try
        {
            _parser.ParsePostgresTableToCsv(tableName, path);
            await using var stream = new FileStream(path, FileMode.Open);
            return new FileStreamResult(stream, "text/csv");
        }
        catch (Exception e)
        {
            return new BadRequestResult();
        }
    }
}