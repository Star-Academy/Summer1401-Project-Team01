namespace TalStart.IServices;

public interface IDatasetService
{
    public bool AddDataset(string username, string datasetName);
    public bool RemoveDataset(string username, string datasetName);
    public bool RenameDataset(string currentDatasetName, string username, string newDatasetName);
}