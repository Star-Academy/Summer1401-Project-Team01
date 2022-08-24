namespace TalStart.IServices;

public interface IDatasetService
{
    public bool AddDataset(string username, string datasetName);
    public bool RemoveDataset(string datasetId);
    public bool RenameDataset(string name, string username, string newDatasetName);
}