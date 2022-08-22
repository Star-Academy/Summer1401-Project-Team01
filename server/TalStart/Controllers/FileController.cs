using Microsoft.AspNetCore.Mvc;
using Npgsql;
using TalStart.Services.ParserService;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]")]
public class FileController
{
    [HttpPost("upload")]
    public async Task<IActionResult> UploadFile(IFormFile file)
    {
        var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.FileName);

        await using (var stream = new FileStream(path, FileMode.Create))
        {
            await file.CopyToAsync(stream);
            try
            {
                ParserDatatableToPostgresTable.ParseToPostgresTable(ParserCsvToDatatable.Parse(path));
                return new OkResult();
            }
            catch (Exception e)
            {
                return new BadRequestResult();
            }
        }
    }
}