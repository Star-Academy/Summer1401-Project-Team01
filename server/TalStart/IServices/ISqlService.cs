﻿using System.Data.Common;

namespace TalStart.IServices;

public interface ISqlService
{
     public void ExecuteNonQueryPostgres(string query);
     public Task<Object?> ExecuteScalarPostgres(string query);
     public List<string> ExecuteReaderPostgres(string query);
}