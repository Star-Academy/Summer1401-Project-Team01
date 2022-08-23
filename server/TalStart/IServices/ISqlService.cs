using System.Data.Common;

namespace TalStart.IServices;

public interface ISqlService
{
     public void ExecuteNonQueryPostgres(string query);
     public Task<object?> ExecuteScalarPostgres(string query);
     public Task<DbDataReader> ExecuteReaderPostgres(string query);
}