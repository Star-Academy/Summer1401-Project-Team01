using TalStart.Models.Processes.Options;

namespace TalStart.IServices;

public interface IQueryBuilder
{
    string ExportCsvQuery(string tableName, string filePath);
    string ImportCsvQuery(string tableName, string filePath);
    
    string DropTableQuery(string tableName);
    string BuildTableQuery(Dictionary<string, string> columnType, string tableName);
    string RenameTableQuery(string tableName, string newTableName);
    string CopyTableIntoTableQuery(string sourceTable, string finalTable);

    string GetColumnNamesQuery(string tableName);
    
    string AggregateQuery(string sourceTable, string columnToBeGroupedBy, string operationColumn, string operationType, string finalTable);
    string SortQuery(string sourceTable, string finalTable, string operationColumn, bool isAscending);
    string FilterQuery(string sourceTable, string finalTable, FilterOptions filterOptions);
    string SelectQuery(string sourceTable, string finalTable, List<string> selectOptionsColumns);
    string JoinQuery(string sourceTable, string finalTable, string type, string middleDatasetName, string leftVal,
        string rightVal);
    string FieldRemoverQuery(string sourceTable, IEnumerable<string> columns);
    string MathOperationQuery(string sourceTable, string finalTable, string firstColumn, string secondColumn,
        string operation, string newColumn);
    string ScoreQuery(string sourceTable, string finalTable, IEnumerable<string> goods, IEnumerable<string> bads,
        string newColumn);
}