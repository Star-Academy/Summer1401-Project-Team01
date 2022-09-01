namespace TalStart.IServices;

public interface ISqlService
{
    void ExecuteNonQueryPostgres(string query);
    Task<object?> ExecuteScalarPostgres(string query);
}