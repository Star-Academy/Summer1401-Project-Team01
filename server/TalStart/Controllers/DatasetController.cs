using Microsoft.AspNetCore.Mvc;
using TalStart.IServices;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class DatasetController : ControllerBase
{
    private readonly IDatasetService _datasetService;
    private readonly IFileService _fileService;

    public DatasetController(IDatasetService datasetService, IFileService fileService)
    {
        _datasetService = datasetService;
        _fileService = fileService;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddDataset([FromForm] IFormFile file, [FromForm] string datasetName,
        [FromForm] Dictionary<string, string> columnTypes, [FromForm] string username)
    {
        Console.WriteLine("salam");
        try
        {
            await _fileService.UploadFile(file, columnTypes, username, datasetName);
            _datasetService.AddDataset(username, datasetName);
            return new OkResult();
        }
        catch (Exception e)
        {
            return new BadRequestResult();
        }
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RemoveDataset([FromForm] string datasetName, [FromForm] string username)
    {
        if (_datasetService.RemoveDataset(datasetName, username))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RenameDataset([FromForm] string currentDatasetName, [FromForm] string username,
        [FromForm] string newDatasetName)
    {
        if (_datasetService.RenameDataset(currentDatasetName, username, newDatasetName))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpGet("{username}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetAllDatasets([FromRoute] string username)
    {
        try
        {
            return Ok(_datasetService.GetAllDatasetNames(username));
        }
        catch (Exception)
        {
            return new BadRequestResult();
        }
    }

    [HttpGet("{count}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetDatasetSample(int count)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }
}