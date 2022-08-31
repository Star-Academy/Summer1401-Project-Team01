﻿namespace TalStart.IServices;

public interface ISqlService
{
    public void ExecuteNonQueryPostgres(string query);
    public Task<object?> ExecuteScalarPostgres(string query);
    public List<string> ExecuteReaderPostgres(string query);
}