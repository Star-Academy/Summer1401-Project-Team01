using System.Data.Common;
using TalStart.IServices;

namespace TalStart.Services;

public class SqlService : ISqlService
{
    private SqlService()
    {
    }

    private static SqlService _instance;

    public static SqlService GetInstance()
    {
        if (_instance == null)
        {
            _instance = new SqlService();
        }

        return _instance;
    }

    public void ExecuteNonQueryPostgres(string query)
    {
        throw new NotImplementedException();
    }

    public Task<object> ExecuteScalarPostgres(string query)
    {
        throw new NotImplementedException();
    }

    public Task<DbDataReader> ExecuteReaderPostgres(string query)
    {
        throw new NotImplementedException();
    }
}