using Microsoft.AspNetCore.Mvc;
using TalStart.IServices;
using TalStart.Models;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]")]
public class PipelineController
{
    private readonly IPipelineService _pipelineService;
    private readonly IScenarioService _scenarioService;
    public PipelineController(IPipelineService pipelineService, IScenarioService scenarioService)
    {
        _pipelineService = pipelineService;
        _scenarioService = scenarioService;
    }

    [HttpPost("/addPipeline")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddPipeline([FromForm] string pipelineName, [FromForm] string username)
    {
        if (_pipelineService.AddPipeline(pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpPut("/pipeline/updateProcesses")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateProcesses([FromForm] string processes, [FromForm] string name)
    {
        if(_pipelineService.UpdateJson(processes, name))
            return new OkResult();
        return new BadRequestResult();
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

    [HttpPost("/pipeline/run")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RunPipeline([FromForm] string pipelineName, [FromForm] string username)
    {
        var res = _scenarioService.RunPipeline(pipelineName, username);
        if (res)
        {
            return new OkResult();
        }
        return new BadRequestResult();
    }

    [HttpPatch("/pipeline/add/source")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddSource([FromForm] string sourceName,[FromForm] string pipelineName, [FromForm] string username)
    {
        if (_pipelineService.AddSource(sourceName, pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpPatch("/pipeline/remove/source")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RemoveSource([FromForm] string pipelineName, [FromForm] string username)
    {
        if (_pipelineService.RemoveSource(pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpPatch("/pipeline/add/destination")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddDestination([FromForm] string destinationName, [FromForm] string pipelineName, [FromForm] string username)
    {
        if (_pipelineService.AddDestination(destinationName, pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpPatch("/pipeline/remove/destination")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RemoveDestination([FromForm] string pipelineName, [FromForm] string username)
    {
        if (_pipelineService.RemoveDestination(pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }
}