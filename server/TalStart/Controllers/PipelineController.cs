using Microsoft.AspNetCore.Mvc;
using TalStart.IServices;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class PipelineController : ControllerBase
{
    private readonly IPipelineService _pipelineService;
    private readonly IScenarioService _scenarioService;
    public PipelineController(IPipelineService pipelineService, IScenarioService scenarioService)
    {
        _pipelineService = pipelineService;
        _scenarioService = scenarioService;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddPipeline([FromForm] string pipelineName, [FromForm] string username)
    {
        if (_pipelineService.AddPipeline(pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }
    
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RemovePipeline([FromForm] string pipelineName, [FromForm] string username)
    {
        if (_pipelineService.RemovePipeline(pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateProcesses([FromForm] string processes, [FromForm] string name)
    {
        if(_pipelineService.UpdateJson(processes, name))
            return new OkResult();
        return new BadRequestResult();
    }


    [HttpGet]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetPipeline([FromForm] string pipelineName, [FromForm] string username)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }


    [HttpGet("{username}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetAllPipelinesNames(string username)
    {   
        try
        {
            return Ok(_pipelineService.GetAllPipelinesNames(username));
        }
        catch (Exception e)
        {
            return new BadRequestResult();
        }
    }
    

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetFifty()
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpPost]
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

    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddSource([FromForm] string sourceName,[FromForm] string pipelineName, [FromForm] string username)
    {
        if (_pipelineService.AddSource(sourceName, pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RemoveSource([FromForm] string pipelineName, [FromForm] string username)
    {
        if (_pipelineService.RemoveSource(pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddDestination([FromForm] string destinationName, [FromForm] string pipelineName, [FromForm] string username)
    {
        if (_pipelineService.AddDestination(destinationName, pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RemoveDestination([FromForm] string pipelineName, [FromForm] string username)
    {
        if (_pipelineService.RemoveDestination(pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }
    
    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RenamePipeline([FromForm] string pipelineName, [FromForm] string username, [FromForm] string newPipelineName)
    {
        if (_pipelineService.RenamePipeline(pipelineName, username, newPipelineName))
            return new OkResult();
        return new BadRequestResult();
    }
}