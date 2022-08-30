﻿using System.Runtime.ExceptionServices;
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
    public async Task<IActionResult> AddPipeline([FromForm] string pipelineName, [FromForm] string username)
    {
        if (_pipelineService.AddPipeline(pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RemovePipeline([FromForm] string pipelineName, [FromForm] string username)
    {
        if (_pipelineService.RemovePipeline(pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateProcesses([FromForm] string processes, [FromForm] string name, [FromForm] string username)
    {
        if(_pipelineService.UpdateJson(processes, name,username))
            return new OkResult();
        return new BadRequestResult();
    }


    /*  [HttpGet]
      [ProducesResponseType(StatusCodes.Status200OK)]
      [ProducesResponseType(StatusCodes.Status400BadRequest)]
      [ProducesResponseType(StatusCodes.Status404NotFound)]
      public async Task<IActionResult> GetPipeline([FromForm] string pipelineName, [FromForm] string username)
      {
          await Task.Delay(3);
          return new BadRequestResult();
      }*/


    [HttpGet("{username}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetAllPipelinesNames([FromRoute] string username)
    {
        try
        {
            return Ok(_pipelineService.GetAllPipelinesNames(username));
        }
        catch (Exception)
        {
            return new BadRequestResult();
        }
    }


    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetPipeLine([FromQuery] string pipelineName,[FromQuery] string username)
    {
        try
        {
            var pipeline = _pipelineService.GetPipeline(pipelineName, username);
            var JSONresult = JsonConvert.SerializeObject(pipeline);
            return Ok(JSONresult);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    

    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RunPipeline([FromForm] string pipelineName, [FromForm] string username)
    {
        try
        {
            var dt = await  _scenarioService.RunPipeline(pipelineName, username);
            var JSONresult = JsonConvert.SerializeObject(dt);
            return Ok(JSONresult);
        }
        catch (Exception e)
        {
            return new BadRequestResult();
        }
    }

    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetRunPreview([FromForm] string pipelineName, [FromForm] string username, [FromForm]
        int lastProcessId)
    {
        try
        {
            var dt = await _scenarioService.PreviewRun(pipelineName, username, lastProcessId);
            var JSONresult = JsonConvert.SerializeObject(dt);
            return Ok(JSONresult);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddSource([FromForm] string sourceName, [FromForm] string pipelineName,
        [FromForm] string username)
    {
        if (_pipelineService.AddSource(sourceName, pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RemoveSource([FromForm] string pipelineName, [FromForm] string username)
    {
        if (_pipelineService.RemoveSource(pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddDestination([FromForm] string destinationName, [FromForm] string pipelineName,
        [FromForm] string username)
    {
        if (_pipelineService.AddDestination(destinationName, pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RemoveDestination([FromForm] string pipelineName, [FromForm] string username)
    {
        if (_pipelineService.RemoveDestination(pipelineName, username))
            return new OkResult();
        return new BadRequestResult();
    }

    [HttpPatch]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RenamePipeline([FromForm] string pipelineName, [FromForm] string username,
        [FromForm] string newPipelineName)
    {
        if (_pipelineService.RenamePipeline(pipelineName, username, newPipelineName))
            return new OkResult();
        return new BadRequestResult();
    }
}