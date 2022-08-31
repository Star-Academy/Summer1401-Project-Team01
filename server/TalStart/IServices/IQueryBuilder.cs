using TalStart.Models.ProcessType.Options;

using TalStart.Models.ProcessType.Options;

namespace TalStart.IServices;

public interface IQueryBuilder
{
    string ExportCsvQuery(string tableName, string filePath);

    string ImportCsvQuery(string tableName, string filePath);
    string DropTableQuery(string tableName);

    string BuildTableQuery(Dictionary<string, string> columnType, string tableName);

    public string SelectIntoQuery(string sourceTable, string finalTable);

    string GetColumnNamesQuery(string tableName);
    string RenameTableQuery(string tableName, string newTableName);

    string AggregateQuery(string sourceTable, string columnToBeGroupedBy, string operationColumn, string operationType, string finalTable);
    string SortQuery(string sourceTable, string finalTable, string operationColumn, bool isAscending);
    string FilterQuery(string sourceTable, string finalTable, FilterOptions filterOptions);
    string SelectQuery(string sourceTable, string finalTable, List<string> selectOptionsColumns);
    string JoinQuery(string sourceTable, string finalTable, string type, string middleDatasetName, string leftVal,
        string rightVal);
    string CopyTableIntoTable(string sourceTable, string finalTable);
    string FieldRemoverQuery(string sourceTable, List<string> columns);
}