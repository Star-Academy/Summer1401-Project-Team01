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

    [HttpDelete("/dataset")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RemoveDataset()
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpPatch("/dataset")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ChangeDatasetName([FromBody] string name)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpGet("/dataset/all")]
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