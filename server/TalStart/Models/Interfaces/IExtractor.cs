using System.Data;

namespace TalStart.Models.Interfaces;

public interface IExtractor
{
    public DataTable ExtractDataTableFromCsv(Csv csv);
    public void InsertDataTableIntoDatabase(DataTable dataTable);
}