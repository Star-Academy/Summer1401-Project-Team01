using Microsoft.AspNetCore.Mvc;
using TalStart.IServices;
using TalStart.Models;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class DatasetController : ControllerBase
{
    private readonly IDatasetService _datasetService;
    public DatasetController(IDatasetService datasetService)
    {
        _datasetService = datasetService;
    }

    [HttpPost("/dataset/add")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddDataset([FromForm] string username, [FromForm] string datasetName)
    {
        if(_datasetService?.AddDataset(username, datasetName))
            return OkResult();
        return new BadRequestResult();
    }

    [HttpDelete("/dataset/remove/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RemoveDataset([FromRoute] string datasetId)
    {
        if(_datasetService?.RemoveDataset(datasetId))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RenameDataset([FromForm] string name, [FromForm] string username, [FromForm] string newDatasetName)
    {
        if(_datasetService.RenameDataset(name, username, newDatasetName))  
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpGet]
    //[ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetAllDatasets()
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpGet("/dataset/{count}")]
    //[ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetDatasetSample(int count)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }
}