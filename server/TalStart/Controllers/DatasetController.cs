using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TalStart.IServices;
using TalStart.Services;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class DatasetController : ControllerBase
{
    private readonly IDatasetService _datasetService;
    private readonly IFileService _fileService;
    private readonly ISqlService _sqlService;

    public DatasetController(IDatasetService datasetService, IFileService fileService)
    {
        _datasetService = datasetService;
        _fileService = fileService;
        _sqlService = SqlService.GetInstance();
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
                if (columns[columnName] == "double")
                {
                    columns[columnName] = "DOUBLE PRECISION";
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
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetDatasetSample([FromForm] string datasetName, [FromForm] string username, [FromForm] int count)
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
    public async Task<IActionResult> GetDatasetColumns([FromQuery] string datasetName, [FromQuery] string username)
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
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> CreateEmptyDataset([FromForm] string datasetName, [FromForm] string username)
    {
        try
        {
            //var file = Request.Form.Files[0];
            var columns = new Dictionary<string, string>
            {
                { "a", "text" }
            };
            //_fileService.UploadFile(null, columns, username, datasetName);
            var queryBuilder = new QueryBuilder();
            var query = queryBuilder.BuildTableQuery(columns, $"{datasetName}_{username}");
            _sqlService.ExecuteNonQueryPostgres(query);
            _datasetService.AddDataset(username, datasetName);
            return new OkResult();
        }
        catch (Exception)
        {
            return new BadRequestResult();
        }
    }
}