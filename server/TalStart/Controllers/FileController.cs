﻿using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using TalStart.IServices;
using TalStart.IServices.IParserService;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class FileController : ControllerBase
{
    private readonly IFileService _fileService;
    private readonly IParser _parser;

    public FileController(IFileService fileService, IParser parser)
    {
        _fileService = fileService;
        _parser = parser;
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult DownloadFile([FromQuery] string datasetName,[FromQuery] string username)
    {
        try
        {
            var tableName = $"{datasetName}_{username}";

            var path = $"{AppContext.BaseDirectory}../../../resources/{username}/{datasetName}.csv";
        
            _parser.ParsePostgresTableToCsv(tableName, path);
            var stream = new FileStream(path, FileMode.Open);
            var res = new FileStreamResult(stream, "text/csv");
            // return File(res.FileStream, "text/csv", $"{datasetName}");
            return Ok($"File:/{path}");
        }
        catch (Exception)
        {
            throw;
        }
    }
}