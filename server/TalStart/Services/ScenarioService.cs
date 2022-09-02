using System.Data;
using System.Text.Json;
using TalStart.IServices;
using TalStart.Models;
using TalStart.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using TalStart.Models.Processes;

namespace TalStart.Services;

public class ScenarioService : IScenarioService
{
    private readonly TalStartContext _db = new();
    private readonly ISqlService _sqlService;
    private readonly IDatasetService _datasetService;
    private readonly IQueryBuilder _queryBuilder;

    public ScenarioService(IDatasetService datasetService, IQueryBuilder queryBuilder)
    {
        _sqlService = SqlService.GetInstance();
        _datasetService = datasetService;
        _queryBuilder = queryBuilder;
    }

    public async Task<DataTable> RunPipeline(string pipelineName, string username)
    {
        var pipe = MakePipeline(pipelineName, username);
        var sourceTable = $"{pipe.SourceDataset.Name}_{pipe.User.Username}";
        var finalTable = sourceTable + 1;
        var tempTables = new List<string>();
        foreach (var process in pipe.TreeOfProcesses)
        {
            tempTables.Add(finalTable);
            process.Run(sourceTable, finalTable);
            sourceTable = finalTable;
            finalTable += '1';
        }

        finalTable = finalTable[..^1];
        sourceTable = finalTable;
        finalTable = $"{pipe.DestinationDataset?.Name}_{pipe.User.Username}";
        var query = _queryBuilder.DropTableQuery($"\"{finalTable}\"");
        _sqlService.ExecuteNonQueryPostgres(query);
        query = _queryBuilder.CopyTableIntoTableQuery(sourceTable, finalTable);
        _sqlService.ExecuteNonQueryPostgres(query);

        foreach (var temp in tempTables)
        {
            query = _queryBuilder.DropTableQuery($"\"{temp}\"");
            _sqlService.ExecuteNonQueryPostgres(query);
        }

        return await _datasetService.PreviewDataset(username, pipe.DestinationDataset.Name, 50);
    }

    public async Task<DataTable> PreviewRun(string pipelineName, string username, int lastProcessId)
    {
        var pipe = MakePartialPipeline(pipelineName, username, lastProcessId);
        var sourceTable = $"{pipe.SourceDataset.Name}_{pipe.User.Username}";
        var finalTable = sourceTable + 1;
        var tempTables = new List<string>();
        foreach (var process in pipe.TreeOfProcesses)
        {
            tempTables.Add(finalTable);
            process.Run(sourceTable, finalTable);
            sourceTable = finalTable;
            finalTable += '1';
        }

        finalTable = finalTable[..^1];


        var finalRes = await _datasetService.PreviewDataset(username, finalTable, 50, true);

        foreach (var query in tempTables.Select(temp => _queryBuilder.DropTableQuery($"\"{temp}\"")))
        {
            _sqlService.ExecuteNonQueryPostgres(query);
        }

        return finalRes;
    }

    private Pipeline? MakePartialPipeline(string pipelineName, string username, int lastProcessId)
    {
        try
        {
            var pipe = _db.Pipelines.Include(a => a.SourceDataset)
                .Include(a => a.User).FirstOrDefault(p => p.Name == pipelineName && p.User.Username == username);
            if (pipe?.SourceDataset == null)
            {
                return null;
            }

                pipe.TreeOfProcesses = new List<IProcess>();
                var res = JsonSerializer.Deserialize<List<Process>>(pipe.Json);
                foreach (var r in res.OrderBy(r => r.Id))
                {
                    if (r.Id > lastProcessId)
                    {
                        continue;
                    }
                    switch (r.Name)
                    {
                        case "foo":
                            pipe.TreeOfProcesses.Add(new FooProcess {Id = r.Id, Name = r.Name, Options = null});
                            break;
                        case "select":
                            pipe.TreeOfProcesses.Add(new Select {Id = r.Id, Name = r.Name, Options = r.Options.ToString() });
                            break;
                        case "aggregate":
                            pipe.TreeOfProcesses.Add(new Aggregate { Id = r.Id, Name = r.Name, Options = r.Options.ToString() });
                            break;
                        case "join":
                            pipe.TreeOfProcesses.Add(new Join { Id = r.Id, Name = r.Name, Options = r.Options.ToString() });
                            break;
                        case "filter":
                            pipe.TreeOfProcesses.Add(new Filter { Id = r.Id, Name = r.Name, Options = r.Options.ToString() });
                            break;
                        case "fieldRemover":
                            pipe.TreeOfProcesses.Add(new FieldRemover { Id = r.Id, Name = r.Name, Options = r.Options.ToString() });
                            break;
                        case "sort":
                            pipe.TreeOfProcesses.Add(new SortProcess { Id = r.Id, Name = r.Name, Options = r.Options.ToString() });
                            break;
                        case "operation":
                            pipe.TreeOfProcesses.Add(new OperationProcess { Id = r.Id, Name = r.Name, Options = r.Options.ToString() });
                            break;
                        case "score":
                            pipe.TreeOfProcesses.Add(new ScoreProcess { Id = r.Id, Name = r.Name, Options = r.Options.ToString() });
                            break;
                    }
                }

            return pipe;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return null;
        }
    }

    private Pipeline? MakePipeline(string pipelineName, string username)
    {
        try
        {
            var pipe = _db.Pipelines.Include(a => a.DestinationDataset).Include(a => a.SourceDataset)
                .Include(a => a.User).FirstOrDefault(p => p.Name == pipelineName && p.User.Username == username);
            if (pipe == null || pipe.SourceDataset == null || pipe.DestinationDataset == null)
            {
                return null;
            }

                pipe.TreeOfProcesses = new List<IProcess>();
                var res = JsonSerializer.Deserialize<List<Process>>(pipe.Json);
                foreach (var r in res.OrderBy(r => r.Id))
                {
                    switch (r.Name)
                    {
                        case "foo":
                            pipe.TreeOfProcesses.Add(new FooProcess {Id = r.Id, Name = r.Name, Options = null});
                            break;
                        case "select":
                            pipe.TreeOfProcesses.Add(new Select {Id = r.Id, Name = r.Name, Options = r.Options.ToString() });
                            break;
                        case "aggregate":
                            pipe.TreeOfProcesses.Add(new Aggregate { Id = r.Id, Name = r.Name, Options = r.Options.ToString() });
                            break;
                        case "join":
                            pipe.TreeOfProcesses.Add(new Join { Id = r.Id, Name = r.Name, Options = r.Options.ToString() });
                            break;
                        case "filter":
                            pipe.TreeOfProcesses.Add(new Filter { Id = r.Id, Name = r.Name, Options = r.Options.ToString() });
                            break;
                        case "fieldRemover":
                            pipe.TreeOfProcesses.Add(new FieldRemover { Id = r.Id, Name = r.Name, Options = r.Options.ToString() });
                            break;
                        case "sort":
                            pipe.TreeOfProcesses.Add(new SortProcess { Id = r.Id, Name = r.Name, Options = r.Options.ToString() });
                            break;
                        case "operation":
                            pipe.TreeOfProcesses.Add(new OperationProcess { Id = r.Id, Name = r.Name, Options = r.Options.ToString() });
                            break;
                        case "score":
                            pipe.TreeOfProcesses.Add(new ScoreProcess { Id = r.Id, Name = r.Name, Options = r.Options.ToString() });
                            break;
                    }
                }

            return pipe;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return null;
        }
    }
}