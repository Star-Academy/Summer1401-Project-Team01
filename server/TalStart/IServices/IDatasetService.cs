using System.Data;

namespace TalStart.IServices;

public interface IDatasetService
{
    public Task<DataTable> PreviewDataset(string username, string datasetName, int count);
    public bool AddDataset(string username, string datasetName);
    public bool RemoveDataset(string username, string datasetName);
    public bool RenameDataset(string currentDatasetName, string username, string newDatasetName);
    List<string> GetAllDatasetNames(string username);
}