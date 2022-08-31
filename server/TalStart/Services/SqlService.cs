using Npgsql;
using TalStart.IServices;
using TalStart.Properties;

namespace TalStart.Services;

public class SqlService : ISqlService
{
    private static SqlService? _instance;

    public static SqlService GetInstance()
    {
        return _instance ??= new SqlService();
    }

    public async void ExecuteNonQueryPostgres(string query)
    {
        await using var conn = new NpgsqlConnection(CString.connectionString);
        conn.Open();
        await using var cmd = new NpgsqlCommand(query, conn);
        cmd.ExecuteNonQuery();
    }

    public async Task<object?> ExecuteScalarPostgres(string query)
    {
        await using var conn = new NpgsqlConnection(CString.connectionString);
        conn.Open();
        await using var cmd = new NpgsqlCommand(query, conn);
        return await cmd.ExecuteScalarAsync();
    }
}