using System.Data;
using TalStart.Models;
using TalStart.Services;
using TalStart.Services.ParserService;

namespace TalStart;

public class Program
{
    
    public static void Main(string[] args)
    {
        var userService = new UserService();
        var queryBuilder = new QueryBuilder();
        var parser = new Parser(queryBuilder, SqlService.GetInstance());
        var fileService = new FileService(parser);
        var datasetService = new DatasetService(parser, queryBuilder, fileService);
        var pipelineService = new PipelineService();
        var scenarioService = new ScenarioService(datasetService);
        
        
        // userService.CreateUser("Arya", "Jalali", "Admin", "email", "1234");
        
        pipelineService.AddPipeline("first", "Admin");
        pipelineService.AddDestination("Zapas", "first", "Admin");
        pipelineService.AddSource("Book", "first", "Admin");
        var json = "[{\"id\": 1, \"Name\": \"select\", \"Options\": {\"columns\" : [\"hi\"]}}]";
        Console.WriteLine(json);
        // var json = "[{\"Id\": 1,\"Name\": \"foo\",\"Options\": null}]";
        
        pipelineService.UpdateJson(json, "first", "Admin");

        test2(scenarioService);
        // pipelineService.RenamePipeline("first", "Admin", "second");
        // pipelineService.RemoveDestination("second", "Admin");
        // // Console.WriteLine(pipelineService.GetPipeline("first","Admin").DestinationDataset.Id);
        // pipelineService.RemoveSource("first", "Admin");
        // Console.WriteLine(pipelineService.GetPipeline("first","Admin").SourceDataset.Id);
        // pipelineService.RemovePipeline("first", "Admin");
        // pipelineService.UpdateJson("", "first", "Admin");
        // scenarioService.RunPipeline("first", "Admin");

        // var arr = datasetService.GetDatasetColumns("Book", "Admin");
        // var arr = datasetService.GetAllDatasetNames("Admin");
        // Console.WriteLine(String.Join("\n", arr));
        // test(datasetService);

    }

    public static async Task test(DatasetService datasetService)
    {
        var table = await datasetService.PreviewDataset("Admin", "Book", 10);
        
        foreach (DataRow row in table.Rows)
        {
            foreach (var item in row.ItemArray)
            {
                Console.WriteLine(item);
            }
        }
    }
    
    public async static Task test2(ScenarioService scenarioService)
    {
        var table =  await scenarioService.RunPipeline("first", "Admin");

        foreach (DataRow row in table.Rows)
        {
            foreach (var item in row.ItemArray)
            {
                Console.WriteLine(item);
            }
        }

        return;
    }
}