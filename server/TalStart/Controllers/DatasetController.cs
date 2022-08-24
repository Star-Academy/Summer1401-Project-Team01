using Microsoft.AspNetCore.Mvc;


namespace TalStart.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class DatasetController : ControllerBase
{
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddDataset()
    {
        return new BadRequestResult();
    }

    [HttpDelete("/dataset/{id}")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RemoveDataset([FromRoute] string datasetId)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RenameDataset([FromForm] string name, [FromForm] string username, [FromForm] string newDatasetName)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetAllDatasets()
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpGet("/dataset/{count}")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetDatasetSample(int count)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }
}