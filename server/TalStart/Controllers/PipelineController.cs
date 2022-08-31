using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult AddPipeline([FromForm] string pipelineName, [FromForm] string username)
    {
        try
        {
            _pipelineService.AddPipeline(pipelineName, username);
            return new OkResult();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new BadRequestResult();
        }
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult RemovePipeline([FromForm] string pipelineName, [FromForm] string username)
    {
        try
        {
            _pipelineService.RemovePipeline(pipelineName, username);
            return new OkResult();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new BadRequestResult();
        }
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult UpdateProcesses([FromForm] string processes, [FromForm] string name,
        [FromForm] string username)
    {
        try
        {
            _pipelineService.UpdateJson(processes, name, username);
            return new OkResult();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new BadRequestResult();
        }
    }


    [HttpGet("{username}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetAllPipelinesNames([FromRoute] string username)
    {
        try
        {
            return Ok(_pipelineService.GetAllPipelinesNames(username));
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return new BadRequestResult();
        }
    }


    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetPipeLine([FromQuery] string pipelineName, [FromQuery] string username)
    {
        try
        {
            var pipeline = _pipelineService.GetPipeline(pipelineName, username);
            return Ok(JsonConvert.SerializeObject(pipeline));
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new BadRequestResult();
        }
    }


    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RunPipeline([FromForm] string pipelineName, [FromForm] string username)
    {
        try
        {
            var dt = await _scenarioService.RunPipeline(pipelineName, username);
            return Ok(JsonConvert.SerializeObject(dt));
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return new BadRequestResult();
        }
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetRunPreview([FromForm] string pipelineName, [FromForm] string username,
        [FromForm] int lastProcessId)
    {
        try
        {
            var dt = await _scenarioService.PreviewRun(pipelineName, username, lastProcessId);
            return Ok(JsonConvert.SerializeObject(dt));
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new BadRequestResult();
        }
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult AddSource([FromForm] string sourceName, [FromForm] string pipelineName,
        [FromForm] string username)
    {
        try
        {
            _pipelineService.AddSource(sourceName, pipelineName, username);
            return new OkResult();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new BadRequestResult();
        }
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult RemoveSource([FromForm] string pipelineName, [FromForm] string username)
    {
        try
        {
            _pipelineService.RemoveSource(pipelineName, username);
            return new OkResult();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new BadRequestResult();
        }
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult AddDestination([FromForm] string destinationName, [FromForm] string pipelineName,
        [FromForm] string username)
    {
        try
        {
            _pipelineService.AddDestination(destinationName, pipelineName, username);
            return new OkResult();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new BadRequestResult();
        }
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult RemoveDestination([FromForm] string pipelineName, [FromForm] string username)
    {
        try
        {
            _pipelineService.RemoveDestination(pipelineName, username);
            return new OkResult();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new BadRequestResult();
        }
    }

    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult RenamePipeline([FromForm] string pipelineName, [FromForm] string username,
        [FromForm] string newPipelineName)
    {
        try
        {
            _pipelineService.RenamePipeline(pipelineName, username, newPipelineName);
            return new OkResult();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return new BadRequestResult();
        }
    }
}