using Microsoft.AspNetCore.Mvc;
using TalStart.IServices;
using TalStart.Models;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]")]
public class PipelineController
{
    private readonly IPipelineService _pipelineService;
    public PipelineController(IPipelineService pipelineService)
    {
        _pipelineService = pipelineService;
    }

    [HttpPost("/addPipeline")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddPipeline([FromBody] Object pipeline)
    {
        _pipelineService.AddPipeline((string)pipeline);

        var db = new TalStartContext();
        var pipelineId = db.Pipelines.FirstOrDefault();

        db.Pipelines.Add(new PipelineDbo { Name = "d" });
        db.SaveChanges();
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpPut("/pipeline/updateProcesses")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateProcesses([FromForm] string processes, [FromForm] string name)
    {
        if(_pipelineService.UpdateJSON(processes, name))
        {
            return new OkResult();
        }
        else
        {
            return new BadRequestResult();
        }

    }

    [HttpGet("/pipeline/{pipelineId}")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetPipeline([FromRoute] string pipelineId)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpGet("/pipeline/all")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetAll()
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }
    
    [HttpGet("/pipeline/50")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetFifty()
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }
    
    [HttpGet("/pipeline/")]
        
    [HttpPatch("/pipeline")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ChangePipelineName([FromBody] string name)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpGet("/pipeline/run")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RunPipeline([FromQuery] string name)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpPatch("/pipeline/add/source/{pipelineId}")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddSource([FromBody] string datasetName, [FromRoute] string pipelineId)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpPatch("/pipeline/remove/source/{pipelineId}")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RemoveSource([FromForm] string datasetName, [FromRoute] string pipelineId)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpPatch("/pipeline/add/destination/{pipelineId}")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddDestination([FromBody] string datasetName, [FromRoute] string pipelineId)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpPatch("/pipeline/remove/destination/{pipelineId}")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RemoveDestination([FromForm] string datasetName, [FromRoute] int pipelineId)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }



}