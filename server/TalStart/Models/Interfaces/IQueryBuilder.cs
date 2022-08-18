namespace TalStart.Models.Interfaces;

public interface IQueryBuilder
{
    public string CreateTableQuery(string tableName, IEnumerable<Row> rows);
    // If we decide not to use bulkQuery.
    public string InsertIntoTableQuery(string tableName, IEnumerable<string> values);
}