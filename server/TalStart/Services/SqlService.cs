﻿using System.Data.Common;
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
        await using var cmd = new NpgsqlCommand(query);
        cmd.Connection = conn;
        await cmd.ExecuteNonQueryAsync();
    }

    public async Task<object?> ExecuteScalarPostgres(string query)
    {
        await using var conn = new NpgsqlConnection(CString.connectionString);
        conn.Open();
        await using var cmd = new NpgsqlCommand(query);
        return await cmd.ExecuteScalarAsync();
    }

    public DbDataReader  ExecuteReaderPostgres(string query)
    {
        using var conn = new NpgsqlConnection(CString.connectionString);
        conn.Open();
        using var cmd = new NpgsqlCommand(query);
        return cmd.ExecuteReader();
    }
}