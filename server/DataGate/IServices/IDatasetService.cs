using System.Data;

namespace DataGate.IServices;

public interface IDatasetService
{
    Task<DataTable> PreviewDataset(string username, string datasetName, int count, bool isFullName = false);
    void AddDataset(string username, string datasetName);
    bool RemoveDataset(string datasetName, string username);
    bool RenameDataset(string currentDatasetName, string username, string newDatasetName);
    void UpdateDatasetFromTable(string datasetName, string username);
    List<string> GetAllDatasetNames(string username);
    List<string> GetDatasetColumns(string datasetName, string username);
}