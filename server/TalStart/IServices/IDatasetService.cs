using System.Data;

namespace TalStart.IServices;

public interface IDatasetService
{
    public Task<DataTable> PreviewDataset(string username, string datasetName, int count);
}