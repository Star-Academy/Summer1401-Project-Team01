using System.Data;

namespace TalStart.IServices;

public interface IDatasetService
{
    public Task<DataTable> PreviewDataset(string username, string datasetName, int count, bool isFullName = false);
    public bool AddDataset(string username, string datasetName);
    public bool RemoveDataset(string datasetName, string username);
    public bool RenameDataset(string currentDatasetName, string username, string newDatasetName);
    public void UpdateDatasetFromTable(string datasetName, string username);
    List<string> GetAllDatasetNames(string username);

    List<String> GetDatasetColumns(string datasetName, string username);
}