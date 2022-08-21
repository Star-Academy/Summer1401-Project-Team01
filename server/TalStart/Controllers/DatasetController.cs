using Microsoft.AspNetCore.Mvc;


namespace TalStart.Controllers;

[ApiController]
[Route("[controller]")]
public class DatasetController
{


    [HttpPost("/dataset")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddDataset()
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }
    
    
}