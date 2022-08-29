using System.Data.Common;
using Npgsql;
using TalStart.IServices;
using TalStart.Properties;

namespace TalStart.Services;

public class SqlService : ISqlService
{
    public SqlService()
    {
    }

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

    public object? ExecuteScalarPostgres(string query)
    {
        using var conn = new NpgsqlConnection(CString.connectionString);
        conn.Open();
        using var cmd = new NpgsqlCommand(query, conn);
        return cmd.ExecuteScalar();
    }

    public List<string> ExecuteReaderPostgres(string query)
    {
        var columnNames = new List<string>();
        using var conn = new NpgsqlConnection(CString.connectionString);
        conn.Open();
        using var cmd = new NpgsqlCommand(query, conn);
        using var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            columnNames.Add(reader.GetString(0));
        }

        return columnNames;
    }
}