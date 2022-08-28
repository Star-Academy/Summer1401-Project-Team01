using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TalStart.IServices;
using JsonSerializer = System.Text.Json.JsonSerializer;

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
    public async Task<IActionResult> AddDataset(/*[FromForm] IFormFile file, */[FromForm] string datasetName,
        [FromForm] string columnTypes, [FromForm] string username)
    {
        try
        {
            var file = Request.Form.Files[0];
            var columns = JsonSerializer.Deserialize<Dictionary<string, string>>(columnTypes);
            foreach (var columnName in columns.Keys)
            {
                if (columns[columnName] == "string")
                {
                    columns[columnName] = "text";
                }
            }
            _fileService.UploadFile(file, columns, username, datasetName);
            _datasetService.AddDataset(username, datasetName);
            return new OkResult();
        }
        catch (Exception)
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
    [HttpGet("{datasetName}/{username}/{count}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetDatasetSample([FromRoute] string datasetName, [FromRoute] string username, [FromRoute] int count)
    {
        try
        {
            var dt = await  _datasetService.PreviewDataset(username, datasetName, count);
            var JSONresult = JsonConvert.SerializeObject(dt);
            return Ok(JSONresult);
        }
        catch (Exception e)
        {
            return new BadRequestResult();
        }
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetDatasetColumns(string datasetName, string username)
    {
        try
        {
            return Ok(_datasetService.GetDatasetColumns(datasetName, username));
        }
        catch (Exception e)
        {
            return new BadRequestResult();
        }
    }
}