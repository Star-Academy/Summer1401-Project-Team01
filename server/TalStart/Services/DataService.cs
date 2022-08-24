using System.Data;
using Newtonsoft.Json;
using Npgsql;
using SqlKata;
using SqlKata.Execution;
using SqlKata.Compilers;
using TalStart.IServices;
using TalStart.Properties;

namespace TalStart.Services;

public class DataService : IDatasetService
{
    public async Task<DataTable> PreviewDataset(string username, string datasetName, int count)
    {
        await using var conn = new NpgsqlConnection(CString.connectionString);
        var compiler = new PostgresCompiler();
        var db = new QueryFactory(conn, compiler);
        var tableName = $"{datasetName}.{username}";

        var query = await db.Query(tableName).Limit(count).GetAsync();
        var json = JsonConvert.SerializeObject(query);
        var dataTable = (DataTable) JsonConvert.DeserializeObject(json, (typeof(DataTable)));
        return dataTable;
    }
}