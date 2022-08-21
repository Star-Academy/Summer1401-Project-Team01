namespace TalStart.IServices;

public interface IQueryBuilder
{
    public string CopyCsvQuery(string tableName, string filePath);
}