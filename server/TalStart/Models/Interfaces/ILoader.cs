using System.Data;

namespace TalStart.Models.Interfaces;

public interface ILoader
{
    public DataTable LoadDataTableFromDatabase(string tableName);
    public DataTable LoadFirstNRowsFromDatabase(string tableName, int n);
}