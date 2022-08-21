using TalStart.IServices;
using TalStart.Models;
using TalStart.Models.Interfaces;

namespace TalStart.Services;

public class QueryBuilder : IQueryBuilder
{
    public string CopyCsvQuery(string tableName, string filePath)
    {
        return $"COPY ({tableName}) to '{filePath}' WITH (FORMAT CSV, HEADER);";
    }
}